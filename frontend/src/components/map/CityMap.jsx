import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, Circle } from 'react-leaflet';
import './CityMap.css';

// Helper functions
function getColor(level) {
  switch (level) {
    case 'HIGH': return '#dc2626';
    case 'MEDIUM': return '#f59e0b';
    case 'LOW':
    default: return '#16a34a';
  }
}

function getAreaRadius(riskScore) {
  return 200 + (riskScore * 3);
}

function getColorByLevel(level) {
  switch (level) {
    case 'HIGH': return { bg: '#fee2e2', border: '#dc2626', text: '#991b1b' };
    case 'MEDIUM': return { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' };
    case 'LOW':
    default: return { bg: '#dcfce7', border: '#16a34a', text: '#166534' };
  }
}

function getRiskFactors(riskScore) {
  const factors = [];
  if (riskScore > 70) {
    factors.push({ icon: '🚨', text: 'High crime rate reported' });
    factors.push({ icon: '🌙', text: 'Poor lighting infrastructure' });
  }
  if (riskScore > 50) {
    factors.push({ icon: '👥', text: 'Low police patrol frequency' });
    factors.push({ icon: '📍', text: 'Isolated location' });
  }
  if (riskScore > 40) {
    factors.push({ icon: '🏗️', text: 'Under-developed area' });
  }
  if (riskScore <= 40) {
    factors.push({ icon: '✅', text: 'Regular police patrolling' });
    factors.push({ icon: '💡', text: 'Well-lit streets' });
    factors.push({ icon: '🏘️', text: 'Residential area' });
  }
  return factors.slice(0, 3);
}

function getSafetyRecommendations(riskLevel) {
  switch (riskLevel) {
    case 'HIGH': return ['Avoid traveling alone', 'Stay in well-lit areas', 'Keep emergency contacts ready', 'Use trusted transportation'];
    case 'MEDIUM': return ['Stay alert and aware', 'Travel in groups when possible', 'Avoid late night travel', 'Keep phone charged'];
    case 'LOW':
    default: return ['General precautions advised', 'Stay aware of surroundings', 'Trust your instincts'];
  }
}

function generateZonesForCity(cityCenter, cityName, cityId) {
  const zones = [];
  const gridSize =7;
  const spread = 0.025;
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const latOffset = (i - gridSize / 2) * spread + (Math.random() - 0.5) * 0.005;
      const lngOffset = (j - gridSize / 2) * spread + (Math.random() - 0.5) * 0.005;
      const distanceFromCenter = Math.sqrt(latOffset * latOffset + lngOffset * lngOffset);
      const baseRisk = 30 + Math.random() * 40;
      const centerEffect = distanceFromCenter < 0.02 ? 20 : 0;
      const riskScore = Math.min(95, Math.max(15, Math.round(baseRisk + centerEffect)));
      const riskLevel = riskScore > 70 ? 'HIGH' : riskScore > 45 ? 'MEDIUM' : 'LOW';
      
      zones.push({
        id: `${cityId}-${i}-${j}`,
        name: `${cityName} Zone ${i * gridSize + j + 1}`,
        center: { lat: cityCenter.lat + latOffset, lng: cityCenter.lng + lngOffset },
        riskScore,
        riskLevel
      });
    }
  }
  return zones;
}

