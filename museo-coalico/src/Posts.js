import { css } from '@emotion/css';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { API, Auth, Storage } from 'aws-amplify';

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
            <p>{pr[0]?.category1}</p>
            <p>{subcategory}</p>
            <img src={`https://coalico-images101949-dev.s3.us-east-2.amazonaws.com/public/${file}`} style={{width: 400, marginBottom: 10}}/>
          </div>
        </Link>
        )
      })
    }
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

