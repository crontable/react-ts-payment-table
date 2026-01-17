import * as _ from 'lodash';
import type { Consumption, FilterOptions, ConsumptionGroups, AvailableFilterOptions } from '../../types';

export function extractAvailableFilterOptions(consumptions: Consumption[]): AvailableFilterOptions {
  const styleNumbers = new Set<string>();
  const fabricNames = new Set<string>();
  const fabricColors = new Set<string>();

  consumptions.forEach((item) => {
    styleNumbers.add(item.salesOrder.styleNumber);
    fabricNames.add(item.fabricName);
    fabricColors.add(item.colorName);
  });

  return {
    styleNumbers: Array.from(styleNumbers).sort(),
    fabricNames: Array.from(fabricNames).sort(),
    fabricColors: Array.from(fabricColors).sort(),
  };
}

export function filterConsumptions(consumptions: Consumption[], filters: FilterOptions): Consumption[] {
  return consumptions.filter((item) => {
    const matchesStyleNumber = !filters.styleNumber || item.salesOrder.styleNumber === filters.styleNumber;
    const matchesFabricName = !filters.fabricName || item.fabricName === filters.fabricName;
    const matchesFabricColor = !filters.fabricColor || item.colorName === filters.fabricColor;

    return matchesStyleNumber && matchesFabricName && matchesFabricColor;
  });
}
export function groupConsumptions(consumptions: Consumption[]): ConsumptionGroups {
  const groups = Object.entries(_.groupBy(consumptions, 'salesOrder.id')).map(([salesOrderId, items]) => ({
    salesOrderId,
    items,
    subTotal: _.sumBy(items, 'orderAmount'),
  }));

  return {
    groups,
    grandTotal: _.sumBy(groups, 'subTotal'),
  };
}
