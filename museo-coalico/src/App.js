// src/App.js

import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";

import React, { useState, useEffect } from 'react';

// import API from Amplify library
import { API, Auth, Storage } from 'aws-amplify';


// src/App.js, import the withAuthenticator component
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import { v4 as uuid } from 'uuid';

// import query definition
import { listPosts } from './graphql/queries'

import Button from './Button';
import { Post } from './Post';
import { Posts } from './Posts';
import { CreatePost } from './CreatePost'
import { Header } from './Header';

function Router() {
  /* create a couple of pieces of initial state */
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
      <HashRouter>
        <Header />
        <h1>Museo Coalico</h1>
        <Button title="New Post" onClick={() => updateOverlayVisibility(true)} />
        <Switch>
          <Route exact path="/" >
            <Posts posts={posts} />
          </Route>
          <Route exact path="/post/:id" >
            <Post />
          </Route>
        </Switch>
        <hr />
        <div>
          <h1>Photo Album</h1>
          <span>Add new image</span>
          <input
            type="file"
            accept='image/png'
            onChange={onChange}
          />
        </div>
        <hr />
        <hr />
        <Post />
        <AmplifySignOut />
        { showOverlay && (
            <CreatePost
              updateOverlayVisibility={updateOverlayVisibility}
              updatePosts={setPostState}
              posts={posts}
            />
        )}
      </HashRouter>
    </div>
  )
}

export default withAuthenticator(Router);
