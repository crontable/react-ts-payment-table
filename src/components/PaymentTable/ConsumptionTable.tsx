import React from 'react';
import type { ConsumptionGroups } from '../../types';
import { tableStyle, tableTitleStyle } from './styles';

interface ConsumptionTableProps {
  consumptionGroups: ConsumptionGroups;
  paymentInfoGroupRowsCount: number;
}

function ConsumptionTable({ consumptionGroups, paymentInfoGroupRowsCount }: ConsumptionTableProps) {
  return (
    <div>
      <h2 css={tableTitleStyle(paymentInfoGroupRowsCount + 1)}>Ordered</h2>
      <table css={tableStyle}>
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
          {consumptionGroups.groups.map((group) => (
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
                <td colSpan={7} className="meta-row right">
                  Sub.TTL
                </td>
                <td className="right amount">{group.subTotal.toLocaleString('ko-KR')}</td>
              </tr>
            </React.Fragment>
          ))}
          <tr>
            <td colSpan={7} className="meta-row right">
              G.TTL
            </td>
            <td className="right amount">{consumptionGroups.grandTotal.toLocaleString('ko-KR')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ConsumptionTable;
