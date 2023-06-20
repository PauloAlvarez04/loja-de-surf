import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { NumericFormat } from "react-number-format";

const Sidebar = ({ openClass, close, carrito }) => {
  // console.log("SIDEBAR", carrito);
  const [carrito2, setCarrito2] = useState([]);

  const checkoutbtt = () => {
    alert(`the total to pay: ${somaTotal().toFixed(2)}`);
  };

  useEffect(() => {
    var agrupado = {};
    carrito.forEach(function (item) {
      if (!agrupado[item.nome]) {
        agrupado[item.nome] = {
          nome: item.nome,
          preco: item.preco,
          quantidade: 0,
          imagem: item.imagem,
        };
      }
      agrupado[item.nome].quantidade += 1;
    });
    var resultadoArray = Object.values(agrupado);
    setCarrito2(resultadoArray);
  }, [carrito]);

  const somaTotal = () => {
    var soma = 0;
    carrito2.forEach((element) => {
      var multi = element.preco * element.quantidade;
      soma += multi;
    });
    return soma;
  };
  
  const remove = (elemento) => {
    let carr = [... carrito2]
    let encontrado = carr.find(element => element.nome == elemento.nome)
    encontrado.quantidade -= 1
    if(encontrado.quantidade < 1 ) {
      carr.pop(encontrado)
    }
    
    
    setCarrito2(carr)
    
    carrito = carrito.filter(function( obj ) {
      return obj.nome !== elemento.nome;
  });
    
  };

  const additem = (elemento) => {
    let carr = [... carrito2]
    let encontrados = carr.find(element => element.nome == elemento.nome)
    encontrados.quantidade += 1

    setCarrito2(carr)
  }

  
  return (
    <div className="sidebarstyle">
      <nav className={openClass === "open" ? "opneSidebar" : ""}>
        <li>
          <img
            id="imgsb"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/VisualEditor_-_Icon_-_Close_-_white.svg/1200px-VisualEditor_-_Icon_-_Close_-_white.svg.png"
            onClick={close}
            ></img>
        </li>
        <ul className="navlist">
          <div className="cartsb">
            <h1 style={{ fontSize: "25px", marginTop: "-70px" }}>Cart</h1>
            {carrito2.length > 0 && (
            <h1>Product(s) found: {carrito2.length}</h1>
              )}
          </div>
          <div id="itemzinhosemfila">
            {carrito2.map((elemento) => {
              return (
                <div className="itemscart">
                  {/* ARTIGOS */}
                  <div className="boxcart">
                    <div>
                      <img src={elemento.imagem}></img>
                    </div>
                    <h2>{elemento.nome}</h2>
                    <div className="precosidebar">
                      <h2
                        style={{
                          "margin-left": "10px",
                          "margin-right": "10px",
                        }}
                      >
                        {elemento.preco}€<h4>Qtd: {elemento.quantidade}</h4>
                      </h2>
                      <div className="addrmv">


                      <img src="https://static.vecteezy.com/system/resources/previews/015/286/988/non_2x/minus-sign-icon-free-png.png" onClick={()=> remove(elemento)}></img>
                      <img src="https://static.vecteezy.com/system/resources/previews/011/912/003/original/plus-sign-icon-free-png.png" onClick={() => additem(elemento)}></img>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ul>
        <div className="checkout">
          <div>
            <div className="somatotal">
              <h1 style={{ color: "white", fontSize: "25px" }}>Subtotal</h1>
              <h1>{somaTotal().toFixed(2)}€</h1>
            </div>

            <button id="checkoutbotton" onClick={() => checkoutbtt()}>
              Check-out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
