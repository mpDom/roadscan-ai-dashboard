import { useState, useEffect } from "react";
import { AnomalyReport } from "@/types/report";

// Mock data for development — will be replaced with Supabase query
const MOCK_REPORTS: AnomalyReport[] = [
  {
    id: "1",
    gps_lat: -23.5505,
    gps_lng: -46.6333,
    classification: "Pothole",
    severity: "high",
    repair_instructions: "1. Clean the area of debris and loose material.\n2. Apply tack coat to the edges.\n3. Fill with hot-mix asphalt in 2-inch lifts.\n4. Compact with a vibratory roller.\n5. Allow 24 hours before reopening to traffic.",
    image_url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&q=80",
    vibration_z: 2.45,
    laser_distance: 85.3,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "2",
    gps_lat: -23.5580,
    gps_lng: -46.6250,
    classification: "Longitudinal Crack",
    severity: "medium",
    repair_instructions: "1. Clean the crack with compressed air.\n2. Apply crack sealant using a pour pot.\n3. Smooth with a squeegee.\n4. Allow to cure for 4 hours.",
    image_url: "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=600&q=80",
    vibration_z: 1.12,
    laser_distance: 12.7,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "3",
    gps_lat: -23.5450,
    gps_lng: -46.6400,
    classification: "Surface Fissure",
    severity: "low",
    repair_instructions: "1. Sweep loose material.\n2. Apply fog seal or slurry seal.\n3. Allow 6 hours to cure before traffic.",
    image_url: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&q=80",
    vibration_z: 0.45,
    laser_distance: 3.2,
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "4",
    gps_lat: -23.5620,
    gps_lng: -46.6180,
    classification: "Pothole",
    severity: "high",
    repair_instructions: "1. Saw-cut a rectangle around the pothole.\n2. Remove deteriorated pavement.\n3. Compact the base.\n4. Apply tack coat.\n5. Fill with hot-mix asphalt.\n6. Compact and level with surrounding surface.",
    image_url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&q=80",
    vibration_z: 3.10,
    laser_distance: 112.0,
    created_at: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: "5",
    gps_lat: -23.5530,
    gps_lng: -46.6500,
    classification: "Alligator Cracking",
    severity: "medium",
    repair_instructions: "1. Mill the affected area to a depth of 2 inches.\n2. Inspect and repair the base if compromised.\n3. Apply new hot-mix asphalt overlay.\n4. Compact and cure.",
    image_url: "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=600&q=80",
    vibration_z: 1.88,
    laser_distance: 25.4,
    created_at: new Date(Date.now() - 345600000).toISOString(),
  },
];

export function useReports() {
  const [reports, setReports] = useState<AnomalyReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with Supabase query once Cloud is enabled
    // const { data } = await supabase.from('reports').select('*').order('created_at', { ascending: false });
    const timer = setTimeout(() => {
      setReports(MOCK_REPORTS);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { reports, loading };
}
