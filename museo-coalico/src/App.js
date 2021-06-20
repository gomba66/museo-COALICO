// src/App.js
import React, { useState, useEffect } from 'react';

// import API from Amplify library
import { API, Auth, Storage } from 'aws-amplify';

// import query definition
import { listTodos } from './graphql/queries';

// src/App.js, import the withAuthenticator component
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import { v4 as uuid } from 'uuid'

function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts();
    checkUser();
  }, []);
  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query: listTodos });
      setPosts(postData.data.listTodos.items)
    } catch (err) {
      console.log({ err })
    }
  }
  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser();
    console.log('user: ', user);
    console.log('user attributes: ', user.attributes);
  }
  const [images, setImages] = useState([])
  useEffect(() => {
    fetchImages()
  }, [])
  async function fetchImages() {
    // Fetch list of images from S3
    let s3images = await Storage.list('')
    // Get presigned URL for S3 images to display images in app
    s3images = await Promise.all(s3images.map(async image => {
      const signedImage = await Storage.get(image.key)
      return signedImage
    }))
    setImages(s3images)
  }
  function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    // upload the image then fetch and rerender images
    Storage.put(uuid(), file).then (() => fetchImages())
  }
  return (
    <div>
      <h1>Museo Coalico</h1>
      {
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.name}</h3>
            <p>{post.location}</p>
            <p>{post.year}</p>
            <p>{post.creation}</p>
            <p>{post.link}</p>
            <p>{post.published}</p>
            <p>{post.region}</p>
            <p>{post.description}</p>
            <p>{post.category}</p>
            <p>{post.subcategory}</p>
            <p>{post.file}</p>
          </div>
        ))
      }
      <div>
        <h1>Photo Album</h1>
        <span>Add new image</span>
        <input
          type="file"
          accept='image/png'
          onChange={onChange}
        />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          { images.map(image => <img src={image} style={{width: 400, marginBottom: 10}} />) }
        </div>
      </div>
      <AmplifySignOut />
    </div>
  )
}

export default withAuthenticator(App)
