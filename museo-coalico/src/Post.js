import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { getPost } from "./graphql/queries";

export function Post() {
  const [loading, updateLoading] = useState(true);
  const [post, updatePost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, []);
  async function fetchPost() {
    try {
      const postData = await API.graphql({
        query: getPost,
        variables: { id },
      });
      console.log(postData);
      const currentPost = postData.data.getTodo;
      const image = await Storage.get(currentPost.image);
      console.log("====================================");
      console.log(image);
      console.log("====================================");

      currentPost.image = image;
      updatePost(currentPost);
      updateLoading(false);
    } catch (err) {
      console.log("error: ", err);
    }
  }
  console.log("post: ", post);
  return (
    <>
      {loading ? null : (
        <div id="body-post">
          {/* <!--Marcos--> */}
          <div>
            <img
              id="marco"
              className="pt-1 d-none d-md-block"
              src={"../assets/marcos/marco-general.png"}
              alt="background marco"
              height="100%"
              width="100%"
            />
          </div>
          <div>
            <img
              id="marco"
              className="pt-1 d-md-none"
              src={"../assets/marcos/marco-general-mobile.png"}
              alt="background marco"
              height="100%"
              width="100%"
            />
          </div>

          {/* <!--Mobile - Título y párrafo--> */}
          <div id="encabezado-p" className="row position-absolute d-flex">
            <div className="col-12 d-none d-sm-block d-md-none d-block d-sm-none">
              <h1 className="titulo-post">{post.name}</h1>
            </div>
            <div className="col-12 d-none d-sm-block d-md-none d-block d-sm-none">
              <div className="scroll-p">
                <p className="p-post">{post.description}</p>
              </div>
            </div>
          </div>

          {/* <!--Desktop - Título y párrafo--> */}
          <div id="encabezado-p" className="d-flex position-absolute row">
            <div className="col-12 d-md-block d-none">
              <h1 className="titulo-post ml-5">{post.name}</h1>
            </div>
            <div className="col-5 d-md-block d-none ml-5">
              <div className="scroll-p">
                <p className="p-post">{post.description}</p>
              </div>
            </div>
            <div className="col-6 d-md-block d-none"></div>
          </div>
        </div>
      )}
    </>
  );
}
