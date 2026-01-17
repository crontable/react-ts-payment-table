import ConsumptionTable from './ConsumptionTable';
import PayableTable from './PayableTable';
import TotalTable from './TotalTable';
import { usePaymentContext } from '../../context/PaymentContext';

function PaymentTable() {
  const {
    state: { paymentData, consumptionGroups, loading },
    action: { getBreakdown },
  } = usePaymentContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="layout">
      <ConsumptionTable consumptionGroups={consumptionGroups} />
      <PayableTable consumptionGroups={consumptionGroups} paymentData={paymentData} getBreakdown={getBreakdown} />
      <TotalTable consumptionGroups={consumptionGroups} paymentData={paymentData} />
    </div>
  );
}

export default PaymentTable;
