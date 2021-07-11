import React, { useState, useEffect } from 'react';
import Button from './Button';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { CreatePost } from './CreatePost'
import { API, Auth, Storage } from 'aws-amplify';
// import query definition
import { listPosts } from './graphql/queries'
import { v4 as uuid } from 'uuid';

function UserDash() {
  const [showOverlay, updateOverlayVisibility] = useState(true);
  const [posts, updatePosts] = useState([])
  const [images, setImages] = useState([])
  useEffect(() => {
    fetchPosts();
    checkUser();
    fetchImages();
  }, []);
  async function fetchPosts() {
    try {
      let postData = await API.graphql({ query: listPosts, variables: { limit: 100 }});
      let postsArray = postData.data.listTodos.items
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
  async function fetchImages() {
    // Fetch list of images from S3
    let s3images = await Storage.list('')
    // Get presigned URL for S3 images to display images in app
    s3images = await Promise.all(s3images.map(async image => {
      const signedImage = await Storage.get(image.key)
      return signedImage
    }))
    setImages(s3images)
  };
  function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    // upload the image then fetch and rerender images
    Storage.put(uuid(), file).then (() => fetchImages())
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
      {/* {posts.map((post) => { */}
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
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
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default withAuthenticator(UserDash);


