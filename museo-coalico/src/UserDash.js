import React, { useState, useEffect } from "react";
import Button from "./Button";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { CreatePost } from "./CreatePost";
import { API, Auth, Storage } from "aws-amplify";
// import query definition
import { listPosts } from "./graphql/queries";
import { v4 as uuid } from "uuid";
import { UpdateFiles } from "./UpdateFiles";
import axios from "axios";

function UserDash() {
  const [showOverlay, updateOverlayVisibility] = useState(true);
  const [posts, updatePosts] = useState([]);
  useEffect(() => {
    fetchPosts();
    checkUser();
  }, []);
  const refreshPosts = () => {
    fetchPosts();
  };
  async function fetchPosts() {
    // try {
    //   let postData = await API.graphql({
    //     query: listPosts,
    //     variables: { limit: 100 },
    //   });
    //   let postsArray = postData.data.listTodos.items;
    //   console.log("====================================");
    //   console.log(postsArray);
    //   console.log("====================================");
    //   /* map over the file keys in the posts array, get signed image URLs for each image */
    //   postsArray = await Promise.all(
    //     postsArray.map(async (post) => {
    //       const fileKey = await Storage.get(post.file);
    //       post.file = fileKey;
    //       return post;
    //     })
    //   );
    /* update the posts array in the local state */

    axios
      .get(
        "https://m6cet1alej.execute-api.us-east-2.amazonaws.com/dev/getposts"
      )
      .then((res) => {
        console.log("POSTS=>>>", res.data);
        updatePosts(res.data);
      });
    // updatePosts(postsArray);
    // } catch (err) {
    //   console.log({ err });
    // }
  }
  async function setPostState(postsArray) {
    updatePosts(postsArray);
  }
  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser();
    console.log("user: ", user);
    console.log("user attributes: ", user.attributes);
  }
  function onChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    // upload the image then fetch and rerender images
    Storage.put(uuid(), file).then(() => fetchPosts());
  }
  window.onload = function () {
    const url = window.location.href.indexOf("/admin");
    if (url) {
      //Hide the element.
      document.querySelectorAll(".container360")[0].style.display = "none";
    }
  };
  return (
    <div className="container-fluid vh-100">
      <div className="container">
        {showOverlay && (
          <CreatePost
            refreshPosts={refreshPosts}
            updatePosts={setPostState}
            posts={posts}
          />
        )}
      </div>
      <h1 className="h1-heading">Inventario del museo ({posts.length})</h1>
      <hr />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Editar</th>
            <th scope="col">t??tulo de la pieza</th>
            <th scope="col">A??o de creaci??n</th>
            <th scope="col">Link externo</th>
            <th scope="col">Regi??n</th>
            <th scope="col">Descripci??n</th>
            <th scope="col">Sala(s)</th>
            <th scope="col">Subcategor??a(s)</th>
            <th scope="col">Archivo en S3</th>
          </tr>
        </thead>
        <tbody>
          {posts
            ? posts.map((post, index) => {
                return (
                  <UpdateFiles
                    {...post}
                    refreshPosts={refreshPosts}
                    index={index + 1}
                  />
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default withAuthenticator(UserDash);
