import React, { useState } from 'react';
import { Cupcake } from '../types';

interface AddCupcakeModalProps {
  onClose: () => void;
  onAddCupcake: (cupcake: Omit<Cupcake, 'id'>) => void;
  onUpdateCupcake: (cupcake: Cupcake) => void;
  cupcakeToEdit?: Cupcake | null;
}

const AddCupcakeModal: React.FC<AddCupcakeModalProps> = ({ onClose, onAddCupcake, onUpdateCupcake, cupcakeToEdit }) => {
  const isEditMode = !!cupcakeToEdit;

  const [name, setName] = useState(cupcakeToEdit?.name || '');
  const [description, setDescription] = useState(cupcakeToEdit?.description || '');
  const [price, setPrice] = useState(cupcakeToEdit?.price || 0);
  const [stock, setStock] = useState(cupcakeToEdit?.stock || 0);
  const [imageUrl, setImageUrl] = useState(cupcakeToEdit?.imageUrl || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || price <= 0 || stock < 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const finalImageUrl = imageUrl || `https://picsum.photos/seed/${name.trim().replace(/\s+/g, '-')}/400/300`;

    if (isEditMode) {
        onUpdateCupcake({
            id: cupcakeToEdit.id,
            name,
            description,
            price,
            stock,
            imageUrl: finalImageUrl,
        });
    } else {
        onAddCupcake({
          name,
          description,
          price,
          stock,
          imageUrl: finalImageUrl,
        });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative transform transition-all duration-300 scale-95 animate-modal-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-display text-brand-secondary mb-6">{isEditMode ? 'Editar Cupcake' : 'Adicionar um Novo Cupcake'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-brand-text mb-1">Nome do Cupcake</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" required/>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-brand-text mb-1">Descrição</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" required rows={3}></textarea>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="price" className="block text-sm font-bold text-brand-text mb-1">Preço (R$)</label>
              <input type="number" id="price" value={price} onChange={e => setPrice(parseFloat(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" required min="0.01" step="0.01"/>
            </div>
            <div className="w-1/2">
              <label htmlFor="stock" className="block text-sm font-bold text-brand-text mb-1">Estoque</label>
              <input type="number" id="stock" value={stock} onChange={e => setStock(parseInt(e.target.value, 10))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" required min="0"/>
            </div>
          </div>
           <div>
            <label htmlFor="imageUrl" className="block text-sm font-bold text-brand-text mb-1">URL da Imagem</label>
            <input type="url" id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="https://exemplo.com/imagem.jpg"/>
            <p className="text-xs text-gray-500 mt-1">Deixe em branco para usar uma imagem aleatória ao adicionar.</p>
          </div>
          <div className="pt-4 flex justify-end space-x-3">
             <button type="button" onClick={onClose} className="py-2 px-6 bg-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-300 transition-colors">Cancelar</button>
             <button type="submit" className="py-2 px-6 bg-brand-primary text-white font-bold rounded-full hover:bg-brand-secondary transition-colors">{isEditMode ? 'Salvar Alterações' : 'Adicionar Cupcake'}</button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes modal-in {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-modal-in { animation: modal-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AddCupcakeModal;
