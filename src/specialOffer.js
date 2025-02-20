import React, { useState, useEffect } from 'react';

function Offer({ itemId, updateBasket }) {
    const [item, setItem] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    
    const targetDate = new Date('2025-02-27T00:00:00').getTime();

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/catalog.json')
        .then((response) => response.json())
        .then((data) => {
            const foundItem = data.find((item) => item.id === itemId);
            setItem(foundItem);
        })
        .catch((error) => console.error('Помилка завантаження каталогу:', error));
    }, [itemId]);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const remainingTime = Math.max(targetDate - now, 0) / 1000;
            setTimeLeft(remainingTime);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hours} год ${minutes} хв ${secs} сек`;
    };

    const handleBuy = () => {
        fetch('http://localhost:5001/buy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: itemId }),
        })
        .then(response => response.json())
        .then(updatedItem => {
            setItem(prevItem => ({ ...prevItem, inBasket: true }));
            updateBasket(updatedItem);
        })
        .catch(error => console.error('Помилка додавання в кошик:', error));
    };

    const handleRemoveFromBasket = () => {
        fetch('http://localhost:5001/remove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: itemId }),
        })
        .then(response => response.json())
        .then(updatedItem => {
            setItem(prevItem => ({ ...prevItem, inBasket: false }));
            updateBasket(updatedItem);
        })
        .catch(error => console.error('Помилка видалення з кошика:', error));
    };

    if (!item) return <p>Завантаження...</p>;

    return (
        <section id="offers">
            <h2>Спеціальні пропозиції</h2>
            <div className="offer-content">
                
                <div className="offer-details">
                    <h3 className="offer-name">{item.name}</h3>
                    <div>
                        <p className="old-price">{item.oldPrice}</p>
                        <p className="new-price">{item.price}</p>
                    </div>
                </div>
                
                <img className='offer-conten-img' src={process.env.PUBLIC_URL + "/" + item.image} alt={item.name} />

                <div className="offer-details-2">
                    <div>
                        <h3 className='countdown-text'>До кінця акції:</h3>
                        <div className="countdown">{formatTime(timeLeft)}</div>
                    </div>

                    {item.inBasket ? (
                        <button className="basket-btn" onClick={handleRemoveFromBasket}>Видалити з кошика</button>
                    ) : (
                        <button className="basket-btn" onClick={handleBuy}><div>Додати до</div><div><img src={process.env.PUBLIC_URL + "/" + "purple-cart.svg"} /> кошика</div></button>
                    )}
                </div>

            </div>
                            
            <div className='offers-list'>
                <div className='offer-item'>
                    <h3>Зілля місяця</h3>
                    <p>Купуйте обране зілля зі знижкою 20%!</p>
                    <p className='grey'>Діє до кінця місяця</p>
                </div>
                <div className='offer-item'>
                    <h3>Передбачення за пів ціни</h3>
                    <p>Отримайте пророцтво зі знижкою 50%!</p>
                    <p className='grey'>Діє до неділі</p>
                </div>
                <div className='offer-item'>
                    <h3>Ніч чаклунських знижок</h3>
                    <p>Лише сьогодні опівночі знижки до 30% на все!</p>
                    <p className='grey'>Діє до світанку</p>
                </div>
            </div>
        </section>
    );
}

export default Offer;
