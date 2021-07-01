// src/App.js

import {
  HashRouter,
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";

import React, { useState, useEffect } from 'react';

// import API from Amplify library
import { API, Auth, Storage } from 'aws-amplify';


// src/App.js, import the withAuthenticator component
import { withAuthenticator } from '@aws-amplify/ui-react';

// import query definition
import { listPosts } from './graphql/queries'

import { Post } from './Post';
import { Posts } from './Posts';
import { Header } from './Header';
import { Footer } from './Footer';

function Router() {
  /* create a couple of pieces of initial state */
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
//   window.onload = function() {
// //     const urlPosts = window.location.href.indexOf('/')
// // /*     const urlHome = window.location.href.indexOf('/') */
// //       if (!urlPosts) {
// //         //Hide the element.
//         document.querySelectorAll('#container360')[0].style.display = 'block';
//       // }
//     }
  
  return (
    <div>
      <BrowserRouter >
        <Header />
        <Switch>
          <Route exact path="/posts" >
            <Posts posts={posts} />
          </Route>
          <Route exact path="/post/:id" >
            <Post />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default withAuthenticator(Router);
