import React from "react";
import "../src/quienes-somos.css";

const QuienesSomos = (props) => {
    window.onload = function () {
        const url = window.location.href.indexOf("/quienes-somos");
        if (url) {
          //Hide the element.
          document.querySelectorAll(".container360")[0].style.display = "none";
        }
    };
    return (
        <div id="body">
            <div>
                <h1 className="title">Quiénes somos</h1>
            </div>
            <div>
                <h2 className="title">¿Qué es COALICO?</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
            </div>
            <div>
                <h2 className="title">¿Por qué se creó el museo?</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
            </div>
            <div>
                <h2 className="title">Colaboradores</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
            </div>

        </div>
    ); 
};

export default QuienesSomos;
