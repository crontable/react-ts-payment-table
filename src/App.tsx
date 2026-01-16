import { Button } from './Button';
import { MOCK_DATA } from './Constant';

function App() {
  return (
    <div>
      <div>Hello World!</div>

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
            {MOCK_DATA.consumptions?.length &&
              MOCK_DATA.consumptions.map((consumption) => (
                <tr key={consumption.id}>
                  <td>{consumption.salesOrder.styleNumber}</td>
                  <td>{consumption.supplierItemCode}</td>
                  <td>{consumption.fabricName}</td>
                  <td>{consumption.colorName}</td>
                  <td>{consumption.orderQuantity}</td>
                  <td>{consumption.unit}</td>
                  <td>{consumption.unitPrice}</td>
                  <td className="right amount">{consumption.orderAmount.toLocaleString('ko-KR')}</td>
                </tr>
              ))}

            <tr>
              <td colSpan={7} className="right">
                Sub.TTL
              </td>
              <td className="right amount">00,000.00</td>
            </tr>
            <tr>
              <td colSpan={7} className="right">
                G.TTL
              </td>
              <td className="right amount">00,000.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>{JSON.stringify(MOCK_DATA)}</div>

      <Button />
    </div>
  );
}

export default App;
