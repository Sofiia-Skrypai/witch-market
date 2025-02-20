import React, { useState, useEffect } from 'react';
function Footer() {

    return (
        <footer id="contact">

            <div className="footer-container">

                <h2 className='h2-footer'>Магія завжди поруч.<br />Тільки повір</h2>
                <h2 className='h2-footer-adaptive'>Магія поруч.<br />Тільки повір</h2>

                <div className="footer-info">
                    <div className='cat-container'>
                        <div>
                            <p>📞 Телефон:</p>
                            <h3>+380 (66) 666-13-13</h3>
                        </div>
                        <img className='cat' src={process.env.PUBLIC_URL + "/" + "cat.png"} />
                    </div>
                    <div>
                        <p>📧 Email:</p>
                        <h3>witchmarket@magicmail.com</h3>
                    </div>
                    <div>
                        <p>📍 Адреса:</p>
                        <h3>Темний провулок, 13, Чарівне Місто, Країна Тіней</h3>
                    </div>
                    
                    <div className="social-icons">
                        <a href="https://www.facebook.com/magic"><img src={process.env.PUBLIC_URL + "/" + "logo-facebook.svg"} /></a>
                        <a href="https://x.com/magic"><img src={process.env.PUBLIC_URL + "/" + "logo-twitter.svg"} /></a>
                        <a href="https://instagram.com/magic"><img src={process.env.PUBLIC_URL + "/" + "logo-instagram-1.svg"} /></a>
                        <a href="https://t.me/magic"><img src={process.env.PUBLIC_URL + "/" + "logo-telegram-1.svg"} /></a>
                    </div>
                </div>

                <p className="footer-copyright">© 2025 Відьомський ринок. Усі права захищені.</p>

            </div>

            <div className='map-container'>
                <img className='map' src={process.env.PUBLIC_URL + "/" + "map.png"} />
                <p className="footer-copyright-adaptive">© 2025 Відьомський ринок. Усі права захищені.</p>
            </div>
        </footer>
    )
}

export default Footer;