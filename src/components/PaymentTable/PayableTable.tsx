import React from 'react';
import * as _ from 'lodash';
import { PAYABLE_TABLE_FIRST_COLUMN_WIDTH, PAYABLE_TABLE_WIDTH, payableTitleStyle, tableStyle } from './styles';
import { usePaymentContext } from '../../context/PaymentContext';

function PayableTable() {
  const {
    state: { consumptionGroups, paymentData, paymentInfoGroups },
    action: { getBreakdown },
  } = usePaymentContext();
  if (!paymentData) return null;

  return (
    <div>
      <h2 css={payableTitleStyle}>Payable</h2>
      <div style={{ width: `${PAYABLE_TABLE_WIDTH}px` }}>
        {paymentInfoGroups.map((paymentInfo) => {
          const allBreakdowns = paymentData.paymentBreakdowns.filter((b) => b.paymentId === paymentInfo.paymentId);
          const grandTotalShippedQty = _.sumBy(allBreakdowns, 'shippedQuantity');
          const grandTotalAmount = _.sumBy(allBreakdowns, 'amount');

          return (
            <React.Fragment key={paymentInfo.paymentId}>
              <table css={tableStyle}>
                <tbody>
                  <tr>
                    <th style={{ width: `${PAYABLE_TABLE_FIRST_COLUMN_WIDTH}px` }}>Payment Due</th>
                    <td>{paymentInfo.paymentDue}</td>
                  </tr>
                  <tr>
                    <th>Payment Date</th>
                    <td>{paymentInfo.paymentDate}</td>
                  </tr>
                  <tr>
                    <th>Attatchment</th>
                    <td>{paymentInfo.attachment}</td>
                  </tr>
                  <tr>
                    <th>Memo</th>
                    <td>{paymentInfo.memo}</td>
                  </tr>
                </tbody>
              </table>
              <table css={tableStyle}>
                <thead>
                  <tr>
                    <th style={{ width: `${PAYABLE_TABLE_FIRST_COLUMN_WIDTH}px` }}>Shipped Qty</th>
                    <th>U/price</th>
                    <th>Amount</th>
                  </tr>
                  <tr>
                    <th colSpan={3}></th>
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
                              <td className="right">{breakdown?.shippedQuantity ?? '-'}</td>
                              <td className="right">{breakdown?.unitPrice ?? '-'}</td>
                              <td className="right">{breakdown?.amount ?? '-'}</td>
                            </tr>
                          );
                        })}
                        <tr className="sub-total-row">
                          <td className="right">{subTotalShippedQty}</td>
                          <td className="right">-</td>
                          <td className="right amount">{subTotalAmount.toLocaleString('ko-KR')}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}

                  <tr className="grand-total-row">
                    <td className="right">{grandTotalShippedQty}</td>
                    <td className="right">-</td>
                    <td className="right amount">{grandTotalAmount.toLocaleString('ko-KR')}</td>
                  </tr>
                </tbody>
              </table>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default PayableTable;
