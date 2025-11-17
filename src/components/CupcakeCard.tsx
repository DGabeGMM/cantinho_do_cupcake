import React from 'react';
import { Cupcake } from '../types';

interface CupcakeCardProps {
  cupcake: Cupcake;
  role: 'buyer' | 'seller';
  onDelete?: (id: number) => void;
  onEdit?: (cupcake: Cupcake) => void;
  onAddToCart?: (cupcake: Cupcake) => void;
  quantityInCart?: number;
}

const CupcakeCard: React.FC<CupcakeCardProps> = ({ cupcake, role, onDelete, onEdit, onAddToCart, quantityInCart = 0 }) => {
  const isOutOfStock = cupcake.stock <= quantityInCart;

  const handleAddToCartClick = () => {
    if (onAddToCart && !isOutOfStock) {
        onAddToCart(cupcake);
    }
  }
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
      <div className="relative">
        <img src={cupcake.imageUrl} alt={cupcake.name} className="w-full h-48 object-cover" />
        {cupcake.stock === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xl font-bold transform -rotate-12 border-2 border-white px-4 py-2 rounded-md">ESGOTADO</span>
              </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-display text-brand-primary">{cupcake.name}</h3>
        <p className="text-brand-text mt-2 text-sm h-12">{cupcake.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-brand-secondary">R${cupcake.price.toFixed(2).replace('.', ',')}</span>
           <span className={`text-sm font-bold ${cupcake.stock > 5 ? 'text-gray-500' : 'text-red-500'}`}>
            {cupcake.stock > 0 ? `${cupcake.stock} restantes` : 'Esgotado'}
          </span>
        </div>
      </div>
      <div className="p-4 bg-gray-50">
        {role === 'buyer' ? (
          <button 
            onClick={handleAddToCartClick}
            disabled={isOutOfStock}
            className="w-full bg-brand-green text-white font-bold py-2 px-4 rounded-full hover:bg-blue-400 transition-colors duration-300 flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <span>{isOutOfStock && quantityInCart > 0 ? 'Máx. no Carrinho' : 'Adicionar ao Carrinho'}</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button onClick={() => onEdit && onEdit(cupcake)} className="w-1/2 bg-brand-blue text-white font-bold py-2 px-4 rounded-full hover:bg-blue-400 transition-colors duration-300">Editar</button>
            <button onClick={() => onDelete && onDelete(cupcake.id)} className="w-1/2 bg-red-400 text-white font-bold py-2 px-4 rounded-full hover:bg-red-500 transition-colors duration-300">Excluir</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CupcakeCard;