import { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import type { Product } from "../types";
import { initialProductsEn, initialProductsHe } from "../data/initialProducts";
import { useLanguage } from "../utils/LanguageContext";
import { translations } from "../utils/i18n";
import ModalDialog from "../components/ModalDialog";

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const { lang } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState<string>("name_asc");

  // key נפרד ב-localStorage לפי שפה
  const PRODUCTS_KEY = lang === "he" ? "products_he" : "products_en";

  // הטעינה הראשונית וטעינה מחדש כששפה משתנה
  useEffect(() => {
    const saved = localStorage.getItem(PRODUCTS_KEY);
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      const initialList = lang === "he" ? initialProductsHe : initialProductsEn;
      setProducts(initialList);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialList));
    }
  }, [lang, PRODUCTS_KEY]);

  // שמירת הרשימה ב-localStorage
  const handleSave = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(newProducts));
    setShowForm(false);
  };

  // איפוס הרשימה הראשונית בהתאם לשפה
  /*   const handleResetProducts = () => {
    if (window.confirm(translations[lang].confirmReset)) {
      const initialList = lang === "he" ? initialProductsHe : initialProductsEn;
      setProducts(initialList);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialList));
    }
  }; */
  const handleResetProducts = () => {
    setShowConfirm(true);
  };
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType ? p.type === filterType : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="container" dir={lang === "he" ? "rtl" : "ltr"}>
      <h1>🛒 {translations[lang].products}</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setShowForm(true)}>
          ➕ {translations[lang].add}
        </button>

        {showForm && (
          <ProductForm
            products={products}
            onSave={handleSave}
            onClose={() => setShowForm(false)}
          />
        )}
        <button
          onClick={handleResetProducts}
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
          {translations[lang].resetProducts}
        </button>
      </div>
      {showConfirm && (
        <ModalDialog
          title={translations[lang].resetProducts}
          message={translations[lang].confirmReset}
          confirmText={translations[lang].reset}
          cancelText={translations[lang].cancel}
          onConfirm={() => {
            const initialList =
              lang === "he" ? initialProductsHe : initialProductsEn;
            setProducts(initialList);
            localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialList));
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {(showForm || editingProduct) && (
        <ProductForm
          products={products}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          editProduct={editingProduct}
        />
      )}
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder={lang === "he" ? "חפש מוצר..." : "Search product..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: "0.5rem" }}
        />

        {/* 🧩 Type Filter Dropdown */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ padding: "0.5rem" }}
        >
          <option value="">{lang === "he" ? "כל הסוגים" : "All types"}</option>
          {Array.from(new Set(products.map((p) => p.type))).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {/* sort is controlled by clicking table headers in ProductList */}
        {(filterType || searchTerm) && (
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterType("");
            }}
            style={{ padding: "0.5rem 1rem" }}
          >
            {lang === "he" ? "נקה סינון" : "Clear Filters"}
          </button>
        )}
      </div>

      {/* apply sorting to filteredProducts before passing down */}
      {(() => {
        const sorted = [...filteredProducts];
        switch (sortBy) {
          case "name_desc":
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case "type_asc":
            sorted.sort((a, b) => a.type.localeCompare(b.type));
            break;
          case "type_desc":
            sorted.sort((a, b) => b.type.localeCompare(a.type));
            break;
          case "desired_asc":
            sorted.sort((a, b) => a.desiredCount - b.desiredCount);
            break;
          case "desired_desc":
            sorted.sort((a, b) => b.desiredCount - a.desiredCount);
            break;
          case "barcodes_asc":
            sorted.sort((a, b) => {
              const aKey = (a.barcodes.join(",") || "").localeCompare(
                b.barcodes.join(",") || ""
              );
              return aKey;
            });
            break;
          case "barcodes_desc":
            sorted.sort((a, b) => {
              return (b.barcodes.join(",") || "").localeCompare(
                a.barcodes.join(",") || ""
              );
            });
            break;
          case "name_asc":
          default:
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        }
        return (
          <ProductList
            products={sorted}
            onSave={handleSave}
            onEdit={(p) => setEditingProduct(p)}
            sortBy={sortBy}
            onSortChange={(newSort) => setSortBy(newSort)}
          />
        );
      })()}
    </div>
  );
}
