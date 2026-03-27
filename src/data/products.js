const approvedProductImages = [
  "/images/img3.png",
  "/images/img4.png",
  "/images/img5.png",
  "/images/img6.png",
  "/images/img7.png",
  "/images/img8.png",
  "/images/img9.png",
  "/images/img10.png",
  "/images/img11.png",
  "/images/img12.png",
  "/images/img13.png",
  "/images/img14.png",
  "/images/img15.png",
  "/images/img16.png",
  "/images/img17.png",
];

const rawProducts = [
  {
    "id": 1,
    "name": "Apple Watch Series 4",
    "brand": "Apple",
    "price": 50,
    "originalPrice": 160,
    "rating": 4,
    "reviews": 131,
    "gender": [
      "male"
    ],
    "description": "A lightweight confortable smartwatch.",
    "images": [
      "/images/img3.png",
      "/images/img4.png",
      "/images/img5.png"
    ],
    "colors": [
      {
        "id": "midnight",
        "name": "Black",
        "hex": "#1f2937"
      },
      {
        "id": "blue",
        "name": "Blue",
        "hex": "#4880ff"
      },
      {
        "id": "rose",
        "name": "Pink",
        "hex": "#f472b6"
      },
      {
        "id": "mint",
        "name": "Green",
        "hex": "#34d399"
      }
    ],
    "specifications": [
      "Aluminium watch",
      "Water resistant",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 2,
    "name": "Apple Watch Series 5",
    "brand": "Apple",
    "price": 150,
    "originalPrice": 199,
    "rating": 5,
    "reviews": 98,
    "gender": [
      "male"
    ],
    "description": "A lightweight confortable smartwatch.",
    "images": [
      "/images/img6.png",
      "/images/img7.png",
      "/images/img8.png"
    ],
    "colors": [
      {
        "id": "midnight",
        "name": "Black",
        "hex": "#1f2937"
      },
      {
        "id": "blue",
        "name": "Blue",
        "hex": "#4880ff"
      },
      {
        "id": "rose",
        "name": "Pink",
        "hex": "#f472b6"
      },
      {
        "id": "mint",
        "name": "Green",
        "hex": "#34d399"
      }
    ],
    "specifications": [
      "Aluminium watch",
      "Water resistant",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 3,
    "name": "Apple Watch Series 5 Pro",
    "brand": "Apple",
    "price": 175,
    "originalPrice": 225,
    "rating": 5,
    "reviews": 112,
    "gender": [
      "kids"
    ],
    "description": "A lightweight confortable smartwatch.",
    "images": [
      "/images/img9.png",
      "/images/img10.png",
      "/images/img11.png"
    ],
    "colors": [
      {
        "id": "midnight",
        "name": "Black",
        "hex": "#1f2937"
      },
      {
        "id": "blue",
        "name": "Blue",
        "hex": "#4880ff"
      },
      {
        "id": "rose",
        "name": "Pink",
        "hex": "#f472b6"
      },
      {
        "id": "mint",
        "name": "Green",
        "hex": "#34d399"
      }
    ],
    "specifications": [
      "Aluminium watch",
      "Water resistant",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 4,
    "name": "Samsung Galaxy Watch Active",
    "brand": "Samsung",
    "price": 140,
    "originalPrice": 210,
    "rating": 4,
    "reviews": 87,
    "gender": [
      "kids"
    ],
    "description": "A sporty smartwatch with bright AMOLED display.",
    "images": [
      "/images/img12.png",
      "/images/img13.png",
      "/images/img14.png"
    ],
    "colors": [
      {
        "id": "graphite",
        "name": "Graphite",
        "hex": "#334155"
      },
      {
        "id": "silver",
        "name": "Silver",
        "hex": "#cbd5e1"
      },
      {
        "id": "lime",
        "name": "Lime",
        "hex": "#84cc16"
      }
    ],
    "specifications": [
      "AMOLED display",
      "Fitness tracking",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 5,
    "name": "Fitbit Versa",
    "brand": "Fitbit",
    "price": 110,
    "originalPrice": 150,
    "rating": 4,
    "reviews": 76,
    "gender": [
      "male"
    ],
    "description": "A Fitbit smartWatch.",
    "images": [
      "/images/img15.png",
      "/images/img16.png",
      "/images/img17.png"
    ],
    "colors": [
      {
        "id": "charcoal",
        "name": "Charcoal",
        "hex": "#111827"
      },
      {
        "id": "cream",
        "name": "Cream",
        "hex": "#f8fafc"
      },
      {
        "id": "coral",
        "name": "Coral",
        "hex": "#fb7185"
      }
    ],
    "specifications": [
      "Sleep tracking",
      "Heart rate",
      "Water resistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 6,
    "name": "Noise ColorFit",
    "brand": "Noise",
    "price": 95,
    "originalPrice": 140,
    "rating": 4,
    "reviews": 144,
    "gender": [
      "female"
    ],
    "description": "A colorfull smartwatch.",
    "images": [
      "/images/img3.png",
      "/images/img4.png",
      "/images/img5.png"
    ],
    "colors": [
      {
        "id": "black",
        "name": "Black",
        "hex": "#1e293b"
      },
      {
        "id": "sky",
        "name": "Blue",
        "hex": "#38bdf8"
      },
      {
        "id": "peach",
        "name": "Peach",
        "hex": "#fdba74"
      }
    ],
    "specifications": [
      "7 day battery",
      "Workout modes",
      "Bluetooth calling"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 7,
    "name": "FireBolt GTS",
    "brand": "FireBolt",
    "price": 135,
    "originalPrice": 205,
    "rating": 5,
    "reviews": 91,
    "gender": [
      "male"
    ],
    "description": "A slim smartwatch.",
    "images": [
      "/images/img6.png",
      "/images/img7.png",
      "/images/img8.png"
    ],
    "colors": [
      {
        "id": "obsidian",
        "name": "Obsidian",
        "hex": "#0f172a"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "GPS support",
      "Water resistant",
      "Voice assistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 8,
    "name": "Rolex gt5",
    "brand": "Rolex",
    "price": 190,
    "originalPrice": 260,
    "rating": 5,
    "reviews": 108,
    "gender": [
      "kids"
    ],
    "description": "A premium smartwatch.",
    "images": [
      "/images/img9.png",
      "/images/img10.png",
      "/images/img11.png"
    ],
    "colors": [
      {
        "id": "carbon",
        "name": "Carbon",
        "hex": "#1f2937"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "Built-in GPS",
      "Music storage",
      "Body battery"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 9,
    "name": "Apple Watch SE 2",
    "brand": "Apple",
    "price": 129,
    "originalPrice": 179,
    "rating": 4,
    "reviews": 162,
    "gender": [
      "female"
    ],
    "description": "A compact Apple watch with reliable everyday fitness tracking.",
    "images": [
      "/images/img12.png",
      "/images/img13.png",
      "/images/img14.png"
    ],
    "colors": [
      {
        "id": "midnight",
        "name": "Black",
        "hex": "#1f2937"
      },
      {
        "id": "blue",
        "name": "Blue",
        "hex": "#4880ff"
      },
      {
        "id": "rose",
        "name": "Pink",
        "hex": "#f472b6"
      },
      {
        "id": "mint",
        "name": "Green",
        "hex": "#34d399"
      }
    ],
    "specifications": [
      "Aluminium watch",
      "Water resistant",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 10,
    "name": "Apple Watch Ultra Lite",
    "brand": "Apple",
    "price": 219,
    "originalPrice": 289,
    "rating": 5,
    "reviews": 201,
    "gender": [
      "male"
    ],
    "description": "A durable Apple smartwatch built for outdoor movement and longer battery life.",
    "images": [
      "/images/img15.png",
      "/images/img16.png",
      "/images/img17.png"
    ],
    "colors": [
      {
        "id": "midnight",
        "name": "Black",
        "hex": "#1f2937"
      },
      {
        "id": "blue",
        "name": "Blue",
        "hex": "#4880ff"
      },
      {
        "id": "rose",
        "name": "Pink",
        "hex": "#f472b6"
      },
      {
        "id": "mint",
        "name": "Green",
        "hex": "#34d399"
      }
    ],
    "specifications": [
      "Aluminium watch",
      "Water resistant",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 11,
    "name": "Apple Watch Series 6 Cellular",
    "brand": "Apple",
    "price": 189,
    "originalPrice": 249,
    "rating": 4,
    "reviews": 147,
    "gender": [
      "female"
    ],
    "description": "A cellular-ready Apple watch for active users who want freedom from the phone.",
    "images": [
      "/images/img3.png",
      "/images/img4.png",
      "/images/img5.png"
    ],
    "colors": [
      {
        "id": "midnight",
        "name": "Black",
        "hex": "#1f2937"
      },
      {
        "id": "blue",
        "name": "Blue",
        "hex": "#4880ff"
      },
      {
        "id": "rose",
        "name": "Pink",
        "hex": "#f472b6"
      },
      {
        "id": "mint",
        "name": "Green",
        "hex": "#34d399"
      }
    ],
    "specifications": [
      "Aluminium watch",
      "Water resistant",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 12,
    "name": "Apple Watch Series 7 Starlight",
    "brand": "Apple",
    "price": 205,
    "originalPrice": 275,
    "rating": 5,
    "reviews": 233,
    "gender": [
      "female"
    ],
    "description": "A bright display Apple watch with comfortable all-day wear.",
    "images": [
      "/images/img6.png",
      "/images/img7.png",
      "/images/img8.png"
    ],
    "colors": [
      {
        "id": "midnight",
        "name": "Black",
        "hex": "#1f2937"
      },
      {
        "id": "blue",
        "name": "Blue",
        "hex": "#4880ff"
      },
      {
        "id": "rose",
        "name": "Pink",
        "hex": "#f472b6"
      },
      {
        "id": "mint",
        "name": "Green",
        "hex": "#34d399"
      }
    ],
    "specifications": [
      "Aluminium watch",
      "Water resistant",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 13,
    "name": "Apple Watch Series 7 Nike",
    "brand": "Apple",
    "price": 214,
    "originalPrice": 284,
    "rating": 5,
    "reviews": 184,
    "gender": [
      "male"
    ],
    "description": "A performance-focused Apple watch with sporty styling.",
    "images": [
      "/images/img9.png",
      "/images/img10.png",
      "/images/img11.png"
    ],
    "colors": [
      {
        "id": "midnight",
        "name": "Black",
        "hex": "#1f2937"
      },
      {
        "id": "blue",
        "name": "Blue",
        "hex": "#4880ff"
      },
      {
        "id": "rose",
        "name": "Pink",
        "hex": "#f472b6"
      },
      {
        "id": "mint",
        "name": "Green",
        "hex": "#34d399"
      }
    ],
    "specifications": [
      "Aluminium watch",
      "Water resistant",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 14,
    "name": "Apple Watch Series 8 GPS",
    "brand": "Apple",
    "price": 229,
    "originalPrice": 309,
    "rating": 5,
    "reviews": 248,
    "gender": [
      "male"
    ],
    "description": "A smooth Apple smartwatch with strong wellness features and GPS support.",
    "images": [
      "/images/img12.png",
      "/images/img13.png",
      "/images/img14.png"
    ],
    "colors": [
      {
        "id": "midnight",
        "name": "Black",
        "hex": "#1f2937"
      },
      {
        "id": "blue",
        "name": "Blue",
        "hex": "#4880ff"
      },
      {
        "id": "rose",
        "name": "Pink",
        "hex": "#f472b6"
      },
      {
        "id": "mint",
        "name": "Green",
        "hex": "#34d399"
      }
    ],
    "specifications": [
      "Aluminium watch",
      "Water resistant",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 15,
    "name": "Apple Watch Series 8 Aluminum",
    "brand": "Apple",
    "price": 239,
    "originalPrice": 319,
    "rating": 4,
    "reviews": 176,
    "gender": [
      "female"
    ],
    "description": "A lightweight aluminum Apple watch for daily fitness and notifications.",
    "images": [
      "/images/img15.png",
      "/images/img16.png",
      "/images/img17.png"
    ],
    "colors": [
      {
        "id": "midnight",
        "name": "Black",
        "hex": "#1f2937"
      },
      {
        "id": "blue",
        "name": "Blue",
        "hex": "#4880ff"
      },
      {
        "id": "rose",
        "name": "Pink",
        "hex": "#f472b6"
      },
      {
        "id": "mint",
        "name": "Green",
        "hex": "#34d399"
      }
    ],
    "specifications": [
      "Aluminium watch",
      "Water resistant",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 16,
    "name": "Apple Watch Series 9 Midnight",
    "brand": "Apple",
    "price": 259,
    "originalPrice": 339,
    "rating": 5,
    "reviews": 266,
    "gender": [
      "male"
    ],
    "description": "A newer Apple smartwatch with smooth performance and premium feel.",
    "images": [
      "/images/img3.png",
      "/images/img4.png",
      "/images/img5.png"
    ],
    "colors": [
      {
        "id": "midnight",
        "name": "Black",
        "hex": "#1f2937"
      },
      {
        "id": "blue",
        "name": "Blue",
        "hex": "#4880ff"
      },
      {
        "id": "rose",
        "name": "Pink",
        "hex": "#f472b6"
      },
      {
        "id": "mint",
        "name": "Green",
        "hex": "#34d399"
      }
    ],
    "specifications": [
      "Aluminium watch",
      "Water resistant",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 17,
    "name": "Apple Watch Sport Loop",
    "brand": "Apple",
    "price": 165,
    "originalPrice": 220,
    "rating": 4,
    "reviews": 139,
    "gender": [
      "kids"
    ],
    "description": "A lightweight Apple watch bundle styled with a sport loop finish.",
    "images": [
      "/images/img6.png",
      "/images/img7.png",
      "/images/img8.png"
    ],
    "colors": [
      {
        "id": "midnight",
        "name": "Black",
        "hex": "#1f2937"
      },
      {
        "id": "blue",
        "name": "Blue",
        "hex": "#4880ff"
      },
      {
        "id": "rose",
        "name": "Pink",
        "hex": "#f472b6"
      },
      {
        "id": "mint",
        "name": "Green",
        "hex": "#34d399"
      }
    ],
    "specifications": [
      "Aluminium watch",
      "Water resistant",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 18,
    "name": "Apple Watch Premium Steel",
    "brand": "Apple",
    "price": 279,
    "originalPrice": 369,
    "rating": 5,
    "reviews": 188,
    "gender": [
      "male"
    ],
    "description": "A premium Apple smartwatch with refined steel-inspired styling.",
    "images": [
      "/images/img9.png",
      "/images/img10.png",
      "/images/img11.png"
    ],
    "colors": [
      {
        "id": "midnight",
        "name": "Black",
        "hex": "#1f2937"
      },
      {
        "id": "blue",
        "name": "Blue",
        "hex": "#4880ff"
      },
      {
        "id": "rose",
        "name": "Pink",
        "hex": "#f472b6"
      },
      {
        "id": "mint",
        "name": "Green",
        "hex": "#34d399"
      }
    ],
    "specifications": [
      "Aluminium watch",
      "Water resistant",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 19,
    "name": "Samsung Galaxy Watch 4 Classic",
    "brand": "Samsung",
    "price": 168,
    "originalPrice": 229,
    "rating": 4,
    "reviews": 154,
    "gender": [
      "male"
    ],
    "description": "A classic Samsung smartwatch with crisp display and wellness tools.",
    "images": [
      "/images/img12.png",
      "/images/img13.png",
      "/images/img14.png"
    ],
    "colors": [
      {
        "id": "graphite",
        "name": "Graphite",
        "hex": "#334155"
      },
      {
        "id": "silver",
        "name": "Silver",
        "hex": "#cbd5e1"
      },
      {
        "id": "lime",
        "name": "Lime",
        "hex": "#84cc16"
      }
    ],
    "specifications": [
      "AMOLED display",
      "Fitness tracking",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 20,
    "name": "Samsung Galaxy Watch 5",
    "brand": "Samsung",
    "price": 179,
    "originalPrice": 245,
    "rating": 5,
    "reviews": 221,
    "gender": [
      "female"
    ],
    "description": "A polished Samsung watch with improved sensors and fast charging.",
    "images": [
      "/images/img15.png",
      "/images/img16.png",
      "/images/img17.png"
    ],
    "colors": [
      {
        "id": "graphite",
        "name": "Graphite",
        "hex": "#334155"
      },
      {
        "id": "silver",
        "name": "Silver",
        "hex": "#cbd5e1"
      },
      {
        "id": "lime",
        "name": "Lime",
        "hex": "#84cc16"
      }
    ],
    "specifications": [
      "AMOLED display",
      "Fitness tracking",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 21,
    "name": "Samsung Galaxy Watch 5 Pro",
    "brand": "Samsung",
    "price": 219,
    "originalPrice": 299,
    "rating": 5,
    "reviews": 209,
    "gender": [
      "male"
    ],
    "description": "A Samsung smartwatch tuned for longer battery life and adventure use.",
    "images": [
      "/images/img3.png",
      "/images/img4.png",
      "/images/img5.png"
    ],
    "colors": [
      {
        "id": "graphite",
        "name": "Graphite",
        "hex": "#334155"
      },
      {
        "id": "silver",
        "name": "Silver",
        "hex": "#cbd5e1"
      },
      {
        "id": "lime",
        "name": "Lime",
        "hex": "#84cc16"
      }
    ],
    "specifications": [
      "AMOLED display",
      "Fitness tracking",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 22,
    "name": "Samsung Galaxy Watch 6 LTE",
    "brand": "Samsung",
    "price": 249,
    "originalPrice": 329,
    "rating": 5,
    "reviews": 192,
    "gender": [
      "female"
    ],
    "description": "A connected Samsung smartwatch with LTE convenience and a vivid screen.",
    "images": [
      "/images/img6.png",
      "/images/img7.png",
      "/images/img8.png"
    ],
    "colors": [
      {
        "id": "graphite",
        "name": "Graphite",
        "hex": "#334155"
      },
      {
        "id": "silver",
        "name": "Silver",
        "hex": "#cbd5e1"
      },
      {
        "id": "lime",
        "name": "Lime",
        "hex": "#84cc16"
      }
    ],
    "specifications": [
      "AMOLED display",
      "Fitness tracking",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 23,
    "name": "Samsung Galaxy Watch 6 Classic",
    "brand": "Samsung",
    "price": 259,
    "originalPrice": 349,
    "rating": 5,
    "reviews": 215,
    "gender": [
      "male"
    ],
    "description": "A premium Samsung watch with a familiar rotating-bezel inspired style.",
    "images": [
      "/images/img9.png",
      "/images/img10.png",
      "/images/img11.png"
    ],
    "colors": [
      {
        "id": "graphite",
        "name": "Graphite",
        "hex": "#334155"
      },
      {
        "id": "silver",
        "name": "Silver",
        "hex": "#cbd5e1"
      },
      {
        "id": "lime",
        "name": "Lime",
        "hex": "#84cc16"
      }
    ],
    "specifications": [
      "AMOLED display",
      "Fitness tracking",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 24,
    "name": "Samsung Galaxy Active Fit",
    "brand": "Samsung",
    "price": 149,
    "originalPrice": 210,
    "rating": 4,
    "reviews": 111,
    "gender": [
      "kids"
    ],
    "description": "A lightweight Samsung smartwatch for active everyday wear.",
    "images": [
      "/images/img12.png",
      "/images/img13.png",
      "/images/img14.png"
    ],
    "colors": [
      {
        "id": "graphite",
        "name": "Graphite",
        "hex": "#334155"
      },
      {
        "id": "silver",
        "name": "Silver",
        "hex": "#cbd5e1"
      },
      {
        "id": "lime",
        "name": "Lime",
        "hex": "#84cc16"
      }
    ],
    "specifications": [
      "AMOLED display",
      "Fitness tracking",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 25,
    "name": "Samsung Galaxy Neo Sport",
    "brand": "Samsung",
    "price": 159,
    "originalPrice": 219,
    "rating": 4,
    "reviews": 118,
    "gender": [
      "female"
    ],
    "description": "A sporty Samsung watch built around comfort and training basics.",
    "images": [
      "/images/img15.png",
      "/images/img16.png",
      "/images/img17.png"
    ],
    "colors": [
      {
        "id": "graphite",
        "name": "Graphite",
        "hex": "#334155"
      },
      {
        "id": "silver",
        "name": "Silver",
        "hex": "#cbd5e1"
      },
      {
        "id": "lime",
        "name": "Lime",
        "hex": "#84cc16"
      }
    ],
    "specifications": [
      "AMOLED display",
      "Fitness tracking",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 26,
    "name": "Samsung Galaxy Watch Flex",
    "brand": "Samsung",
    "price": 172,
    "originalPrice": 239,
    "rating": 4,
    "reviews": 133,
    "gender": [
      "male"
    ],
    "description": "A flexible Samsung smartwatch option for style and fitness tracking.",
    "images": [
      "/images/img3.png",
      "/images/img4.png",
      "/images/img5.png"
    ],
    "colors": [
      {
        "id": "graphite",
        "name": "Graphite",
        "hex": "#334155"
      },
      {
        "id": "silver",
        "name": "Silver",
        "hex": "#cbd5e1"
      },
      {
        "id": "lime",
        "name": "Lime",
        "hex": "#84cc16"
      }
    ],
    "specifications": [
      "AMOLED display",
      "Fitness tracking",
      "Fast charging"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 27,
    "name": "Fitbit Versa 2",
    "brand": "Fitbit",
    "price": 119,
    "originalPrice": 165,
    "rating": 4,
    "reviews": 121,
    "gender": [
      "female"
    ],
    "description": "A dependable Fitbit smartwatch with familiar health tracking essentials.",
    "images": [
      "/images/img6.png",
      "/images/img7.png",
      "/images/img8.png"
    ],
    "colors": [
      {
        "id": "charcoal",
        "name": "Charcoal",
        "hex": "#111827"
      },
      {
        "id": "cream",
        "name": "Cream",
        "hex": "#f8fafc"
      },
      {
        "id": "coral",
        "name": "Coral",
        "hex": "#fb7185"
      }
    ],
    "specifications": [
      "Sleep tracking",
      "Heart rate",
      "Water resistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 28,
    "name": "Fitbit Versa 3",
    "brand": "Fitbit",
    "price": 139,
    "originalPrice": 189,
    "rating": 4,
    "reviews": 166,
    "gender": [
      "male"
    ],
    "description": "A Fitbit smartwatch that balances comfort, exercise, and sleep tracking.",
    "images": [
      "/images/img9.png",
      "/images/img10.png",
      "/images/img11.png"
    ],
    "colors": [
      {
        "id": "charcoal",
        "name": "Charcoal",
        "hex": "#111827"
      },
      {
        "id": "cream",
        "name": "Cream",
        "hex": "#f8fafc"
      },
      {
        "id": "coral",
        "name": "Coral",
        "hex": "#fb7185"
      }
    ],
    "specifications": [
      "Sleep tracking",
      "Heart rate",
      "Water resistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 29,
    "name": "Fitbit Sense Active",
    "brand": "Fitbit",
    "price": 185,
    "originalPrice": 245,
    "rating": 5,
    "reviews": 172,
    "gender": [
      "female"
    ],
    "description": "A Fitbit watch with advanced wellness tracking and a clean modern design.",
    "images": [
      "/images/img12.png",
      "/images/img13.png",
      "/images/img14.png"
    ],
    "colors": [
      {
        "id": "charcoal",
        "name": "Charcoal",
        "hex": "#111827"
      },
      {
        "id": "cream",
        "name": "Cream",
        "hex": "#f8fafc"
      },
      {
        "id": "coral",
        "name": "Coral",
        "hex": "#fb7185"
      }
    ],
    "specifications": [
      "Sleep tracking",
      "Heart rate",
      "Water resistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 30,
    "name": "Fitbit Charge Watch",
    "brand": "Fitbit",
    "price": 129,
    "originalPrice": 175,
    "rating": 4,
    "reviews": 104,
    "gender": [
      "kids"
    ],
    "description": "A compact Fitbit smart wearable for step counts and daily motivation.",
    "images": [
      "/images/img15.png",
      "/images/img16.png",
      "/images/img17.png"
    ],
    "colors": [
      {
        "id": "charcoal",
        "name": "Charcoal",
        "hex": "#111827"
      },
      {
        "id": "cream",
        "name": "Cream",
        "hex": "#f8fafc"
      },
      {
        "id": "coral",
        "name": "Coral",
        "hex": "#fb7185"
      }
    ],
    "specifications": [
      "Sleep tracking",
      "Heart rate",
      "Water resistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 31,
    "name": "Fitbit Inspire Smart",
    "brand": "Fitbit",
    "price": 99,
    "originalPrice": 145,
    "rating": 4,
    "reviews": 95,
    "gender": [
      "female"
    ],
    "description": "A slim Fitbit smart watch with a focus on daily movement tracking.",
    "images": [
      "/images/img3.png",
      "/images/img4.png",
      "/images/img5.png"
    ],
    "colors": [
      {
        "id": "charcoal",
        "name": "Charcoal",
        "hex": "#111827"
      },
      {
        "id": "cream",
        "name": "Cream",
        "hex": "#f8fafc"
      },
      {
        "id": "coral",
        "name": "Coral",
        "hex": "#fb7185"
      }
    ],
    "specifications": [
      "Sleep tracking",
      "Heart rate",
      "Water resistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 32,
    "name": "Fitbit Luxe Tracker Watch",
    "brand": "Fitbit",
    "price": 155,
    "originalPrice": 205,
    "rating": 4,
    "reviews": 113,
    "gender": [
      "female"
    ],
    "description": "A stylish Fitbit wearable with wellness-first features and polished looks.",
    "images": [
      "/images/img6.png",
      "/images/img7.png",
      "/images/img8.png"
    ],
    "colors": [
      {
        "id": "charcoal",
        "name": "Charcoal",
        "hex": "#111827"
      },
      {
        "id": "cream",
        "name": "Cream",
        "hex": "#f8fafc"
      },
      {
        "id": "coral",
        "name": "Coral",
        "hex": "#fb7185"
      }
    ],
    "specifications": [
      "Sleep tracking",
      "Heart rate",
      "Water resistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 33,
    "name": "Fitbit Versa Sport",
    "brand": "Fitbit",
    "price": 144,
    "originalPrice": 194,
    "rating": 4,
    "reviews": 126,
    "gender": [
      "male"
    ],
    "description": "A sport-focused Fitbit smartwatch for routine runs and gym sessions.",
    "images": [
      "/images/img9.png",
      "/images/img10.png",
      "/images/img11.png"
    ],
    "colors": [
      {
        "id": "charcoal",
        "name": "Charcoal",
        "hex": "#111827"
      },
      {
        "id": "cream",
        "name": "Cream",
        "hex": "#f8fafc"
      },
      {
        "id": "coral",
        "name": "Coral",
        "hex": "#fb7185"
      }
    ],
    "specifications": [
      "Sleep tracking",
      "Heart rate",
      "Water resistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 34,
    "name": "Fitbit Sense Pro",
    "brand": "Fitbit",
    "price": 199,
    "originalPrice": 259,
    "rating": 5,
    "reviews": 183,
    "gender": [
      "male"
    ],
    "description": "A premium Fitbit model with advanced metrics and sleek styling.",
    "images": [
      "/images/img12.png",
      "/images/img13.png",
      "/images/img14.png"
    ],
    "colors": [
      {
        "id": "charcoal",
        "name": "Charcoal",
        "hex": "#111827"
      },
      {
        "id": "cream",
        "name": "Cream",
        "hex": "#f8fafc"
      },
      {
        "id": "coral",
        "name": "Coral",
        "hex": "#fb7185"
      }
    ],
    "specifications": [
      "Sleep tracking",
      "Heart rate",
      "Water resistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 35,
    "name": "Noise ColorFit Icon 2",
    "brand": "Noise",
    "price": 89,
    "originalPrice": 129,
    "rating": 4,
    "reviews": 148,
    "gender": [
      "female"
    ],
    "description": "A bright Noise smartwatch with daily essentials and a lightweight body.",
    "images": [
      "/images/img15.png",
      "/images/img16.png",
      "/images/img17.png"
    ],
    "colors": [
      {
        "id": "black",
        "name": "Black",
        "hex": "#1e293b"
      },
      {
        "id": "sky",
        "name": "Blue",
        "hex": "#38bdf8"
      },
      {
        "id": "peach",
        "name": "Peach",
        "hex": "#fdba74"
      }
    ],
    "specifications": [
      "7 day battery",
      "Workout modes",
      "Bluetooth calling"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 36,
    "name": "Noise ColorFit Pulse",
    "brand": "Noise",
    "price": 79,
    "originalPrice": 119,
    "rating": 4,
    "reviews": 135,
    "gender": [
      "male"
    ],
    "description": "A budget-friendly Noise watch with the core smart features people use most.",
    "images": [
      "/images/img3.png",
      "/images/img4.png",
      "/images/img5.png"
    ],
    "colors": [
      {
        "id": "black",
        "name": "Black",
        "hex": "#1e293b"
      },
      {
        "id": "sky",
        "name": "Blue",
        "hex": "#38bdf8"
      },
      {
        "id": "peach",
        "name": "Peach",
        "hex": "#fdba74"
      }
    ],
    "specifications": [
      "7 day battery",
      "Workout modes",
      "Bluetooth calling"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 37,
    "name": "Noise ColorFit Pro 4",
    "brand": "Noise",
    "price": 109,
    "originalPrice": 159,
    "rating": 4,
    "reviews": 174,
    "gender": [
      "female"
    ],
    "description": "A balanced Noise smartwatch with a stronger finish and improved comfort.",
    "images": [
      "/images/img6.png",
      "/images/img7.png",
      "/images/img8.png"
    ],
    "colors": [
      {
        "id": "black",
        "name": "Black",
        "hex": "#1e293b"
      },
      {
        "id": "sky",
        "name": "Blue",
        "hex": "#38bdf8"
      },
      {
        "id": "peach",
        "name": "Peach",
        "hex": "#fdba74"
      }
    ],
    "specifications": [
      "7 day battery",
      "Workout modes",
      "Bluetooth calling"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 38,
    "name": "NoiseFit Halo",
    "brand": "Noise",
    "price": 119,
    "originalPrice": 169,
    "rating": 5,
    "reviews": 182,
    "gender": [
      "male"
    ],
    "description": "A premium-looking Noise watch with broad day-to-day smart features.",
    "images": [
      "/images/img9.png",
      "/images/img10.png",
      "/images/img11.png"
    ],
    "colors": [
      {
        "id": "black",
        "name": "Black",
        "hex": "#1e293b"
      },
      {
        "id": "sky",
        "name": "Blue",
        "hex": "#38bdf8"
      },
      {
        "id": "peach",
        "name": "Peach",
        "hex": "#fdba74"
      }
    ],
    "specifications": [
      "7 day battery",
      "Workout modes",
      "Bluetooth calling"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 39,
    "name": "Noise Rush",
    "brand": "Noise",
    "price": 72,
    "originalPrice": 109,
    "rating": 4,
    "reviews": 102,
    "gender": [
      "kids"
    ],
    "description": "A simple Noise smartwatch made for lightweight comfort and ease of use.",
    "images": [
      "/images/img12.png",
      "/images/img13.png",
      "/images/img14.png"
    ],
    "colors": [
      {
        "id": "black",
        "name": "Black",
        "hex": "#1e293b"
      },
      {
        "id": "sky",
        "name": "Blue",
        "hex": "#38bdf8"
      },
      {
        "id": "peach",
        "name": "Peach",
        "hex": "#fdba74"
      }
    ],
    "specifications": [
      "7 day battery",
      "Workout modes",
      "Bluetooth calling"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 40,
    "name": "Noise Active X",
    "brand": "Noise",
    "price": 98,
    "originalPrice": 145,
    "rating": 4,
    "reviews": 127,
    "gender": [
      "male"
    ],
    "description": "A versatile Noise model with fitness modes and a sporty finish.",
    "images": [
      "/images/img15.png",
      "/images/img16.png",
      "/images/img17.png"
    ],
    "colors": [
      {
        "id": "black",
        "name": "Black",
        "hex": "#1e293b"
      },
      {
        "id": "sky",
        "name": "Blue",
        "hex": "#38bdf8"
      },
      {
        "id": "peach",
        "name": "Peach",
        "hex": "#fdba74"
      }
    ],
    "specifications": [
      "7 day battery",
      "Workout modes",
      "Bluetooth calling"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 41,
    "name": "Noise Orbit",
    "brand": "Noise",
    "price": 92,
    "originalPrice": 136,
    "rating": 4,
    "reviews": 119,
    "gender": [
      "female"
    ],
    "description": "A sleek Noise smartwatch designed for everyday wear and notifications.",
    "images": [
      "/images/img3.png",
      "/images/img4.png",
      "/images/img5.png"
    ],
    "colors": [
      {
        "id": "black",
        "name": "Black",
        "hex": "#1e293b"
      },
      {
        "id": "sky",
        "name": "Blue",
        "hex": "#38bdf8"
      },
      {
        "id": "peach",
        "name": "Peach",
        "hex": "#fdba74"
      }
    ],
    "specifications": [
      "7 day battery",
      "Workout modes",
      "Bluetooth calling"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 42,
    "name": "Noise Edge",
    "brand": "Noise",
    "price": 114,
    "originalPrice": 164,
    "rating": 5,
    "reviews": 141,
    "gender": [
      "male"
    ],
    "description": "A sharper Noise watch variant with premium styling and a strong display.",
    "images": [
      "/images/img6.png",
      "/images/img7.png",
      "/images/img8.png"
    ],
    "colors": [
      {
        "id": "black",
        "name": "Black",
        "hex": "#1e293b"
      },
      {
        "id": "sky",
        "name": "Blue",
        "hex": "#38bdf8"
      },
      {
        "id": "peach",
        "name": "Peach",
        "hex": "#fdba74"
      }
    ],
    "specifications": [
      "7 day battery",
      "Workout modes",
      "Bluetooth calling"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 43,
    "name": "FireBolt Ninja Call Pro",
    "brand": "FireBolt",
    "price": 99,
    "originalPrice": 149,
    "rating": 4,
    "reviews": 151,
    "gender": [
      "male"
    ],
    "description": "A FireBolt smartwatch with calling support and an athletic design.",
    "images": [
      "/images/img9.png",
      "/images/img10.png",
      "/images/img11.png"
    ],
    "colors": [
      {
        "id": "obsidian",
        "name": "Obsidian",
        "hex": "#0f172a"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "GPS support",
      "Water resistant",
      "Voice assistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 44,
    "name": "FireBolt Phoenix Ultra",
    "brand": "FireBolt",
    "price": 129,
    "originalPrice": 185,
    "rating": 5,
    "reviews": 162,
    "gender": [
      "female"
    ],
    "description": "A FireBolt model with a bold design and upgraded battery performance.",
    "images": [
      "/images/img12.png",
      "/images/img13.png",
      "/images/img14.png"
    ],
    "colors": [
      {
        "id": "obsidian",
        "name": "Obsidian",
        "hex": "#0f172a"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "GPS support",
      "Water resistant",
      "Voice assistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 45,
    "name": "FireBolt Invincible Plus",
    "brand": "FireBolt",
    "price": 149,
    "originalPrice": 205,
    "rating": 5,
    "reviews": 178,
    "gender": [
      "male"
    ],
    "description": "A larger FireBolt smartwatch for users who want a striking look.",
    "images": [
      "/images/img15.png",
      "/images/img16.png",
      "/images/img17.png"
    ],
    "colors": [
      {
        "id": "obsidian",
        "name": "Obsidian",
        "hex": "#0f172a"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "GPS support",
      "Water resistant",
      "Voice assistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 46,
    "name": "FireBolt Visionary Pro",
    "brand": "FireBolt",
    "price": 154,
    "originalPrice": 214,
    "rating": 4,
    "reviews": 134,
    "gender": [
      "female"
    ],
    "description": "A clean FireBolt wearable with calling, tracking, and strong everyday value.",
    "images": [
      "/images/img3.png",
      "/images/img4.png",
      "/images/img5.png"
    ],
    "colors": [
      {
        "id": "obsidian",
        "name": "Obsidian",
        "hex": "#0f172a"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "GPS support",
      "Water resistant",
      "Voice assistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 47,
    "name": "FireBolt Sphere X",
    "brand": "FireBolt",
    "price": 117,
    "originalPrice": 169,
    "rating": 4,
    "reviews": 116,
    "gender": [
      "male"
    ],
    "description": "A rounded FireBolt smartwatch with an energetic sporty feel.",
    "images": [
      "/images/img6.png",
      "/images/img7.png",
      "/images/img8.png"
    ],
    "colors": [
      {
        "id": "obsidian",
        "name": "Obsidian",
        "hex": "#0f172a"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "GPS support",
      "Water resistant",
      "Voice assistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 48,
    "name": "FireBolt Asteroid Max",
    "brand": "FireBolt",
    "price": 139,
    "originalPrice": 199,
    "rating": 4,
    "reviews": 143,
    "gender": [
      "kids"
    ],
    "description": "A bold FireBolt design with eye-catching styling and fitness modes.",
    "images": [
      "/images/img9.png",
      "/images/img10.png",
      "/images/img11.png"
    ],
    "colors": [
      {
        "id": "obsidian",
        "name": "Obsidian",
        "hex": "#0f172a"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "GPS support",
      "Water resistant",
      "Voice assistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 49,
    "name": "FireBolt Combat Smart",
    "brand": "FireBolt",
    "price": 145,
    "originalPrice": 209,
    "rating": 5,
    "reviews": 171,
    "gender": [
      "male"
    ],
    "description": "A rugged FireBolt smartwatch for active routines and tougher styling.",
    "images": [
      "/images/img12.png",
      "/images/img13.png",
      "/images/img14.png"
    ],
    "colors": [
      {
        "id": "obsidian",
        "name": "Obsidian",
        "hex": "#0f172a"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "GPS support",
      "Water resistant",
      "Voice assistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 50,
    "name": "FireBolt Beast Connect",
    "brand": "FireBolt",
    "price": 132,
    "originalPrice": 189,
    "rating": 4,
    "reviews": 125,
    "gender": [
      "female"
    ],
    "description": "A connected FireBolt watch built around comfort and feature value.",
    "images": [
      "/images/img15.png",
      "/images/img16.png",
      "/images/img17.png"
    ],
    "colors": [
      {
        "id": "obsidian",
        "name": "Obsidian",
        "hex": "#0f172a"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "GPS support",
      "Water resistant",
      "Voice assistant"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 51,
    "name": "Rolex GT6",
    "brand": "Rolex",
    "price": 265,
    "originalPrice": 349,
    "rating": 5,
    "reviews": 145,
    "gender": [
      "male"
    ],
    "description": "A luxury-inspired Rolex smartwatch concept with rich styling.",
    "images": [
      "/images/img3.png",
      "/images/img4.png",
      "/images/img5.png"
    ],
    "colors": [
      {
        "id": "carbon",
        "name": "Carbon",
        "hex": "#1f2937"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "Built-in GPS",
      "Music storage",
      "Body battery"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 52,
    "name": "Rolex GT7 Elite",
    "brand": "Rolex",
    "price": 289,
    "originalPrice": 379,
    "rating": 5,
    "reviews": 153,
    "gender": [
      "female"
    ],
    "description": "A premium Rolex-branded smart watch concept with elegant details.",
    "images": [
      "/images/img6.png",
      "/images/img7.png",
      "/images/img8.png"
    ],
    "colors": [
      {
        "id": "carbon",
        "name": "Carbon",
        "hex": "#1f2937"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "Built-in GPS",
      "Music storage",
      "Body battery"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 53,
    "name": "Rolex Royal Sport",
    "brand": "Rolex",
    "price": 279,
    "originalPrice": 369,
    "rating": 5,
    "reviews": 139,
    "gender": [
      "male"
    ],
    "description": "A sport-luxury Rolex watch concept with refined case styling.",
    "images": [
      "/images/img9.png",
      "/images/img10.png",
      "/images/img11.png"
    ],
    "colors": [
      {
        "id": "carbon",
        "name": "Carbon",
        "hex": "#1f2937"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "Built-in GPS",
      "Music storage",
      "Body battery"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 54,
    "name": "Rolex Imperial Smart",
    "brand": "Rolex",
    "price": 299,
    "originalPrice": 395,
    "rating": 5,
    "reviews": 161,
    "gender": [
      "female"
    ],
    "description": "A polished Rolex smart wearable concept for premium fashion appeal.",
    "images": [
      "/images/img12.png",
      "/images/img13.png",
      "/images/img14.png"
    ],
    "colors": [
      {
        "id": "carbon",
        "name": "Carbon",
        "hex": "#1f2937"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "Built-in GPS",
      "Music storage",
      "Body battery"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 55,
    "name": "Rolex Chrono Max",
    "brand": "Rolex",
    "price": 309,
    "originalPrice": 409,
    "rating": 5,
    "reviews": 168,
    "gender": [
      "male"
    ],
    "description": "A large-face Rolex smart watch concept with bold premium finishing.",
    "images": [
      "/images/img15.png",
      "/images/img16.png",
      "/images/img17.png"
    ],
    "colors": [
      {
        "id": "carbon",
        "name": "Carbon",
        "hex": "#1f2937"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "Built-in GPS",
      "Music storage",
      "Body battery"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 56,
    "name": "Rolex Oyster Connect",
    "brand": "Rolex",
    "price": 295,
    "originalPrice": 389,
    "rating": 4,
    "reviews": 132,
    "gender": [
      "kids"
    ],
    "description": "A connected Rolex-inspired design with a premium bracelet look.",
    "images": [
      "/images/img3.png",
      "/images/img4.png",
      "/images/img5.png"
    ],
    "colors": [
      {
        "id": "carbon",
        "name": "Carbon",
        "hex": "#1f2937"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "Built-in GPS",
      "Music storage",
      "Body battery"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 57,
    "name": "Rolex Prestige X",
    "brand": "Rolex",
    "price": 319,
    "originalPrice": 429,
    "rating": 5,
    "reviews": 176,
    "gender": [
      "male"
    ],
    "description": "A prestige-focused Rolex smartwatch concept with a modern luxury edge.",
    "images": [
      "/images/img6.png",
      "/images/img7.png",
      "/images/img8.png"
    ],
    "colors": [
      {
        "id": "carbon",
        "name": "Carbon",
        "hex": "#1f2937"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "Built-in GPS",
      "Music storage",
      "Body battery"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  },
  {
    "id": 58,
    "name": "Rolex Crown Fit",
    "brand": "Rolex",
    "price": 271,
    "originalPrice": 355,
    "rating": 4,
    "reviews": 122,
    "gender": [
      "female"
    ],
    "description": "A premium-style Rolex concept that pairs luxury looks with fitness basics.",
    "images": [
      "/images/img9.png",
      "/images/img10.png",
      "/images/img11.png"
    ],
    "colors": [
      {
        "id": "carbon",
        "name": "Carbon",
        "hex": "#1f2937"
      },
      {
        "id": "ice",
        "name": "Ice",
        "hex": "#dbeafe"
      },
      {
        "id": "orange",
        "name": "Orange",
        "hex": "#fb923c"
      }
    ],
    "specifications": [
      "Built-in GPS",
      "Music storage",
      "Body battery"
    ],
    "shipping": "Easy shipping",
    "returns": "Easy return policies"
  }
];

export const products = rawProducts.map((product, index) => {
  const imageStartIndex = (index * 3) % approvedProductImages.length;

  return {
    ...product,
    images: Array.from({ length: 3 }, (_, imageIndex) => {
      const poolIndex =
        (imageStartIndex + imageIndex) % approvedProductImages.length;
      return approvedProductImages[poolIndex];
    }),
  };
});

export const getProductById = (id) =>
  products.find((product) => Number(product.id) === Number(id));
