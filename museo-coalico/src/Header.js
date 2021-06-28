import React from 'react';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <div className={headerContainer}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">
          <img src="assets/logos/logo-peque.png" alt="Museo logo" width="110" height="30" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse pr-5" id="navbarNavDropdown">
        <ul className="navbar-nav">
            <li className="nav-item active">
            <Link to="/" className="nav-link">Inicio<span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item dropdown">
            <Link to="/" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Salas
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link to="/" className="dropdown-item">Aprendamos en paz</Link>
                <Link to="/" className="dropdown-item">Heridas del conflicto</Link>
                <Link to="/" className="dropdown-item">Gestos de vida</Link>
                <Link to="/" className="dropdown-item">¡Para oído!</Link>
                <Link to="/" className="dropdown-item">Palabras cruzadas</Link>
                <Link to="/" className="dropdown-item">De camino a la justicia</Link>
                <Link to="/" className="dropdown-item">Piezas para aprender</Link>
                <Link to="/" className="dropdown-item">Ojo a los derechos</Link>
                <Link to="/" className="dropdown-item">Día de las Manos Rojas</Link>
            </div>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" href="#">Quiénes somos</Link>
            </li>
        </ul>
        </div>
      </nav>
    </div>
  )
}

const headerContainer = css`
  padding-top: 20px;
`

const headerStyle = css`
  font-size: 40px;
  margin-top: 0px;
`

const linkStyle = css`
  color: black;
  font-weight: bold;
  text-decoration: none;
  margin-right: 10px;
  :hover {
    color: #058aff;
  }
`