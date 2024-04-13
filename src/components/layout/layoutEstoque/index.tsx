import { useEffect, useRef, useState } from "react";
import { api } from "../../../services/api";
import { DefaultTemplate } from "../../templates/default";
import "./style.css";

import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";


interface StockProps {
  id: string;
  name: string;
  category: string;
  barcode: string;
  description: string;
  quantity: number;
  status: boolean;
  created_at: string;
  imageUrl: string;
  costPrice: number;
  sellingPrice: number;
  size?: string;
  color?: string;
}

export default function LayoutEstoque() {
  const [stock, setStock] = useState<StockProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [editingStock, setEditingStock] = useState<StockProps | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editedCategory, setEditedCategory] = useState<string>("");
  const [editedBarcode, setEditedBarcode] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");
  const [editedQuantity, setEditedQuantity] = useState<number>(0);
  const [editedCostPrice, setEditedCostPrice] = useState<number>(0);
  const [editedSellingPrice, setEditedSellingPrice] = useState<number>(0);
  const [editedColor, setEditedColor] = useState<string>("");
  const [editedSize, setEditedSize] = useState<string>("");

  const descriptionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadStock();
  }, [currentPage]);

  async function loadStock() {
    try {
      const response = await api.get("/api/list-stock");
      setStock(response.data);
    } catch (error) {
      console.error("Erro ao carregar estoque:", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/api/delete-stock", {
        params: {
          id: id,
        },
      });

      const updatedStock = stock.filter((item) => item.id !== id);
      setStock(updatedStock);
    } catch (err) {
      console.error(err);
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stock.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEdit = (id: string) => {
    const stockToEdit = stock.find((item) => item.id === id);
    if (stockToEdit) {
      setEditingStock(stockToEdit);
      setEditedName(stockToEdit.name);
      setEditedCategory(stockToEdit.category);
      setEditedBarcode(stockToEdit.barcode);
      setEditedDescription(stockToEdit.description);
      setEditedQuantity(stockToEdit.quantity);
      setEditedCostPrice(stockToEdit.costPrice);
      setEditedSellingPrice(stockToEdit.sellingPrice);
      setEditedColor(stockToEdit.color || "");
      setEditedSize(stockToEdit.size || "");
    } else {
      console.error(`Produto com ID ${id} não encontrado`);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedStock: StockProps = {
        ...editingStock!,
        name: editedName,
        category: editedCategory,
        barcode: editedBarcode,
        description: editedDescription,
        quantity: editedQuantity,
        costPrice: editedCostPrice,
        sellingPrice: editedSellingPrice,
        color: editedColor,
        size: editedSize,
      };

      const status = updatedStock.quantity >= 0;
      updatedStock.status = status;

      await api.put(`/api/update-stock/${updatedStock.id}`, updatedStock);

      await loadStock();

      setEditingStock(null);
      setEditedName("");
      setEditedCategory("");
      setEditedBarcode("");
      setEditedDescription("");
      setEditedQuantity(0);
      setEditedCostPrice(0);
      setEditedSellingPrice(0);
      setEditedColor("");
      setEditedSize("");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };
  return (
    <DefaultTemplate>
      <main className="contentMain">
        <div className="containerStock">
          <table className="responsive-table">
            <thead>
              <tr className="table-header">
                <th className="col col-1">Nome</th>
                <th className="col col-2">Descrição</th>
                <th className="col col-3">Quantidade</th>
                <th className="col col-4">Categoria</th>
                <th className="col col-5">Código de barras</th>
                <th className="col col-6">Imagem</th>
                <th className="col col-7">Valor de Custo</th>
                <th className="col col-8">Valor de Venda</th>
                <th className="col col-9">Cor</th>
                <th className="col col-10">Tamanho</th>
                <th className="col col-11">Situação</th>
                <th className="col col-12">Ação</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr className="table-row" key={item.id}>
                  <td className="col col-1" data-label="Nome">
                    {item.name}
                  </td>
                  <td className="col col-2" data-label="Descrição">
                    {item.description}
                  </td>
                  <td className="col col-3" data-label="Quantidade">
                    {item.quantity}
                  </td>
                  <td className="col col-4" data-label="Categoria">
                    {item.category}
                  </td>
                  <td className="col col-5" data-label="Código de barras">
                    {item.barcode}
                  </td>
                  <td className="col col-6" data-label="Imagem do Produto">
                    {item.imageUrl ? (
                      <img
                        className="imgProduct"
                        src={item.imageUrl}
                        alt={item.name}
                      />
                    ) : (
                      <span>Produto sem imagem</span>
                    )}
                  </td>
                  <td className="col col-7" data-label="Valor de Custo">
                    {item.costPrice != null ? `R$ ${item.costPrice.toFixed(2)}` : 'Valor não disponível'}
                  </td>
                  <td className="col col-8" data-label="Valor de Venda">
                    {item.sellingPrice != null ? `R$ ${item.sellingPrice.toFixed(2)}` : 'Valor não disponível'}
                  </td>
                  <td className="col col-9" data-label="Cor">
                    {item.color || editedColor}
                  </td>
                  <td className="col col-10" data-label="Tamanho">
                    {item.size || editedSize}
                  </td>
                  <td className="col col-11" data-label="Situação">
                    {item.status ? (
                      <div className="circleGreen"></div>
                    ) : (
                      <div className="circleRed"></div>
                    )}
                  </td>
                  <td className="col col-12" data-label="Ação">
                    <AiOutlineDelete className="btn" onClick={() => handleDelete(item.id)} />
                    <CiEdit className="btn" onClick={() => handleEdit(item.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(stock.length / itemsPerPage) },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <li key={pageNumber} className="paginationLi">
                <p onClick={() => paginate(pageNumber)}>{pageNumber}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal de edição */}
        {editingStock && (
          <div className="overlay">
            <div className="modal">
              <button className="close-button" onClick={() => setEditingStock(null)}>X</button>
              <h2>Editar Produto</h2>
              <div className="inputBox">
                <label className="details">Nome</label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div className="inputBox">
                <label className="details">Categoria</label>
                <input
                  type="text"
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                />
              </div>
              <div className="inputBox">
                <label className="details">Código de Barras</label>
                <input
                  type="text"
                  value={editedBarcode}
                  onChange={(e) => setEditedBarcode(e.target.value)}
                />
              </div>
              <div className="inputBox">
                <label className="details">Descrição</label>
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  ref={descriptionRef}
                />
              </div>
              <div className="inputBox">
                <label className="details">Valor de Custo</label>
                <input
                  type="number"
                  value={editedCostPrice}
                  onChange={(e) => setEditedCostPrice(Number(e.target.value))}
                />
              </div>
              <div className="inputBox">
                <label className="details">Valor de Venda</label>
                <input
                  type="number"
                  value={editedSellingPrice}
                  onChange={(e) => setEditedSellingPrice(Number(e.target.value))}
                />
              </div>
             
              <button onClick={handleUpdate}>Atualizar</button>
            </div>
          </div>
        )}

      </main>
    </DefaultTemplate>
  );
}
