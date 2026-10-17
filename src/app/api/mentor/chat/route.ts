import { NextRequest, NextResponse } from 'next/server';
import {
  getMockStore,
  addChatMessage,
  getDailyChatQuota,
  getThreadMessages,
  updateThreadSummary,
} from '@/lib/mock/store';
import { buildAIMentorSystemPrompt, MentorContextData } from '@/lib/ai/prompts';
import { streamGeminiContent, generateContentSafe } from '@/lib/ai/provider';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { threadId, studentId, message, history } = body;

    if (!threadId || !studentId || !message?.trim()) {
      return NextResponse.json(
        { error: 'Missing required parameters: threadId, studentId, or message' },
        { status: 400 }
      );
    }

    const store = getMockStore();
    const student = store.students.find((s) => s.id === studentId) || store.students[0];

    // 1. Quota Check (Max 30 messages/day)
    const quota = getDailyChatQuota(student.id);
    if (quota.remaining <= 0) {
      return NextResponse.json(
        {
          error: 'Daily message limit reached (30/30 messages). Your mentorship quota resets at midnight.',
          remaining: 0,
        },
        { status: 429 }
      );
    }

    // 2. Persist the incoming User Message
    addChatMessage(threadId, 'user', message.trim());

    // 3. Thread Rolling Context / Summarization (> 20 messages)
    const existingMessages = getThreadMessages(threadId);
    const thread = store.chatThreads.find((t) => t.id === threadId);

    if (existingMessages.length > 20 && !thread?.summary) {
      try {
        const olderToSummarize = existingMessages.slice(0, existingMessages.length - 8);
        const summaryPrompt = `Summarize the key reflections, dilemmas, and action commitments from this mentorship dialogue in 3 bullet points:\n\n${olderToSummarize
          .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
          .join('\n')}`;

        generateContentSafe(summaryPrompt, { maxOutputTokens: 250 })
          .then(({ text }) => {
            if (text) updateThreadSummary(threadId, text.trim());
          })
          .catch((err) => console.warn('Background thread summary skipped:', err));
      } catch (err) {
        console.warn('Could not trigger background summary:', err);
      }
    }

    // 4. Build Sanitized Socratic System Prompt
    const studentGoals = store.goals.filter((g) => g.student_id === student.id);
    const studentTasks = store.tasks.filter((t) => t.student_id === student.id && t.status !== 'reviewed');
    
    // Find reviews for student's submissions
    const studentTaskIds = new Set(
      store.tasks.filter((t) => t.student_id === student.id).map((t) => t.id)
    );
    const studentSubmissions = store.submissions.filter((sub) => studentTaskIds.has(sub.task_id));
    const studentSubmissionIds = new Set(studentSubmissions.map((s) => s.id));
    const studentReviews = store.reviews.filter((r) => studentSubmissionIds.has(r.submission_id));
    const studentScores = store.competencyScores.filter((cs) => cs.student_id === student.id);

    const aimGoal = studentGoals.find((g) => g.kind === 'aim');
    const visionGoal = studentGoals.find((g) => g.kind === 'vision_statement');

    const contextData: MentorContextData = {
      firstName: student.name.split(' ')[0],
      courseName: student.course_name,
      yearOfStudy: student.year_of_study,
      college: student.college,
      aim: aimGoal?.title || 'Academic excellence and community leadership.',
      vision: visionGoal?.title || 'Empowering self, family, and society through education.',
      activeGoals: studentGoals.map((g) => ({ title: g.title, progress: g.progress })),
      openTasks: studentTasks.map((t) => ({
        title: t.title,
        focusCompetencies: t.focus_competencies,
      })),
      recentFeedback: studentReviews.slice(0, 3).map((r) => ({
        feedback: r.feedback,
        grade: r.grade || undefined,
      })),
      competencyScores: studentScores.map((cs) => ({
        competency: cs.competency,
        score: cs.score,
      })),
      threadSummary: thread?.summary || undefined,
    };

    const systemInstruction = buildAIMentorSystemPrompt(contextData);

    // 5. Build Multi-turn Dialogue Contents for Gemini
    // Limit to recent 10 messages for prompt efficiency + rolled-up summary
    const recentHistory = (history && Array.isArray(history) && history.length > 0)
      ? history.slice(-10)
      : existingMessages.slice(-10).map((m) => ({ role: m.role, content: m.content }));

    const geminiContents = recentHistory.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // 6. Execute Streaming Response
    const encoder = new TextEncoder();

    try {
      const responseStream = await streamGeminiContent(geminiContents, systemInstruction);

      const stream = new ReadableStream({
        async start(controller) {
          let fullAssistantText = '';
          try {
            for await (const chunk of responseStream) {
              const text = chunk.text;
              if (text) {
                fullAssistantText += text;
                controller.enqueue(encoder.encode(text));
              }
            }

            // Save completed assistant message to store
            if (fullAssistantText.trim()) {
              addChatMessage(threadId, 'assistant', fullAssistantText.trim());
            }

            controller.close();
          } catch (streamErr) {
            console.error('Error during chunk streaming:', streamErr);
            // Fallback chunk if stream broke midway
            if (!fullAssistantText) {
              const fallback = `You are reflecting on an important aspect of your journey. What is the fundamental assumption you are making here, and how would you test it with one small step today?`;
              controller.enqueue(encoder.encode(fallback));
              addChatMessage(threadId, 'assistant', fallback);
            }
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          'X-Remaining-Quota': String(Math.max(0, quota.remaining - 1)),
        },
      });
    } catch (apiErr) {
      console.warn('Gemini stream failed, providing Socratic fallback response:', apiErr);

      // Graceful high-quality Socratic fallback response
      const fallbackResponse = `You are reflecting on a critical question regarding your growth. In ${student.course_name}, when you face a challenging unknown, what is the single most actionable first step you can take today to test your understanding?`;

      addChatMessage(threadId, 'assistant', fallbackResponse);

      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(fallbackResponse));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'X-Remaining-Quota': String(Math.max(0, quota.remaining - 1)),
        },
      });
    }
  } catch (error: unknown) {
    console.error('AI Mentor chat error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while communicating with Mentora AI.' },
      { status: 500 }
    );
  }
}
