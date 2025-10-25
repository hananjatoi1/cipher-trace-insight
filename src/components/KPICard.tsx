import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  highlight?: boolean;
}

export function KPICard({ title, value, icon: Icon, trend, highlight }: KPICardProps) {
  return (
    <div className={`glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 ${
      highlight ? 'border-destructive/30 glow-secondary' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          highlight ? 'bg-destructive/10' : 'bg-primary/10'
        }`}>
          <Icon className={`h-6 w-6 ${highlight ? 'text-destructive' : 'text-primary'}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trend.positive ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className={`text-3xl font-bold ${highlight ? 'text-destructive' : 'text-foreground'}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
