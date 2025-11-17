import {Vehicle} from '../interfaces/common';

export function groupVehiclesByType({vehicles}: {vehicles: Vehicle[]}) {
  const result = {
    premium: [] as Vehicle[],
    quickSell: [] as Vehicle[],
    standard: [] as Vehicle[],
  };

  for (const v of vehicles) {
    if (v.listingType === 'premium') result.premium.push(v);
    else if (v.listingType === 'quickSell') result.quickSell.push(v);
    else if (v.listingType === 'standard') result.standard.push(v);
  }

  return result;
}
