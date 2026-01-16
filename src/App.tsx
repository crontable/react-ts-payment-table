import React from 'react';
import * as _ from 'lodash';
import { MOCK_DATA } from './Constant';

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

function App() {
  return (
    <div>
      <h1>Payment Table</h1>

      <div>
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

        <hr />
      </div>
    </div>
  );
}

export default App;
