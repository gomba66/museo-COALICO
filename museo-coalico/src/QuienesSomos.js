import React from "react";
import "../src/quienes-somos.css";
import nicolas from "./assets/quienes-somos/desarrollador-nicolas.jpeg"
import doniben from "./assets/quienes-somos/desarrollador-doniben.jpeg"
import fernando from "./assets/quienes-somos/coordinador-fernando.jpeg"
import joan from "./assets/quienes-somos/diseñador-joan.jpeg"
import katerin from "./assets/quienes-somos/coordinador-kath.jpeg"

const QuienesSomos = (props) => {
    window.onload = function () {
        const url = window.location.href.indexOf("/quienes-somos");
        if (url) {
          //Hide the element.
          document.querySelectorAll(".container360")[0].style.display = "none";
        }
    };
    return (
        <div id="body" className="d-flex">
            <div className="banner d-flex">
                <h1 className="title general-title">Quiénes somos</h1>
            </div>
            <div className="content container">
                <div>
                    <h2 className="title text-center mt-5">¿Qué es COALICO?</h2>
                    <p className="paragraph text-center">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                    </p>
                </div>

                <div>
                    <h2 className="title text-center mt-5">¿Por qué se creó el museo?</h2>
                    <p className="paragraph text-center">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                    </p>
                </div>
                <div>
                    <h2 className="title text-center mt-5">Colaboradores</h2>
                    <div className="card-deck mt-2">
                        <div className="card">
                            <img className="card-img-top" src={nicolas} alt="Desarrollador" />
                            <div className="card-body">
                                <h5 className="card-title">Nicolás Morán</h5>
                                <p className="card-text">Desarrollador de la página</p>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src={doniben} alt="Desarrollador" />
                            <div className="card-body">
                                <h5 className="card-title">Doniben Jimenez</h5>
                                <p className="card-text">Desarrollador de la página</p>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src={joan} alt="Diseñador" />
                            <div className="card-body">
                                <h5 className="card-title">Joan Barbosa</h5>
                                <p className="card-text">Diseñador de la página</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-deck mt-3">
                        <div className="card">
                            <img className="card-img-top" src={fernando} alt="Coordinador de contenidos de la página" />
                            <div className="card-body">
                                <h5 className="card-title">Fernando Gonzáles</h5>
                                <p className="card-text">Coordinador de contenidos de la página</p>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src={katerin} alt="Coordinador de contenidos de la página" />
                            <div className="card-body">
                                <h5 className="card-title">Katerin Hernández</h5>
                                <p className="card-text">Coordinador de contenidos de la página</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    ); 
};

export default QuienesSomos;
