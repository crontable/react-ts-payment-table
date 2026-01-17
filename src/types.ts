export interface SalesOrder {
  id: number;
  styleNumber: string;
  styleCode: string;
  createUser: {
    id: number;
    name: string;
    engName: string;
    profileImage: string;
  };
}

export interface GarmentSize {
  id: number;
  name: string;
  orderNum: number;
}

export interface Consumption {
  id: number;
  unitPrice: number;
  orderQuantity: number;
  orderAmount: number;
  fabricName: string;
  fabricClass: string;
  fabricDetail: string;
  supplierItemCode: string;
  brandItemCode: string | null;
  colorName: string;
  sopoNo: string;
  unit: string;
  garmentColorName: string;
  garmentSize: GarmentSize;
  salesOrder: SalesOrder;
}

export interface Payment {
  id: number;
  paymentStatus: string;
  paymentDueDate: string;
  requestedAt: string | null;
  pendingAt: string | null;
  paidAt: string | null;
  memo: string | null;
  sourcingFiles: string[];
  financeFiles: string[];
}

export interface PaymentBreakdown {
  id: string;
  type: string;
  shippedQuantity: number;
  unitPrice: number;
  amount: number;
  itemId: number; // consumption.id
  paymentId: number; // payment.id
}

export interface PaymentData {
  payments: Payment[];
  consumptions: Consumption[];
  paymentBreakdowns: PaymentBreakdown[];
}

export interface ConsumptionGroup {
  salesOrderId: string;
  items: Consumption[];
  subTotal: number;
}

export interface ConsumptionGroups {
  groups: ConsumptionGroup[];
  grandTotal: number;
}

export interface PaymentInfoGroup {
  paymentId: number;
  paymentDue: string;
  paymentDate: string | null;
  attachment: string[];
  memo: string | null;
}

export interface FilterOptions {
  styleNumber?: string;
  fabricName?: string;
  fabricColor?: string;
}

export interface AvailableFilterOptions {
  styleNumbers: string[];
  fabricNames: string[];
  fabricColors: string[];
}

export interface PaymentContextValue {
  state: {
    consumptionGroups: ConsumptionGroups;

    paymentData: PaymentData | null;
    paymentInfoGroups: PaymentInfoGroup[];
    paymentInfoGroupRowsCount: number;

    loading: boolean;

    filters: FilterOptions;
    availableFilterOptions: AvailableFilterOptions;
  };
  action: {
    getBreakdown: (paymentId: number, consumptionId: number) => PaymentBreakdown | undefined;
    setFilter: (filters: Partial<FilterOptions>) => void;
    resetFilters: () => void;
  };
}
