import { css } from '@emotion/css';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { API, Auth, Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid';

export function Posts({ posts = [] }) {
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
  };
  function onChange(e) {
    console.log("hol")
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    // upload the image then fetch and rerender images
    Storage.put(uuid(), file).then (() => fetchImages())
  }
  // window.onload = function() {
  //       const urlPosts = window.location.pathname
  //       console.log(urlPosts)
  //   /*     const urlHome = window.location.href.indexOf('/') */
  //         if (urlPosts === "/posts") {
  //           //Hide the element.
  //           document.querySelectorAll('#container360')[0].style.display = 'none';
  //         }
  //       }
  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => {
      
        const { id, name, location, year, creation, link, published, region, description, category, subcategory, file } =  post;

          let pr = JSON.parse(category);
          console.log(pr[0]?.category1);
        return (
        <Link to={`/post/${id}`} className={linkStyle} key={id}>
          <div key={post.id} className={postContainer}>
            <h1>Texto de prueba</h1>
            <h1 className={postTitleStyle}>{name}</h1>
            { images.map(image => <img src={image} style={{width: 400, marginBottom: 10}} alt="Any text" />) }
            <h3>{name}</h3>
            <p>{location}</p>
            <p>{year}</p>
            <p>{creation}</p>
            <p>{link}</p>
            <p>{published}</p>
            <p>{region}</p>
            <p>{description}</p>
            <p>{category[0]}</p>
            <p>{subcategory}</p>
            <p>{file}</p>
          </div>
        </Link>
        )
      })
    }
    <div>
      <h1>Photo Album</h1>
      <span>Add new image</span>
      <input
        type="file"
        accept='image/png'
        onChange={onChange}
      />
    </div>
    </>
  )
}

const postTitleStyle = css`
  margin: 15px 0px;
  color: #0070f3;
`;

const linkStyle = css`
  text-decoration: none;
`;

const postContainer = css`
  border-radius: 10px;
  padding: 1px 20px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  :hover {
    border-color: #0070f3;
  }
`;

const imageStyle = css`
  width: 100%;
  max-width: 400px;
`;

