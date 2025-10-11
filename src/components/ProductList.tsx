import { useState } from "react";
import type { Product } from "../types";
import { useLanguage } from "../utils/LanguageContext";
import { translations } from "../utils/i18n";
import TypeIcon from "./TypeIcon";
import "./ActionButtons.css";

interface Props {
  products: Product[];
  onSave: (products: Product[]) => void;
  onEdit: (product: Product) => void;
  sortBy?: string;
  onSortChange?: (newSort: string) => void;
}
export default function ProductList({
  products,
  onSave,
  onEdit,
  sortBy,
  onSortChange,
}: Props) {
  const { lang } = useLanguage();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editBarcodes, setEditBarcodes] = useState<string[]>([]);
  const [editDesiredCount, setEditDesiredCount] = useState<number>(1);

  // inline editing is handled via editingId state; previous startEdit removed

  const handleSaveEdit = () => {
    if (editingId === null) return;
    const updatedProducts = products.map((p) =>
      p.id === editingId
        ? {
            ...p,
            name: editName,
            type: editType,
            barcodes: editBarcodes.filter((b) => b.trim() !== ""),
            desiredCount: editDesiredCount,
          }
        : p
    );
    onSave(updatedProducts);
    setEditingId(null);
  };

  const handleRemove = (id: number) => {
    onSave(products.filter((p) => p.id !== id));
  };

  const handleBarcodeChange = (index: number, value: string) => {
    if (editingId === null) return;
    const newBarcodes = [...editBarcodes];
    newBarcodes[index] = value;
    setEditBarcodes(newBarcodes);
  };

  const handleAddBarcode = () => setEditBarcodes([...editBarcodes, ""]);
  const handleRemoveBarcode = (index: number) => {
    const newBarcodes = editBarcodes.filter((_, i) => i !== index);
    setEditBarcodes(newBarcodes);
  };

  return (
    <div>
      <h3>
        {translations[lang].products} {translations[lang].list}
      </h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc" }}>
              <button
                onClick={() => {
                  // toggle between name_asc and name_desc
                  const next = sortBy === "name_asc" ? "name_desc" : "name_asc";
                  onSortChange?.(next);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label={translations[lang].name}
              >
                {translations[lang].name}{" "}
                {sortBy?.startsWith("name_")
                  ? sortBy === "name_asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </button>
            </th>
            <th style={{ border: "1px solid #ccc" }}>
              <button
                onClick={() => {
                  const next = sortBy === "type_asc" ? "type_desc" : "type_asc";
                  onSortChange?.(next);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label={translations[lang].type}
              >
                {translations[lang].type}{" "}
                {sortBy?.startsWith("type_")
                  ? sortBy === "type_asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </button>
            </th>
            <th style={{ border: "1px solid #ccc" }}>
              <button
                onClick={() => {
                  const next =
                    sortBy === "desired_asc" ? "desired_desc" : "desired_asc";
                  onSortChange?.(next);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label={translations[lang].desiredCount}
              >
                {translations[lang].desiredCount}{" "}
                {sortBy?.startsWith("desired_")
                  ? sortBy === "desired_asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </button>
            </th>
            <th style={{ border: "1px solid #ccc" }}>
              <button
                onClick={() => {
                  const next =
                    sortBy === "barcodes_asc"
                      ? "barcodes_desc"
                      : "barcodes_asc";
                  onSortChange?.(next);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label={translations[lang].barcodes}
              >
                {translations[lang].barcodes}{" "}
                {sortBy?.startsWith("barcodes_")
                  ? sortBy === "barcodes_asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </button>
            </th>
            <th style={{ border: "1px solid #ccc" }}>
              {translations[lang].actions}
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ border: "1px solid #ccc", padding: "4px" }}>
                {editingId === product.id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "4px" }}>
                {editingId === product.id ? (
                  <input
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                  />
                ) : (
                  <span>
                    <TypeIcon type={product.type} size={16} /> {product.type}
                  </span>
                )}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "4px" }}>
                {editingId === product.id ? (
                  <input
                    type="number"
                    min={1}
                    value={editDesiredCount}
                    onChange={(e) =>
                      setEditDesiredCount(Number(e.target.value))
                    }
                    style={{ width: "60px" }}
                  />
                ) : (
                  product.desiredCount
                )}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "4px" }}>
                {editingId === product.id ? (
                  <div>
                    {editBarcodes.map((b, i) => (
                      <div key={i}>
                        <input
                          value={b}
                          onChange={(e) =>
                            handleBarcodeChange(i, e.target.value)
                          }
                        />

                        <button onClick={() => handleRemoveBarcode(i)}>
                          ❌ {/* {translations[lang].remove} */}
                        </button>
                      </div>
                    ))}
                    <button onClick={handleAddBarcode}>
                      ➕ {/* {translations[lang].add} */}
                      {/* {translations[lang].barcodes} */}
                    </button>
                  </div>
                ) : (
                  product.barcodes.join(", ")
                )}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "4px" }}>
                {editingId === product.id ? (
                  <>
                    <button
                      className="action-btn primary"
                      onClick={handleSaveEdit}
                    >
                      <span className="emoji">💾</span>
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => setEditingId(null)}
                    >
                      <span className="emoji">❌</span>
                    </button>
                  </>
                ) : (
                  <>
                    {/*                     <button onClick={() => startEdit(product)}>
                      ✏️OLD inline edit
                    </button> */}
                    <button
                      className="action-btn"
                      onClick={() => onEdit(product)}
                    >
                      <span className="emoji">✏️</span>
                    </button>
                    <button
                      className="action-btn danger icon"
                      onClick={() => handleRemove(product.id)}
                    >
                      <span className="emoji">🗑️</span>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
