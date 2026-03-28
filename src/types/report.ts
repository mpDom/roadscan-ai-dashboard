export interface AnomalyReport {
  id: string;
  gps_lat: number;
  gps_lng: number;
  classification: string;
  severity: 'low' | 'medium' | 'high';
  repair_instructions: string;
  image_url: string;
  vibration_z: number | null;
  laser_distance: number | null;
  created_at: string;
}
