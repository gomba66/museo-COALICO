import React from 'react';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';
import logo from './assets/logos/logo-peque.png'
import Button from './Button';
import { CreatePost } from './CreatePost'
import { useState, useEffect } from 'react';
// import API from Amplify library
import { API, Auth, Storage } from 'aws-amplify';
// import query definition
import { listPosts } from './graphql/queries'
import { AmplifySignOut } from '@aws-amplify/ui-react';

export function Header() {
  const [showOverlay, updateOverlayVisibility] = useState(false);
  const [posts, updatePosts] = useState([])
  useEffect(() => {
    fetchPosts();
    checkUser();
  }, []);
  async function fetchPosts() {
    try {
      let postData = await API.graphql({ query: listPosts, variables: { limit: 100 }});
      let postsArray = postData.data.listTodos.items
      /* map over the image keys in the posts array, get signed image URLs for each image */
      postsArray = await Promise.all(postsArray.map(async post => {
      const imageKey = await Storage.get(post.image);
      post.image = imageKey;
      return post;
    }));

    /* update the posts array in the local state */
    setPostState(postsArray);
    } catch (err) {
      console.log({ err })
    }
  }
  async function setPostState(postsArray) {
    updatePosts(postsArray);
  }
  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser();
    console.log('user: ', user);
    console.log('user attributes: ', user.attributes);
  }
  return (
    <div className={headerContainer}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'block'}} to="/">
          <img src={ logo } alt="Museo logo" width="110" height="30" />
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
            <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'none'}} to="/posts" className="dropdown-item">Aprendamos en paz</Link>
            <Link to="/posts" className="dropdown-item">Heridas del conflicto</Link>
            <Link to="/posts" className="dropdown-item">Gestos de vida</Link>
            <Link to="/posts" className="dropdown-item">¡Para oído!</Link>
            <Link to="/posts" className="dropdown-item">Palabras cruzadas</Link>
            <Link to="/posts" className="dropdown-item">De camino a la justicia</Link>
            <Link to="/posts" className="dropdown-item">Piezas para aprender</Link>
            <Link to="/posts" className="dropdown-item">Ojo a los derechos</Link>
            <Link to="/posts" className="dropdown-item">Día de las Manos Rojas</Link>
          </div>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" href="#">Quiénes somos</Link>
          </li>
        </ul>
        <Button title="New Post" onClick={() => updateOverlayVisibility(true)} />
        <AmplifySignOut />
        </div>
      </nav>
      { showOverlay && (
        <CreatePost
          updateOverlayVisibility={updateOverlayVisibility}
          updatePosts={setPostState}
          posts={posts}
        />
      )}
    </div>
  )
}

const headerContainer = css`
  padding-top: 0px;
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