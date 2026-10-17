import { NextRequest, NextResponse } from 'next/server';
import { getMockStore } from '@/lib/mock/store';
import { COMPETENCIES } from '@/lib/types/competencies';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { studentId } = body;

    const store = getMockStore();
    const student = store.students.find((s) => s.id === studentId) || store.students[0];

    const studentGoals = store.goals.filter((g) => g.student_id === student.id);
    const studentScores = store.competencyScores.filter((cs) => cs.student_id === student.id);

    // Identify lowest 3 competencies for this student
    const sortedScores = [...studentScores].sort((a, b) => a.score - b.score);
    const growthCompetencies = new Set(sortedScores.slice(0, 3).map((s) => s.competency));

    // Score each resource based on relevance
    const ranked = store.resources.map((res) => {
      let score = 0;
      let matchedCompetency = '';

      // Competency match
      res.competency_tags.forEach((tag) => {
        if (growthCompetencies.has(tag)) {
          score += 5;
          if (!matchedCompetency) matchedCompetency = COMPETENCIES[tag]?.label || tag;
        } else {
          score += 1;
        }
      });

      // Goal keyword match
      studentGoals.forEach((goal) => {
        const goalLower = goal.title.toLowerCase();
        res.goal_tags.forEach((gt) => {
          if (goalLower.includes(gt.toLowerCase()) || gt.toLowerCase().includes(goalLower.split(' ')[0])) {
            score += 4;
          }
        });
      });

      const recommendationRationale = matchedCompetency
        ? `Directly targets your priority growth area in ${matchedCompetency} to accelerate term project milestones.`
        : `Recommended to strengthen foundational leadership and problem-solving readiness.`;

      return {
        ...res,
        matchScore: score,
        recommendationRationale,
      };
    });

    // Sort descending by matchScore
    ranked.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({ rankedResources: ranked });
  } catch (error: unknown) {
    console.error('Resource ranking error:', error);
    return NextResponse.json(
      { error: 'Failed to rank resources.' },
      { status: 500 }
    );
  }
}
