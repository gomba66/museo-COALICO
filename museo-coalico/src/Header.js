import React, { useEffect, useState} from 'react';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { AmplifySignOut } from '@aws-amplify/ui-react';

export function Header() {
  let [userLoggedIn, setUserLoggedIn] = useState(null)
  useEffect(() => {
    let showLogOut = async authState => {
      try {
        let user = await Auth.currentAuthenticatedUser()
        setUserLoggedIn(user)
      } catch {
        setUserLoggedIn(null)
      }
    }
    showLogOut() // check manually the first time because we won't get a Hub event
  }, []);

  return (
    <div className={headerContainer}>
      <nav className={navHeight + " navbar navbar-expand-lg navbar-light bg-light"}>
        <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'block'}} to="/">
          <img className="ml-3" src={"/assets/logos/logo-peque.png"} alt="Museo logo" width="140" height="45" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse pr-5" id="navbarNavDropdown">
        <ul className={navItemsRight + ' navbar-nav ml-4'}>
          <li className="nav-item active">
            {
              userLoggedIn ?
              <AmplifySignOut /> :
              <div></div>
            }        
          </li>
          <li className="nav-item dropdown">
            <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Salas
          </Link>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'none'}} to="/aprendamos-en-paz" className="dropdown-item">Aprendamos en paz</Link>
            <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'none'}} to="/heridas-del-conflicto" className="dropdown-item">Heridas del conflicto</Link>
            <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'none'}}to="/gestos-de-vida" className="dropdown-item">Gestos de vida</Link>
            <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'none'}}to="/a-viva-voz" className="dropdown-item">A viva voz</Link>
            <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'none'}}to="/para-oido" className="dropdown-item">¡Para oído!</Link>
            <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'none'}}to="/palabras-cruzadas" className="dropdown-item">Palabras cruzadas</Link>
            <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'none'}}to="/de-camino-a-la-justicia" className="dropdown-item">De camino a la justicia</Link>
            <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'none'}}to="/piezas-para-aprender" className="dropdown-item">Piezas para aprender</Link>
            <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'none'}}to="/ojo-a-los-derechos" className="dropdown-item">Ojo a los derechos</Link>
            <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'none'}}to="/cuento-contigo" className="dropdown-item">Cuento contigo</Link>
            <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'none'}}to="/dia-de-las-manos-rojas" className="dropdown-item">Día de las Manos Rojas</Link>
          </div>
          </li>
          <li className="nav-item">
            <Link to="/quienes-somos" className="nav-link" href="#">Quiénes somos</Link>
          </li>
        </ul>
        </div>
      </nav>
    </div>
  )
}

const headerContainer = css`
  padding-top: 0px;
`
const navItemsRight = css`
@media (min-width: 991px) {
  position: absolute;
  right: 3%
}
`

const navHeight = css`
  @media (min-width: 991px) {
    height: 80px;
  }
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