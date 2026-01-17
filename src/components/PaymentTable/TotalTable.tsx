import React from 'react';
import * as _ from 'lodash';
import { tableStyle, tableTitleStyle } from './styles';
import { usePaymentContext } from '../../context/PaymentContext';

function TotalTable() {
  const {
    state: { paymentData, consumptionGroups, paymentInfoGroupRowsCount, isSearchEnabled },
  } = usePaymentContext();
  if (!paymentData) return null;

  return (
    <div>
      <h2 css={tableTitleStyle(paymentInfoGroupRowsCount + 1)}>Total</h2>
      <table css={tableStyle}>
        <thead>
          <tr>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
          {isSearchEnabled && (
            <tr>
              <th colSpan={2}></th>
            </tr>
          )}
        </thead>
        <tbody>
          {consumptionGroups.groups.map((group) => {
            const groupTotalQty = group.items.reduce((sum, item) => {
              const itemTotal = paymentData.paymentBreakdowns
                .filter((b) => b.itemId === item.id)
                .reduce((s, b) => s + b.shippedQuantity, 0);
              return sum + itemTotal;
            }, 0);
            const groupTotalAmount = group.items.reduce((sum, item) => {
              const itemTotal = paymentData.paymentBreakdowns
                .filter((b) => b.itemId === item.id)
                .reduce((s, b) => s + b.amount, 0);
              return sum + itemTotal;
            }, 0);

            return (
              <React.Fragment key={group.salesOrderId}>
                {group.items.map((item) => {
                  const itemBreakdowns = paymentData.paymentBreakdowns.filter((b) => b.itemId === item.id);
                  const totalQty = _.sumBy(itemBreakdowns, 'shippedQuantity');
                  const totalAmount = _.sumBy(itemBreakdowns, 'amount');
                  return (
                    <tr key={item.id}>
                      <td>{totalQty}</td>
                      <td className="right amount">{totalAmount.toLocaleString('ko-KR')}</td>
                    </tr>
                  );
                })}
                <tr className="sub-total-row meta-row">
                  <td>{groupTotalQty}</td>
                  <td className="right amount">{groupTotalAmount.toLocaleString('ko-KR')}</td>
                </tr>
              </React.Fragment>
            );
          })}

          <tr className="grand-total-row meta-row">
            <td>{_.sumBy(paymentData.paymentBreakdowns, 'shippedQuantity')}</td>
            <td className="right amount">{_.sumBy(paymentData.paymentBreakdowns, 'amount').toLocaleString('ko-KR')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TotalTable;
