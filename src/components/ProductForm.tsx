import { useState } from "react";
import type { Product } from "../types";
import { useLanguage } from "../utils/LanguageContext";
import { translations } from "../utils/i18n";
import { productTypesEn, productTypesHe } from "../data/productTypes";
import "./ProductForm.css";
import ModalDialog from "./ModalDialog";

type Props = {
  products: Product[];
  onSave: (newProducts: Product[]) => void;
  onClose: () => void;
  editProduct?: Product | null;
};

export default function ProductForm({
  products,
  onSave,
  onClose,
  editProduct,
}: Props) {
  const { lang } = useLanguage();
  const [name, setName] = useState(editProduct?.name || "");
  const [type, setType] = useState(editProduct?.type || "");
  const [barcodes, setBarcodes] = useState(
    editProduct ? editProduct.barcodes.join(",") : ""
  );
  const [desiredCount, setDesiredCount] = useState(
    editProduct?.desiredCount || 1
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const productTypes = lang === "he" ? productTypesHe : productTypesEn;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editProduct) {
      const updatedProducts = products.map((p) =>
        p.id === editProduct.id
          ? {
              ...p,
              name,
              type,
              barcodes: barcodes
                .split(",")
                .map((b) => b.trim())
                .filter(Boolean),
              desiredCount,
            }
          : p
      );
      onSave(updatedProducts);
    } else {
      // existing new product code here
      const exists = products.some(
        (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase()
      );

      if (exists) {
        setErrorMessage(translations[lang].productExists);
        return;
      }
      const newProduct: Product = {
        id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
        name,
        type,
        barcodes: barcodes
          .split(",")
          .map((b) => b.trim())
          .filter((b) => b),
        desiredCount,
      };

      onSave([...products, newProduct]);
    }

    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <form
        className="product-form"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        dir={lang === "he" ? "rtl" : "ltr"}
        lang={lang}
      >
        <h2>{lang === "he" ? "➕ הוסף מוצר" : "➕ Add Product"}</h2>

        <label>
          {lang === "he" ? "שם מוצר:" : "Name:"}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          {lang === "he" ? "סוג:" : "Type:"}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">
              {lang === "he" ? "בחר סוג" : "Select type"}
            </option>
            {productTypes.map((t, idx) => (
              <option key={idx} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label>
          {lang === "he" ? "ברקודים:" : "Barcodes:"}
          <input
            value={barcodes}
            onChange={(e) => setBarcodes(e.target.value)}
          />
        </label>

        <label>
          {lang === "he" ? "כמות רצויה:" : "Desired count:"}
          <input
            type="number"
            min={1}
            value={desiredCount}
            onChange={(e) => setDesiredCount(Number(e.target.value))}
            required
          />
        </label>

        <div className="form-buttons">
          <button type="button" className="cancel-btn" onClick={onClose}>
            ❌ {lang === "he" ? "בטל" : "Cancel"}
          </button>
          <button type="submit" className="save-btn">
            💾 {lang === "he" ? "שמור" : "Save"}
          </button>
        </div>
      </form>
      {errorMessage && (
        <ModalDialog
          title={lang === "he" ? "שגיאה" : "Error"}
          message={errorMessage}
          onConfirm={() => setErrorMessage(null)}
          confirmText="OK"
        />
      )}
    </div>
  );
}
