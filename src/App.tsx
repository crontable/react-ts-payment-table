import PaymentTable from './components/PaymentTable';
import { PaymentProvider } from './context/PaymentContext';

function App() {
  return (
    <PaymentProvider>
      <PaymentTable />
    </PaymentProvider>
  );
}

export default App;
