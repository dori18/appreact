import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState({});
  const [quantidadeParaAdicionar, setQuantidadeParaAdicionar] = useState({});
  const [quantidadeParaRemover, setQuantidadeParaRemover] = useState({});
  const [detalhesVisiveis, setDetalhesVisiveis] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/produtos')
      .then(response => setProdutos(response.data))
      .catch(error => console.error('Erro ao obter produtos:', error));
  }, []);

  const adicionarAoCarrinho = (produtoId) => {
    const quantidade = quantidadeParaAdicionar[produtoId] || 0;

    if (quantidade > 0) {
      setCarrinho((prevCarrinho) => {
        const novoCarrinho = { ...prevCarrinho };
        novoCarrinho[produtoId] = (novoCarrinho[produtoId] || 0) + quantidade;
        return novoCarrinho;
      });

      setQuantidadeParaAdicionar((prevQuantidade) => ({
        ...prevQuantidade,
        [produtoId]: 0,
      }));
    } else {
      console.warn('A quantidade deve ser maior que 0 para adicionar ao carrinho.');
    }
  };

  const removerDoCarrinho = (produtoId) => {
    const quantidade = quantidadeParaRemover[produtoId] || 0;

    setCarrinho((prevCarrinho) => {
      const novoCarrinho = { ...prevCarrinho };
      if (novoCarrinho[produtoId] !== undefined) {
        if (quantidade >= novoCarrinho[produtoId]) {
          delete novoCarrinho[produtoId];
        } else {
          novoCarrinho[produtoId] -= quantidade;
        }
      }
      return novoCarrinho;
    });
    setQuantidadeParaRemover((prevQuantidade) => ({
      ...prevQuantidade,
      [produtoId]: 0,
    }));
  };

  const limparCarrinho = () => {
    setCarrinho({});
  };

  const valorTotalCarrinho = Object.entries(carrinho).reduce(
    (total, [produtoId, quantidade]) => {
      const produto = produtos.find((p) => p.id === parseInt(produtoId, 10));
      return total + (produto ? quantidade * produto.preco : 0);
    },
    0
  );

  return (
    <div className="App">
      <h1>Lojão das Roupas</h1>
      <div className="produtos-container">
        <h2>Produtos</h2>
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id}>
              <strong>{produto.nome}</strong> - R$ {produto.preco.toFixed(2)}
              <button className="ver-detalhes" onClick={() => setDetalhesVisiveis(produto)}>
                Ver Detalhes
              </button>
              {detalhesVisiveis === produto && (
                <>
                  <p>{produto.descricao}</p>
                  <button className="exibir-menos-detalhes" onClick={() => setDetalhesVisiveis(null)}>
                    Exibir Menos Detalhes
                  </button>
                </>
              )}
              <br />
              <input
                type="number"
                value={quantidadeParaAdicionar[produto.id] === 0 ? '' : quantidadeParaAdicionar[produto.id] || ''}
                onChange={(e) =>
                  setQuantidadeParaAdicionar({
                    ...quantidadeParaAdicionar,
                    [produto.id]: parseInt(e.target.value, 10) || 0,
                  })
                }
                min="0"
              />
              <button onClick={() => adicionarAoCarrinho(produto.id)}>
                Adicionar ao Carrinho
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="carrinho-container">
        <h2>Carrinho</h2>
        <ul>
          {Object.entries(carrinho).map(([produtoId, quantidade]) => {
            const produto = produtos.find((p) => p.id === parseInt(produtoId, 10));

            if (!produto) {
              return null;
            }
            return (
              <li key={produtoId}>
                {produto.nome} - R$ {produto.preco.toFixed(2)} - Quantidade: {quantidade}
                <input
                  type="number"
                  value={quantidadeParaRemover[produtoId] === 0 ? '' : quantidadeParaRemover[produtoId] || ''}
                  onChange={(e) =>
                    setQuantidadeParaRemover({
                      ...quantidadeParaRemover,
                      [produtoId]: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  min="0"
                />
                <button onClick={() => removerDoCarrinho(produtoId)}>
                  Remover do Carrinho
                </button>
              </li>
            );
          })}
        </ul>
        <p>Valor Total do Carrinho: R$ {valorTotalCarrinho.toFixed(2)}</p>
        <button onClick={limparCarrinho}>Limpar Carrinho</button>
        {Object.keys(carrinho).length > 0 && (
          <>
            <button onClick={() => alert('Compra finalizada com sucesso! Enviaremos o boleto para seu e-mail de cadastro.')}>
              Finalizar Compra
            </button>
            <button onClick={() => window.location.reload()} className="voltar-ao-inicio">
              Voltar ao Início
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
