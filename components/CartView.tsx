import React from 'react';
import { CartItem, Cupcake } from '../types';

interface CartViewProps {
    cart: CartItem[];
    cupcakes: Cupcake[];
    onUpdateQuantity: (cupcakeId: number, newQuantity: number) => void;
    onRemoveFromCart: (cupcakeId: number) => void;
    onNavigateToDashboard: () => void;
    onNavigateToCheckout: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cart, cupcakes, onUpdateQuantity, onRemoveFromCart, onNavigateToDashboard, onNavigateToCheckout }) => {

  const getCupcakeDetails = (cupcakeId: number): Cupcake | undefined => {
    return cupcakes.find(c => c.id === cupcakeId);
  };

  const cartWithDetails = cart.map(item => ({
    ...item,
    details: getCupcakeDetails(item.cupcakeId)
  })).filter(item => item.details); 

  const total = cartWithDetails.reduce((sum, item) => {
    return sum + (item.details!.price * item.quantity);
  }, 0);


  if (cartWithDetails.length === 0) {
    return (
        <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-24 w-24 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="mt-6 text-3xl font-display text-brand-secondary">Seu Carrinho está Vazio</h2>
            <p className="mt-2 text-lg text-brand-text">Parece que você ainda não adicionou nenhum cupcake!</p>
            <button
                onClick={onNavigateToDashboard}
                className="mt-8 bg-brand-primary text-white font-bold py-3 px-6 rounded-full hover:bg-brand-secondary transition-colors duration-300 transform hover:scale-105"
            >
                Começar a Comprar!
            </button>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
             <h2 className="text-4xl font-display text-brand-secondary">Seu Carrinho de Compras</h2>
             <button
                onClick={onNavigateToDashboard}
                className="text-brand-primary hover:text-brand-secondary font-bold transition-colors"
             >
                &larr; Continuar Comprando
            </button>
        </div>
       
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="space-y-4">
                {cartWithDetails.map(({ cupcakeId, quantity, details }) => {
                    const isStockLimitReached = quantity >= details!.stock;

                    return (
                    <div key={cupcakeId} className="flex flex-col sm:flex-row items-center justify-between p-4 border-b last:border-b-0">
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0 flex-grow">
                            <img src={details!.imageUrl} alt={details!.name} className="w-20 h-20 rounded-lg object-cover" />
                            <div>
                                <h3 className="text-lg font-bold text-brand-primary">{details!.name}</h3>
                                <p className="text-sm text-gray-500">R${details!.price.toFixed(2).replace('.', ',')} cada</p>
                                {isStockLimitReached && <p className="text-xs text-red-500 font-bold mt-1">Não há mais em estoque!</p>}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border rounded-lg">
                                <button onClick={() => onUpdateQuantity(cupcakeId, quantity - 1)} className="px-3 py-1 text-lg font-bold hover:bg-gray-100 rounded-l-lg transition-colors" aria-label="Diminuir quantidade">-</button>
                                <span className="px-4 py-1 font-bold w-12 text-center select-none">{quantity}</span>
                                <button 
                                    onClick={() => onUpdateQuantity(cupcakeId, quantity + 1)} 
                                    disabled={isStockLimitReached}
                                    className="px-3 py-1 text-lg font-bold hover:bg-gray-100 rounded-r-lg transition-colors disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
                                    aria-label="Aumentar quantidade"
                                >
                                    +
                                </button>
                            </div>
                            <p className="font-bold text-lg w-24 text-right">R${(details!.price * quantity).toFixed(2).replace('.', ',')}</p>
                             <button onClick={() => onRemoveFromCart(cupcakeId)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label={`Remover ${details!.name} do carrinho`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )})}
            </div>
            <div className="mt-6 pt-6 border-t flex flex-col items-end">
                <div className="text-2xl font-bold">
                    <span>Total: </span>
                    <span className="text-brand-secondary">R${total.toFixed(2).replace('.', ',')}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Frete e impostos calculados no checkout.</p>
                <button 
                    onClick={onNavigateToCheckout}
                    className="mt-4 bg-brand-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-brand-primary transition-colors duration-300 transform hover:scale-105"
                >
                    Ir para o Checkout
                </button>
            </div>
        </div>
    </div>
  );
};

export default CartView;