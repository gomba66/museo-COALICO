import React from "react";
import ReactPannellum, { getConfig } from "react-pannellum";

export function PanellumComponent(props) {
  console.log(getConfig());
  const config = {
      autoRotate: -2,
      type: props.cubemap,
    };
  return (
    <div>
      <ReactPannellum
        id="1"
        sceneId="firstScene"
        imageSource={"/assets/fondos/nentro666.jpg"}
        config={config}
      />
    </div>
  )
}
