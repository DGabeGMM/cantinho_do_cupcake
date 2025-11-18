# 🧁 Cantinho do Cupcake

[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-brightgreen)](https://DGabeGMM.github.io/cantinho_do_cupcake/)

Bem-vindo ao **Cantinho do Cupcake**! Este é um projeto de e-commerce completo, construído com React e TypeScript, que simula uma loja online para a venda de cupcakes. A aplicação oferece uma experiência de usuário completa com portais distintos para compradores e vendedores, cada um com seu próprio painel de controle e funcionalidades.

A aplicação está hospedada e pode ser acessada publicamente através do GitHub Pages.

**[➡️ Teste a aplicação ao vivo aqui!](https://DGabeGMM.github.io/cantinho_do_cupcake/)**

---

## ✨ Funcionalidades Principais

### Para Compradores
- **Vitrine de Produtos:** Navegue por uma lista de cupcakes disponíveis com fotos, descrições, preços e estoque.
- **Carrinho de Compras Interativo:** Adicione, remova e atualize a quantidade de cupcakes no seu carrinho.
- **Validação de Estoque em Tempo Real:** O sistema impede a compra de mais cupcakes do que o disponível em estoque.
- **Checkout Simplificado:** Um formulário fácil de preencher para finalizar o pedido com detalhes de entrega e forma de pagamento.
- **Confirmação de Pedido:** Uma tela de sucesso é exibida após a conclusão da compra.

### Para Vendedores
- **Login Seguro:** Um portal de login separado para acesso ao painel de controle do vendedor (usuário: `seller`, senha: `password`).
- **Gerenciamento de Cupcakes (CRUD):**
    - **Adicionar:** Crie novos cupcakes com nome, descrição, preço, estoque e imagem.
    - **Editar:** Atualize as informações de qualquer cupcake existente.
    - **Excluir:** Remova cupcakes da loja.
- **Visualização de Pedidos:** Acompanhe todos os pedidos recebidos dos clientes, com detalhes do comprador e dos itens.

### Funcionalidades Gerais
- **Persistência de Dados:** Todos os cupcakes e pedidos são salvos no `localStorage` do navegador, garantindo que os dados não sejam perdidos ao recarregar a página.
- **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis.
- **Interface Intuitiva e Agradável:** Um design colorido e amigável para proporcionar uma ótima experiência de usuário.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
    - **React:** Biblioteca para construir a interface de usuário com componentes.
    - **TypeScript:** Adiciona tipagem estática ao JavaScript para um desenvolvimento mais robusto e seguro.
    - **Vite:** Ferramenta de build moderna e ultrarrápida para desenvolvimento front-end.
- **Estilização:**
    - **Tailwind CSS:** Um framework CSS "utility-first" para criar designs personalizados rapidamente.
- **Armazenamento de Dados:**
    - **`localStorage` do Navegador:** Utilizado para simular um banco de dados, persistindo os dados de produtos e pedidos no cliente.
- **Deployment:**
    - **GitHub Pages:** Para hospedar a aplicação web de forma gratuita e simples.

---

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e rodar a aplicação em sua máquina.

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/DGabeGMM/cantinho_do_cupcake.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd cantinho_do_cupcake
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Abra seu navegador:**
    Acesse [http://localhost:5173](http://localhost:5173) (ou o endereço indicado no seu terminal) para ver a aplicação funcionando.

### Credenciais de Vendedor (para teste)
Para acessar o painel de vendedor, use as seguintes credenciais:
- **Usuário:** `seller`
- **Senha:** `password`
****
