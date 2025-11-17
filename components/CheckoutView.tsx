import React, { useState } from 'react';
import { CartItem, Cupcake, CustomerDetails } from '../types';

interface CheckoutViewProps {
    cart: CartItem[];
    cupcakes: Cupcake[];
    onPlaceOrder: (customerDetails: CustomerDetails, paymentMethod: 'card' | 'cash', total: number) => void;
    onNavigateToCart: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, cupcakes, onPlaceOrder, onNavigateToCart }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });
  
  const getCupcakeDetails = (cupcakeId: number): Cupcake | undefined => {
    return cupcakes.find(c => c.id === cupcakeId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCustomer(prev => ({ ...prev, [id]: value }));
  };

  const cartWithDetails = cart.map(item => ({
    ...item,
    details: getCupcakeDetails(item.cupcakeId)
  })).filter(item => item.details); 

  const total = cartWithDetails.reduce((sum, item) => {
    return sum + (item.details!.price * item.quantity);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity()) {
        onPlaceOrder(customer, paymentMethod, total);
    } else {
        form.reportValidity();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
             <h2 className="text-4xl font-display text-brand-secondary">Finalizar Compra</h2>
             <button
                onClick={onNavigateToCart}
                className="text-brand-primary hover:text-brand-secondary font-bold transition-colors"
             >
                &larr; Voltar para o Carrinho
            </button>
        </div>
       
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8" noValidate>
            {/* Shipping & Payment Details */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 space-y-6">
                <div>
                    <h3 className="text-2xl font-display text-brand-primary mb-4">Endereço de Entrega</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-brand-text mb-1">Nome Completo</label>
                            <input type="text" id="name" value={customer.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" required/>
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-sm font-bold text-brand-text mb-1">E-mail</label>
                            <input type="email" id="email" value={customer.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" required/>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="address" className="block text-sm font-bold text-brand-text mb-1">Endereço</label>
                            <input type="text" id="address" value={customer.address} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" required/>
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-bold text-brand-text mb-1">Cidade</label>
                            <input type="text" id="city" value={customer.city} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" required/>
                        </div>
                        <div>
                            <label htmlFor="zip" className="block text-sm font-bold text-brand-text mb-1">CEP</label>
                            <input type="text" id="zip" value={customer.zip} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" required/>
                        </div>
                    </div>
                </div>
                 <div>
                    <h3 className="text-2xl font-display text-brand-primary mb-4">Forma de Pagamento</h3>
                    <div className="space-y-3">
                         <label className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:bg-brand-pink has-[:checked]:border-brand-primary transition-colors">
                            <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="h-5 w-5 text-brand-primary focus:ring-brand-secondary"/>
                            <span className="ml-4 font-bold">Cartão de Crédito</span>
                        </label>
                         <label className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:bg-brand-pink has-[:checked]:border-brand-primary transition-colors">
                            <input type="radio" name="paymentMethod" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="h-5 w-5 text-brand-primary focus:ring-brand-secondary"/>
                            <span className="ml-4 font-bold">Dinheiro na Entrega</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">
                     <h3 className="text-2xl font-display text-brand-primary mb-4 border-b pb-3">Resumo do Pedido</h3>
                     <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {cartWithDetails.map(({ cupcakeId, quantity, details}) => (
                            <div key={cupcakeId} className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold">{details!.name}</p>
                                    <p className="text-sm text-gray-500">Qtd: {quantity}</p>
                                </div>
                                <p className="font-semibold">R${(details!.price * quantity).toFixed(2).replace('.', ',')}</p>
                            </div>
                        ))}
                     </div>
                     <div className="mt-4 pt-4 border-t text-xl font-bold flex justify-between">
                         <span>Total</span>
                         <span className="text-brand-secondary">R${total.toFixed(2).replace('.', ',')}</span>
                     </div>
                     <button type="submit" className="mt-6 w-full bg-brand-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-brand-primary transition-colors duration-300 transform hover:scale-105">
                        Finalizar Pedido
                    </button>
                </div>
            </div>
        </form>
    </div>
  );
};

export default CheckoutView;