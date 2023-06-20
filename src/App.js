// import { Menu } from 'styled-icons/feather/Menu';
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Navbar from "./componentes/navbar/navbar";
import "./componentes/Sidebar/Sidebar.css";
import { get } from "./componentes/stock/fetch";
import ArrowLeft from "./componentes/stock/imagens_stock/arrow_circle_left_FILL0_wght400_GRAD0_opsz48.png";
import ArrowRight from "./componentes/stock/imagens_stock/arrow_circle_right_FILL0_wght400_GRAD0_opsz48.png";
import Sidebar from "./componentes/Sidebar/Sidebar";
import carrito from "./componentes/navbar/shopping_cart_checkout_FILL0_wght400_GRAD0_opsz48.png";
import axios from "axios";

function App() {
  const [dadosStock, setDadosStock] = useState([]);
  const [indexI, setIndexI] = useState(0);
  const [indexF, setIndexF] = useState(4);
  const [sidebar, setSidebar] = useState(false);
  // const [sidebar, setSidebar] = useState(false)
  const [carrito, setCarrito] = useState([]);
  const [data, setData] = useState();
  const [paulo, setPaulo] = useState();

  useEffect(() => {
    get("/stock").then((response) => {
      setDadosStock(response.data);
      // console.log("location", response.data.location);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://api.weatherapi.com/v1/current.json?key=d5f3477235da443db33111908231906&q=Agucadoura&aqi=no"
      )
      .then((response) => {
        setData(response.data);
        setPaulo(response.data.location.localtime)
        // console.log("location", response.data.location);
        // debugger
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log(carrito);
  }, [carrito]);

  const dataFormatada = () => {
    // Data fornecida
var dataString = paulo;

// Converter a string em objeto Date
var dataObjeto = new Date(dataString);

// Obter os componentes da data
var dia = ("0" + dataObjeto.getDate()).slice(-2);
var mes = ("0" + (dataObjeto.getMonth() + 1)).slice(-2);
var ano = dataObjeto.getFullYear();
var hora = ("0" + dataObjeto.getHours()).slice(-2);
var minuto = ("0" + dataObjeto.getMinutes()).slice(-2);
var diaSemana = dataObjeto.toLocaleString("en-US", { weekday: "long" });

// Formatar a data final
var dataFormatada = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + " " + diaSemana;

// Imprimir a data formatada
return(dataFormatada);
    
  };

  const adicionarCarrinho = (elemento) => {
    setSidebar(true);
    var carr = [];
    var agrupado = {};
    carr.push(...carrito, elemento);


// return(resultadoArray)
    // console.log(resultadoArray)
    setCarrito(carr);
  };

  const filtroDados = () => {
    var dados = dadosStock.slice(indexI, indexF);
    var comps = [];
    dados.map((elemento) => {
      comps.push(
        <div id="display">
          {/* ARTIGOS */}
          <div className="boxStock">
            <div className="titleItems">
              <h2>{elemento.nome}</h2>
            </div>

            <img src={elemento.imagem}></img>
            <h2>{elemento.preco}€</h2>

            <button className="atcbox">
              <div className="atc" onClick={() => adicionarCarrinho(elemento)}>
                Add to cart
              </div>
            </button>
          </div>
        </div>
      );
    });

    return comps;
  };

  const tras = () => {
    var indiceinicial = indexI - 4;
    setIndexI(indiceinicial);
    setIndexF(indexF - 4);
  };
  const frente = () => {
    var indiceinicial = indexI + 4;
    setIndexI(indiceinicial);
    setIndexF(indexF + 4);
  };
  const close = () => {
    setSidebar(false);
  };
  const open = () => {
    setSidebar(true);
  };

  return (
    <>
      <Navbar open={() => open()} />
      <div className="App">
        {sidebar && (
          <Sidebar openClass="open" close={() => close()} carrito={carrito} />
        )}
      </div>

      <div className="clima">
        <div>
          {/* {data && <h2>{data.current.condition.text}</h2>} */}
          {/* {data && <h2 style={{"marginLeft":"-60px"}}>{data.location.region}</h2>} */}
          {data && <img src={data.current.condition.icon} style={{"height":"80px"}}></img>}
          
        </div>
        <div className="titleclima">
          {data && <h2 >{data.location.name}</h2>}
        </div>
        <div className="currentclima">
          {data && <h2 style={{"marginright":"-80px"}}>{data.current.temp_c}ºC</h2>}
          {data && <h2 style={{"marginLeft":"-80px"}}>{data.current.temp_f}ºF</h2>}

        </div>
        <div className="dataclima">
          {data && <h2>{dataFormatada()}</h2>}

        </div>
      </div>

      <h1 id="produtosfound">{dadosStock.length} Product(s) found</h1>
      <div className="lineStock">
        <div className="botao">
          {indexI > 1 && <img src={ArrowLeft} onClick={() => tras()}></img>}
        </div>

        {filtroDados()}

        {/* {dadosStock && (
        )} */}

        <div className="botao">
          {indexF < dadosStock.length && (
            <img src={ArrowRight} onClick={() => frente()}></img>
          )}
        </div>
      </div>
  <div className="end">
    <h1>Page created by Paulo Alvarez :)</h1>
  </div>
    </>

  );
}

export default App;

// function App() {
//     const [on, setOn] = React.useState(false);

//     const handleOn = () => {
//       setOn(!on);
//     };
//     return (
//       <div className="App">
//         <aside className={on ? 'to-right' : ''}>
//           <a href="#" onClick={handleOn}>
//             {/* <Menu size="35" /> */}
//             <img id='carrito' src={carrito}></img>
//           </a>

//           <h1>React Sidebar</h1>
//         </aside>
//         {on && <Sidebar openClass="open" />}
//       </div>
//     );
//   }

// const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);
// }
