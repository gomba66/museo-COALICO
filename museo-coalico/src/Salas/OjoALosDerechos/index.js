import React from "react";
import PostsInFrames from "../../components/PostsInFrames";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import "../style/styleCategory.css";
import "../style/swiper-bundle.min.css";
import "../../index.css";
import { Link } from 'react-router-dom';

SwiperCore.use([Pagination, Navigation]);
const OjoALosDerechos = (props) => {
  window.onload = function () {
    const url = window.location.href.indexOf("/ojo-a-los-derechos");
    if (url) {
      //Hide the element.
      document.querySelectorAll(".container360")[0].style.display = "none";
    }
  };
  return (
    <div id="body-posts">
      <main className="no-padding position-relative w-100">
        {/* <!--Marcos--> */}
        <div>
          <img
            id="marco"
            className="pt-1 d-none d-md-block"
            src={"assets/marcos/marco-general.png"}
            alt="background marco"
            height="100%"
            width="100%"
          />
          <img
            id="logo-cat"
            className="position-absolute"
            src={"assets/iconos/ojo-a-los-derechos.png"}
            alt="Logo categoría"
          />
          <Link onClick={()=>{document.querySelectorAll('.container360')[0].style.display = 'block'; props.setIsStart(false); window.open("http://museo.coalico.co", "_self")}}>
              <img
                id="back-button"
                src={"assets/botones/back.png"}
                alt="Botón atrás"
              />
          </Link>
          <div className="hover-back"></div>
        </div>
        <div>
          <img
            id="marco"
            className="pt-1 d-md-none"
            src={"assets/marcos/marco-general-mobile.png"}
            alt="background marco"
            height="100%"
            width="100%"
          />
        </div>

        {/* <!--Mobile - Título y niña--> */}
        <div id="encabezado" className="row position-absolute d-flex">
          <div className="col d-none d-sm-block d-md-none d-block d-sm-none">
            <div className="d-flex">
              <h1 id="ojo">Ojo a los derechos</h1>
              <img
                id="elementos-mobile"
                src={"assets/elementos/nina8.png"}
                alt="Niña fondo"
              />
            </div>
          </div>
        </div>
        <div
          id="p-mobile"
          className="position-absolute d-none d-sm-block d-md-none d-block d-sm-none"
        >
          <p>
            Monitoreo a la situación de niños, niñas y jóvenes en el conflicto
            colombiano.
          </p>
        </div>

        {/* <!--Desktop - Título y niña--> */}
        <div id="encabezado" className="d-flex position-absolute row">
          <div className="col-md-7 d-md-block d-none ml-5 pl-5">
            <h1 id="ojo">Ojo a los derechos</h1>
            <p>
              Monitoreo a la situación de niños, niñas y jóvenes en el conflicto
              colombiano.
            </p>
          </div>
          <div className="col-md-4 d-md-block d-none d-flex">
            <img
              id="elementos"
              src={"assets/elementos/nina8.png"}
              alt="Niña fondo"
            />
          </div>
        </div>

        <prevEl>
          <div className="swiper-button-prev"></div>
        </prevEl>
        <nextEl>
          <div className="swiper-button-next"></div>
        </nextEl>

        {/* <!-- Slider main container --> */}
        <div id="slider" className="position-absolute">
          <div className="swiper-container">
            {/* <!-- Additional required wrapper --> */}
            <div className="swiper-wrapper">
              {/* <!-- Slides --> */}
              <PostsInFrames posts={props.posts} />
            </div>

            <script src="../../swiper-bundle.min.js"></script>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OjoALosDerechos;
