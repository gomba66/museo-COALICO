import React, { useState, useEffect } from 'react';
import Button from './Button';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { CreatePost } from './CreatePost'
import { API, Auth, Storage } from 'aws-amplify';
// import query definition
import { listPosts } from './graphql/queries'
import { v4 as uuid } from 'uuid';
import { UpdateFiles } from './UpdateFiles';


function UserDash() {
  const [showOverlay, updateOverlayVisibility] = useState(true);
  const [posts, updatePosts] = useState([])
  useEffect(() => {
    fetchPosts();
    checkUser();
  }, []);
  async function fetchPosts() {
    try {
      let postData = await API.graphql({ query: listPosts, variables: { limit: 100 }});
      let postsArray = postData.data.listTodos.items
      console.log('====================================');
      console.log(postsArray);
      console.log('====================================');
      /* map over the file keys in the posts array, get signed image URLs for each image */
      postsArray = await Promise.all(postsArray.map(async post => {
      const fileKey = await Storage.get(post.file);
      post.file = fileKey;
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
  function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    // upload the image then fetch and rerender images
    Storage.put(uuid(), file).then (() => fetchPosts())
  }
  window.onload = function() {
    const url = window.location.href.indexOf('/admin')
    if (url) {
      //Hide the element.
      document.querySelectorAll('.container360')[0].style.display = 'none';
    }
  }
  return (
    <div className="container-fluid vh-100">
      <div className="container">
        {/* <Button title="New Post" onClick={() => updateOverlayVisibility(true)} />
        <AmplifySignOut />
        <h1>Photo Album</h1>
        <span>Add new image</span>
        <input
          type="file"
          accept='image/png'
          onChange={onChange}
          /> */}
        { showOverlay && (
          <CreatePost
          updatePosts={setPostState}
          posts={posts}
          />
        )}   
      </div>
      <h1 className="h1-heading">Inventario del museo</h1>
      <hr />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Editar</th>
            <th scope="col">título de la pieza</th>
            <th scope="col">Año de creación</th>
            <th scope="col">Link externo</th>
            <th scope="col">Región</th>
            <th scope="col">Descripción</th>
            <th scope="col">Sala(s)</th>
            <th scope="col">Subcategoría(s)</th>
            <th scope="col">Archivo en S3</th>
          </tr>
        </thead>
        <tbody>
        {posts.map((post) => {
          return (
            <UpdateFiles {...post} />
        )})}
        </tbody>
      </table>
    </div>

  )
}

export default withAuthenticator(UserDash);


