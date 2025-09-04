import { cn } from "@/lib/utils";

interface EcoGradeBadgeProps {
  grade: 'A' | 'B' | 'C' | 'D';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const EcoGradeBadge = ({ grade, size = 'md', className }: EcoGradeBadgeProps) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-eco-grade-a';
      case 'B': return 'bg-eco-grade-b';
      case 'C': return 'bg-eco-grade-c';
      case 'D': return 'bg-eco-grade-d';
      default: return 'bg-muted';
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm': return 'w-8 h-8 text-sm';
      case 'md': return 'w-12 h-12 text-lg';
      case 'lg': return 'w-16 h-16 text-2xl';
      default: return 'w-12 h-12 text-lg';
    }
  };

  return (
    <div className={cn(
      "rounded-full flex items-center justify-center font-bold text-white shadow-card transition-eco",
      getGradeColor(grade),
      getSizeClasses(size),
      className
    )}>
      {grade}
    </div>
  );
};

export default EcoGradeBadge;