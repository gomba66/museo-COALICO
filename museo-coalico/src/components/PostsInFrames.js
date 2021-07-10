import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
const PostsInFrames = (props) => {
  const [renderedPosts, setRenderedPosts] = useState(null);
  useEffect(() => {
    renderPosts();
    console.log(props.posts);
  }, [props.posts]);

  const typeFrame = (post) => {
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
    if (formatImages.includes(format)) {
      return (
        <>
          <img
            id="marco-slides"
            src={"assets/marcos/texto-preview.png"}
            alt="marco-slide"
          />
          <img
            className="position-absolute"
            id="img-ref"
            src={"assets/img-ref/articulo-elemento.png"}
            alt="Imagen de audio"
          />
        </>
      );
    } else if (formatAudios.includes(format)) {
      return (
        <>
          <img
            id="marco-slides"
            src={"assets/marcos/audio-preview.png"}
            alt="marco-slide"
          />
          <img
            className="position-absolute"
            id="img-ref"
            src={"assets/img-ref/audio-elemento.png"}
            alt="Imagen de audio"
          />
        </>
      );
    } else if (formatImages.includes(format)) {
      return (
        <img
          id="marco-slides"
          src={"assets/marcos/texto-preview.png"}
          alt="marco-slide"
        />
      );
    } else if (formatVideos.includes(format)) {
      return (
        <>
          <img
            id="marco-slides"
            src={"assets/marcos/video-preview.png"}
            alt="marco-slide"
          />
          <img
            className="position-absolute"
            id="img-ref"
            src={"assets/img-ref/video-elemento.png"}
            alt="Imagen de audio"
          />
        </>
      );
    } else if (formatDocs.includes(format)) {
      return (
        <>
          <img
            id="marco-slides"
            src={"assets/marcos/texto-preview.png"}
            alt="marco-slide"
          />
          <img
            className="position-absolute"
            id="img-ref"
            src={"assets/img-ref/articulo-elemento.png"}
            alt="Documento"
          />
        </>
      );
    } else {
      return (
        <>
          <img
            id="marco-slides"
            src={"assets/marcos/video-preview.png"}
            alt="marco-slide"
          />
          <img
            className="position-absolute"
            id="img-ref"
            src={"assets/img-ref/video-elemento.png"}
            alt="Imagen de audio"
          />
        </>
      );
    }
  };

  const returnFormat = (post) => {
    let divided = post.file.split(".");
    let format = divided[divided.length - 1];
    format = format.replace('"', "");
    if (format.includes("[")) {
      format = null;
    }
    return format;
  };

  const renderPosts = async () => {
    if (props.posts) {
      setRenderedPosts(
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loopFillGroupWithBlank={true}
          loop={true}
          breakpoints={{
            1500: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 3,
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
        >
          {props.posts.map((post, index) => {
            return (
              <SwiperSlide key={index}>
                <h2
                  id="slider-title"
                  className="position-absolute overflow-ellipsis"
                >
                  {post.name}
                </h2>
                {typeFrame(post)}
              </SwiperSlide>
            );
          })}
        </Swiper>
      );
    } else {
      setRenderedPosts(<p>No posts...</p>);
    }
  };
  return <>{renderedPosts}</>;
};

export default PostsInFrames;
