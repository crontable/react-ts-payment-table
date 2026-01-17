import React from 'react';
import * as _ from 'lodash';
import type { ConsumptionGroups, PaymentData, PaymentBreakdown } from '../../types';

interface PayableTableProps {
  consumptionGroups: ConsumptionGroups;
  paymentData: PaymentData | null;
  getBreakdown: (paymentId: number, consumptionId: number) => PaymentBreakdown | undefined;
}

function PayableTable({ consumptionGroups, paymentData, getBreakdown }: PayableTableProps) {
  if (!paymentData) return null;

  return (
    <div>
      <h2>Payable</h2>
      {paymentData.payments.map((payment) => {
        const allBreakdowns = paymentData.paymentBreakdowns.filter((b) => b.paymentId === payment.id);
        const grandTotalShippedQty = _.sumBy(allBreakdowns, 'shippedQuantity');
        const grandTotalAmount = _.sumBy(allBreakdowns, 'amount');

        return (
          <React.Fragment key={payment.id}>
            <table>
              <tbody>
                <tr>
                  <th colSpan={2}>Payment Due</th>
                  <td>2024.12.19.</td>
                </tr>
                <tr>
                  <th colSpan={2}>Payment Date</th>
                  <td>2024.12.18.</td>
                </tr>
                <tr>
                  <th colSpan={2}>Attatchment</th>
                  <td>wthenafilenameisoolonglikethiswow.pdf</td>
                </tr>
                <tr>
                  <th colSpan={2}>Memo</th>
                  <td>memo content value blah blah</td>
                </tr>
                <tr>
                  <th></th>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Shipped Qty</th>
                  <th>U/price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {consumptionGroups.groups.map((group) => {
                  const groupBreakdowns = group.items.map((item) => getBreakdown(payment.id, item.id));
                  const subTotalShippedQty = _.sumBy(groupBreakdowns, (b) => b?.shippedQuantity ?? 0);
                  const subTotalAmount = _.sumBy(groupBreakdowns, (b) => b?.amount ?? 0);

                  return (
                    <React.Fragment key={group.salesOrderId}>
                      {group.items.map((item) => {
                        const breakdown = getBreakdown(payment.id, item.id);
                        return (
                          <tr key={item.id}>
                            <td>{breakdown?.shippedQuantity ?? '-'}</td>
                            <td>{breakdown?.unitPrice ?? '-'}</td>
                            <td>{breakdown?.amount ?? '-'}</td>
                          </tr>
                        );
                      })}
                      <tr className="sub-total-row">
                        <td>{subTotalShippedQty}</td>
                        <td>-</td>
                        <td className="right amount">{subTotalAmount.toLocaleString('ko-KR')}</td>
                      </tr>
                    </React.Fragment>
                  );
                })}

                <tr className="grand-total-row">
                  <td>{grandTotalShippedQty}</td>
                  <td>-</td>
                  <td className="right amount">{grandTotalAmount.toLocaleString('ko-KR')}</td>
                </tr>
              </tbody>
            </table>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default PayableTable;
