const typeIcons: Record<string, string> = {
  Dairy: "🥛",
  Bakery: "🥖",
  Vegetable: "🥕",
  Fruit: "🍎",
  Grain: "🌾",
  Oil: "🫒",
  Drink: "🧃",
  // Hebrew names
  "מצרכי חלב": "🥛",
  מאפה: "🥖",
  ירק: "🥕",
  פרי: "🍎",
  דגן: "🌾",
  שמן: "🫒",
  שתייה: "🧃",
};

export function getTypeIcon(type: string | undefined) {
  if (!type) return "";
  return typeIcons[type] || "📦";
}
