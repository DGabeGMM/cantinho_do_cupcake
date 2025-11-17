import React from 'react';

interface OrderConfirmationProps {
    onNavigateToDashboard: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ onNavigateToDashboard }) => {
    return (
        <div className="text-center py-16 max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
             <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-24 w-24 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h2 className="mt-6 text-4xl font-display text-brand-secondary">Pedido Realizado com Sucesso!</h2>
            <p className="mt-3 text-lg text-brand-text">
                Obrigado pela sua compra! Seus deliciosos cupcakes estão a caminho. Enviamos uma confirmação para o seu e-mail.
            </p>
            <button
                onClick={onNavigateToDashboard}
                className="mt-8 bg-brand-primary text-white font-bold py-3 px-8 rounded-full hover:bg-brand-secondary transition-colors duration-300 transform hover:scale-105"
            >
                Comprar Mais Cupcakes!
            </button>
        </div>
    );
};

export default OrderConfirmation;