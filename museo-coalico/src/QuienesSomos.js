import React from "react";
import "../src/quienes-somos.css";
import nicolas from "./assets/quienes-somos/desarrollador-nicolas.jpeg"
import doniben from "./assets/quienes-somos/desarrollador-doniben.jpeg"
import fernando from "./assets/quienes-somos/coordinador-fernando.jpeg"
import joan from "./assets/quienes-somos/diseñador-joan.jpeg"
import katerin from "./assets/quienes-somos/coordinador-kath.jpeg"
import hilda from "./assets/quienes-somos/directora-hilda.jpeg"

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
                    <h2 className="title text-center mt-5">LA COALICO </h2>
                    <p className="paragraph text-center">
                        El objetivo de la Coalición contra la vinculación de niños, niñas y jóvenes al conflicto armado en Colombia (COALICO) es contribuir, desde un enfoque de derechos, a la disminución efectiva del uso, reclutamiento y vinculación de los niños, niñas y jóvenes al conflicto armado, mediante procesos de observación, prevención, protección e incidencia política frente a la sociedad, el Estado y la comunidad internacional.
                    </p>
                </div>

                <div>
                    <h2 className="title text-center mt-5">EL MUSEO DE LA MEMORIA</h2>
                    <p className="paragraph text-center">
                    Mediante el desarrollo de un sistema tecnológico novedoso, nos encontramos en un espacio que nos trasportará a múltiples realidades que son parte de nuestra historia, la del país y la región, la de los grupos y los individuos, la del pasado y el presente. Recorreremos lugares desconocidos, tragedias que contrastan con la creatividad y la esperanza. Nos hallaremos ante acontecimientos que han marcado la búsqueda de la verdad y la justicia a lo largo de los años. Escucharemos los mensajes con los que la infancia y la juventud anuncian un modo de vivir diferente a la violencia. Viajaremos para volar y para seguir soñando. 
                    </p>
                </div>

                <div>
                    <h2 className="title text-center mt-5">LA MÁQUINA DEL TIEMPO</h2>
                    <p className="paragraph text-center">
                    El tiempo es, ante todo, movimiento. En esta máquina no estamos por fuera, sino dentro de ese movimiento. Somos parte, nos movemos con cada pieza, al activar un botón o una palanca ya estamos en el interior de un universo que nos aloja y que nos invita al descubrimiento. Al tocar una pantalla, ya ingresamos a un territorio que contiene información, imágenes o voces, que nos llevan a explorar en distintas experiencias del pasado y del presente. Pero interactuamos para que cada quien ponga su sello, deje sus huellas, comparta sus emociones y pensamientos, quien se vaya vinculando al viaje irá dejando los signos de un nuevo amanecer, del nuevo tiempo que está por venir.
                    </p>
                </div>

                <div>
                    <h2 className="title text-center mt-5">Créditos</h2>
                    <h3 className="text-center">Dirección del proyecto: </h3>
                    <p className="paragraph text-center">
                        Káterin de Alba Hernández Rodríguez y Fernando González Santos
                    </p>
                    <br></br>
                    <h3 className="text-center">Desarrolladores: </h3>
                    <p className="paragraph text-center">
                        Doniben Jiménez y Nicolás Morán
                    </p>
                    <br></br>
                    <h3 className="text-center">Diseño web: </h3>
                    <p className="paragraph text-center">
                        Joan Barbosa
                    </p>
                </div>
            </div>

        </div>
    ); 
};

export default QuienesSomos;
