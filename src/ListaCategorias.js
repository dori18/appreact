import React from 'react';

const ListaCategorias = ({ filtrarPorCategoria, limparCategoria }) => (
  <div className="categorias">
    <button onClick={() => filtrarPorCategoria('Higiene')}>Higiene</button>
    <button onClick={() => filtrarPorCategoria('Alimentação')}>Alimentação</button>
    <button onClick={() => filtrarPorCategoria('Utilitários')}>Utilitários</button>
    <button onClick={() => filtrarPorCategoria('Brinquedos')}>Brinquedos</button>
    <button onClick={() => filtrarPorCategoria('Outros')}>Outros</button>
    <button onClick={limparCategoria}>Limpar filtro</button>
  </div>
);

export default ListaCategorias;