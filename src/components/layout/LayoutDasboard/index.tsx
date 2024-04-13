import { useEffect, useState } from "react";
import "./style.css";
import { api } from "../../../services/api";
import { DefaultTemplate } from "../../templates/default";
import ProductsByCategoryChart from "../../barChart";

export default function LayoutDashboard() {
  const [productCount, setProductCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [totalSellingValue, setTotalSellingValue] = useState<string>("$0.00");
  const [lowStockProductCount, setLowStockProductCount] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        // Buscar a contagem de produtos
        const productResponse = await api.get("/api/products/count");
        // Buscar a contagem de usuários
        const userResponse = await api.get("/api/users/count");
        // Buscar o valor total de venda dos produtos considerando apenas os produtos com quantidade disponível
        const totalSellingValueResponse = await api.get("/api/total-selling-value");
        // Buscar a contagem de produtos com estoque baixo
        const lowStockProductResponse = await api.get("/api/stock/low-count");

        setProductCount(productResponse.data.productCount);
        setUserCount(userResponse.data.userCount);
        setTotalSellingValue(formatCurrency(totalSellingValueResponse.data.totalSellingValue));
        setLowStockProductCount(lowStockProductResponse.data.lowStockProductCount);
      } catch (error) {
        console.error(
          "Erro ao buscar a contagem de produtos, usuários, valor total de venda e produtos com estoque baixo:",
          error
        );
      }
    }

    fetchData();
  }, []);

  // Função para formatar o valor da moeda
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  return (
    <DefaultTemplate>
      <div className="container">
        <div className="contentMain">
          <div className="cards">
            <div className="card">
              <div className="card-content">
                <div className="number">{userCount}</div>
                <div className="card-name">Clientes</div>
              </div>
              <div className="icon-box">
                <i className="fas fa-user-graduate"></i>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="number">{productCount}</div>
                <div className="card-name">Produtos</div>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="number">{totalSellingValue}</div>
                <div className="card-name">Valor Total de Venda</div>
              </div>
              <div className="icon-box">
                <i className="fas fa-dollar-sign"></i>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="number">{lowStockProductCount}</div>
                <div className="card-name">Produtos com Estoque Baixo</div>
              </div>
              <div className="icon-box">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
            </div>
          </div>
          <div className="charts">
            <div className="chart">
              <h2>Gráfico de Quantidade de Produtos por Categoria</h2>
              <div>
                <ProductsByCategoryChart />
              </div>
            </div>
            <div className="chart doughnut-chart">
              <h2>Algum outro</h2>
              <div>
                <canvas id="doughnut"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultTemplate>
  );
}
