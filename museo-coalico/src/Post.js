import React, { useState, useEffect } from "react";
import { css } from "@emotion/css";
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
    {loading ? <h3>Loading</h3> :
    <>
    <h1>Texto de prueba en Post</h1>
      <h1 className={titleStyle}>{post.name}</h1>
      <h3 className={locationStyle}>{post.location}</h3>
      <p className={locationStyle}>{post.description}</p>
      <p className={locationStyle}>{post.year}</p>
      <p className={locationStyle}>{post.creation}</p>
      <p className={locationStyle}>{post.link}</p>
      <p className={locationStyle}>{post.published}</p>
      <p className={locationStyle}>{post.region}</p>
      <p className={locationStyle}>{post.category}</p>
      <p className={locationStyle}>{post.subcategory}</p>
      <p className={locationStyle}>{post.file}</p>
      <img alt="post" src={post.image} className={imageStyle} />
      </>
    }
    </>

  );
}

const titleStyle = css`
  margin-bottom: 7px;
`;

const locationStyle = css`
  color: #0070f3;
  margin: 0;
`;

const imageStyle = css`
  max-width: 500px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;
