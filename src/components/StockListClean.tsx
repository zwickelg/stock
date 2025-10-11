import type { StockItem, Product } from "../types";
import { useLanguage } from "../utils/LanguageContext";
import { translations } from "../utils/i18n";
import TypeIcon from "./TypeIcon";

interface Props {
  stock: StockItem[];
  products: Product[];
  onSave: (stock: StockItem[]) => void;
  sortBy?: string;
  onSortChange?: (newSort: string) => void;
}

export default function StockListClean({ stock, products, onSave, sortBy, onSortChange }: Props) {
  const { lang } = useLanguage();

  const handleRemove = (id: number) => {
    onSave(stock.filter((s) => s.id !== id));
  };

  const handleEditCount = (id: number, newCount: number) => {
    const newStock = stock.map((s) => (s.id === id ? { ...s, count: newCount } : s));
    onSave(newStock);
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ccc", width: 48 }}>
            <button
              onClick={() => {
                const next = sortBy === "type_asc" ? "type_desc" : "type_asc";
                onSortChange?.(next);
              }}
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-label={translations[lang].type}
              title={translations[lang].type}
            >
              {sortBy?.startsWith("type_") ? (sortBy === "type_asc" ? "▲" : "▼") : "≡"}
            </button>
          </th>

          <th style={{ border: "1px solid #ccc" }}>{translations[lang].products}</th>
          <th style={{ border: "1px solid #ccc" }}>🔢 {translations[lang].count}</th>
          <th style={{ border: "1px solid #ccc" }}>{translations[lang].actions}</th>
        </tr>
      </thead>
      <tbody>
        {stock.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ccc", padding: "4px", textAlign: "center" }}>
                {product ? <TypeIcon type={product.type} size={18} /> : ""}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "4px" }}>{product ? product.name : "Unknown"}</td>
              <td style={{ border: "1px solid #ccc", padding: "4px" }}>
                <input
                  type="number"
                  value={item.count}
                  min={0}
                  onChange={(e) => handleEditCount(item.id, Number(e.target.value))}
                  style={{ width: "60px" }}
                />
              </td>
              <td style={{ border: "1px solid #ccc", padding: "4px" }}>
                <button onClick={() => handleRemove(item.id)}>🗑️</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
