export const AIRCRAFT = {
  A320: { maxRangeNm: 3300, maxFuelKg: 20400, baseFlowKgH: 2500, ceilingFL: 398, cruiseMach: 0.78 },
  A330: { maxRangeNm: 6300, maxFuelKg: 109000, baseFlowKgH: 5800, ceilingFL: 410, cruiseMach: 0.82 }
};
export function selectModel(distanceNm) {
  if (distanceNm > AIRCRAFT.A320.maxRangeNm) return AIRCRAFT.A330;
  return AIRCRAFT.A320;
}
export function fuelFlowKgH(weightKg, altFL, model) {
  const weightFactor = Math.sqrt(weightKg / 60000);
  const altFactor = 1 - (altFL - 340) * 0.003;
  return model.baseFlowKgH * weightFactor * altFactor;
}
export function calculateBlockFuel(distanceNm, routeFLs, windKts, model) {
  let weightKg = 62000 + model.maxFuelKg * 0.3;
  let totalFuel = 0;
  for (let i = 0; i < routeFLs.length; i++) {
    const legNm = distanceNm / routeFLs.length;
    const tasKts = 470;
    const gsKts = tasKts + (windKts[i] || 0);
    const hours = legNm / gsKts;
    const flow = fuelFlowKgH(weightKg, routeFLs[i], model);
    const burned = flow * hours;
    totalFuel += burned;
    weightKg -= burned;
  }
  return Math.round(totalFuel);
}
