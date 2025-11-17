import React from 'react';
import { Cupcake, CartItem } from '../types';
import CupcakeCard from './CupcakeCard';

interface BuyerDashboardProps {
  cupcakes: Cupcake[];
  onAddToCart: (cupcake: Cupcake) => void;
  cart: CartItem[];
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ cupcakes, onAddToCart, cart }) => {
  return (
    <div>
      <h2 className="text-4xl font-display text-center mb-8 text-brand-secondary">Nossos Deliciosos Cupcakes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cupcakes.map(cupcake => {
          const itemInCart = cart.find(item => item.cupcakeId === cupcake.id);
          const quantityInCart = itemInCart ? itemInCart.quantity : 0;
          return (
            <CupcakeCard 
                key={cupcake.id} 
                cupcake={cupcake} 
                role="buyer"
                onAddToCart={onAddToCart}
                quantityInCart={quantityInCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BuyerDashboard;