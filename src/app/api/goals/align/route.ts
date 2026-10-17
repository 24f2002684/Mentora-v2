import { NextRequest, NextResponse } from 'next/server';
import { generateContentSafe } from '@/lib/ai/provider';
import { COMPETENCY_KEYS, CompetencyKey } from '@/lib/types/competencies';

interface GoalInput {
  id: string;
  kind: string;
  title: string;
  description?: string;
  progress?: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentName, courseName, goals } = body as {
      studentName?: string;
      courseName?: string;
      goals?: GoalInput[];
    };

    if (!goals || goals.length === 0) {
      return NextResponse.json({ error: 'No goals provided for alignment.' }, { status: 400 });
    }

    const goalsSummary = goals
      .map(
        (g, i) =>
          `${i + 1}. [${g.kind.toUpperCase()}] "${g.title}" (Progress: ${g.progress ?? 0}%)${
            g.description ? ` - Details: ${g.description}` : ''
          }`
      )
      .join('\n');

    const prompt = `You are Mentora, an expert mentor for college scholars at the Vasumathi Ramaswami Centenary Foundation (VRCF).
The student is ${studentName || 'a college scholar'}, studying ${courseName || 'undergraduate degree'}.

Here are their active goals:
${goalsSummary}

TASK:
For each goal, generate 1 to 2 high-impact, practical, and actionable NEXT STEPS that the student can execute in the next 1-2 weeks.
Each suggestion MUST specify 1 or 2 relevant focus competencies chosen ONLY from this exact list:
${COMPETENCY_KEYS.join(', ')}

Return ONLY valid JSON matching this schema:
[
  {
    "goalId": "string matching the goal index or id",
    "goalTitle": "string",
    "suggestions": [
      {
        "title": "Clear action-oriented task title (max 10 words)",
        "details": "Concrete description of what to do, why it builds leadership, and how to verify it (max 30 words)",
        "focusCompetencies": ["one or two from the allowed list"]
      }
    ]
  }
]
Do not wrap in backticks or markdown if possible. Just raw JSON.`;

    const { text } = await generateContentSafe(prompt, {
      temperature: 0.6,
      maxOutputTokens: 1200,
    });

    // Clean JSON response if enclosed in code blocks
    let cleanedJson = text.trim();
    if (cleanedJson.startsWith('```json')) {
      cleanedJson = cleanedJson.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleanedJson.startsWith('```')) {
      cleanedJson = cleanedJson.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const parsed = JSON.parse(cleanedJson);
    return NextResponse.json({ recommendations: parsed });
  } catch (err: unknown) {
    console.error('Goal alignment error:', err);
    // Fallback if AI service has a hiccup
    return NextResponse.json({
      recommendations: [
        {
          goalId: 'fallback',
          goalTitle: 'Daily Academic Excellence',
          suggestions: [
            {
              title: 'Deconstruct Week 1 Lecture into First Principles',
              details: 'Break down primary subject topics into fundamental axioms and write a 1-page synthesis note.',
              focusCompetencies: ['critical_thinking', 'analytical_thinking'],
            },
            {
              title: 'Conduct Peer Discussion on Campus Problem Solving',
              details: 'Identify one operational inefficiency in your college and discuss 2 pragmatic solutions with peers.',
              focusCompetencies: ['problem_solving', 'communication'],
            },
          ],
        },
      ],
    });
  }
}
