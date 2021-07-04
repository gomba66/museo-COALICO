import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../PalabrasCruzadas/style/stylePalabras.css";
import "./style/swiper-bundle.min.css";
const ParaOido = (props) => {
  window.onload = function () {
    const url = window.location.href.indexOf("/palabras-cruzadas");
    if (url) {
      //Hide the element.
      document.querySelectorAll(".container360")[0].style.display = "none";
    }
  };
  return (
    <div>
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
            src={"assets/iconos/palabras-cruzadas.png"}
            alt="Logo categoría"
          />
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
              <h1 id="palabras">Palabras cruzadas</h1>
              <img
                id="elementos-mobile"
                src={"assets/elementos/nino3.png"}
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
            Infórmate acerca de nuestra situación en un país en guerra. 
          </p>
        </div>

        {/* <!--Desktop - Título y niña--> */}
        <div id="encabezado" className="d-flex position-absolute row">
          <div className="col-md-1"></div>
          <div className="col-md-7 d-md-block d-none">
            <h1 id="palabras">Palabras cruzadas</h1>
            <p>
              Infórmate acerca de nuestra situación en un país en guerra. 
            </p>
          </div>
          <div className="col-md-4 d-md-block d-none d-flex">
            <img
              id="elementos"
              src={"assets/elementos/nino3.png"}
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
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                loopFillGroupWithBlank={true}
                loop={true}
                pagination={{
                  "clickable": true
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                  },
                }}
                navigation= {{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}                
              >
                {/* <div id="slide-1" className="swiper-slide position-relative"> */}
                <SwiperSlide>
                  <h2 id="slider-title" className="position-absolute"></h2>
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
                </SwiperSlide>
                {/* </div> */}
                <SwiperSlide>
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
                </SwiperSlide>
                <SwiperSlide>
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
                </SwiperSlide>
                <SwiperSlide>
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
                </SwiperSlide>
                {/* <div id="slide-2" className="swiper-slide"> */}
                {/* </div> */}
                {/* <div id="slide-3" className="swiper-slide"> */}
                {/* </div> */}
                {/* <div id="slide-4" className="swiper-slide"> */}
                {/* </div> */}
                {/* <div id="slide-5" className="swiper-slide"> */}
                {/* </div> */}
                <SwiperSlide>
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
                </SwiperSlide>
              </Swiper>
            </div>
            <script src="../../swiper-bundle.min.js"></script>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParaOido;