// All Indian Cities Database
export const ALL_CITIES = [
  // Andhra Pradesh
  { key: 'VISAKHAPATNAM', name: 'Visakhapatnam', state: 'Andhra Pradesh', center: { lat: 17.6869, lng: 83.2185 } },
  { key: 'VIJAYAWADA', name: 'Vijayawada', state: 'Andhra Pradesh', center: { lat: 16.5062, lng: 80.6480 } },
  { key: 'GUNTUR', name: 'Guntur', state: 'Andhra Pradesh', center: { lat: 16.3067, lng: 80.4365 } },
  { key: 'NELLORE', name: 'Nellore', state: 'Andhra Pradesh', center: { lat: 14.4426, lng: 79.9865 } },
  { key: 'TIRUPATI', name: 'Tirupati', state: 'Andhra Pradesh', center: { lat: 13.6288, lng: 79.4192 } },
  { key: 'KAKINADA', name: 'Kakinada', state: 'Andhra Pradesh', center: { lat: 16.9891, lng: 82.2475 } },
  { key: 'RAJAHMUNDRY', name: 'Rajahmundry', state: 'Andhra Pradesh', center: { lat: 17.0005, lng: 81.8040 } },

  // Arunachal Pradesh
  { key: 'ITANAGAR', name: 'Itanagar', state: 'Arunachal Pradesh', center: { lat: 27.0844, lng: 93.6053 } },
  { key: 'NAHARLAGUN', name: 'Naharlagun', state: 'Arunachal Pradesh', center: { lat: 27.1045, lng: 93.6955 } },

  // Assam
  { key: 'GUWAHATI', name: 'Guwahati', state: 'Assam', center: { lat: 26.1445, lng: 91.7362 } },
  { key: 'DIBRUGARH', name: 'Dibrugarh', state: 'Assam', center: { lat: 27.4728, lng: 94.9110 } },
  { key: 'SILCHAR', name: 'Silchar', state: 'Assam', center: { lat: 24.8333, lng: 92.7789 } },
  { key: 'JORHAT', name: 'Jorhat', state: 'Assam', center: { lat: 26.7575, lng: 94.2031 } },

  // Bihar
  { key: 'PATNA', name: 'Patna', state: 'Bihar', center: { lat: 25.5941, lng: 85.1376 } },
  { key: 'GAYA', name: 'Gaya', state: 'Bihar', center: { lat: 24.7955, lng: 85.0002 } },
  { key: 'BHAGALPUR', name: 'Bhagalpur', state: 'Bihar', center: { lat: 25.2425, lng: 86.9842 } },
  { key: 'MUZAFFARPUR', name: 'Muzaffarpur', state: 'Bihar', center: { lat: 26.1225, lng: 85.3906 } },
  { key: 'DARBHANGA', name: 'Darbhanga', state: 'Bihar', center: { lat: 26.1542, lng: 85.8918 } },
  { key: 'PURNIA', name: 'Purnia', state: 'Bihar', center: { lat: 25.7771, lng: 87.4753 } },

  // Chhattisgarh
  { key: 'RAIPUR', name: 'Raipur', state: 'Chhattisgarh', center: { lat: 21.2514, lng: 81.6296 } },
  { key: 'BILASPUR', name: 'Bilaspur', state: 'Chhattisgarh', center: { lat: 22.0796, lng: 82.1400 } },
  { key: 'DURG', name: 'Durg', state: 'Chhattisgarh', center: { lat: 21.1905, lng: 81.2849 } },

  // Delhi (NCT)
  { key: 'DELHI', name: 'Delhi', state: 'Delhi', center: { lat: 28.6139, lng: 77.2090 } },

  // Goa
  { key: 'PANAJI', name: 'Panaji', state: 'Goa', center: { lat: 15.4909, lng: 73.8278 } },
  { key: 'MARGAO', name: 'Margao', state: 'Goa', center: { lat: 15.2832, lng: 73.9862 } },

  // Gujarat
  { key: 'AHMEDABAD', name: 'Ahmedabad', state: 'Gujarat', center: { lat: 23.0225, lng: 72.5714 } },
  { key: 'SURAT', name: 'Surat', state: 'Gujarat', center: { lat: 21.1702, lng: 72.8311 } },
  { key: 'VADODARA', name: 'Vadodara', state: 'Gujarat', center: { lat: 22.3072, lng: 73.1812 } },
  { key: 'RAJKOT', name: 'Rajkot', state: 'Gujarat', center: { lat: 22.3039, lng: 70.8022 } },
  { key: 'GANDHINAGAR', name: 'Gandhinagar', state: 'Gujarat', center: { lat: 23.2156, lng: 72.6369 } },

  // Haryana
  { key: 'GURUGRAM', name: 'Gurugram', state: 'Haryana', center: { lat: 28.4595, lng: 77.0266 } },
  { key: 'FARIDABAD', name: 'Faridabad', state: 'Haryana', center: { lat: 28.4089, lng: 77.3178 } },
  { key: 'PANIPAT', name: 'Panipat', state: 'Haryana', center: { lat: 29.3909, lng: 76.9635 } },
  { key: 'ROHTAK', name: 'Rohtak', state: 'Haryana', center: { lat: 28.8955, lng: 76.6066 } },
  { key: 'HISAR', name: 'Hisar', state: 'Haryana', center: { lat: 29.1492, lng: 75.7217 } },

  // Himachal Pradesh
  { key: 'SHIMLA', name: 'Shimla', state: 'Himachal Pradesh', center: { lat: 31.1048, lng: 77.1734 } },
  { key: 'DHARAMSHALA', name: 'Dharamshala', state: 'Himachal Pradesh', center: { lat: 32.2190, lng: 76.3234 } },

  // Jharkhand
  { key: 'RANCHI', name: 'Ranchi', state: 'Jharkhand', center: { lat: 23.3441, lng: 85.3096 } },
  { key: 'JAMSHEDPUR', name: 'Jamshedpur', state: 'Jharkhand', center: { lat: 22.8046, lng: 86.2029 } },
  { key: 'DHANBAD', name: 'Dhanbad', state: 'Jharkhand', center: { lat: 23.7957, lng: 86.4304 } },
  { key: 'BOKARO', name: 'Bokaro Steel City', state: 'Jharkhand', center: { lat: 23.6693, lng: 86.1511 } },

  // Karnataka
  { key: 'BENGALURU', name: 'Bengaluru', state: 'Karnataka', center: { lat: 12.9716, lng: 77.5946 } },
  { key: 'MYSURU', name: 'Mysuru', state: 'Karnataka', center: { lat: 12.2958, lng: 76.6394 } },
  { key: 'MANGALURU', name: 'Mangaluru', state: 'Karnataka', center: { lat: 12.9141, lng: 74.8560 } },
  { key: 'HUBLI', name: 'Hubli', state: 'Karnataka', center: { lat: 15.3647, lng: 75.1240 } },
  { key: 'BELAGAVI', name: 'Belagavi', state: 'Karnataka', center: { lat: 15.8497, lng: 74.4977 } },

  // Kerala
  { key: 'THIRUVANANTHAPURAM', name: 'Thiruvananthapuram', state: 'Kerala', center: { lat: 8.5241, lng: 76.9366 } },
  { key: 'KOCHI', name: 'Kochi', state: 'Kerala', center: { lat: 9.9312, lng: 76.2673 } },
  { key: 'KOZHIKODE', name: 'Kozhikode', state: 'Kerala', center: { lat: 11.2588, lng: 75.7804 } },
  { key: 'THRISSUR', name: 'Thrissur', state: 'Kerala', center: { lat: 10.5276, lng: 76.2144 } },

  // Madhya Pradesh
  { key: 'BHOPAL', name: 'Bhopal', state: 'Madhya Pradesh', center: { lat: 23.2599, lng: 77.4126 } },
  { key: 'INDORE', name: 'Indore', state: 'Madhya Pradesh', center: { lat: 22.7196, lng: 75.8577 } },
  { key: 'GWALIOR', name: 'Gwalior', state: 'Madhya Pradesh', center: { lat: 26.2183, lng: 78.1828 } },
  { key: 'JABALPUR', name: 'Jabalpur', state: 'Madhya Pradesh', center: { lat: 23.1815, lng: 79.9864 } },
  { key: 'UJJAIN', name: 'Ujjain', state: 'Madhya Pradesh', center: { lat: 23.1765, lng: 75.7885 } },

  // Maharashtra
  { key: 'MUMBAI', name: 'Mumbai', state: 'Maharashtra', center: { lat: 19.0760, lng: 72.8777 } },
  { key: 'PUNE', name: 'Pune', state: 'Maharashtra', center: { lat: 18.5204, lng: 73.8567 } },
  { key: 'NAGPUR', name: 'Nagpur', state: 'Maharashtra', center: { lat: 21.1458, lng: 79.0882 } },
  { key: 'THANE', name: 'Thane', state: 'Maharashtra', center: { lat: 19.2183, lng: 72.9781 } },
  { key: 'NASHIK', name: 'Nashik', state: 'Maharashtra', center: { lat: 19.9975, lng: 73.7898 } },
  { key: 'AURANGABAD', name: 'Aurangabad', state: 'Maharashtra', center: { lat: 19.8762, lng: 75.3433 } },
  { key: 'NAVI_MUMBAI', name: 'Navi Mumbai', state: 'Maharashtra', center: { lat: 19.0330, lng: 73.0297 } },

  // Manipur
  { key: 'IMPHAL', name: 'Imphal', state: 'Manipur', center: { lat: 24.8170, lng: 93.9368 } },

  // Meghalaya
  { key: 'SHILLONG', name: 'Shillong', state: 'Meghalaya', center: { lat: 25.5788, lng: 91.8933 } },

  // Mizoram
  { key: 'AIZAWL', name: 'Aizawl', state: 'Mizoram', center: { lat: 23.7271, lng: 92.7176 } },

  // Nagaland
  { key: 'KOHIMA', name: 'Kohima', state: 'Nagaland', center: { lat: 25.6751, lng: 94.1086 } },
  { key: 'DIMAPUR', name: 'Dimapur', state: 'Nagaland', center: { lat: 25.9063, lng: 93.7276 } },

  // Odisha
  { key: 'BHUBANESWAR', name: 'Bhubaneswar', state: 'Odisha', center: { lat: 20.2961, lng: 85.8245 } },
  { key: 'CUTTACK', name: 'Cuttack', state: 'Odisha', center: { lat: 20.4625, lng: 85.8820 } },
  { key: 'ROURKELA', name: 'Rourkela', state: 'Odisha', center: { lat: 22.2604, lng: 84.8536 } },

  // Punjab (plus Chandigarh as UT)
  { key: 'CHANDIGARH', name: 'Chandigarh', state: 'Chandigarh', center: { lat: 30.7333, lng: 76.7794 } },
  { key: 'LUDHIANA', name: 'Ludhiana', state: 'Punjab', center: { lat: 30.9010, lng: 75.8573 } },
  { key: 'AMRITSAR', name: 'Amritsar', state: 'Punjab', center: { lat: 31.6340, lng: 74.8723 } },
  { key: 'JALANDHAR', name: 'Jalandhar', state: 'Punjab', center: { lat: 31.3260, lng: 75.5762 } },
  { key: 'PATIALA', name: 'Patiala', state: 'Punjab', center: { lat: 30.3398, lng: 76.3869 } },

  // Rajasthan
  { key: 'JAIPUR', name: 'Jaipur', state: 'Rajasthan', center: { lat: 26.9124, lng: 75.7873 } },
  { key: 'JODHPUR', name: 'Jodhpur', state: 'Rajasthan', center: { lat: 26.2389, lng: 73.0243 } },
  { key: 'UDAIPUR', name: 'Udaipur', state: 'Rajasthan', center: { lat: 24.5854, lng: 73.7125 } },
  { key: 'KOTA', name: 'Kota', state: 'Rajasthan', center: { lat: 25.2138, lng: 75.8648 } },
  { key: 'AJMER', name: 'Ajmer', state: 'Rajasthan', center: { lat: 26.4499, lng: 74.6399 } },

  // Sikkim
  { key: 'GANGTOK', name: 'Gangtok', state: 'Sikkim', center: { lat: 27.3389, lng: 88.6065 } },

  // Tamil Nadu
  { key: 'CHENNAI', name: 'Chennai', state: 'Tamil Nadu', center: { lat: 13.0827, lng: 80.2707 } },
  { key: 'COIMBATORE', name: 'Coimbatore', state: 'Tamil Nadu', center: { lat: 11.0168, lng: 76.9558 } },
  { key: 'MADURAI', name: 'Madurai', state: 'Tamil Nadu', center: { lat: 9.9252, lng: 78.1198 } },
  { key: 'SALEM', name: 'Salem', state: 'Tamil Nadu', center: { lat: 11.6643, lng: 78.1460 } },
  { key: 'TIRUCHIRAPPALLI', name: 'Tiruchirappalli', state: 'Tamil Nadu', center: { lat: 10.7905, lng: 78.7047 } },

  // Telangana
  { key: 'HYDERABAD', name: 'Hyderabad', state: 'Telangana', center: { lat: 17.3850, lng: 78.4867 } },
  { key: 'WARANGAL', name: 'Warangal', state: 'Telangana', center: { lat: 17.9689, lng: 79.5941 } },
  { key: 'NIZAMABAD', name: 'Nizamabad', state: 'Telangana', center: { lat: 18.6736, lng: 78.1000 } },

  // Tripura
  { key: 'AGARTALA', name: 'Agartala', state: 'Tripura', center: { lat: 23.8315, lng: 91.2868 } },

  // Uttar Pradesh
  { key: 'LUCKNOW', name: 'Lucknow', state: 'Uttar Pradesh', center: { lat: 26.8467, lng: 80.9462 } },
  { key: 'KANPUR', name: 'Kanpur', state: 'Uttar Pradesh', center: { lat: 26.4499, lng: 80.3319 } },
  { key: 'GHAZIABAD', name: 'Ghaziabad', state: 'Uttar Pradesh', center: { lat: 28.6692, lng: 77.4538 } },
  { key: 'AGRA', name: 'Agra', state: 'Uttar Pradesh', center: { lat: 27.1767, lng: 78.0081 } },
  { key: 'VARANASI', name: 'Varanasi', state: 'Uttar Pradesh', center: { lat: 25.3176, lng: 82.9739 } },
  { key: 'NOIDA', name: 'Noida', state: 'Uttar Pradesh', center: { lat: 28.5355, lng: 77.3910 } },
  { key: 'PRAYAGRAJ', name: 'Prayagraj', state: 'Uttar Pradesh', center: { lat: 25.4358, lng: 81.8463 } },

  // Uttarakhand
  { key: 'DEHRADUN', name: 'Dehradun', state: 'Uttarakhand', center: { lat: 30.3165, lng: 78.0322 } },
  { key: 'HARIDWAR', name: 'Haridwar', state: 'Uttarakhand', center: { lat: 29.9457, lng: 78.1642 } },
  { key: 'RISHIKESH', name: 'Rishikesh', state: 'Uttarakhand', center: { lat: 30.0869, lng: 78.2676 } },

  // West Bengal
  { key: 'KOLKATA', name: 'Kolkata', state: 'West Bengal', center: { lat: 22.5726, lng: 88.3639 } },
  { key: 'HOWRAH', name: 'Howrah', state: 'West Bengal', center: { lat: 22.5958, lng: 88.2636 } },
  { key: 'DURGAPUR', name: 'Durgapur', state: 'West Bengal', center: { lat: 23.5204, lng: 87.3119 } },
  { key: 'ASANSOL', name: 'Asansol', state: 'West Bengal', center: { lat: 23.6739, lng: 86.9524 } },
  { key: 'SILIGURI', name: 'Siliguri', state: 'West Bengal', center: { lat: 26.7271, lng: 88.3953 } },

  // Jammu & Kashmir (UT)
  { key: 'SRINAGAR', name: 'Srinagar', state: 'Jammu & Kashmir', center: { lat: 34.0837, lng: 74.7973 } },
  { key: 'JAMMU', name: 'Jammu', state: 'Jammu & Kashmir', center: { lat: 32.7266, lng: 74.8570 } },

  // Ladakh (UT)
  { key: 'LEH', name: 'Leh', state: 'Ladakh', center: { lat: 34.1526, lng: 77.5770 } },

  // Puducherry (UT)
  { key: 'PUDUCHERRY', name: 'Puducherry', state: 'Puducherry', center: { lat: 11.9139, lng: 79.8145 } },

  // Andaman & Nicobar (UT)
  { key: 'PORT_BLAIR', name: 'Port Blair', state: 'Andaman & Nicobar Islands', center: { lat: 11.6234, lng: 92.7265 } },

  // Lakshadweep (UT)
  { key: 'KAVARATTI', name: 'Kavaratti', state: 'Lakshadweep', center: { lat: 10.5667, lng: 72.6417 } },

  // Dadra & Nagar Haveli and Daman & Diu (UT)
  { key: 'DAMAN', name: 'Daman', state: 'Dadra & Nagar Haveli and Daman & Diu', center: { lat: 20.3974, lng: 72.8328 } }
];


