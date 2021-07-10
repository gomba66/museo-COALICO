// src/App.js

import { HashRouter, Switch, Route, BrowserRouter } from "react-router-dom";

import React, { useState, useEffect } from "react";

// import API from Amplify library
import { API, Auth, Storage } from "aws-amplify";

// import query definition
import { listPosts } from "./graphql/queries";

import { Post } from "./Post";
import { Posts } from "./Posts";
import { Header } from "./Header";
import Footer from "./Footer";
import UserDash from "./UserDash";
import { Entrada } from "./Entrada";
import HeridasDelConflicto from "./Salas/HeridasDelConflicto/index";
import AprendamosEnPaz from "./Salas/AprendamosEnPaz/index";
import GestosDeVida from "./Salas/GestosDeVida/index";
import ParaOido from "./Salas/ParaOido/index";
import PalabrasCruzadas from "./Salas/PalabrasCruzadas/index";
import DeCaminoALaJusticia from "./Salas/DeCaminoALaJusticia/index";
import PiezasParaAprender from "./Salas/PiezasParaAprender/index";
import OjoALosDerechos from "./Salas/OjoALosDerechos/index";
import DiaDeLasManosRojas from "./Salas/DiaDeLasManosRojas/index";
import CuentoContigo from "./Salas/CuentoContigo/index";
import AVivaVoz from "./Salas/AVivaVoz/index";
import PostBase from "./Salas/PostBase/index";
import QuienesSomos from "./QuienesSomos";

function Router() {
  /* create a couple of pieces of initial state */
  const [posts, updatePosts] = useState([]);
  const [isStart, setIsStart] = useState(true);
  useEffect(() => {
    fetchPosts();
    checkUser();
  }, []);
  async function fetchPosts() {
    try {
      let postData = await API.graphql({
        query: listPosts,
        variables: { limit: 100 },
      });
      let postsArray = postData.data.listTodos.items;
      /* map over the image keys in the posts array, get signed image URLs for each image */
      postsArray = await Promise.all(
        postsArray.map(async (post) => {
          const imageKey = await Storage.get(post.image);
          post.image = imageKey;
          return post;
        })
      );

      /* update the posts array in the local state */
      setPostState(postsArray);
    } catch (err) {
      console.log({ err });
    }
  }
  async function setPostState(postsArray) {
    updatePosts(postsArray);
  }
  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser();
    console.log("user: ", user);
    console.log("user attributes: ", user.attributes);
  }
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetchImages();
  }, []);
  async function fetchImages() {
    // Fetch list of images from S3
    let s3images = await Storage.list("");
    // Get presigned URL for S3 images to display images in app
    s3images = await Promise.all(
      s3images.map(async (image) => {
        const signedImage = await Storage.get(image.key);
        return signedImage;
      })
    );
    setImages(s3images);
  }
  window.onload = function () {
    const url = window.location.href.indexOf("/admin");
    if (url) {
      //Hide the element.
      document.querySelectorAll(".container360")[0].style.display = "none";
    }
  };
  const Inicio = () => {
    setIsStart(false);
    document.querySelectorAll(".container360")[0].style.display = "block";
  };
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route exact path="/">
          {isStart ? (
            <div>
              <Entrada entrar={Inicio} />
              <Footer />
            </div>
          ) : null}
        </Route>
        <Switch>
          <Route exact path="/posts">
            <Posts posts={posts} />
            <Footer />
          </Route>
          <Route exact path="/post/:id">
            <Post />
            <Footer />
          </Route>
          <Route exact path="/admin">
            <UserDash />
            <Footer />
          </Route>
          <Route exact path="/post-base">
            <PostBase />
            <Footer />
          </Route>
          <Route exact path="/quienes-somos">
            <QuienesSomos />
            <Footer />
          </Route>
          <Route exact path="/heridas-del-conflicto">
            <HeridasDelConflicto posts={posts} />
            <Footer />
          </Route>
          <Route exact path="/aprendamos-en-paz">
            <AprendamosEnPaz posts={posts} />
            <Footer />
          </Route>
          <Route exact path="/gestos-de-vida">
            <GestosDeVida posts={posts} />
            <Footer />
          </Route>
          <Route exact path="/para-oido">
            <ParaOido posts={posts} />
            <Footer />
          </Route>
          <Route exact path="/palabras-cruzadas">
            <PalabrasCruzadas posts={posts} />
            <Footer />
          </Route>
          <Route exact path="/de-camino-a-la-justicia">
            <DeCaminoALaJusticia posts={posts} />
            <Footer />
          </Route>
          <Route exact path="/piezas-para-aprender">
            <PiezasParaAprender posts={posts} />
            <Footer />
          </Route>
          <Route exact path="/ojo-a-los-derechos">
            <OjoALosDerechos posts={posts} />
            <Footer />
          </Route>
          <Route exact path="/dia-de-las-manos-rojas">
            <DiaDeLasManosRojas posts={posts} />
            <Footer />
          </Route>
          <Route exact path="/a-viva-voz">
            <AVivaVoz posts={posts} />
            <Footer />
          </Route>
          <Route exact path="/cuento-contigo">
            <CuentoContigo posts={posts} />
            <Footer />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
