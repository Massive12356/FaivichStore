const mockOrders = [
  {
    id: "ORD001",
    createdAt: "2025-04-13",
    customer: "Kofi Nkrumah",
    paymentMethod: "Card",
    total: 120,
    paymentStatus: "Paid",
    deliveryNumber: "DL12345",
    orderStatus: "Processing",
    products: [{ name: "Body lotion", quantity: 2, price: 60 }],
  },
  {
    id: "ORD002",
    createdAt: "2025-04-14",
    customer: "Alice Gyadu",
    paymentMethod: "Mobile Money",
    total: 150,
    paymentStatus: "Paid",
    deliveryNumber: "DL67890",
    orderStatus: "Shipped",
    products: [
      { name: "Glass Cleaner", quantity: 3, price: 30 },
      { name: "Green Tea", quantity: 1, price: 60 },
    ],
  },
  {
    id: "ORD003",
    createdAt: "2025-04-12",
    customer: "Kwame Boateng",
    paymentMethod: "Cash On Delivery",
    total: 85,
    paymentStatus: "Pending",
    deliveryNumber: "DL11223",
    orderStatus: "Processing",
    products: [
      { name: "Skin Toner", quantity: 1, price: 25 },
      { name: "Skin care", quantity: 1, price: 60 },
    ],
  },
  {
    id: "ORD004",
    createdAt: "2025-04-11",
    customer: "Ama Serwaa",
    paymentMethod: "Card",
    total: 200,
    paymentStatus: "Paid",
    deliveryNumber: "DL44556",
    orderStatus: "Delivered",
    products: [{ name: "Disinfectants", quantity: 2, price: 100 }],
  },
  {
    id: "ORD005",
    createdAt: "2025-04-10",
    customer: "Yaw Mensah",
    paymentMethod: "Mobile Money",
    total: 65,
    paymentStatus: "Unpaid",
    deliveryNumber: "DL77889",
    orderStatus: "Cancelled",
    products: [
      { name: "Glass cleaner", quantity: 1, price: 15 },
      { name: "Hair care", quantity: 2, price: 25 },
    ],
  },
  {
    id: "ORD006",
    createdAt: "2025-04-09",
    customer: "Linda Osei",
    paymentMethod: "Card",
    total: 300,
    paymentStatus: "Paid",
    deliveryNumber: "DL33445",
    orderStatus: "Delivered",
    products: [
      { name: "Stain remover", quantity: 1, price: 120 },
      { name: "Heat Sink", quantity: 2, price: 90 },
    ],
  },
  {
    id: "ORD007",
    createdAt: "2025-04-08",
    customer: "Kojo Antwi",
    paymentMethod: "Cash On Delivery",
    total: 55,
    paymentStatus: "Pending",
    deliveryNumber: "DL55667",
    orderStatus: "Processing",
    products: [{ name: "Jeba Hair Food", quantity: 5, price: 11 }],
  },
  {
    id: "ORD008",
    createdAt: "2025-04-07",
    customer: "Mabel Addo",
    paymentMethod: "Mobile Money",
    total: 90,
    paymentStatus: "Paid",
    deliveryNumber: "DL88990",
    orderStatus: "Shipped",
    products: [
      { name: "Detol", quantity: 1, price: 45 },
      { name: "Jeba Body Lotion", quantity: 1, price: 45 },
    ],
  },
  {
    id: "ORD009",
    createdAt: "2025-04-06",
    customer: "Samuel Tetteh",
    paymentMethod: "Card",
    total: 40,
    paymentStatus: "Unpaid",
    deliveryNumber: "DL99100",
    orderStatus: "Processing",
    products: [{ name: "Jeba body Lotion", quantity: 2, price: 20 }],
  },
  {
    id: "ORD010",
    createdAt: "2025-04-05",
    customer: "Akosua Asare",
    paymentMethod: "Mobile Money",
    total: 130,
    paymentStatus: "Paid",
    deliveryNumber: "DL10234",
    orderStatus: "Delivered",
    products: [{ name: "Jeba Body Lotion", quantity: 1, price: 130 }],
  },
];

export default mockOrders;
