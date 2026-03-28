import { useState } from "react";
import StatsBar from "@/components/StatsBar";
import AnomalyMap from "@/components/AnomalyMap";
import AnomalyModal from "@/components/AnomalyModal";
import { useReports } from "@/hooks/useReports";
import { AnomalyReport } from "@/types/report";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { reports, loading } = useReports();
  const [selectedReport, setSelectedReport] = useState<AnomalyReport | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMarkerClick = (report: AnomalyReport) => {
    setSelectedReport(report);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="font-mono text-sm text-muted-foreground tracking-wider">
            LOADING SCAN DATA...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <StatsBar reports={reports} />
      <div className="flex-1 relative">
        <AnomalyMap reports={reports} onMarkerClick={handleMarkerClick} />
      </div>
      <AnomalyModal
        report={selectedReport}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Index;
