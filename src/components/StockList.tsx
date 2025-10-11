import type { StockItem, Product } from "../types";
import { useLanguage } from "../utils/LanguageContext";
import { translations } from "../utils/i18n";
import TypeIcon from "./TypeIcon";
import "./ActionButtons.css";

interface Props {
  stock: StockItem[];
  products: Product[];
  onSave: (stock: StockItem[]) => void;
  sortBy?: string;
  onSortChange?: (newSort: string) => void;
}

export default function StockList({
  stock,
  products,
  onSave,
  sortBy,
  onSortChange,
}: Props) {
  const { lang } = useLanguage();

  const handleRemove = (id: number) => {
    onSave(stock.filter((s) => s.id !== id));
  };

  const handleEditCount = (id: number, newCount: number) => {
    const newStock = stock.map((s) =>
      s.id === id ? { ...s, count: newCount } : s
    );
    onSave(newStock);
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ccc" }}>
            <button
              onClick={() => {
                // toggle between name_asc and name_desc
                const next =
                  sortBy === "product_asc" ? "product_desc" : "product_asc";
                onSortChange?.(next);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={translations[lang].products}
            >
              {translations[lang].name}{" "}
              {sortBy?.startsWith("product_")
                ? sortBy === "product_asc"
                  ? "▲"
                  : "▼"
                : ""}
            </button>
          </th>
          <th style={{ border: "1px solid #ccc" }}>
            🔢 {translations[lang].count}
          </th>
          <th style={{ border: "1px solid #ccc" }}>
            {translations[lang].actions}
          </th>
        </tr>
      </thead>
      <tbody>
        {stock.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ccc", padding: "4px" }}>
                {product ? <TypeIcon type={product.type} size={18} /> : ""}
                {product ? product.name : "Unknown"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "4px" }}>
                <input
                  type="number"
                  value={item.count}
                  min={0}
                  onChange={(e) =>
                    handleEditCount(item.id, Number(e.target.value))
                  }
                  style={{ width: "60px" }}
                />
              </td>
              <td style={{ border: "1px solid #ccc", padding: "4px" }}>
                <button
                  className="action-btn danger icon"
                  onClick={() => handleRemove(item.id)}
                >
                  <span className="emoji">🗑️</span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
