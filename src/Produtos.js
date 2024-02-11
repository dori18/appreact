import React from 'react';

function Produto({ produto, onAdicionarAoCarrinho }) {
  return (
    <li key={produto.id}>
      <strong>{produto.nome}</strong> - R$ {produto.preco.toFixed(2)}
      <p>{produto.descricao}</p>
      <input
        type="number"
        value={produto.quantidade || ''}
        onChange={(e) => onAdicionarAoCarrinho(produto.id, parseInt(e.target.value, 10) || 0)}
        min="0"
      />
      <button onClick={() => onAdicionarAoCarrinho(produto.id)}>
        Adicionar ao Carrinho
      </button>
    </li>
  );
}

export default Produto;