export interface EvidenceRecord {
  parameter: string;
  value: number;
  unit: string;
  source: string;
  timestamp: string;     // ISO 8601
  evidenceId: string;
  methodology: string;   // e.g. VM0038:v1.1
  location?: { lat: number; lon: number };
}
