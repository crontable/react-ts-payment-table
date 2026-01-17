import React from 'react';
import * as _ from 'lodash';
import { MOCK_DATA } from './Constant';

// Payment Table (Consumption)
const grouped = _.groupBy(MOCK_DATA.consumptions, 'salesOrder.id');
const groups = Object.entries(grouped).map(([salesOrderId, items]) => ({
  salesOrderId,
  items,
  subTotal: _.sumBy(items, 'orderAmount'),
}));
const tableData = {
  groups,
  grandTotal: _.sumBy(groups, 'subTotal'),
};

const getBreakdown = (paymentId: number, consumptionId: number) => {
  return MOCK_DATA.paymentBreakdowns.find((b) => b.paymentId === paymentId && b.itemId === consumptionId);
};

function App() {
  return (
    <div>
      <div className="layout">
        <div>
          <h2>Payment Table</h2>
          <table>
            <thead>
              <tr>
                <th>Style No.</th>
                <th>Supplier Item #</th>
                <th>Fabric Name</th>
                <th>Fabric Color</th>
                <th>Order Qty</th>
                <th>Unit</th>
                <th>U/price</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {tableData.groups.map((group) => (
                <React.Fragment key={group.salesOrderId}>
                  {group.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.salesOrder.styleNumber}</td>
                      <td>{item.supplierItemCode}</td>
                      <td>{item.fabricName}</td>
                      <td>{item.colorName}</td>
                      <td>{item.orderQuantity}</td>
                      <td>{item.unit}</td>
                      <td>{item.unitPrice}</td>
                      <td className="right amount">{item.orderAmount.toLocaleString('ko-KR')}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={7} className="right">
                      Sub.TTL
                    </td>
                    <td className="right amount">{group.subTotal.toLocaleString('ko-KR')}</td>
                  </tr>
                </React.Fragment>
              ))}
              <tr>
                <td colSpan={7} className="right">
                  G.TTL
                </td>
                <td className="right amount">{tableData.grandTotal.toLocaleString('ko-KR')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <div>
          <h2>Payable</h2>
          {MOCK_DATA.payments.map((payment) => {
            const allBreakdowns = MOCK_DATA.paymentBreakdowns.filter((b) => b.paymentId === payment.id);
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
                    {tableData.groups.map((group) => {
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
        <hr />
        <div>
          <h2>Total</h2>
          <table>
            <thead>
              <tr>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableData.groups.map((group) => {
                const groupTotalQty = group.items.reduce((sum, item) => {
                  const itemTotal = MOCK_DATA.paymentBreakdowns
                    .filter((b) => b.itemId === item.id)
                    .reduce((s, b) => s + b.shippedQuantity, 0);
                  return sum + itemTotal;
                }, 0);
                const groupTotalAmount = group.items.reduce((sum, item) => {
                  const itemTotal = MOCK_DATA.paymentBreakdowns
                    .filter((b) => b.itemId === item.id)
                    .reduce((s, b) => s + b.amount, 0);
                  return sum + itemTotal;
                }, 0);

                return (
                  <React.Fragment key={group.salesOrderId}>
                    {group.items.map((item) => {
                      const itemBreakdowns = MOCK_DATA.paymentBreakdowns.filter((b) => b.itemId === item.id);
                      const totalQty = _.sumBy(itemBreakdowns, 'shippedQuantity');
                      const totalAmount = _.sumBy(itemBreakdowns, 'amount');
                      return (
                        <tr key={item.id}>
                          <td>{totalQty}</td>
                          <td className="right amount">{totalAmount.toLocaleString('ko-KR')}</td>
                        </tr>
                      );
                    })}
                    <tr className="sub-total-row">
                      <td>{groupTotalQty}</td>
                      <td className="right amount">{groupTotalAmount.toLocaleString('ko-KR')}</td>
                    </tr>
                  </React.Fragment>
                );
              })}

              <tr className="grand-total-row">
                <td>{_.sumBy(MOCK_DATA.paymentBreakdowns, 'shippedQuantity')}</td>
                <td className="right amount">{_.sumBy(MOCK_DATA.paymentBreakdowns, 'amount').toLocaleString('ko-KR')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
