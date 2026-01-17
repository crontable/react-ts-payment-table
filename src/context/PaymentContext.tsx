import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MOCK_DATA } from '../Constant';
import type { PaymentData, PaymentContextValue, FilterOptions } from '../types';
import { extractAvailableFilterOptions, filterConsumptions, groupConsumptions } from '../domain/utils/payment';

const PaymentContext = createContext<PaymentContextValue | null>(null);

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<FilterOptions>({});

  useEffect(() => {
    const fetchPaymentData = async () => {
      // fetch payment data from API
      setPaymentData(MOCK_DATA);
      setLoading(false);
    };

    fetchPaymentData();
  }, []);

  const availableFilterOptions = useMemo(
    () =>
      paymentData
        ? extractAvailableFilterOptions(paymentData.consumptions)
        : { styleNumbers: [], fabricNames: [], fabricColors: [] },
    [paymentData],
  );

  const consumptionGroups = useMemo(() => {
    if (!paymentData) {
      return { groups: [], grandTotal: 0 };
    }

    const filteredConsumptions = filterConsumptions(paymentData.consumptions, filters);
    return groupConsumptions(filteredConsumptions);
  }, [paymentData, filters]);

  const paymentInfoGroups = useMemo(() => {
    if (!paymentData) return [];

    return paymentData.payments.map((payment) => ({
      paymentId: payment.id,
      paymentDue: new Date(payment.paymentDueDate).toLocaleDateString('ko-KR'),
      paymentDate: payment.paidAt ? new Date(payment.paidAt).toLocaleDateString('ko-KR') : null,
      attachment: payment.sourcingFiles,
      memo: payment.memo,
    }));
  }, [paymentData]);

  const getBreakdown = useCallback(
    (paymentId: number, consumptionId: number) => {
      return paymentData?.paymentBreakdowns.find((b) => b.paymentId === paymentId && b.itemId === consumptionId);
    },
    [paymentData],
  );

  const setFilter = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  const paymentInfoGroupRowsCount = paymentInfoGroups[0] ? Object.keys(paymentInfoGroups[0]).length - 1 : 0;

  return (
    <PaymentContext
      value={{
        state: {
          paymentData,
          paymentInfoGroupRowsCount,
          loading,

          consumptionGroups,
          paymentInfoGroups,

          filters,
          availableFilterOptions,
        },
        action: { getBreakdown, setFilter, resetFilters },
      }}
    >
      {children}
    </PaymentContext>
  );
}

export function usePaymentContext() {
  const context = useContext(PaymentContext);
  console.log(context?.state.paymentInfoGroups);
  if (!context) {
    throw new Error('usePaymentContext must be used within a PaymentProvider');
  }

  return context;
}
