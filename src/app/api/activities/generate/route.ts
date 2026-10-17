import { NextRequest, NextResponse } from 'next/server';
import { getMockStore, addActivity } from '@/lib/mock/store';
import { COMPETENCIES, CompetencyKey, COMPETENCY_KEYS } from '@/lib/types/competencies';
import { generateContentSafe } from '@/lib/ai/provider';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { studentId, targetCompetency } = body;

    const store = getMockStore();
    const student = store.students.find((s) => s.id === studentId) || store.students[0];

    // Determine target competency
    let compToTarget: CompetencyKey = targetCompetency;
    if (!compToTarget || !COMPETENCY_KEYS.includes(compToTarget)) {
      // Find lowest scored competency
      const scores = store.competencyScores.filter((cs) => cs.student_id === student.id);
      if (scores.length > 0) {
        const sorted = [...scores].sort((a, b) => a.score - b.score);
        compToTarget = sorted[0].competency;
      } else {
        compToTarget = 'analytical_thinking';
      }
    }

    const compMeta = COMPETENCIES[compToTarget] || COMPETENCIES['critical_thinking'];

    const prompt = `You are the Activity Design Engine for the Vasumathi Ramaswami Centenary Foundation (VRCF).
Generate an interactive, high-impact micro-challenge for ${student.name}, an undergraduate scholar studying ${student.course_name} at ${student.college}.

TARGET COMPETENCY:
- Competency: ${compToTarget} (${compMeta.label})
- Description: ${compMeta.description}

ACTIVITY SPECIFICATIONS:
1. Choose one category: 'mini_case_study', 'ethical_scenario', or 'root_cause_analysis'.
2. The scenario must be grounded in realistic college student experiences in Tamil Nadu or campus projects (e.g., student symposium planning, department resource constraints, team project deadlock, rural community survey, ethical software/commerce dilemma).
3. Provide a clear, nuanced 2-paragraph situation with competing priorities or incomplete information.
4. Conclude with 1 crisp, thought-provoking challenge question prompting first-principles inquiry.

OUTPUT FORMAT (STRICT JSON ONLY):
{
  "title": "Creative 4-6 word title",
  "type": "mini_case_study",
  "competency": "${compToTarget}",
  "prompt": "Paragraph 1: Situation setup.\\n\\nParagraph 2: The emerging dilemma and stakes.\\n\\nChallenge Question: What specific decision framework would you apply, and how do you reconcile the competing trade-offs?",
  "xp": 80,
  "payload": {
    "category": "Real-world Leadership Dilemma",
    "estimatedMinutes": 8
  }
}`;

    let generatedActivity: any;
    try {
      const response = await generateContentSafe(prompt, {
        temperature: 0.7,
        maxOutputTokens: 700,
      });

      const cleanJson = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      generatedActivity = addActivity({
        title: parsed.title,
        type: parsed.type || 'mini_case_study',
        competency: compToTarget,
        prompt: parsed.prompt,
        xp: parsed.xp || 80,
        payload: parsed.payload || { category: 'Leadership Dilemma', estimatedMinutes: 8 },
      });
    } catch (apiErr) {
      console.warn('Gemini activity generation error, using fallback:', apiErr);
      generatedActivity = addActivity({
        title: `Optimizing ${compMeta.shortLabel || 'Analytical'} Decisions Under Scarcity`,
        type: 'mini_case_study',
        competency: compToTarget,
        prompt: `Your college student council has allocated a limited grant to your department project committee. Half the team wants to invest immediately in proprietary cloud software licenses, while the other wants to build on open-source frameworks and use the remaining funds to conduct 3 peer-led workshops for junior scholars.\n\nAnalyze this decision through the lens of ${compMeta.label}. What are the second-order consequences of each path over an academic year, and how would you lead the committee to a principled consensus?`,
        xp: 80,
        payload: { category: 'Resource Allocation', estimatedMinutes: 8 },
      });
    }

    return NextResponse.json({ activity: generatedActivity });
  } catch (error: unknown) {
    console.error('Activity generate error:', error);
    return NextResponse.json(
      { error: 'Failed to generate micro-challenge.' },
      { status: 500 }
    );
  }
}
