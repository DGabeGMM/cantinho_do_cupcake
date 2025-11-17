import React, { useState, useCallback, useMemo } from 'react';
import { UserRole, Cupcake, CartItem, Order, CustomerDetails } from './types';
import LoginPage from './components/LoginPage';
import BuyerDashboard from './components/BuyerDashboard';
import SellerDashboard from './components/SellerDashboard';
import Header from './components/Header';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import OrderConfirmation from './components/OrderConfirmation';


const initialCupcakes: Cupcake[] = [
  { id: 1, name: 'Baunilha Clássica', description: 'Um clássico atemporal com um rico buttercream de baunilha.', price: 7.50, imageUrl: 'https://picsum.photos/id/102/400/300', stock: 20 },
  { id: 2, name: 'Chocolate Decadente', description: 'Para o amante de chocolate, coberto com calda de chocolate.', price: 8.00, imageUrl: 'https://picsum.photos/id/106/400/300', stock: 15 },
  { id: 3, name: 'Beijo Red Velvet', description: 'Cobertura de cream cheese em um bolo red velvet úmido.', price: 8.50, imageUrl: 'https://picsum.photos/id/201/400/300', stock: 12 },
  { id: 4, name: 'Sonho de Morango', description: 'Bolo de morango fresco com creme de morango.', price: 8.00, imageUrl: 'https://picsum.photos/id/312/400/300', stock: 18 },
  { id: 5, name: 'Zest de Limão', description: 'Azedinho e doce, uma delícia cítrica refrescante.', price: 7.75, imageUrl: 'https://picsum.photos/id/326/400/300', stock: 25 },
  { id: 6, name: 'Caramelo Swirl', description: 'Recheio de caramelo rico com uma cobertura de caramelo salgado.', price: 9.00, imageUrl: 'https://picsum.photos/id/431/400/300', stock: 10 },
];


const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [cupcakes, setCupcakes] = useState<Cupcake[]>(initialCupcakes);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [buyerPage, setBuyerPage] = useState<'dashboard' | 'cart' | 'checkout' | 'confirmation'>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);

  const handleLogin = useCallback((role: 'buyer' | 'seller', credentials?: { user: string; pass: string }) => {
    if (role === 'seller') {
      // Simple credential check for demo purposes
      if (credentials?.user === 'seller' && credentials?.pass === 'password') {
        setUserRole('seller');
      } else {
        alert('Credenciais de vendedor inválidas. Por favor, use usuário: seller, senha: password');
      }
    } else {
      setUserRole('buyer');
      setBuyerPage('dashboard');
      setCart([]);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setUserRole(null);
    setBuyerPage('dashboard');
    setCart([]);
    // Orders are now persisted across sessions for this demo
  }, []);

  const handleAddToCart = useCallback((cupcake: Cupcake) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.cupcakeId === cupcake.id);
      const currentQuantity = existingItem ? existingItem.quantity : 0;

      if (currentQuantity >= cupcake.stock) {
        alert("Desculpe, não há cupcakes suficientes em estoque!");
        return prevCart;
      }

      if (existingItem) {
        return prevCart.map(item =>
          item.cupcakeId === cupcake.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { cupcakeId: cupcake.id, quantity: 1 }];
      }
    });
  }, []);

  const handleUpdateCartQuantity = useCallback((cupcakeId: number, newQuantity: number) => {
    const cupcake = cupcakes.find(c => c.id === cupcakeId);
    if (!cupcake) return;

    if (newQuantity > cupcake.stock) {
        // This is handled visually in CartView, but kept as a safeguard
        return;
    }

    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.cupcakeId !== cupcakeId);
      }
      return prevCart.map(item =>
        item.cupcakeId === cupcakeId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  }, [cupcakes]);

  const handleRemoveFromCart = useCallback((cupcakeId: number) => {
    setCart(prevCart => prevCart.filter(item => item.cupcakeId !== cupcakeId));
  }, []);


  const addCupcake = useCallback((cupcake: Omit<Cupcake, 'id'>) => {
    setCupcakes(prev => [...prev, { ...cupcake, id: Date.now() }]);
  }, []);

  const updateCupcake = useCallback((updatedCupcake: Cupcake) => {
    setCupcakes(prev => prev.map(c => c.id === updatedCupcake.id ? updatedCupcake : c));
  }, []);

  const deleteCupcake = useCallback((id: number) => {
    setCupcakes(prev => prev.filter(c => c.id !== id));
  }, []);

  const handleNavigateToCart = useCallback(() => {
    if (userRole === 'buyer') {
      setBuyerPage('cart');
    }
  }, [userRole]);

  const handleNavigateToDashboard = useCallback(() => {
    setBuyerPage('dashboard');
  }, []);

  const handleNavigateToCheckout = useCallback(() => {
    setBuyerPage('checkout');
  }, []);
  
  const handlePlaceOrder = useCallback((customerDetails: CustomerDetails, paymentMethod: 'card' | 'cash', total: number) => {
    const newOrder: Order = {
        id: Date.now(),
        customer: customerDetails,
        items: cart,
        total,
        date: new Date(),
        paymentMethod,
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);

    // Decrease stock
    setCupcakes(prevCupcakes => {
      const updatedCupcakes = [...prevCupcakes];
      cart.forEach(cartItem => {
        const index = updatedCupcakes.findIndex(c => c.id === cartItem.cupcakeId);
        if (index !== -1) {
          updatedCupcakes[index] = {
            ...updatedCupcakes[index],
            stock: updatedCupcakes[index].stock - cartItem.quantity,
          };
        }
      });
      return updatedCupcakes;
    });

    setCart([]);
    setBuyerPage('confirmation');
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const renderContent = () => {
    if (!userRole) {
        return <LoginPage onLogin={handleLogin} />;
    }

    if (userRole === 'seller') {
        return <SellerDashboard 
                  cupcakes={cupcakes}
                  orders={orders}
                  onAddCupcake={addCupcake}
                  onUpdateCupcake={updateCupcake}
                  onDeleteCupcake={deleteCupcake}
                />;
    }

    // Buyer Views
    switch (buyerPage) {
        case 'dashboard':
            return <BuyerDashboard cupcakes={cupcakes} onAddToCart={handleAddToCart} cart={cart}/>;
        case 'cart':
            return <CartView 
                cart={cart}
                cupcakes={cupcakes}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveFromCart={handleRemoveFromCart}
                onNavigateToDashboard={handleNavigateToDashboard}
                onNavigateToCheckout={handleNavigateToCheckout}
            />;
        case 'checkout':
             return <CheckoutView
                cart={cart}
                cupcakes={cupcakes}
                onPlaceOrder={handlePlaceOrder}
                onNavigateToCart={handleNavigateToCart}
             />;
        case 'confirmation':
            return <OrderConfirmation onNavigateToDashboard={handleNavigateToDashboard} />;
        default:
            return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-yellow font-sans text-brand-text">
      <Header 
        userRole={userRole} 
        onLogout={handleLogout}
        cartItemCount={cartItemCount}
        onNavigateToCart={handleNavigateToCart}
        isCartVisible={userRole === 'buyer' && (buyerPage === 'cart' || buyerPage === 'checkout')}
      />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;