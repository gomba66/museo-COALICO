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
  }
  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Link to={`/post/${post.id}`} className={linkStyle} key={post.id}>
          <div key={post.id} className={postContainer}>
            <h1>Texto de prueba</h1>
            <h1 className={postTitleStyle}>{post.name}</h1>
            { images.map(image => <img src={image} style={{width: 400, marginBottom: 10}} alt="Any text" />) }
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
        </Link>
      ))}
    </>
  );
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
