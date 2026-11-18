export interface CityLocation {
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number; // UTC offset in hours e.g. 5.5
}

export const POPULAR_CITIES: CityLocation[] = [
  { city: 'New Delhi', state: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090, timezone: 5.5 },
  { city: 'Mumbai', state: 'Maharashtra', country: 'India', latitude: 19.0760, longitude: 72.8777, timezone: 5.5 },
  { city: 'Bengaluru', state: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946, timezone: 5.5 },
  { city: 'Pune', state: 'Maharashtra', country: 'India', latitude: 18.5204, longitude: 73.8567, timezone: 5.5 },
  { city: 'Hyderabad', state: 'Telangana', country: 'India', latitude: 17.3850, longitude: 78.4867, timezone: 5.5 },
  { city: 'Chennai', state: 'Tamil Nadu', country: 'India', latitude: 13.0827, longitude: 80.2707, timezone: 5.5 },
  { city: 'Kolkata', state: 'West Bengal', country: 'India', latitude: 22.5726, longitude: 88.3639, timezone: 5.5 },
  { city: 'Ahmedabad', state: 'Gujarat', country: 'India', latitude: 23.0225, longitude: 72.5714, timezone: 5.5 },
  { city: 'Jaipur', state: 'Rajasthan', country: 'India', latitude: 26.9124, longitude: 75.7873, timezone: 5.5 },
  { city: 'Varanasi', state: 'Uttar Pradesh', country: 'India', latitude: 25.3176, longitude: 82.9739, timezone: 5.5 },
  { city: 'Lucknow', state: 'Uttar Pradesh', country: 'India', latitude: 26.8467, longitude: 80.9462, timezone: 5.5 },
  { city: 'Surat', state: 'Gujarat', country: 'India', latitude: 21.1702, longitude: 72.8311, timezone: 5.5 },
  { city: 'Nagpur', state: 'Maharashtra', country: 'India', latitude: 21.1458, longitude: 79.0882, timezone: 5.5 },
  { city: 'Indore', state: 'Madhya Pradesh', country: 'India', latitude: 22.7196, longitude: 75.8577, timezone: 5.5 },
  { city: 'Bhopal', state: 'Madhya Pradesh', country: 'India', latitude: 23.2599, longitude: 77.4126, timezone: 5.5 },
  { city: 'Patna', state: 'Bihar', country: 'India', latitude: 25.5941, longitude: 85.1376, timezone: 5.5 },
  { city: 'Chandigarh', state: 'Punjab & Haryana', country: 'India', latitude: 30.7333, longitude: 76.7794, timezone: 5.5 },
  { city: 'Coimbatore', state: 'Tamil Nadu', country: 'India', latitude: 11.0168, longitude: 76.9558, timezone: 5.5 },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India', latitude: 17.6868, longitude: 83.2185, timezone: 5.5 },
  { city: 'Thiruvananthapuram', state: 'Kerala', country: 'India', latitude: 8.5241, longitude: 76.9366, timezone: 5.5 },
  { city: 'Kochi', state: 'Kerala', country: 'India', latitude: 9.9312, longitude: 76.2673, timezone: 5.5 },
  { city: 'Guwahati', state: 'Assam', country: 'India', latitude: 26.1445, longitude: 91.7362, timezone: 5.5 },
  { city: 'Bhubaneswar', state: 'Odisha', country: 'India', latitude: 20.2961, longitude: 85.8245, timezone: 5.5 },
  { city: 'Ranchi', state: 'Jharkhand', country: 'India', latitude: 23.3441, longitude: 85.3096, timezone: 5.5 },
  { city: 'Dehradun', state: 'Uttarakhand', country: 'India', latitude: 30.3165, longitude: 78.0322, timezone: 5.5 },
  { city: 'Haridwar', state: 'Uttarakhand', country: 'India', latitude: 29.9457, longitude: 78.1642, timezone: 5.5 },
  { city: 'Mathura', state: 'Uttar Pradesh', country: 'India', latitude: 27.4924, longitude: 77.6737, timezone: 5.5 },
  { city: 'Vrindavan', state: 'Uttar Pradesh', country: 'India', latitude: 27.5806, longitude: 77.7006, timezone: 5.5 },
  { city: 'Dwarka', state: 'Gujarat', country: 'India', latitude: 22.2442, longitude: 68.9685, timezone: 5.5 },
  { city: 'Ujjain', state: 'Madhya Pradesh', country: 'India', latitude: 23.1765, longitude: 75.7885, timezone: 5.5 },
  // International Hubs
  { city: 'Dubai', state: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708, timezone: 4.0 },
  { city: 'London', state: 'England', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 0.0 },
  { city: 'New York', state: 'NY', country: 'United States', latitude: 40.7128, longitude: -74.0060, timezone: -5.0 },
  { city: 'San Francisco', state: 'CA', country: 'United States', latitude: 37.7749, longitude: -122.4194, timezone: -8.0 },
  { city: 'Singapore', state: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198, timezone: 8.0 },
  { city: 'Toronto', state: 'Ontario', country: 'Canada', latitude: 43.6532, longitude: -79.3832, timezone: -5.0 },
  { city: 'Sydney', state: 'NSW', country: 'Australia', latitude: -33.8688, longitude: 151.2093, timezone: 10.0 },
];

export function searchCities(query: string): CityLocation[] {
  if (!query || query.trim().length === 0) return POPULAR_CITIES.slice(0, 10);
  const q = query.toLowerCase().trim();
  return POPULAR_CITIES.filter(
    (c) =>
      c.city.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q)
  );
}
