import { useState, useEffect } from "react";
import { api } from "../../../services/api";
import { DefaultTemplate } from "../../templates/default";

interface ReportItem {
  name: string;
  category: string;
  quantity: number;
  size?: string;
  color?: string;
}

export default function LayoutRelatorio() {
  const [report, setReport] = useState<ReportItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get("/api/current-stock-report");
        console.log("Dados: ", response.data.report);
        setReport(response.data.report);
      } catch (error) {
        console.error("Erro ao obter relatório:", error);
      }
    };

    fetchReport();
  }, []);

  // Calcular índices para os itens a serem exibidos na página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Verifica se report está definido antes de chamar slice()
  const currentItems = report
    ? report.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <DefaultTemplate>
      <main className="contentMain">
        <div className="containerStock">
          <table className="responsive-table">
            <thead>
              <tr className="table-header">
                <th className="col col-1">Nome</th>
                <th className="col col-2">Categoria</th>
                <th className="col col-3">Quantidade</th>
                <th className="col col-4">Tamanho</th>
                <th className="col col-5">Cor</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item, index) => (
                <tr className="table-row" key={index}>
                  <td className="col col-1" data-label="Nome">
                    {item.name}
                  </td>
                  <td className="col col-2" data-label="Categoria">
                    {item.category}
                  </td>
                  <td className="col col-3" data-label="Quantidade">
                    {item.quantity}
                  </td>
                  <td className="col col-4" data-label="Tamanho">
                    {item.size || "N/A"}
                  </td>
                  <td className="col col-5" data-label="Cor">
                    {item.color || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(report.length / itemsPerPage) },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <li key={pageNumber} className="paginationLi">
                <p onClick={() => paginate(pageNumber)}>{pageNumber}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </DefaultTemplate>
  );
}
