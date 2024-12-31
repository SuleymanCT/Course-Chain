module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFC700", // Özel sarı vurgu
        secondary: "#333333", // Daha koyu gri
        background: "#1A1A1A", // Uygulama arka planı
        card: "#2A2A2A", // Kart arka planı
        accent: "#E94E77", // Detaylar için pembe ton
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Modern yazı tipi
      },
    },
  },
  plugins: [],
};
