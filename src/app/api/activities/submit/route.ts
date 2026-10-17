import { NextRequest, NextResponse } from 'next/server';
import { getMockStore, recordActivityAttempt } from '@/lib/mock/store';
import { COMPETENCIES } from '@/lib/types/competencies';
import { generateContentSafe } from '@/lib/ai/provider';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, activityId, response } = body;

    if (!activityId || !response?.trim()) {
      return NextResponse.json(
        { error: 'Activity ID and response text are required.' },
        { status: 400 }
      );
    }

    const store = getMockStore();
    const student = store.students.find((s) => s.id === studentId) || store.students[0];
    const activity = store.activities.find((a) => a.id === activityId);

    if (!activity) {
      return NextResponse.json({ error: 'Activity not found.' }, { status: 404 });
    }

    const compMeta = COMPETENCIES[activity.competency] || COMPETENCIES['critical_thinking'];

    const prompt = `You are an encouraging Socratic evaluator for the Vasumathi Ramaswami Centenary Foundation.
Evaluate this student's response to the leadership micro-challenge.

CHALLENGE DETAILS:
- Title: ${activity.title}
- Target Competency: ${activity.competency} (${compMeta.label})
- Challenge Prompt:
"${activity.prompt}"

STUDENT RESPONSE:
"${response.trim()}"

EVALUATION CRITERIA:
1. Score from 1.0 to 5.0 (e.g. 4.5, 4.8).
2. Feedback remarks (2-3 sentences): Praise the student's specific insight or framework, and give ONE constructive thought-experiment to sharpen it further.

OUTPUT FORMAT (STRICT JSON ONLY):
{
  "score": 4.6,
  "aiFeedback": "Your analysis shows strong moral clarity and pragmatic stakeholder awareness. Consider how you would communicate this decision to the opposing faction so they feel heard rather than defeated."
}`;

    let parsed = {
      score: 4.5,
      aiFeedback:
        'Excellent first-principles reasoning. You identified the underlying trade-offs and proposed a sustainable, non-punitive path forward.',
    };

    try {
      const aiRes = await generateContentSafe(prompt, {
        temperature: 0.4,
        maxOutputTokens: 400,
      });
      const cleanJson = aiRes.text.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleanJson);
    } catch (apiErr) {
      console.warn('Gemini response evaluation error, using fallback:', apiErr);
    }

    // Record attempt and award XP
    const result = recordActivityAttempt(
      student.id,
      activity.id,
      response.trim(),
      parsed.aiFeedback,
      parsed.score
    );

    return NextResponse.json({
      aiFeedback: parsed.aiFeedback,
      score: parsed.score,
      xpAwarded: result.xpAwarded,
      newTotalXp: result.newTotalXp,
      newLevel: result.newLevel,
      unlockedBadge: result.unlockedBadge,
    });
  } catch (error: unknown) {
    console.error('Activity submit error:', error);
    return NextResponse.json(
      { error: 'Failed to record activity submission.' },
      { status: 500 }
    );
  }
}
