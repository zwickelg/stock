import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import StockPage from "./pages/StockPage";
import { useLanguage } from "./utils/LanguageContext";
import { translations } from "./utils/i18n";

function App() {
  const { lang, setLang } = useLanguage();

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: "white",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
    borderBottom: isActive ? "2px solid #fff" : "none",
    paddingBottom: "2px",
    marginRight: "1rem",
  });

  return (
    <div
      dir={lang === "he" ? "rtl" : "ltr"}
      style={{ textAlign: lang === "he" ? "right" : "left" }}
    >
      <Router>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 2rem",
            backgroundColor: "#4f46e5",
          }}
        >
          <div>
            <NavLink to="/" style={linkStyle}>
              {translations[lang].stock}
            </NavLink>
            <NavLink to="/products" style={linkStyle}>
              {translations[lang].products}
            </NavLink>
          </div>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "en" | "he")}
            style={{
              padding: "0.25rem 0.5rem",
              borderRadius: "5px",
              border: "none",
              fontWeight: "bold",
            }}
          >
            <option value="en">English</option>
            <option value="he">עברית</option>
          </select>
        </nav>

        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/" element={<StockPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
