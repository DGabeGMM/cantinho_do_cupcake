import React from 'react';
import { Order, Cupcake } from '../types';

interface SellerOrdersViewProps {
  orders: Order[];
  cupcakes: Cupcake[];
}

const SellerOrdersView: React.FC<SellerOrdersViewProps> = ({ orders, cupcakes }) => {
  const getCupcakeDetails = (id: number): Cupcake | undefined => cupcakes.find(c => c.id === id);

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-24 w-24 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <h2 className="mt-6 text-3xl font-display text-brand-secondary">Nenhum Pedido Ainda</h2>
        <p className="mt-2 text-lg text-brand-text">Quando um cliente fizer um pedido, ele aparecerá aqui.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.sort((a, b) => b.date.getTime() - a.date.getTime()).map(order => (
        <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 transition-shadow hover:shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-4 border-b pb-4 gap-4">
            <div>
              <h3 className="text-xl font-bold text-brand-primary">Pedido #{order.id}</h3>
              <p className="text-sm text-gray-500">{order.date.toLocaleString('pt-BR')}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-semibold">{order.customer.name}</p>
              <p className="text-sm text-gray-600">{order.customer.email}</p>
              <p className="text-sm text-gray-600">{`${order.customer.address}, ${order.customer.city}, ${order.customer.zip}`}</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <h4 className="font-bold text-brand-text">Itens:</h4>
            {order.items.map(item => {
              const details = getCupcakeDetails(item.cupcakeId);
              return (
                <div key={item.cupcakeId} className="flex justify-between items-center text-sm pl-2">
                  <p className="text-brand-text">
                    <span className="font-semibold">{item.quantity}x</span> {details?.name || 'Cupcake Desconhecido'}
                  </p>
                  <p className="text-gray-600">R${(details ? details.price * item.quantity : 0).toFixed(2).replace('.', ',')}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-4 border-t gap-2">
            <span className="text-gray-600 font-semibold">Forma de Pagamento: <span className="font-bold capitalize text-brand-text">{order.paymentMethod === 'card' ? 'Cartão de Crédito' : 'Dinheiro'}</span></span>
            <p className="text-xl font-bold text-brand-secondary">Total: R${order.total.toFixed(2).replace('.', ',')}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerOrdersView;