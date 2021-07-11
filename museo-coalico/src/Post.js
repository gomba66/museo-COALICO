import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { getPost } from "./graphql/queries";
// import { PDFReader } from "reactjs-pdf-reader";

export function Post() {
  const [loading, updateLoading] = useState(true);
  const [post, updatePost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, []);
  // Create Document Component

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

  const typeFile = (post) => {
    let formatImages = ["png", "jpg", "jpeg", "bmp", "HEIF"];
    let formatAudios = [
      "3pg",
      "aa",
      "aac",
      "aax",
      "act",
      "aiff",
      "alac",
      "ape",
      "au",
      "awb",
      "dss",
      "flac",
      "gsm",
      "iklax",
      "ivs",
      "m4a",
      "m4b",
      "m4p",
      "mmf",
      "mp3",
      "mpc",
      "msv",
      "nmf",
      "oga",
      "mogg",
      "opus",
      "ra",
      "rm",
      "raw",
      "rf64",
      "sln",
      "tta",
      "voc",
      "vox",
      "wav",
      "wma",
      "wv",
      "8svx",
      "cda",
    ];
    let formatVideos = ["flv", "ogg", "avi", "mov", "wmv", "mp4", "m4v"];
    let formatDocs = ["pdf"];

    let format = returnFormat(post);
    let frame = "";
    let url = post.file;
    url = url.replace(/['"]+/g, "");

    if (formatImages.includes(format)) {
      frame = (
        <>
          <img
            className="position-absolute"
            src={`https://coalico-images101949-dev.s3.us-east-2.amazonaws.com/public/${url}`}
            width="350px"
            alt="Imagen"
          />
        </>
      );
    } else if (formatAudios.includes(format)) {
      frame = (
        <>
          <audio>
            <source
              src={`https://coalico-images101949-dev.s3.us-east-2.amazonaws.com/public/${url}`}
            />
          </audio>
        </>
      );
    } else if (formatImages.includes(format)) {
      frame = (
        <img
          id="marco-slides"
          src={"assets/marcos/texto-preview.png"}
          alt="marco-slide"
        />
      );
    } else if (formatVideos.includes(format)) {
      frame = (
        <>
          <h3 style={{ color: "white" }}>File:</h3>
          <p style={{ color: "white" }}>{format}</p>
        </>
      );
    } else if (formatDocs.includes(format)) {
      frame = (
        <>
          {/* <div style={{ overflow: "scroll", height: 600 }}>
            <PDFReader
              src={`https://coalico-images101949-dev.s3.us-east-2.amazonaws.com/public/${url}`}
            />
          </div> */}
          <h3 style={{ color: "white" }}>File:</h3> {format}
        </>
      );
    } else {
      frame = (
        <>
          <h3 style={{ color: "white" }}>File:</h3> {format}
        </>
      );
    }
    return frame;
  };

  const returnFormat = (post) => {
    if (post.file == null) {
      return "";
    }
    let divided = post.file.split(".");
    let format = divided[divided.length - 1];
    format = format.replace('"', "");
    if (format.includes("[")) {
      format = null;
    }
    return format;
  };
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
            <div className="col-6 d-md-block d-none">{typeFile(post)}</div>
          </div>
        </div>
      )}
    </>
  );
}
