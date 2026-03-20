export const products = [
  {
    id: 1,
    name: "Apple Watch Series 4",
    price: 120,
    originalPrice: 160,
    rating: 4,
    reviews: 131,
    description:
      "A lightweight smartwatch with a bright display, comfortable fit, and all-day performance for work, fitness, and travel.",
    images: [
      "/images/watch1.jpeg",
      "/images/watch2.jpeg",
      "/images/watch.jpeg",
    ],
    colors: [
      { id: "midnight", name: "Midnight", hex: "#1f2937" },
      { id: "blue", name: "Sky Blue", hex: "#4880ff" },
      { id: "rose", name: "Rose", hex: "#f472b6" },
      { id: "mint", name: "Mint", hex: "#34d399" },
    ],
    sizeOptions: [
      { id: "40mm", name: "40 mm" },
      { id: "44mm", name: "44 mm" },
      { id: "48mm", name: "48 mm" },
    ],
    specifications: [
      "Aluminium case with durable sport band",
      "Water resistant design for active everyday use",
      "Fast charging and smooth touch response",
    ],
    shipping:
      "Standard shipping takes 3 to 5 business days. Express shipping is available at checkout.",
    returns:
      "Returns are accepted within 30 days in original condition with all accessories included.",
  },
  {
    id: 2,
    name: "Apple Watch Series 5",
    price: 150,
    originalPrice: 199,
    rating: 5,
    reviews: 98,
    description:
      "An upgraded smartwatch experience with sharper visuals, refined health tracking, and a premium everyday finish.",
    images: [
      "/images/watch.jpeg",
      "/images/watch.jpeg",
      "/images/watch.jpeg",
    ],
    colors: [
      { id: "silver", name: "Silver", hex: "#d1d5db" },
      { id: "navy", name: "Navy", hex: "#1d4ed8" },
      { id: "coral", name: "Coral", hex: "#fb7185" },
    ],
    sizeOptions: [
      { id: "41mm", name: "41 mm" },
      { id: "45mm", name: "45 mm" },
    ],
    specifications: [
      "Always-on display with improved brightness",
      "Comfort-focused strap for long wear",
      "Enhanced motion and sleep tracking support",
    ],
    shipping:
      "Ships free on orders over $100 and includes tracking as soon as your order is packed.",
    returns:
      "Easy 30-day returns with prepaid pickup available in selected cities.",
  },
  {
    id: 3,
    name: "Apple Watch Series 5 Pro",
    price: 175,
    originalPrice: 225,
    rating: 5,
    reviews: 112,
    description:
      "Built for heavier daily use with a polished case, strong battery life, and a more premium presentation.",
    images: [
      "/images/watch.jpeg",
      "/images/watch.jpeg",
      "/images/watch.jpeg",
    ],
    colors: [
      { id: "graphite", name: "Graphite", hex: "#374151" },
      { id: "teal", name: "Teal", hex: "#0f766e" },
      { id: "sand", name: "Sand", hex: "#d6b38c" },
    ],
    sizeOptions: [
      { id: "42mm", name: "42 mm" },
      { id: "46mm", name: "46 mm" },
    ],
    specifications: [
      "Premium case finish with scratch-resistant glass",
      "Balanced performance for work and workouts",
      "Expanded storage for apps and offline media",
    ],
    shipping:
      "Orders are processed within 24 hours and usually delivered within one business week.",
    returns:
      "Return or exchange within 30 days if the product remains in resellable condition.",
  },
];

export const getProductById = (id) =>
  products.find((product) => Number(product.id) === Number(id));
