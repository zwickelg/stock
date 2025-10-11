import { useState, useEffect } from "react";
import StockForm from "../components/StockForm";
import StockList from "../components/StockList";
import type { StockItem } from "../types";
import { useLanguage } from "../utils/LanguageContext";
import { translations } from "../utils/i18n";
import ModalDialog from "../components/ModalDialog";

const initialStock: StockItem[] = [];

export default function StockPage() {
  const { lang } = useLanguage();
  const [stock, setStock] = useState<StockItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState<string>("product_asc");
  const [showConfirm, setShowConfirm] = useState(false);

  // שמירה נפרדת לפי שפה
  const STOCK_KEY = lang === "he" ? "stock_he" : "stock_en";

  useEffect(() => {
    const saved = localStorage.getItem(STOCK_KEY);
    if (saved) {
      setStock(JSON.parse(saved));
    } else {
      const initialList = initialStock;
      setStock(initialList);
      localStorage.setItem(STOCK_KEY, JSON.stringify(initialList));
    }
  }, [lang, STOCK_KEY]);

  const handleSave = (newStock: StockItem[]) => {
    setStock(newStock);
    localStorage.setItem(STOCK_KEY, JSON.stringify(newStock));
  };

  const handleResetStock = () => {
    setShowConfirm(true);

    /*     if (window.confirm(translations[lang].confirmResetStock)) {
      const initialList = initialStock;
      setStock(initialList);
      localStorage.setItem(STOCK_KEY, JSON.stringify(initialList));
    } */
  };
  const initialProducts =
    lang === "he"
      ? JSON.parse(localStorage.getItem("products_he") || "[]")
      : JSON.parse(localStorage.getItem("products_en") || "[]");

  const filteredStock = stock.filter((item) => {
    const product = initialProducts.find((p: any) => p.id === item.productId);
    if (!product) return false;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType ? product.type === filterType : true;
    return matchesSearch && matchesType;
  });

  // apply sorting by product name if requested
  const sortedStock = [...filteredStock];

  if (sortBy === "product_asc") {
    sortedStock.sort((a, b) => {
      const pa = initialProducts.find((p: any) => p.id === a.productId);
      const pb = initialProducts.find((p: any) => p.id === b.productId);
      return (pa?.name || "").localeCompare(pb?.name || "");
    });
  } else if (sortBy === "product_desc") {
    sortedStock.sort((a, b) => {
      const pa = initialProducts.find((p: any) => p.id === a.productId);
      const pb = initialProducts.find((p: any) => p.id === b.productId);
      return (pb?.name || "").localeCompare(pa?.name || "");
    });
  }
  return (
    <div className="container" dir={lang === "he" ? "rtl" : "ltr"}>
      <h1>🥫 {translations[lang].stock}</h1>

      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <input
            type="text"
            placeholder={lang === "he" ? "חפש מוצר..." : "Search product..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "0.5rem", flex: 1 }}
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{ padding: "0.5rem" }}
          >
            <option value="">
              {lang === "he" ? "כל הסוגים" : "All types"}
            </option>
            {Array.from(new Set(initialProducts.map((p: any) => p.type))).map(
              (type: any) => (
                <option key={type} value={type}>
                  {type}
                </option>
              )
            )}
          </select>
          {filterType || searchTerm ? (
            <button
              onClick={() => {
                setFilterType("");
                setSearchTerm("");
              }}
              style={{ padding: "0.5rem 1rem" }}
            >
              {lang === "he" ? "נקה סינון" : "Clear Filters"}
            </button>
          ) : (
            <button
              onClick={handleResetStock}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {translations[lang].resetStock}
            </button>
          )}
        </div>
      </div>
      {showConfirm && (
        <ModalDialog
          title={translations[lang].resetProducts}
          message={
            lang === "he"
              ? "האם אתה בטוח שברצונך לאפס את רשימת המוצרים? פעולה זו תמחק את הנתונים שנשמרו."
              : "Are you sure you want to reset the product list? This will delete your saved data."
          }
          confirmText={lang === "he" ? "אפס" : "Reset"}
          cancelText={lang === "he" ? "בטל" : "Cancel"}
          onConfirm={() => {
            const initialList = initialStock;
            setStock(initialList);
            localStorage.setItem(STOCK_KEY, JSON.stringify(initialList));
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <StockForm stock={stock} products={initialProducts} onSave={handleSave} />
      <StockList
        stock={sortedStock}
        products={initialProducts}
        onSave={handleSave}
        sortBy={sortBy}
        onSortChange={(newSort) => setSortBy(newSort)}
      />
    </div>
  );
}
