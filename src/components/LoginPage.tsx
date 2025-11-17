import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (role: 'buyer' | 'seller', credentials?: { user: string; pass: string }) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [showSellerLogin, setShowSellerLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSellerLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin('seller', { user: username, pass: password });
  };

  if (showSellerLogin) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl transform transition-all duration-300">
          <button onClick={() => setShowSellerLogin(false)} className="text-sm font-bold text-brand-primary hover:text-brand-secondary">&larr; Voltar para a página principal</button>
          <div className="text-center">
            <h1 className="text-3xl font-display text-brand-primary">Login do Vendedor</h1>
          </div>
          <form onSubmit={handleSellerLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-brand-text mb-1">Usuário</label>
              <input 
                type="text" 
                id="username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" 
                required 
                placeholder="seller"
              />
            </div>
            <div>
              <label htmlFor="password"className="block text-sm font-bold text-brand-text mb-1">Senha</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" 
                required 
                placeholder="password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-brand-blue text-white font-bold text-lg rounded-full hover:bg-blue-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-purple"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
        <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 3.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                <path d="M10 2a2.5 2.5 0 00-2.5 2.5V5h5V4.5A2.5 2.5 0 0010 2z" />
            </svg>
          <h1 className="mt-4 text-4xl font-display text-brand-primary">Bem-vindo ao Cantinho do Cupcake!</h1>
          <p className="mt-2 text-lg text-brand-text">Quem é você?</p>
        </div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => onLogin('buyer')}
            className="w-full py-3 px-4 bg-brand-primary text-white font-bold text-lg rounded-full hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-blue"
          >
            Estou aqui para COMPRAR Cupcakes!
          </button>
          <button
            onClick={() => setShowSellerLogin(true)}
            className="w-full py-3 px-4 bg-brand-blue text-white font-bold text-lg rounded-full hover:bg-blue-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-purple"
          >
            Estou aqui para VENDER Cupcakes!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;