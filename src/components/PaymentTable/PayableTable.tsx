import React from 'react';
import { PAYABLE_TABLE_WIDTH, payableTitleStyle } from './styles';
import { usePaymentContext } from '../../context/PaymentContext';
import PaymentInfoTable from './PaymentInfoTable';
import PaymentBreakdownTable from './PaymentBreakdownTable';

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

          return (
            <React.Fragment key={paymentInfo.paymentId}>
              <PaymentInfoTable paymentInfo={paymentInfo} />
              <PaymentBreakdownTable
                consumptionGroups={consumptionGroups}
                allBreakdowns={allBreakdowns}
                getBreakdown={getBreakdown}
                paymentId={paymentInfo.paymentId}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default PayableTable;
