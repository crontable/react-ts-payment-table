import React from 'react';
import * as _ from 'lodash';
import { PAYABLE_TABLE_FIRST_COLUMN_WIDTH, tableStyle } from './styles';
import type { ConsumptionGroups, PaymentBreakdown } from '../../types';

interface PaymentBreakdownTableProps {
  allBreakdowns: PaymentBreakdown[];
  consumptionGroups: ConsumptionGroups;
  getBreakdown: (paymentId: number, consumptionId: number) => PaymentBreakdown | undefined;
  isSearchEnabled: boolean;
  paymentId: number;
}

function PaymentBreakdownTable({
  allBreakdowns,
  consumptionGroups,
  getBreakdown,
  isSearchEnabled,
  paymentId,
}: PaymentBreakdownTableProps) {
  const grandTotalShippedQty = _.sumBy(allBreakdowns, 'shippedQuantity');
  const grandTotalAmount = _.sumBy(allBreakdowns, 'amount');

  return (
    <table css={tableStyle}>
      <thead>
        <tr>
          <th style={{ width: `${PAYABLE_TABLE_FIRST_COLUMN_WIDTH}px` }}>Shipped Qty</th>
          <th>U/price</th>
          <th>Amount</th>
        </tr>
        {isSearchEnabled && (
          <tr>
            <th colSpan={3}></th>
          </tr>
        )}
      </thead>
      <tbody>
        {consumptionGroups.groups.map((group) => {
          const groupBreakdowns = group.items.map((item) => getBreakdown(paymentId, item.id));
          const subTotalShippedQty = _.sumBy(groupBreakdowns, (b) => b?.shippedQuantity ?? 0);
          const subTotalAmount = _.sumBy(groupBreakdowns, (b) => b?.amount ?? 0);

          return (
            <React.Fragment key={group.salesOrderId}>
              {group.items.map((item) => {
                const breakdown = getBreakdown(paymentId, item.id);
                return (
                  <tr key={item.id}>
                    <td className="right">{breakdown?.shippedQuantity ?? '-'}</td>
                    <td className="right">{breakdown?.unitPrice ?? '-'}</td>
                    <td className="right">{breakdown?.amount ?? '-'}</td>
                  </tr>
                );
              })}
              <tr className="sub-total-row meta-row">
                <td className="right">{subTotalShippedQty}</td>
                <td className="right">-</td>
                <td className="right amount">{subTotalAmount.toLocaleString('ko-KR')}</td>
              </tr>
            </React.Fragment>
          );
        })}

        <tr className="grand-total-row meta-row">
          <td className="right">{grandTotalShippedQty}</td>
          <td className="right">-</td>
          <td className="right amount">{grandTotalAmount.toLocaleString('ko-KR')}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default PaymentBreakdownTable;
