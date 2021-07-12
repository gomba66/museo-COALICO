import React from "react";
import "../PostBase/style/stylePostBase.css";

const PostBase = (props) => {
    window.onload = function () {
        const url = window.location.href.indexOf("/post-base");
        if (url) {
          //Hide the element.
          document.querySelectorAll(".container360")[0].style.display = "none";
        }
    };
    return (
        <div id="body-post">
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

            {/* <!--Mobile - Título y párrafo--> */}
            <div id="encabezado-p" className="row position-absolute d-flex">
                <div className="col-12 d-none d-sm-block d-md-none d-block d-sm-none">
                    <h1 className="titulo-post">Heridas del conflicto</h1>
                </div>
                <div className="col-12 d-none d-sm-block d-md-none d-block d-sm-none">
                <div className="scroll-p">
                        <p className="p-post">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries                             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries

                        </p>
                    </div>
                </div>
            </div>

            {/* <!--Desktop - Título y párrafo--> */}
            <div id="encabezado-p" className="d-flex position-absolute row">
                <div className="col-12 d-md-block d-none">
                    <h1 className="titulo-post ml-5">Heridas del conflicto</h1>
                </div>
                <div className="col-5 d-md-block d-none ml-5">
                    <div className="scroll-p">
                        <p className="p-post">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries                             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries

                        </p>
                    </div>
                </div>
                <div className="col-6 d-md-block d-none"></div>
            </div> 
        </div>
    );
};

export default PostBase;
