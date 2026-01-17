import { usePaymentContext } from '../../context/PaymentContext';
import ConsumptionTable from './ConsumptionTable';
import PayableTable from './PayableTable';
import TotalTable from './TotalTable';
import { paymentLayoutStyle } from './styles';

function PaymentTable() {
  const {
    state: { loading },
  } = usePaymentContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div css={paymentLayoutStyle}>
      <ConsumptionTable />
      <PayableTable />
      <TotalTable />
    </div>
  );
}

export default PaymentTable;
