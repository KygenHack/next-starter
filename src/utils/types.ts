// types/roadmap.ts

export interface Milestone {
  title: string;
  description: string;
  completed?: boolean;
}

export interface RoadmapPhase {
  id: number;
  title: string;
  emoji: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  period: string;
  icon: React.ElementType;
  milestones: Milestone[];
}

export interface PhaseCardProps {
  phase: RoadmapPhase;
  isActive: boolean;
  onClick: () => void;
}

export interface StatusBadgeProps {
  status: string;
}