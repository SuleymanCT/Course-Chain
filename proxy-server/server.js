const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/ipfs/:cid", async (req, res) => {
  const { cid } = req.params; // CID'yi alıyoruz
  const ipfsGateway = `https://ipfs.io/ipfs/${cid}`; // IPFS URL'si oluşturuyoruz

  try {
    const response = await axios.get(ipfsGateway, { timeout: 30000 }); // Axios ile IPFS'e bağlan
    res.send(response.data); // Metadata'yı döndür
  } catch (error) {
    console.error(`Error fetching IPFS data for CID: ${cid}`, error.message);
    res.status(500).send({ error: "Failed to fetch IPFS content." }); // Hata durumunda cevap gönder
  }
});

const PORT = 5000; // Sunucunun çalışacağı port
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
