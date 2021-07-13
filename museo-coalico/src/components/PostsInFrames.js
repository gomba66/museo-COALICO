import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
const PostsInFrames = (props) => {
  const [renderedPosts, setRenderedPosts] = useState(null);
  useEffect(() => {
    renderPosts();
  }, [props.posts]);

  const returnFormat = (post) => {
    if (post.file_list === undefined || post.file_list.length === 0) {
      return "";
    }
    let divided = post.file_list[0].split(".");
    let format = divided[divided.length - 1];
    format = format.replace('"', "");
    if (format.includes("[")) {
      format = null;
    }
    return format;
  };

  const typeFrame = (post) => {
    let formatImages = ["png", "jpg", "jpeg", "bmp", "HEIF", "svg"];
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
    if (formatImages.includes(format)) {
      frame = (
        <>
          <img
            id="marco-slides"
            src={"assets/marcos/image-preview.png"}
            alt="Marco diapositiva"
          />
          <img
            className="position-absolute"
            id="img-ref"
            src={"assets/img-ref/image-elemento.png"}
            alt="Referencia a imagen"
          />
        </>
      );
    } else if (formatAudios.includes(format)) {
      frame = (
        <>
          <img
            id="marco-slides"
            src={"assets/marcos/audio-preview.png"}
            alt="Marco diapositiva"
          />
          <img
            className="position-absolute"
            id="img-ref"
            src={"assets/img-ref/audio-elemento.png"}
            alt="Referencia a audio"
          />
        </>
      );
    } else if (formatVideos.includes(format)) {
      frame = (
        <>
          <img
            id="marco-slides"
            src={"assets/marcos/video-preview.png"}
            alt="Marco diapositiva"
          />
          <img
            className="position-absolute"
            id="img-ref"
            src={"assets/img-ref/video-elemento.png"}
            alt="Referencia a video"
          />
        </>
      );
    } else if (formatDocs.includes(format)) {
      frame = (
        <>
          <img
            id="marco-slides"
            src={"assets/marcos/texto-preview.png"}
            alt="Marco diapositiva"
          />
          <img
            className="position-absolute"
            id="img-ref"
            src={"assets/img-ref/articulo-elemento.png"}
            alt="Referencia a texto"
          />
        </>
      );
    } else {
      frame = (
        <>
          <img
            id="marco-slides"
            src={"assets/marcos/link-preview.png"}
            alt="Marco diapositiva"
          />
          <img
            className="position-absolute"
            id="img-ref"
            src={"assets/img-ref/web-elemento.png"}
            alt="Referencia a página web"
          />
        </>
      );
    }
    return (
      <Link
        to={`/post/${post.id}`}
        style={{ textDecoration: "none" }}
        key={post.id}
      >
        {frame}
      </Link>
    );
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
          {props.posts
            .map((post, index) => {
              return [
                post,
                <SwiperSlide key={index}>
                  <h2
                    id="slider-title"
                    className="position-absolute overflow-ellipsis"
                  >
                    {post.title}
                  </h2>

                  {typeFrame(post)}
                </SwiperSlide>,
              ];
            })
            .filter(function (item) {
              let cat_list = item[0].category.split(",");
              cat_list = cat_list.map((item) => {
                return item.toLowerCase();
              });
              return cat_list.includes(props.sala.toLowerCase());
            })
            .map((it) => {
              return it[1];
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
