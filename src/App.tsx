import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import ProductList from "./components/products/ProductList";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Layout>
          <ProductList />
        </Layout>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
