import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { api } from "../../services/api";

interface ProductCount {
  category: string;
  count: number;
}

const ProductCategoryChart: React.FC = () => {
  const [data, setData] = useState<ProductCount[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/api/products/count-by-category");
        setData(response.data);
      } catch (error) {
        console.error(
          "Erro ao buscar contagem de produtos por categoria:",
          error
        );
      }
    }

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProductCategoryChart;
