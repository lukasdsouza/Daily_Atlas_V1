
// Define countries and their coordinates
export interface Country {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export const countries: Country[] = [
  { id: "us", name: "United States", latitude: 37.0902, longitude: -95.7129 },
  { id: "br", name: "Brazil", latitude: -14.235, longitude: -51.9253 },
  { id: "gb", name: "United Kingdom", latitude: 55.3781, longitude: -3.4360 },
  { id: "fr", name: "France", latitude: 46.2276, longitude: 2.2137 },
  { id: "de", name: "Germany", latitude: 51.1657, longitude: 10.4515 },
  { id: "jp", name: "Japan", latitude: 36.2048, longitude: 138.2529 },
  { id: "au", name: "Australia", latitude: -25.2744, longitude: 133.7751 },
  { id: "za", name: "South Africa", latitude: -30.5595, longitude: 22.9375 },
  { id: "in", name: "India", latitude: 20.5937, longitude: 78.9629 },
  { id: "cn", name: "China", latitude: 35.8617, longitude: 104.1954 },
];
