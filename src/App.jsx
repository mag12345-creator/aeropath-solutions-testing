import { calculateBlockFuel, selectModel } from './fuelModel';

export default function App() {
  // quick test of your fuel model so build doesn't fail
  const test = calculateBlockFuel ? 'Fuel model loaded' : 'loading';

  return (
    <div style={{padding:'40px', fontFamily:'sans-serif'}}>
      <h1>Aeropath Solutions</h1>
      <p>{test}</p>
      <p>Site is deploying correctly.</p>
    </div>
  )
