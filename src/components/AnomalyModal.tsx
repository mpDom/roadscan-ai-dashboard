import { AnomalyReport } from "@/types/report";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Crosshair, Wrench } from "lucide-react";

interface AnomalyModalProps {
  report: AnomalyReport | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const severityConfig = {
  low: { label: "LOW", className: "bg-severity-low/15 text-severity-low border-severity-low/30" },
  medium: { label: "MEDIUM", className: "bg-severity-medium/15 text-severity-medium border-severity-medium/30" },
  high: { label: "HIGH", className: "bg-severity-high/15 text-severity-high border-severity-high/30" },
};

const AnomalyModal = ({ report, open, onOpenChange }: AnomalyModalProps) => {
  if (!report) return null;

  const sev = severityConfig[report.severity];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="font-mono text-lg tracking-wide">
              {report.classification.toUpperCase()}
            </DialogTitle>
            <Badge variant="outline" className={sev.className}>
              {sev.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Image */}
          <div className="rounded-lg overflow-hidden border border-border">
            <img
              src={report.image_url}
              alt={report.classification}
              className="w-full h-56 object-cover"
            />
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary rounded-lg p-3 space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-xs font-mono uppercase">GPS Coordinates</span>
              </div>
              <p className="font-mono text-sm">
                {report.gps_lat.toFixed(6)}, {report.gps_lng.toFixed(6)}
              </p>
            </div>

            <div className="bg-secondary rounded-lg p-3 space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-xs font-mono uppercase">Detected</span>
              </div>
              <p className="font-mono text-sm">
                {new Date(report.created_at).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>

            {report.vibration_z != null && (
              <div className="bg-secondary rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Crosshair className="h-3.5 w-3.5" />
                  <span className="text-xs font-mono uppercase">Vibration Z</span>
                </div>
                <p className="font-mono text-sm">{report.vibration_z.toFixed(3)} g</p>
              </div>
            )}

            {report.laser_distance != null && (
              <div className="bg-secondary rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Crosshair className="h-3.5 w-3.5" />
                  <span className="text-xs font-mono uppercase">Laser Distance</span>
                </div>
                <p className="font-mono text-sm">{report.laser_distance.toFixed(2)} mm</p>
              </div>
            )}
          </div>

          {/* Repair Instructions */}
          <div className="bg-secondary rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Wrench className="h-4 w-4" />
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                Repair Instructions
              </span>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {report.repair_instructions}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnomalyModal;
