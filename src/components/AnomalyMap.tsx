import { useEffect, useRef } from "react";
import L from "leaflet";
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

const AnomalyMap = ({ reports, onMarkerClick }: AnomalyMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const defaultCenter: [number, number] = reports.length > 0
      ? [reports[0].gps_lat, reports[0].gps_lng]
      : [-23.5505, -46.6333];

    const map = L.map(containerRef.current, {
      center: defaultCenter,
      zoom: 13,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    reports.forEach((report) => {
      const radius = report.severity === "high" ? 10 : report.severity === "medium" ? 8 : 6;
      const color = severityColors[report.severity];

      const marker = L.circleMarker([report.gps_lat, report.gps_lng], {
        radius,
        color,
        fillColor: color,
        fillOpacity: 0.6,
        weight: 2,
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: monospace; font-size: 12px;">
          <p style="font-weight: bold; margin: 0 0 4px;">${report.classification}</p>
          <p style="margin: 0 0 4px;">Severity: ${report.severity.toUpperCase()}</p>
          <p style="margin: 0; opacity: 0.7;">Click for details</p>
        </div>
      `);

      marker.on("click", () => onMarkerClick(report));
    });

    if (reports.length > 0) {
      const bounds = reports.map(r => [r.gps_lat, r.gps_lng] as [number, number]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [reports, onMarkerClick]);

  return <div ref={containerRef} className="h-full w-full" />;
};

export default AnomalyMap;
