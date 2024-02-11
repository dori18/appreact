import React from 'react';

const DetalhesProduto = ({ produto }) => {
  if (!produto) {
    return null; 
  }

  return (
    <div className="detalhes-produto">
      <h2>{produto.nome}</h2>
      <p>{produto.descricao}</p>
      <p>R$ {produto.preco}</p>      
      <button>Adicionar ao Carrinho</button>
    </div>
  );
};

export default DetalhesProduto;