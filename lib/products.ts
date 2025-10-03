export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number | null
  image: string
  images: string[]
  badge: string | null
  category: string
  description: string
  specs: { label: string; value: string }[]
  inStock: boolean
}

export const products: Product[] = [
  {
    id: 1,
    name: "Tororo Cement 50kg Bag",
    price: 35000,
    originalPrice: null,
    image: "/tororo-cement-bag-50kg.jpg",
    images: ["/tororo-cement-bag-50kg.jpg", "/bags-of-tororo-cement-stacked.jpg"],
    badge: "Best Seller",
    category: "Building Materials",
    description:
      "Premium quality Tororo Cement 50kg bag, perfect for all construction needs. High strength and durability for foundations, walls, and structural work.",
    specs: [
      { label: "Weight", value: "50kg" },
      { label: "Type", value: "Portland Cement" },
      { label: "Brand", value: "Tororo" },
      { label: "Application", value: "General Construction" },
    ],
    inStock: true,
  },
  {
    id: 2,
    name: "Iron Sheets 28 Gauge (3m)",
    price: 28000,
    originalPrice: null,
    image: "/corrugated-iron-roofing-sheet.jpg",
    images: ["/corrugated-iron-roofing-sheet.jpg", "/corrugated-iron-roofing-sheets-stacked.jpg"],
    badge: "Popular",
    category: "Roofing",
    description:
      "High-quality corrugated iron roofing sheets, 28 gauge thickness, 3 meters length. Weather-resistant and durable for long-lasting protection.",
    specs: [
      { label: "Gauge", value: "28" },
      { label: "Length", value: "3 meters" },
      { label: "Material", value: "Galvanized Steel" },
      { label: "Finish", value: "Corrugated" },
    ],
    inStock: true,
  },
  {
    id: 3,
    name: "Iron Sheets 30 Gauge (3m)",
    price: 25000,
    originalPrice: 27000,
    image: "/corrugated-metal-roofing-sheet.jpg",
    images: ["/corrugated-metal-roofing-sheet.jpg"],
    badge: "Sale",
    category: "Roofing",
    description:
      "Economical corrugated iron roofing sheets, 30 gauge thickness, 3 meters length. Ideal for residential and light commercial applications.",
    specs: [
      { label: "Gauge", value: "30" },
      { label: "Length", value: "3 meters" },
      { label: "Material", value: "Galvanized Steel" },
      { label: "Finish", value: "Corrugated" },
    ],
    inStock: true,
  },
  {
    id: 4,
    name: "Professional Cordless Drill Set",
    price: 550000,
    originalPrice: 650000,
    image: "/cordless-drill-set-with-battery.jpg",
    images: ["/cordless-drill-set-with-battery.jpg", "/professional-power-drill.jpg"],
    badge: "Sale",
    category: "Power Tools",
    description:
      "Complete professional cordless drill set with battery, charger, and accessories. Variable speed control and LED work light for precision work.",
    specs: [
      { label: "Voltage", value: "20V" },
      { label: "Battery", value: "2.0Ah Li-ion" },
      { label: "Chuck Size", value: "13mm" },
      { label: "Max Torque", value: "50Nm" },
    ],
    inStock: true,
  },
  {
    id: 5,
    name: "Heavy Duty Tool Box",
    price: 320000,
    originalPrice: null,
    image: "/red-metal-tool-box-storage.jpg",
    images: ["/red-metal-tool-box-storage.jpg"],
    badge: null,
    category: "Storage",
    description:
      "Durable heavy-duty metal tool box with multiple compartments. Secure locking mechanism and comfortable carrying handle.",
    specs: [
      { label: "Material", value: "Steel" },
      { label: "Dimensions", value: "50x25x25cm" },
      { label: "Weight", value: "5kg" },
      { label: "Compartments", value: "3 Trays" },
    ],
    inStock: true,
  },
  {
    id: 6,
    name: "Socket Wrench Set (120pc)",
    price: 480000,
    originalPrice: null,
    image: "/socket-wrench-set-in-case.jpg",
    images: ["/socket-wrench-set-in-case.jpg"],
    badge: "Popular",
    category: "Hand Tools",
    description:
      "Comprehensive 120-piece socket wrench set with ratchets, extensions, and various socket sizes. Chrome vanadium steel construction.",
    specs: [
      { label: "Pieces", value: "120" },
      { label: "Material", value: "Chrome Vanadium" },
      { label: "Drive Sizes", value: "1/4, 3/8, 1/2 inch" },
      { label: "Case", value: "Blow Molded" },
    ],
    inStock: true,
  },
  {
    id: 7,
    name: "Laser Level & Measuring Tool",
    price: 290000,
    originalPrice: 350000,
    image: "/laser-level-measuring-tool.jpg",
    images: ["/laser-level-measuring-tool.jpg"],
    badge: "Sale",
    category: "Measuring Tools",
    description:
      "Professional laser level with self-leveling technology. Perfect for accurate measurements and alignment in construction projects.",
    specs: [
      { label: "Range", value: "30 meters" },
      { label: "Accuracy", value: "±0.5mm/m" },
      { label: "Laser Type", value: "Class 2" },
      { label: "Battery", value: "AA x 3" },
    ],
    inStock: true,
  },
  {
    id: 8,
    name: "Tororo Cement 25kg Bag",
    price: 18000,
    originalPrice: null,
    image: "/small-cement-bag.jpg",
    images: ["/small-cement-bag.jpg"],
    badge: "New",
    category: "Building Materials",
    description:
      "Convenient 25kg bag of premium Tororo Cement. Perfect for smaller projects and repairs. Same high quality in a more manageable size.",
    specs: [
      { label: "Weight", value: "25kg" },
      { label: "Type", value: "Portland Cement" },
      { label: "Brand", value: "Tororo" },
      { label: "Application", value: "Small Projects & Repairs" },
    ],
    inStock: true,
  },
]

export const categories = [
  "All",
  "Building Materials",
  "Roofing",
  "Power Tools",
  "Hand Tools",
  "Storage",
  "Measuring Tools",
  "Safety Equipment",
  "Fasteners",
  "Paint Supplies",
  "Electrical",
  "Plumbing",
]