const CITY_CONFIG = {};
ALL_CITIES.forEach(city => {
  CITY_CONFIG[city.key] = {
    ...city,
    zones: generateZonesForCity(city.center, city.name, city.key.toLowerCase())
  };
});

// Group cities by state
const STATES = [...new Set(ALL_CITIES.map(c => c.state))].sort();

function ZonePopup({ zone, onClose }) {
  if (!zone) return null;
  const colors = getColorByLevel(zone.riskLevel);
  const riskFactors = getRiskFactors(zone.riskScore);
  const recommendations = getSafetyRecommendations(zone.riskLevel);

  return (
    <div style={{ position: 'absolute', right: '12px', top: '60px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 16px rgba(15,23,42,0.2)', minWidth: '320px', maxWidth: '380px', zIndex: 1001, fontSize: '0.85rem', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
      <div style={{ background: `linear-gradient(135deg, ${colors.border} 0%, ${colors.bg} 100%)`, padding: '14px 16px', borderBottom: `2px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: colors.text, fontWeight: 500, opacity: 0.9, marginBottom: '2px' }}>Zone Information</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: colors.text }}>{zone.id.toUpperCase()}</div>
        </div>
        <button onClick={onClose} style={{ border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer', fontSize: '1.2rem', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.text, fontWeight: 'bold' }}>✕</button>
      </div>
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', padding: '12px', background: colors.bg, borderRadius: '8px', border: `1px solid ${colors.border}` }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '2px' }}>Risk Score</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: colors.border, lineHeight: 1 }}>{zone.riskScore}<span style={{ fontSize: '0.9rem', fontWeight: 500 }}>/100</span></div>
          </div>
          <div style={{ padding: '6px 16px', borderRadius: '20px', background: colors.border, color: 'white', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{zone.riskLevel}</div>
        </div>
        <div style={{ marginBottom: '16px', padding: '10px', background: '#f9fafb', borderRadius: '6px' }}>
          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px', fontWeight: 500 }}>📍 Coordinates</div>
          <div style={{ fontSize: '0.8rem', color: '#374151', fontFamily: 'monospace' }}>{zone.center.lat.toFixed(4)}°N, {zone.center.lng.toFixed(4)}°E</div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>⚠️ Risk Factors</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {riskFactors.map((factor, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', background: '#f9fafb', borderRadius: '6px', fontSize: '0.8rem' }}>
                <span style={{ fontSize: '1rem' }}>{factor.icon}</span>
                <span style={{ color: '#4b5563' }}>{factor.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>🛡️ Safety Tips</div>
          <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {recommendations.map((tip, idx) => (
              <li key={idx} style={{ color: '#4b5563', fontSize: '0.78rem', lineHeight: '1.4' }}>{tip}</li>
            ))}
          </ul>
        </div>
        <div style={{ marginTop: '14px', padding: '10px', background: '#eff6ff', borderLeft: '3px solid #3b82f6', borderRadius: '4px', fontSize: '0.75rem', color: '#1e40af', lineHeight: '1.4' }}>
          <strong>ℹ️ Note:</strong> Risk calculated using AI analysis of crime data, lighting infrastructure, patrol frequency, and historical incidents.
        </div>
      </div>
    </div>
  );
}

function RiskHeatmapLayer({ zones = [], onZoneClick }) {
  return (
    <>
      {zones.map((zone) => {
        const color = getColor(zone.riskLevel);
        const radius = getAreaRadius(zone.riskScore);
        return (
          <React.Fragment key={zone.id}>
            <Circle center={[zone.center.lat, zone.center.lng]} radius={radius * 1.2} pathOptions={{ color: 'transparent', fillColor: color, fillOpacity: 0.08, weight: 0 }} />
            <Circle center={[zone.center.lat, zone.center.lng]} radius={radius * 0.8} pathOptions={{ color: 'transparent', fillColor: color, fillOpacity: 0.15, weight: 0 }} />
            <Circle center={[zone.center.lat, zone.center.lng]} radius={radius * 0.4} pathOptions={{ color: 'transparent', fillColor: color, fillOpacity: 0.3, weight: 0 }} />
            <CircleMarker center={[zone.center.lat, zone.center.lng]} radius={6} pathOptions={{ color: '#fff', fillColor: color, fillOpacity: 0.9, weight: 2 }} eventHandlers={{ click: () => onZoneClick && onZoneClick(zone) }}>
              <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
                <div style={{ fontSize: '0.7rem', minWidth: '100px' }}>
                  <div style={{ fontWeight: 600, marginBottom: '2px', color }}>{zone.id.toUpperCase()}</div>
                  <div>Risk: <strong>{zone.riskScore}</strong></div>
                  <div style={{ display: 'inline-block', padding: '2px 6px', borderRadius: '10px', background: color, color: 'white', fontSize: '0.65rem', fontWeight: 600, marginTop: '2px' }}>{zone.riskLevel}</div>
                </div>
              </Tooltip>
            </CircleMarker>
          </React.Fragment>
        );
      })}
    </>
  );
}

function CityMap() {
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedCityKey, setSelectedCityKey] = useState('PATNA');
  const [selectedState, setSelectedState] = useState('Bihar');

  const currentCity = CITY_CONFIG[selectedCityKey];
  const zones = currentCity.zones;
  const citiesInState = ALL_CITIES.filter(c => c.state === selectedState);

  const stats = useMemo(() => {
    const high = zones.filter((z) => z.riskLevel === 'HIGH').length;
    const medium = zones.filter((z) => z.riskLevel === 'MEDIUM').length;
    const low = zones.filter((z) => z.riskLevel === 'LOW').length;
    return { high, medium, low, total: zones.length };
  }, [zones]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '800px' }}>
      <div style={{ position: 'absolute', zIndex: 1000, top: 10, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ pointerEvents: 'auto', background: 'rgba(15,23,42,0.9)', color: 'white', padding: '8px 12px', borderRadius: 10, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
          <span style={{ fontWeight: 600 }}>🗺️ Women Safety Risk Map</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 999, background: 'rgba(34,197,94,0.3)', fontSize: '0.7rem' }}>
            <span style={{ fontSize: '0.6rem' }}>●</span> Live
          </span>
        </div>

        <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value); const firstCity = ALL_CITIES.find(c => c.state === e.target.value); if (firstCity) { setSelectedCityKey(firstCity.key); setSelectedZone(null); }}} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '0.8rem', background: 'white', cursor: 'pointer', fontWeight: 500 }}>
            {STATES.map(state => (
              <option key={state} value={state}>📍 {state}</option>
            ))}
          </select>
          
          <select value={selectedCityKey} onChange={(e) => { setSelectedCityKey(e.target.value); setSelectedZone(null); }} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '0.8rem', background: 'white', cursor: 'pointer', fontWeight: 500 }}>
            {citiesInState.map(city => (
              <option key={city.key} value={city.key}>🏙️ {city.name}</option>
            ))}
          </select>

          <div style={{ background: 'rgba(255,255,255,0.95)', padding: '6px 12px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontWeight: 500 }}>
            <span>Zones: {stats.total}</span>
            <span>🔴 {stats.high}</span>
            <span>🟡 {stats.medium}</span>
            <span>🟢 {stats.low}</span>
          </div>
        </div>
      </div>

      <MapContainer key={selectedCityKey} center={[currentCity.center.lat, currentCity.center.lng]} zoom={12} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RiskHeatmapLayer zones={zones} onZoneClick={setSelectedZone} />
      </MapContainer>

      <div style={{ position: 'absolute', left: 10, bottom: 10, zIndex: 1000, background: 'rgba(255,255,255,0.95)', borderRadius: 8, padding: '8px 10px', fontSize: '0.7rem', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
        <div style={{ fontWeight: 600, marginBottom: 6, fontSize: '0.75rem' }}>Risk Legend</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span><span style={{ fontSize: '0.9rem' }}>🔴</span> High Risk (70-100)</span>
          <span><span style={{ fontSize: '0.9rem' }}>🟡</span> Medium Risk (45-70)</span>
          <span><span style={{ fontSize: '0.9rem' }}>🟢</span> Low Risk (0-45)</span>
        </div>
      </div>

      {selectedZone && <ZonePopup zone={selectedZone} onClose={() => setSelectedZone(null)} />}

      <style>{`
        .leaflet-container {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        .leaflet-tooltip.my-tooltip {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #d1d5db;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          padding: 6px 8px;
        }
      `}</style>
    </div>
  );
}
export default CityMap;