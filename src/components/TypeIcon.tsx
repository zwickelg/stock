interface Props {
  type?: string;
  size?: number;
}

export default function TypeIcon({ type, size = 18 }: Props) {
  const commonProps: any = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: { verticalAlign: "middle", marginRight: 6 },
  };

  const ariaLabel = type || "product";
  const t = (type || "").toString().trim().toLowerCase();

  // helper to check keywords (case-insensitive)

  switch (t) {
    case "Dairy":
    case "מוצרי חלב":
      return (
        <svg {...commonProps} role="img" aria-label={ariaLabel}>
          <title>{ariaLabel}</title>
          {/* cap */}
          <rect x="10" y="2" width="4" height="2" rx="0.5" fill="#6C8EA3" />
          {/* neck */}
          <rect
            x="9.4"
            y="4"
            width="5.2"
            height="4"
            rx="0.8"
            fill="#EAF6FF"
            stroke="#6C8EA3"
            strokeWidth="0.8"
          />
          {/* body */}
          <path
            d="M8 8c0-1 1-2 4-2s4 1 4 2v8a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8z"
            fill="#fff"
            stroke="#6C8EA3"
            strokeWidth="0.9"
          />
          {/* milk level */}
          <path d="M9 13c1-1 5-1 6 0v3H9v-3z" fill="#EAF6FF" />
        </svg>
      );
    case "Canned":
    case "שימורים":
      return (
        <svg {...commonProps} role="img" aria-label={ariaLabel}>
          <title>{ariaLabel}</title>
          <ellipse
            cx="12"
            cy="6"
            rx="7"
            ry="2.4"
            fill="#dcdcdc"
            stroke="#999"
            strokeWidth="0.8"
          />
          <rect
            x="5"
            y="6"
            width="14"
            height="10"
            fill="#e6e6e6"
            stroke="#999"
            strokeWidth="0.8"
          />
          <ellipse
            cx="12"
            cy="16"
            rx="7"
            ry="1.6"
            fill="#cccccc"
            stroke="#999"
            strokeWidth="0.8"
          />
          <path d="M8 10h8" stroke="#999" strokeWidth="0.6" />
        </svg>
      );
    case "Bakery":
    case "מאפה":
      return (
        <svg {...commonProps} role="img" aria-label={ariaLabel}>
          <title>{ariaLabel}</title>
          <path
            d="M4 15c1-3 3-4 6-4s5 1 6 4"
            stroke="#8B5A2B"
            strokeWidth="1.2"
            fill="#F3D7B6"
          />
          <ellipse
            cx="12"
            cy="10"
            rx="6"
            ry="3"
            fill="#F3D7B6"
            stroke="#8B5A2B"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "Vegetable":
    case "ירק":
      return (
        <svg {...commonProps} role="img" aria-label={ariaLabel}>
          <title>{ariaLabel}</title>
          <circle cx="12" cy="12" r="6" fill="#66BB6A" />
        </svg>
      );
    case "Fruit":
    case "פרי":
      return (
        <svg {...commonProps} role="img" aria-label={ariaLabel}>
          <title>{ariaLabel}</title>
          <circle cx="12" cy="12" r="5" fill="#FF7043" />
          <path
            d="M14 6c0 1-1 2-2 2s-2-1-2-2"
            stroke="#2E7D32"
            strokeWidth="1"
          />
        </svg>
      );
    case "Grain":
    case "דגן":
      return (
        <svg {...commonProps} role="img" aria-label={ariaLabel}>
          <title>{ariaLabel}</title>
          <path d="M12 4v16" stroke="#F9A825" strokeWidth="1.6" />
          <path d="M8 8c2 2 4 2 8 0" stroke="#F9A825" strokeWidth="1.2" />
        </svg>
      );
    case "Oil":
    case "שמן":
      return (
        <svg {...commonProps} role="img" aria-label={ariaLabel}>
          <title>{ariaLabel}</title>
          <path
            d="M12 3c2 3 5 6 5 9a5 5 0 11-10 0c0-3 3-6 5-9z"
            fill="#A1887F"
          />
        </svg>
      );
    case "Drink":
    case "שתייה":
      return (
        <svg {...commonProps} role="img" aria-label={ariaLabel}>
          <title>{ariaLabel}</title>
          <rect x="8" y="4" width="8" height="14" rx="1" fill="#29B6F6" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps} role="img" aria-label={ariaLabel}>
          <title>{ariaLabel}</title>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke="#666"
            strokeWidth="1"
            fill="#eee"
          />
        </svg>
      );
  }
}
