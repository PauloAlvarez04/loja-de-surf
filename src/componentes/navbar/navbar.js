import Logotipo from './logotipo.jpg'
import carrito from './shopping_cart_checkout_FILL0_wght400_GRAD0_opsz48.png'

import './navbar.css'
import React from 'react'

function Navbar({ open }) {


  return (
    <div className='cont1'>

    <div className="navbar">
      <div>

      <img src={Logotipo}></img>
      </div>
      <div>
        <img id='carrito' src={carrito} onClick={open}></img>
      </div>

    </div>
    </div>
  );
}

export default Navbar;
