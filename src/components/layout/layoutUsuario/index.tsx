import { api } from "../../../services/api";
import { DefaultTemplate } from "../../templates/default";
import { useEffect, useState } from "react";
import "./style.css";

interface ClientProps {
  id: string;
  username: string;
  role: string;
}

export default function LayoutClientes() {
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5); // Defina o número de itens por página

  useEffect(() => {
    loadClients();
  }, [currentPage]); // Atualizar a lista quando a página atual mudar

  async function loadClients() {
    try {
      const response = await api.get("/api/users");
      setClients(response.data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.delete(`/api/delete-users/${id}`);
      const updatedClients = clients.filter((client) => client.id !== id);
      setClients(updatedClients);
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  }

  // Calcular índices para os itens a serem exibidos na página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);

  // Altera a página atual
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <DefaultTemplate>
      <main className="contentMain">
        <div className="containerClientes">
        
          <h1>Lista de Clientes</h1>
          <table className="responsive-table">
            <thead>
              <tr className="table-header">
                <th className="col col-1">Nome</th>
                <th className="col col-2">Permissão</th>
                <th className="col col-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((client) => (
                <tr className="table-row" key={client.id}>
                  <td className="col col-1" data-label="Nome">
                    {client.username}
                  </td>
                  <td className="col col-2" data-label="Permissão">
                    {client.role}
                  </td>
                  <td className="col col-3" data-label="Ação">
                    <button
                      className="btn"
                      onClick={() => handleDelete(client.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(clients.length / itemsPerPage) },
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
