import React from 'react';
import * as _ from 'lodash';
import type { ConsumptionGroups, PaymentData, PaymentBreakdown, PaymentInfoGroup } from '../../types';
import { tableStyle } from './styles';

interface PayableTableProps {
  consumptionGroups: ConsumptionGroups;
  paymentData: PaymentData | null;
  paymentInfoGroups: PaymentInfoGroup[];
  getBreakdown: (paymentId: number, consumptionId: number) => PaymentBreakdown | undefined;
}

function PayableTable({ consumptionGroups, paymentData, paymentInfoGroups, getBreakdown }: PayableTableProps) {
  if (!paymentData) return null;

  return (
    <div>
      {paymentInfoGroups.map((paymentInfo) => {
        const allBreakdowns = paymentData.paymentBreakdowns.filter((b) => b.paymentId === paymentInfo.paymentId);
        const grandTotalShippedQty = _.sumBy(allBreakdowns, 'shippedQuantity');
        const grandTotalAmount = _.sumBy(allBreakdowns, 'amount');

        return (
          <React.Fragment key={paymentInfo.paymentId}>
            <table css={tableStyle}>
              <tbody>
                <tr>
                  <th colSpan={2}>Payment Due</th>
                  <td>{paymentInfo.paymentDue}</td>
                </tr>
                <tr>
                  <th colSpan={2}>Payment Date</th>
                  <td>{paymentInfo.paymentDate}</td>
                </tr>
                <tr>
                  <th colSpan={2}>Attatchment</th>
                  <td>{paymentInfo.attachment}</td>
                </tr>
                <tr>
                  <th colSpan={2}>Memo</th>
                  <td>{paymentInfo.memo}</td>
                </tr>
              </tbody>
            </table>
            <table css={tableStyle}>
              <thead>
                <tr>
                  <th>Shipped Qty</th>
                  <th>U/price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {consumptionGroups.groups.map((group) => {
                  const groupBreakdowns = group.items.map((item) => getBreakdown(paymentInfo.paymentId, item.id));
                  const subTotalShippedQty = _.sumBy(groupBreakdowns, (b) => b?.shippedQuantity ?? 0);
                  const subTotalAmount = _.sumBy(groupBreakdowns, (b) => b?.amount ?? 0);

                  return (
                    <React.Fragment key={group.salesOrderId}>
                      {group.items.map((item) => {
                        const breakdown = getBreakdown(paymentInfo.paymentId, item.id);
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
