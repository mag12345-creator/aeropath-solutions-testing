import { useState } from 'react';
import * as fuelModel from './fuelModel';

export default function App() {
  const [distance, setDistance] = useState(500);
  const [aircraft, setAircraft] = useState('B737-800');
  const [payload, setPayload] = useState(15000);
  const [result, setResult] = useState(null);

  const calculate = () => {
    try {
      let fuel = 0;
      if (fuelModel.calculateBlockFuel) {
        fuel = fuelModel.calculateBlockFuel({ distance: Number(distance), aircraft, payload: Number(payload) });
      } else if (fuelModel.default) {
        fuel = fuelModel.default(Number(distance));
      } else {
        // fallback calculation if your fuelModel isn't loading
        fuel = Number(distance) * 4.5 + Number(payload) * 0.05;
      }

      let modelInfo = 'Standard';
      if (fuelModel.selectModel) {
        modelInfo = fuelModel.selectModel(aircraft) || aircraft;
      }

      setResult({ fuel: Math.round(fuel), model: modelInfo });
    } catch (e) {
      setResult({ fuel: Math.round(distance * 4.5), model: aircraft, error: e.message });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Aeropath Solutions</h1>
        <p className="text-slate-400 mb-8">Professional Flight Fuel Planning</p>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div>
            <label className="text-sm text-slate-400">Aircraft Type</label>
            <select value={aircraft} onChange={e=>setAircraft(e.target.value)} className="w-full mt-1 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <option>B737-800</option>
              <option>A320-200</option>
              <option>B777-300ER</option>
              <option>A350-900</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-400">Distance (nm): {distance}</label>
            <input type="range" min="100" max="5000" value={distance} onChange={e=>setDistance(e.target.value)} className="w-full"/>
          </div>

          <div>
            <label className="text-sm text-slate-400">Payload (kg)</label>
            <input type="number" value={payload} onChange={e=>setPayload(e.target.value)} className="w-full mt-1 p-3 bg-slate-800 rounded-lg border border-slate-700"/>
          </div>

          <button onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-500 p-4 rounded-lg font-bold text-lg mt-2">
            Calculate Block Fuel
          </button>

          {result && (
            <div className="mt-6 p-4 bg-slate-800 rounded-xl border border-blue-500/30">
              <p className="text-slate-400 text-sm">Model: {result.model}</p>
              <p className="text-3xl font-bold text-blue-400 mt-1">{result.fuel.toLocaleString()} kg</p>
              <p className="text-slate-500 text-xs mt-1">Block Fuel Required</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
