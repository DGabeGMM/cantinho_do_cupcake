import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  userRole: UserRole;
  onLogout: () => void;
  cartItemCount: number;
  onNavigateToCart: () => void;
  isCartVisible?: boolean;
}

const Header: React.FC<HeaderProps> = ({ userRole, onLogout, cartItemCount, onNavigateToCart, isCartVisible }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 3.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                <path d="M10 2a2.5 2.5 0 00-2.5 2.5V5h5V4.5A2.5 2.5 0 0010 2z" />
            </svg>
            <h1 className="text-2xl font-display text-brand-primary">Cantinho do Cupcake</h1>
        </div>
        <div className="flex items-center space-x-4">
            {userRole === 'buyer' && !isCartVisible && (
            <button onClick={onNavigateToCart} className="relative text-brand-text hover:text-brand-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                    </span>
                    )}
            </button>
            )}

            {userRole && (
            <button
                onClick={onLogout}
                className="bg-brand-secondary text-white font-bold py-2 px-4 rounded-full hover:bg-brand-primary transition-colors duration-300 transform hover:scale-105"
            >
                Sair
            </button>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;