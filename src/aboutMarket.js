import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

function AboutMarket() {
    return (
        <section id="hero">
        <h1>Відьомський ринок</h1>
        <h3>Таємничий світ зілля, артефактів та чаклунських передбачень чекає на вас. Тут сплітаються древні знання і магічні таємниці, доступні лише обраним. Відчуйте енергію зачарованих предметів, які зберігають силу століть. Досліджуйте ринок, де кожен куточок приховує історію, а кожен вибір може змінити вашу долю.</h3>
        <button>
          <Link 
            to="items" 
            smooth={true} 
            duration={400}
          >
            Досліди зараз
          </Link>
        </button>
      </section>
    )
}

export default AboutMarket;