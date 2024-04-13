import { FormEvent, useRef, useState } from "react";
import { api } from "../../../services/api";
import { DefaultTemplate } from "../../templates/default";
import "./style.css";

export default function LayoutCadProd() {
  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const barcodeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const costPriceRef = useRef<HTMLInputElement>(null);
  const sellingPriceRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const name = nameRef.current?.value.trim();
    const category = categoryRef.current?.value.trim();
    const quantity = quantityRef.current?.valueAsNumber;
    const barcode = barcodeRef.current?.value.trim();
    const description = descriptionRef.current?.value.trim();
    const imageUrl = imageUrlRef.current?.value.trim();
    const costPrice = costPriceRef.current?.valueAsNumber;
    const sellingPrice = sellingPriceRef.current?.valueAsNumber;
    const color = colorRef.current?.value.trim();
    const size = sizeRef.current?.value.trim();

    // Validar os campos de cor e tamanho
    if (!color || !size) {
      setError("Cor e tamanho são campos obrigatórios.");
      return;
    }

    if (
      !name ||
      !category ||
      quantity === undefined ||
      isNaN(quantity) ||
      !barcode ||
      !description ||
      !imageUrl ||
      costPrice === undefined ||
      isNaN(costPrice) ||
      sellingPrice === undefined ||
      isNaN(sellingPrice)
    ) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      setLoading(true);

      const data = {
        name,
        category,
        quantity,
        barcode,
        description,
        imageUrl,
        costPrice,
        sellingPrice,
        color,
        size,
      };

      await api.post("/api/register-stock", data);

      [
        nameRef,
        categoryRef,
        quantityRef,
        barcodeRef,
        descriptionRef,
        imageUrlRef,
        costPriceRef,
        sellingPriceRef,
        colorRef,
        sizeRef,
      ].forEach((ref) => {
        if (ref.current) {
          ref.current.value = "";
        }
      });

      setError(null);
      alert("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      setError("Erro ao cadastrar produto. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DefaultTemplate>
      <div className="contentMain">
        <div className="containerCad">
          <div className="title">Cadastrar produto</div>
          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="detailsForm">
              <div className="inputBox">
                <label className="details">Nome do produto</label>
                <input type="text" placeholder="" ref={nameRef} />
              </div>

              <div className="inputBox">
                <label className="details">Descrição</label>
                <input type="text" placeholder="" ref={descriptionRef} />
              </div>

              <div className="inputBox">
                <label className="details">Quantidade</label>
                <input type="number" placeholder=" " ref={quantityRef} />
              </div>

              <div className="inputBox">
                <label className="details">Categoria</label>
                <input type="text" placeholder=" " ref={categoryRef} />
              </div>

              <div className="inputBox">
                <label className="details">URL da Imagem</label>
                <input type="text" placeholder="" ref={imageUrlRef} />
              </div>

              <div className="inputBox">
                <label className="details">Código de barras</label>
                <input type="number" placeholder="" ref={barcodeRef} />
              </div>

              <div className="inputBox">
                <label className="details">Preço de custo</label>
                <input type="number" placeholder="" ref={costPriceRef} step="0.01" />
              </div>

              <div className="inputBox">
                <label className="details">Preço de venda</label>
                <input type="number" placeholder="" ref={sellingPriceRef} step="0.01" />
              </div>
              <div className="inputBox">
                <label className="details">Cor</label>
                <input type="text" placeholder=" " ref={colorRef} />
              </div>
              <div className="inputBox">
                <label className="details">Tamanho</label>
                <input type="text" placeholder=" " ref={sizeRef} />
              </div>

            </div>
            <div className="button">
              <button type="submit" disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultTemplate>
  );
}
