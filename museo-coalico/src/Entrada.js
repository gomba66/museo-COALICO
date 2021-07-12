import React from "react";
import { css } from '@emotion/css';
import '../src/entrada-style.css'
import entradaBackground from './assets/fondos/fondo-espacio.png';

export function Entrada(props) {
    return (
    <div className={ entrada }>
    <div className="d-flex justify-content-center">
    <div className="row">
    <div className="d-flex justify-content-center col-12">
    <img id="logo-cel" className="d-none d-sm-block d-md-none d-block d-sm-none" src={"/assets/logos/logo-museo.png"} alt="Logo museo" />
    </div>
    <div className="d-flex justify-content-center col-12">
    <img className="nave-cel d-none d-sm-block d-md-none d-block d-sm-none" src={"/assets/elementos/nave-sola.png"} alt="Máquina del tiempo" />
    </div>
    <div className="d-flex justify-content-end col-6">
        <img id="gotitan-cel" className="d-none d-sm-block d-md-none d-block d-sm-none" src={"/assets/elementos/gotitan-solo.png"} alt="Gotitán personaje" />
    </div>
    <div className="d-flex justify-content-start align-items-center col-6">
        <button id="boton-cel" className="button-entrada d-none d-sm-block d-md-none d-block d-sm-none" onClick={() =>{props.entrar()}} alt="Botón de entrada">Entrar</button>
    </div>
    </div>
    </div>
    <div className="d-flex align-items-center">
          {/* <!--Medium--> */}
          <div className="d-flex justify-content-center">
              <div className="row">
                <div className="d-flex justify-content-center col-12">
                    <img id="logo-md" className="d-none d-md-block d-lg-none" src={"/assets/logos/logo-museo.png"} alt="Logo museo" />
                </div>
                <div className="d-flex justify-content-center col-12">
                    <img id="nave-md" className="d-none d-md-block d-lg-none col-12" src={"/assets/elementos/nave-sola.png"} alt="Máquina del tiempo" />
                </div>
                <div className="d-flex justify-content-end col-6">
                    <img id="gotitan-md" className="d-none d-md-block d-lg-none" src={"/assets/elementos/gotitan-solo.png"} alt="Gotitán personaje" />
                </div>
                <div className="d-flex justify-content-start align-items-center col-6">
                    <button id="boton-md" className="button-entrada d-none d-md-block d-lg-none" onClick={() =>{props.entrar()}} alt="Botón de entrada">Entrar</button>
                </div>
              </div>
          </div>
          {/* <!--Desktop--> */}
          <div className="row">
              <div className="col-6">
                  <img id="nave-desktop" className="col-12" src={"/assets/elementos/nave-sola.png"} alt="Máquina del tiempo" />
              </div>
              <div className="col">
                  <img id="logo-desktop" className="col-12" src={"/assets/logos/logo-museo.png"} alt="Logo museo" />
                  <img id="gotitan-desktop" className="col-5" src={"/assets/elementos/gotitan-solo.png"} alt="Gotitán personaje" />
                  <button id="boton-desktop" className="button-entrada col-5" onClick={() =>{props.entrar()}} alt="Botón de entrada">Entrar</button>

              </div>
          </div>
      </div>
    </div>
  )
}

const entrada = css`
  background: no-repeat url(${entradaBackground});
  background-position: center;
  background-size: cover;
`;