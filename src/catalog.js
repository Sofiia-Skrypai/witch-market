import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Catalog({ updateBasket }) {
  const [items, setItems] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const pageSize = 8;

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/catalog.json')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Помилка завантаження каталогу:', error));
  }, []);

  const handleNext = () => {
    if (visibleIndex + pageSize < items.length) {
      setVisibleIndex(visibleIndex + pageSize);
    }
  };

  const handlePrev = () => {
    if (visibleIndex - pageSize >= 0) {
      setVisibleIndex(visibleIndex - pageSize);
    }
  };

  const handleBuy = (itemId) => {
    fetch('http://localhost:5001/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: itemId }),
    })
      .then(response => response.json())
      .then(updatedItem => {
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === updatedItem.id ? { ...item, inBasket: true } : item
          )
        );
        updateBasket(updatedItem);
      })
      .catch(error => console.error('Помилка оновлення каталогу:', error));
  };

  const handleRemoveFromBasket = (itemId) => {
    fetch('http://localhost:5001/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: itemId }),
    })
      .then(response => response.json())
      .then(updatedItem => {
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === updatedItem.id ? { ...item, inBasket: false } : item
          )
        );
        updateBasket(updatedItem);
      })
      .catch(error => console.error('Помилка видалення з кошика:', error));
  };

  return (
    <section id="items">
      <h2>Магічні предмети</h2>
      <div className="catalog-container">
        <button onClick={handlePrev} disabled={visibleIndex === 0}>
          <img className="scroll-button" src={`${process.env.PUBLIC_URL}/Button7.svg`} alt="Попередня сторінка" />
        </button>
        <div className="catalog">
          <AnimatePresence mode="wait">
            {items.slice(visibleIndex, visibleIndex + pageSize).map((item) => (
              <motion.div
                key={item.id}
                className="item"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <img src={process.env.PUBLIC_URL + "/" + item.image} alt={item.name} />
                <div className="text-container">
                  <h3>{item.name}</h3>
                  <p className="description">{item.description}</p>
                  <p className="price">
                    Ціна: {item.price}
                    {item.inBasket ? (
                      <button onClick={() => handleRemoveFromBasket(item.id)}>
                        <img src={`${process.env.PUBLIC_URL}/deletecart.svg`} alt="Видалити з кошика" />
                      </button>
                    ) : (
                      <button onClick={() => handleBuy(item.id)}>
                        <img src={`${process.env.PUBLIC_URL}/smallcart.svg`} alt="Додати до кошика" />
                      </button>
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <button onClick={handleNext} disabled={visibleIndex + pageSize >= items.length}>
          <img className="scroll-button" src={`${process.env.PUBLIC_URL}/Button6.svg`} alt="Наступна сторінка" />
        </button>
      </div>
    </section>
  );
}

export default Catalog;
