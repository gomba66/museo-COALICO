import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PDFReader } from "reactjs-pdf-reader";
import { Link } from "react-router-dom";
import backButton from "./assets/botones/back.png";
import { Swiper, SwiperSlide } from "swiper/react";

export function Post(props) {
  const [loading, updateLoading] = useState(true);
  const [post, updatePost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, []);
  // Create Document Component

  async function fetchPost() {
    axios
      .get(
        "https://m6cet1alej.execute-api.us-east-2.amazonaws.com/dev/getposts"
      )
      .then((res) => {
        let posts = res.data;
        let pieza = posts.filter((item) => item.id === id);
        console.log("pieza", pieza);
        updatePost(pieza[0]);
        updateLoading(false);
      });
  }

  const typeFile = (file, post, index) => {
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
      "mpeg",
    ];
    let formatVideos = ["flv", "ogg", "avi", "mov", "wmv", "mp4", "m4v"];
    let formatDocs = ["pdf"];

    let format = returnFormat(post, index);
    let frame = "";
    let url = null;
    if (post.link === undefined) {
      return null;
    }
    if (!post.link) {
      url = file[index];
    }
    if (formatImages.includes(format)) {
      frame = (
        <>
          <img
            className="position-absolute image-format"
            src={`${file}`}
            alt="Imagen"
          />
        </>
      );
    } else if (formatAudios.includes(format)) {
      frame = (
        <>
          <audio controlsList="nodownload" controls>
            <source
              src="https://files-posts-museo.s3-us-east-2.amazonaws.com/coalico-files/faa9b204-68e9-48fb-830c-94462fe06b2b.mpeg"
              type="audio/mpeg"
            />
          </audio>
        </>
      );
    } else if (formatVideos.includes(format)) {
      frame = (
        <>
          <video width="320" height="240" controls>
            <source src={file} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      );
    } else if (formatDocs.includes(format)) {
      frame = (
        <>
          <div
            style={{ height: "300px", backgroundColor: "red" }}
            className="PDF-format"
          >
            <PDFReader url={file} />
          </div>
        </>
      );
    } else {
      frame = (
        <>
          <iframe width="400px" src={post.link} />
        </>
      );
    }
    return <SwiperSlide key={index}>{frame}</SwiperSlide>;
  };

  const returnFormat = (post, index) => {
    if (post.file_list === undefined) {
      console.log("error undefined");
      return null;
    }
    if (post?.file_list[index]?.length === 0) {
      console.log("file_list len 0");
      return null;
    }
    let divided = post.file_list[index].split(".");
    let format = divided[divided.length - 1];
    format = format.replace('"', "");
    if (format.includes("[")) {
      format = null;
    }
    console.log("return format", format);
    return format;
  };
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
            <Link
              onClick={() => {
                document.querySelectorAll(".container360")[0].style.display =
                  "block";
                props.setIsStart(false);
                window.open("http://museo.coalico.co", "_self");
              }}
            >
              <img id="back-button" src={backButton} alt="Botón atrás" />
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
            <div className="col-md-7">
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                loopFillGroupWithBlank={true}
                loop={true}
                breakpoints={{
                  1500: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 1,
                  },
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
              >
                {post?.file_list.length > 0 &&
                typeof post?.file_list !== "string" ? (
                  post?.file_list.map((file, index) =>
                    typeFile(file, post, index)
                  )
                ) : post?.link ? (
                  <SwiperSlide>
                    <iframe width="400px" src={post.link} />
                  </SwiperSlide>
                ) : (
                  <SwiperSlide>
                    <p>Proximamente agregaremos nuevas piezas</p>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
