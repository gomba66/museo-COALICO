import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { getPost } from "./graphql/queries";
import axios from "axios";
import { PDFReader } from "reactjs-pdf-reader";
import { Link } from 'react-router-dom';
import backButton from './assets/botones/back.png'

export function Post(props) {
  const [loading, updateLoading] = useState(true);
  const [post, updatePost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, []);
  // Create Document Component

  async function fetchPost() {
    //   try {
    //     const postData = await API.graphql({
    //       query: getPost,
    //       variables: { id },
    //     });
    //     console.log(postData);
    //     const currentPost = postData.data.getTodo;
    //     const image = await Storage.get(currentPost.image);
    //     console.log("====================================");
    //     console.log(image);
    //     console.log("====================================");
    //     currentPost.image = image;
    //     updatePost(currentPost);
    //     updateLoading(false);
    //   } catch (err) {
    //     console.log("error: ", err);
    //   }
    axios
      .get(
        "https://m6cet1alej.execute-api.us-east-2.amazonaws.com/dev/getposts"
      )
      .then((res) => {
        let posts = res.data;
        let pieza = posts.filter((item) => item.id === id);
        console.log("PIEZA=>>", pieza);
        updatePost(pieza[0]);
        updateLoading(false);
      });
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
    let url = null;
    if (post.link === undefined) {
      return null;
    }
    if (!post.link) {
      url = post.file_list[0];
    }
    if (url) {
      url = url.replace(/['"]+/g, "");
    }
    if (formatImages.includes(format)) {
      frame = (
        <>
          <img
            className="position-absolute image-format"
            src={`${url}`}
            alt="Imagen"
          />
        </>
      );
    } else if (formatAudios.includes(format)) {
      frame = (
        <>
          <audio>
            <source src={`${url}`} />
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
          <div className="PDF-format">
            <PDFReader url={url} />
          </div>
      );
    } else {
      frame = (
        <>
          <iframe width="400px" src={post.link} />
        </>
      );
    }
    return frame;
  };

  const returnFormat = (post) => {
    if (post.file_list === undefined) {
      return null;
    }
    console.log('====================================');
    console.log(post);
    console.log('====================================');
    if (post?.file_list[0]?.length === 0 || post?.link) {
      return null;
    }
    let divided = post.file_list[0].split(".");
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
        <div id="body-post" className="position-relative no-padding w-100">
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
            <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'block'; props.setIsStart(false); window.open("http://museo.coalico.co", "_self")}}>
              <img
                  id="back-button"
                  src={backButton}
                  alt="Botón atrás"
                />
            </Link>
            <div className="hover-back"></div>
          </div>

          {/* <!--Mobile - Título y párrafo--> */}
          <div id="encabezado-p" className="row position-absolute d-flex">
            <div className="col-12 d-none d-sm-block d-md-none d-block d-sm-none">
              <h1 className="titulo-post">{post.title}</h1>
            </div>
            <div className="col-12 d-none d-sm-block d-md-none d-block d-sm-none">
              <div className="scroll-p">
                <p className="p-post">{post.description}</p>
              </div>
              {/* <div className="col-7">{typeFile(post)}</div> */}
            </div>
          </div>

          {/* <!--Desktop - Título y párrafo--> */}
          <div id="encabezado-p" className="d-flex position-absolute row">
            <div className="col-12 d-md-block d-none">
              <h1 className="titulo-post ml-5">{post.title}</h1>
            </div>
            <div className="col-4 d-md-block d-none ml-5">
              <div className="scroll-p">
                <p className="p-post">{post.description}</p>
              </div>
            </div>
            <div className="col-md-7">{typeFile(post)}</div>
          </div>
        </div>
      )}
    </>
  );
}
