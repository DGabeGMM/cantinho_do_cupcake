import React, { useState } from 'react';
import { Cupcake, Order } from '../types';
import CupcakeCard from './CupcakeCard';
import AddCupcakeModal from './AddCupcakeModal';
import SellerOrdersView from './SellerOrdersView';

interface SellerDashboardProps {
  cupcakes: Cupcake[];
  orders: Order[];
  onAddCupcake: (cupcake: Omit<Cupcake, 'id'>) => void;
  onUpdateCupcake: (cupcake: Cupcake) => void;
  onDeleteCupcake: (id: number) => void;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ cupcakes, orders, onAddCupcake, onUpdateCupcake, onDeleteCupcake }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'cupcakes' | 'orders'>('cupcakes');
  const [cupcakeToEdit, setCupcakeToEdit] = useState<Cupcake | null>(null);

  const handleOpenAddModal = () => {
    setCupcakeToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cupcake: Cupcake) => {
    setCupcakeToEdit(cupcake);
    setIsModalOpen(true);
  };

  const TabButton = ({ tab, children }: { tab: 'cupcakes' | 'orders', children: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`py-2 px-6 font-display text-xl rounded-t-lg transition-colors focus:outline-none ${
        activeTab === tab 
          ? 'bg-white text-brand-secondary shadow-inner-top' 
          : 'bg-brand-pink text-brand-text hover:bg-white/70'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div>
      <div className="flex border-b border-gray-200 mb-6">
        <TabButton tab="cupcakes">Gerenciar Cupcakes</TabButton>
        <TabButton tab="orders">
          Ver Pedidos <span className="bg-brand-secondary text-white text-sm font-bold rounded-full h-6 w-6 inline-flex items-center justify-center ml-2">{orders.length}</span>
        </TabButton>
      </div>
      
      {activeTab === 'cupcakes' && (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-display text-brand-secondary">Seus Cupcakes</h2>
            <button
              onClick={handleOpenAddModal}
              className="bg-brand-primary text-white font-bold py-3 px-6 rounded-full hover:bg-brand-secondary transition-colors duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Adicionar Novo Cupcake</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cupcakes.map(cupcake => (
              <CupcakeCard 
                key={cupcake.id} 
                cupcake={cupcake} 
                role="seller"
                onDelete={onDeleteCupcake}
                onEdit={handleOpenEditModal} 
                />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
           <h2 className="text-4xl font-display text-brand-secondary mb-8">Pedidos dos Clientes</h2>
           {/* FIX: Removed the 'cupcakes' prop as it is not defined in SellerOrdersViewProps. */}
           <SellerOrdersView orders={orders} />
        </div>
      )}

      {isModalOpen && (
        <AddCupcakeModal
          onClose={() => setIsModalOpen(false)}
          onAddCupcake={onAddCupcake}
          onUpdateCupcake={onUpdateCupcake}
          cupcakeToEdit={cupcakeToEdit}
        />
      )}
      
      <style>{`
        .shadow-inner-top {
          box-shadow: 0 -3px 4px -2px rgba(0, 0, 0, 0.1);
          border-bottom: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default SellerDashboard;