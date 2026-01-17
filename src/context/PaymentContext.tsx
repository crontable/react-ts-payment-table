import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MOCK_DATA } from '../Constant';
import * as _ from 'lodash';
import type { PaymentData, PaymentContextValue } from '../types';

const PaymentContext = createContext<PaymentContextValue | null>(null);

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPaymentData = async () => {
      // fetch payment data from API
      setPaymentData(MOCK_DATA);
      setLoading(false);
    };

    fetchPaymentData();
  }, []);

  const consumptionGroups = useMemo(() => {
    const grouped = _.groupBy(paymentData?.consumptions, 'salesOrder.id');
    const groups = Object.entries(grouped).map(([salesOrderId, items]) => ({
      salesOrderId,
      items,
      subTotal: _.sumBy(items, 'orderAmount'),
    }));
    return {
      groups,
      grandTotal: _.sumBy(groups, 'subTotal'),
    };
  }, [paymentData]);

  const getBreakdown = useCallback(
    (paymentId: number, consumptionId: number) => {
      return paymentData?.paymentBreakdowns.find((b) => b.paymentId === paymentId && b.itemId === consumptionId);
    },
    [paymentData],
  );

  return (
    <PaymentContext
      value={{
        state: {
          paymentData,
          loading,
          consumptionGroups,
        },
        action: { getBreakdown },
      }}
    >
      {children}
    </PaymentContext>
  );
}

export function usePaymentContext() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePaymentContext must be used within a PaymentProvider');
  }

  return context;
}
