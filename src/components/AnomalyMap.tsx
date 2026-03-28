import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AnomalyReport } from "@/types/report";

interface AnomalyMapProps {
  reports: AnomalyReport[];
  onMarkerClick: (report: AnomalyReport) => void;
}

const severityColors: Record<string, string> = {
  low: "#22C55E",
  medium: "#F59E0B",
  high: "#EF4444",
};

function FitBounds({ reports }: { reports: AnomalyReport[] }) {
  const map = useMap();
  useEffect(() => {
    if (reports.length > 0) {
      const bounds = reports.map(r => [r.gps_lat, r.gps_lng] as [number, number]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [reports, map]);
  return null;
}

const AnomalyMap = ({ reports, onMarkerClick }: AnomalyMapProps) => {
  const defaultCenter: [number, number] = reports.length > 0
    ? [reports[0].gps_lat, reports[0].gps_lng]
    : [-23.5505, -46.6333]; // São Paulo default

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds reports={reports} />
      {reports.map((report) => (
        <CircleMarker
          key={report.id}
          center={[report.gps_lat, report.gps_lng]}
          radius={report.severity === 'high' ? 10 : report.severity === 'medium' ? 8 : 6}
          pathOptions={{
            color: severityColors[report.severity],
            fillColor: severityColors[report.severity],
            fillOpacity: 0.6,
            weight: 2,
          }}
          eventHandlers={{
            click: () => onMarkerClick(report),
          }}
        >
          <Popup>
            <div className="font-mono text-xs space-y-1">
              <p className="font-bold">{report.classification}</p>
              <p>Severity: {report.severity.toUpperCase()}</p>
              <p className="text-muted-foreground">Click for details</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default AnomalyMap;
