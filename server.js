const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

const CATALOG_FILE = './public/catalog.json';

const readCatalog = () => JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
const writeCatalog = (catalog) => fs.writeFileSync(CATALOG_FILE, JSON.stringify(catalog, null, 2));

// Додавання товару в кошик
app.post('/buy', (req, res) => {
  const { id } = req.body;
  let catalog = readCatalog();

  catalog = catalog.map(item =>
    item.id === id ? { ...item, inBasket: true } : item
  );

  writeCatalog(catalog);
  
  res.json(catalog.find(item => item.id === id));
});

// Видалення товару з кошика
app.post('/remove', (req, res) => {
  const { id } = req.body;
  let catalog = readCatalog();

  catalog = catalog.map(item =>
    item.id === id ? { ...item, inBasket: false } : item
  );

  writeCatalog(catalog);

  res.json(catalog.find(item => item.id === id));
});

// Отримання всіх товарів у кошику
app.get('/basket', (req, res) => {
  const catalog = readCatalog();
  const basketItems = catalog.filter(item => item.inBasket === true);
  res.json(basketItems);
});

app.listen(5001, () => console.log('Сервер працює на порту 5001'));
