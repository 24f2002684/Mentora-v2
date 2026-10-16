export const COMPETENCY_KEYS = [
  'critical_thinking',
  'analytical_thinking',
  'logical_reasoning',
  'problem_solving',
  'innovative_thinking',
  'communication',
  'leadership',
  'digital_ai_literacy',
  'career_readiness',
  'domain_academic_competency',
] as const;

export type CompetencyKey = (typeof COMPETENCY_KEYS)[number];

export interface CompetencyMetadata {
  key: CompetencyKey;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
}

export const COMPETENCIES: Record<CompetencyKey, CompetencyMetadata> = {
  critical_thinking: {
    key: 'critical_thinking',
    label: 'Critical Thinking',
    shortLabel: 'Critical',
    description: 'Questioning assumptions, identifying biases, and evaluating arguments objectively.',
    color: '#0D9488',
  },
  analytical_thinking: {
    key: 'analytical_thinking',
    label: 'Analytical Thinking',
    shortLabel: 'Analytical',
    description: 'Breaking down complex information, analyzing patterns, and data-driven evaluation.',
    color: '#0284C7',
  },
  logical_reasoning: {
    key: 'logical_reasoning',
    label: 'Logical Reasoning',
    shortLabel: 'Logic',
    description: 'Structured deductive and inductive reasoning to draw sound conclusions.',
    color: '#6366F1',
  },
  problem_solving: {
    key: 'problem_solving',
    label: 'Problem Solving',
    shortLabel: 'Problem',
    description: 'Identifying core issues, designing pragmatic interventions, and executing solutions.',
    color: '#10B981',
  },
  innovative_thinking: {
    key: 'innovative_thinking',
    label: 'Innovative Thinking',
    shortLabel: 'Innovation',
    description: 'Creative lateral ideation, synthesizing novel approaches, and challenging orthodoxies.',
    color: '#F59E0B',
  },
  communication: {
    key: 'communication',
    label: 'Communication',
    shortLabel: 'Comm.',
    description: 'Clear, empathetic, persuasive articulation in verbal and written formats.',
    color: '#EC4899',
  },
  leadership: {
    key: 'leadership',
    label: 'Leadership',
    shortLabel: 'Leadership',
    description: 'Inspiring collective action, stewardship, mentorship, and ethical decision-making.',
    color: '#8B5CF6',
  },
  digital_ai_literacy: {
    key: 'digital_ai_literacy',
    label: 'Digital & AI Literacy',
    shortLabel: 'Digital/AI',
    description: 'Ethical and proficient application of computational tools and AI systems.',
    color: '#14B8A6',
  },
  career_readiness: {
    key: 'career_readiness',
    label: 'Career Readiness',
    shortLabel: 'Career',
    description: 'Professionalism, workplace agility, interview presence, and lifelong learning.',
    color: '#F97316',
  },
  domain_academic_competency: {
    key: 'domain_academic_competency',
    label: 'Domain & Academic Competency',
    shortLabel: 'Academic',
    description: 'Rigorous mastery of degree discipline fundamentals and coursework.',
    color: '#059669',
  },
};
