import { useState, useEffect } from "react";
import type { StockItem, Product } from "../types";
import { useLanguage } from "../utils/LanguageContext";
import { translations } from "../utils/i18n";

interface Props {
  stock: StockItem[];
  products: Product[];
  onSave: (stock: StockItem[]) => void;
}

export default function StockForm({ stock, products, onSave }: Props) {
  const { lang } = useLanguage();
  const [productId, setProductId] = useState<number>(0);
  const [count, setCount] = useState<number>(1);

  // רשימת המוצרים הזמינים להוספה
  const availableProducts = products.filter(
    (p) => !stock.some((item) => item.productId === p.id)
  );

  useEffect(() => {
    if (productId === 0 && availableProducts.length > 0) {
      setProductId(availableProducts[0].id);
    }
  }, [availableProducts, productId]);

  // טיפול בהוספה
  const handleAdd = () => {
    if (!productId) return;

    const newStock: StockItem = { id: Date.now(), productId, count };
    onSave([...stock, newStock]);

    // איפוס שדות
    setCount(1);
    setProductId(0);
  };

  // אם אין מוצרים זמינים – מציגים הודעה
  if (!availableProducts.length) {
    return (
      <div
        style={{
          marginBottom: "1rem",
          color: "#ef4444",
          fontWeight: "bold",
          textAlign: lang === "he" ? "right" : "left",
        }}
      >
        {translations[lang].noAvailableProducts}
      </div>
    );
  }

  return (
    <div
      style={{
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        flexDirection: "row",
      }}
    >
      <select
        value={productId}
        onChange={(e) => setProductId(Number(e.target.value))}
        style={{ padding: "0.3rem 0.5rem", borderRadius: "6px" }}
      >
        {availableProducts.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={count}
        min={1}
        onChange={(e) => setCount(Number(e.target.value))}
        style={{ width: "60px", padding: "0.3rem 0.5rem", borderRadius: "6px" }}
      />

      <button
        onClick={handleAdd}
        style={{
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          padding: "0.3rem 0.8rem",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        ➕ {translations[lang].add}
      </button>
    </div>
  );
}
