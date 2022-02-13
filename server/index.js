const express = require("express");
const fsp = require("fs").promises;

const PORT = process.env.PORT || 3001;

const app = express();

async function getDB() {
  const data = await fsp.readFile("./server/KITS_SHIPPING_DATA.json");
  const db = JSON.parse(data);
  return db;
}

app.get("/search", (req, res) => {
  const { filter } = req.query;
  getDB().then((db) => {
    const results = db.filter((kit) =>
      kit.shipping_tracking_code.includes(filter)
    );
    res.send(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
