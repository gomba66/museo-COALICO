import React from "react";
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';

export function Footer() {
  return (
  <div className={footerContainer}>
    <div className="text-center text-lg-start bg-light text-muted">
      <div className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div>
          <Link to="" className="me-4 text-reset">
          <span className="fab fa-facebook-f"></span>
          </Link>
          <Link to="" className="me-4 text-reset">
          <span className="fab fa-twitter"></span>
          </Link>
          <Link to="" className="me-4 text-reset">
          <span className="fab fa-google"></span>
          </Link>
          <Link to="" className="me-4 text-reset">
          <span className="fab fa-instagram"></span>
          </Link>
          <Link to="" className="me-4 text-reset">
          <span className="fab fa-linkedin"></span>
          </Link>
          <Link to="" className="me-4 text-reset">
          <span className="fab fa-github"></span>
          </Link>
        </div>
      {/* <!-- Right --> */}
      </div>
      {/* <!-- Section: Social media --> */}
      {/* <!-- Section: Links  --> */}
      <div className="">
        <div className="container text-center text-md-start mt-5">
          {/* <!-- Grid row --> */}
          <div className="row mt-3">
          {/* <!-- Grid column --> */}
          <div className="col-md-2 col-lg-3 col-xl-2 mx-auto mb-4">
            {/* <!-- Links --> */}
            <h6 className="text-uppercase font-weight-bold mb-4">
            Salas
            </h6>
            <p>
            <Link to="#!" className="text-reset">Aprendamos en paz</Link>
            </p>
            <p>
            <Link to="#!" className="text-reset">Heridas del conflicto</Link>
            </p>
            <p>
            <Link to="#!" className="text-reset">Gestos de vida</Link>
            </p>
            <p>
            <Link to="#!" className="text-reset">A viva voz</Link>
            </p>
            <p>
            <Link to="#!" className="text-reset">¡Para oído!</Link>
            </p>
            <p>
            <Link to="#!" className="text-reset">Palabras cruzadas</Link>
            </p>
          </div>
          {/* <!-- Grid column --> */}
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              {/* <!-- Content --> */}
              <h6 className="text-uppercase font-weight-bold mb-4">
                <span className="fas fa-gem me-3"></span>
              </h6>
              <p>
                  <Link to="#!" className="text-reset">De camino a la justicia</Link>
                  </p>
                  <p>
                  <Link to="#!" className="text-reset">Piezas para aprender</Link>
                  </p>
                  <p>
                  <Link to="#!" className="text-reset">Ojo a los derechos</Link>
                  </p>
                  <p>
                  <Link to="#!" className="text-reset">Cuento contigo</Link>
                  </p>
                  <p>
                  <Link to="#!" className="text-reset">Día de las Manos Rojas</Link>
                  </p>
          </div>
          {/* <!-- Grid column --> */}
          {/* <!-- Grid column --> */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* <!-- Links --> */}
              <h6 className="text-uppercase font-weight-bold mb-4">
              Contacto
              </h6>
              <p className="text-secondary">
                  <span className="fas fa-envelope me-3"></span>
                  comunicaciones@coalico.org
              </p>
              <p className="text-secondary">
                  <span className="fas fa-phone me-3"></span>
                  +57 310 2001719
              </p>
          </div>
    
          {/* <!-- Grid column --> */}
          </div>
          <div className="row d-flex justify-content-between align-items-center pb-4">
              <div className="col-4">
                  <spanmg id="patrocinio-logo-1" src="/museo-coalico/src/assets/logos/patrocinio_1.png" alt="logo patrocinio" />
              </div>
              <div className="col-4">
                  <spanmg id="patrocinio-logo-2" src="/museo-coalico/src/assets/logos/patrocinio_2.png" alt="logo patrocinio" />
              </div>
              <div className="col-4">
                  <spanmg id="patrocinio-logo" src="/museo-coalico/src/assets/logos/patrocinio_3.png" alt="logo patrocinio" />
              </div>
          </div>
          {/* <!-- Grid row --> */}
        </div>
      </div>
      {/* <!-- Section: Links  --> */}
      {/* <!-- Copyright --> */}
      <div className="text-center p-4" style={Copyright}>
        <div className="pb-4">
            <Link to="/">
              <spanmg src="assets/logos/logo-museo.png" alt="Museo logo" width="150" height="40" />
            </Link>
        </div>
        <div>
            Made by
            <Link className="text-reset fw-bold" to="http://coalico.org">COALICO</Link>
        </div>
      </div>
    </div>
  </div>

  )
}

const footerContainer = css`
  position: fixed;
  height: 100px;
  bottom: 0;
  width: 100%;
`
const Copyright = css`
  background-color: rgba(0, 0, 0, 0.05);
`
