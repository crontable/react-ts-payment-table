import ConsumptionTable from './ConsumptionTable';
import PayableTable from './PayableTable';
import TotalTable from './TotalTable';
import { usePaymentContext } from '../../context/PaymentContext';
import { paymentLayoutStyle } from './styles';

function PaymentTable() {
  const {
    state: { paymentData, consumptionGroups, paymentInfoGroups, loading },
    action: { getBreakdown },
  } = usePaymentContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  const paymentInfoGroupRowsCount = Object.keys(paymentInfoGroups[0])?.length - 1 || 0;

  return (
    <div css={paymentLayoutStyle}>
      <ConsumptionTable consumptionGroups={consumptionGroups} paymentInfoGroupRowsCount={paymentInfoGroupRowsCount} />
      <PayableTable
        consumptionGroups={consumptionGroups}
        paymentData={paymentData}
        paymentInfoGroups={paymentInfoGroups}
        getBreakdown={getBreakdown}
      />
      <TotalTable
        consumptionGroups={consumptionGroups}
        paymentData={paymentData}
        paymentInfoGroupRowsCount={paymentInfoGroupRowsCount}
      />
    </div>
  );
}

export default PaymentTable;
