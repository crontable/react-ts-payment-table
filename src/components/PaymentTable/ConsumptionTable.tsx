import React from 'react';
import { tableStyle, tableTitleStyle } from './styles';
import { usePaymentContext } from '../../context/PaymentContext';
import SelectBox from '../base/SelectBox';
import type { FilterOptions } from '../../types';

function ConsumptionTable() {
  const {
    state: { consumptionGroups, filters, availableFilterOptions, paymentInfoGroupRowsCount },
    action: { setFilter },
  } = usePaymentContext();

  const renderFilterSelect = (filterKey: keyof FilterOptions, optionsKey: keyof typeof availableFilterOptions) => {
    const options = availableFilterOptions[optionsKey];
    const value = filters[filterKey] || '';

    return (
      <SelectBox
        options={options.map((option) => ({ label: option, value: option }))}
        value={value}
        onChange={(newValue) => setFilter({ [filterKey]: newValue || undefined })}
        placeholder="전체"
      />
    );
  };

  return (
    <div css={{ minWidth: '980px' }}>
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
          <tr className="narrow-padding">
            <th>{renderFilterSelect('styleNumber', 'styleNumbers')}</th>
            <th></th>
            <th>{renderFilterSelect('fabricName', 'fabricNames')}</th>
            <th>{renderFilterSelect('fabricColor', 'fabricColors')}</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
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
