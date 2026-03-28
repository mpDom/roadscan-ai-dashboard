import { AnomalyReport } from "@/types/report";
import { AlertTriangle, Activity, MapPin, Shield } from "lucide-react";

interface StatsBarProps {
  reports: AnomalyReport[];
}

const StatsBar = ({ reports }: StatsBarProps) => {
  const total = reports.length;
  const high = reports.filter(r => r.severity === 'high').length;
  const medium = reports.filter(r => r.severity === 'medium').length;
  const low = reports.filter(r => r.severity === 'low').length;

  const stats = [
    { label: "Total Anomalies", value: total, icon: MapPin, color: "text-primary" },
    { label: "High Severity", value: high, icon: AlertTriangle, color: "text-severity-high" },
    { label: "Medium", value: medium, icon: Activity, color: "text-severity-medium" },
    { label: "Low", value: low, icon: Shield, color: "text-severity-low" },
  ];

  return (
    <div className="flex items-center gap-6 px-6 py-3 bg-card border-b border-border">
      <div className="flex items-center gap-2 mr-4">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Activity className="h-4 w-4 text-primary" />
        </div>
        <span className="font-mono font-bold text-sm tracking-wider text-primary">
          ROADSCAN AI
        </span>
      </div>
      <div className="h-6 w-px bg-border" />
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-2">
          <stat.icon className={`h-4 w-4 ${stat.color}`} />
          <span className="font-mono text-xs text-muted-foreground">{stat.label}</span>
          <span className={`font-mono font-bold text-sm ${stat.color}`}>{stat.value}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
