import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAJl8hDr94U3lqUJdyyIZm5s91xkQtkcKo",
  authDomain: "sofisk-c369f.firebaseapp.com",
  databaseURL: "https://sofisk-c369f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sofisk-c369f",
  storageBucket: "sofisk-c369f.firebasestorage.app",
  messagingSenderId: "24103228640",
  appId: "1:24103228640:web:3f40d96d9030c99531ac85",
  measurementId: "G-C8TL4D52JP"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newReview, setNewReview] = useState({ name: '', stars: 0, text: '' });
  const [hoveredStars, setHoveredStars] = useState(null); // Стан для зірочок при наведенні

  // Завантажуємо відгуки з Firebase Realtime Database
  useEffect(() => {
    const reviewsRef = ref(database, 'reviews');
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setReviews(Object.values(data)); // Конвертуємо об'єкт в масив
      } else {
        setReviews([]);
      }
    });

    // Очищаємо підписку на оновлення даних автоматично
    return () => unsubscribe(); // Цей виклик видалить підписку автоматично
  }, []);

  // Функція для додавання нового відгуку в Firebase
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.text) {
      const newReviewRef = push(ref(database, 'reviews'));
      set(newReviewRef, {
        name: newReview.name,
        stars: newReview.stars,
        text: newReview.text,
        photo: 'Avatar1.png'
      });

      // Очищаємо форму після додавання відгуку
      setNewReview({ name: '', stars: 0, text: '' });
    }
  };

  // Обробка наведення зірочок
  const handleStarHover = (index) => {
    setHoveredStars(index);
  };

  const handleStarClick = (index) => {
    setNewReview({ ...newReview, stars: index + 1 });
    setHoveredStars(null); // Очищаємо стан наведення після натискання
  };

  // Переміщення по відгуках
  const goToPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 2);
  };

  const goToNext = () => {
    if (currentIndex < reviews.length - 2) setCurrentIndex(currentIndex + 2);
  };

  const renderStars = (numStars) => {
    return [...Array(5)].map((_, index) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        key={index}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill={index < numStars ? '#F3C63F' : 'none'}
        onMouseEnter={() => handleStarHover(index)}
        onMouseLeave={() => setHoveredStars(null)}
        onClick={() => handleStarClick(index)}
      >
      <path d="M13.1142 7.40983L13.1142 7.40983L18.1402 7.81276C18.308 7.82621 18.3759 8.0355 18.2482 8.14494L18.2481 8.14496L14.4189 11.4252C14.4189 11.4252 14.4189 11.4252 14.4189 11.4252C14.0803 11.7152 13.9323 12.1704 14.0358 12.6042C14.0358 12.6042 14.0358 12.6043 14.0358 12.6043L15.2057 17.5087C15.2448 17.6724 15.0667 17.8018 14.9231 17.7141L10.6201 15.0858L10.6201 15.0858C10.2396 14.8534 9.76098 14.8534 9.38048 15.0858L9.38046 15.0858L5.07748 17.7141C5.07747 17.7141 5.07747 17.7141 5.07746 17.7141C4.93385 17.8018 4.75581 17.6724 4.79485 17.5087L5.96475 12.6042C6.06823 12.1705 5.92033 11.7152 5.58162 11.4252L1.75238 8.14496L1.75237 8.14495C1.62463 8.03553 1.69257 7.82621 1.86034 7.81275L6.88633 7.40983L6.88635 7.40983C7.33083 7.37418 7.71803 7.09287 7.88929 6.68114L7.88929 6.68113L9.82558 2.02564C9.89019 1.87029 10.1103 1.87027 10.1749 2.02564L12.1113 6.68114L12.5729 6.48912L12.1113 6.68114C12.2825 7.09288 12.6697 7.37418 13.1142 7.40983Z" stroke="#F3C63F"/>
      </svg>
    ));
  };

  return (
    <section id="reviews">
      <h2>Відгуки наших клієнтів-магів</h2>

      <div className="reviews-line">

        <form onSubmit={handleSubmit} className="review-form">

          <div className='first-line'>

            <img src={process.env.PUBLIC_URL + "/" + "Avatar1.png"} />

            <div className='name-stars'>
            
              <input
                className='name'
                type="text"
                placeholder="Ваше ім'я"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              />

              <div className="stars-container">
                {renderStars(hoveredStars !== null ? hoveredStars + 1 : newReview.stars)}
              </div>

            </div>

          </div>

          <div className='second-line'>

            <textarea
              className='review'
              type="text"
              placeholder="Текст відгуку"
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            />
            <button className='send-button' type="submit"><img src={process.env.PUBLIC_URL + "/" + "send.svg"} /></button>

          </div>

        </form>
          

        <div className="reviews-carousel">
          <button onClick={goToPrevious} disabled={currentIndex === 0}><img src={`${process.env.PUBLIC_URL}/Button7.svg`} /></button>
          <div className='review-itmes'>
            <AnimatePresence mode="wait">
              {reviews.slice(currentIndex, currentIndex + 2).map((review, index) => (
                <motion.div
                  key={`${review.name}-${index}`}
                  className="review-item"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >

                  <div className='first-line'>

                    <img src={process.env.PUBLIC_URL + "/" + review.photo} alt={review.name} />

                    <div className='name-stars'>

                      <h3>{review.name}</h3>
                      <div>
                        {Array.from({ length: review.stars }).map((_, index) => (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            key={index}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="#F3C63F"
                            onMouseEnter={() => handleStarHover(index)}
                            onMouseLeave={() => setHoveredStars(null)}
                            onClick={() => handleStarClick(index)}
                          >
                          <path d="M13.1142 7.40983L13.1142 7.40983L18.1402 7.81276C18.308 7.82621 18.3759 8.0355 18.2482 8.14494L18.2481 8.14496L14.4189 11.4252C14.4189 11.4252 14.4189 11.4252 14.4189 11.4252C14.0803 11.7152 13.9323 12.1704 14.0358 12.6042C14.0358 12.6042 14.0358 12.6043 14.0358 12.6043L15.2057 17.5087C15.2448 17.6724 15.0667 17.8018 14.9231 17.7141L10.6201 15.0858L10.6201 15.0858C10.2396 14.8534 9.76098 14.8534 9.38048 15.0858L9.38046 15.0858L5.07748 17.7141C5.07747 17.7141 5.07747 17.7141 5.07746 17.7141C4.93385 17.8018 4.75581 17.6724 4.79485 17.5087L5.96475 12.6042C6.06823 12.1705 5.92033 11.7152 5.58162 11.4252L1.75238 8.14496L1.75237 8.14495C1.62463 8.03553 1.69257 7.82621 1.86034 7.81275L6.88633 7.40983L6.88635 7.40983C7.33083 7.37418 7.71803 7.09287 7.88929 6.68114L7.88929 6.68113L9.82558 2.02564C9.89019 1.87029 10.1103 1.87027 10.1749 2.02564L12.1113 6.68114L12.5729 6.48912L12.1113 6.68114C12.2825 7.09288 12.6697 7.37418 13.1142 7.40983Z" stroke="#F3C63F"/>
                          </svg>
                        ))}
                      </div>

                    </div>

                  </div>

                  <p className='second-line'>{review.text}</p>
                  
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button onClick={goToNext} disabled={currentIndex + 2 >= reviews.length}><img src={`${process.env.PUBLIC_URL}/Button6.svg`} /></button>

        </div>


      </div>

    </section>
  );
};

export default Reviews;