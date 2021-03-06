import React from "react";
import { css } from "@emotion/css";

export default function Button({ title, onClick, type = "action", disabled }) {
  return (
    <button disabled={disabled} className={buttonStyle(type)} onClick={onClick}>
      {title}
    </button>
  );
}

const buttonStyle = (type) => css`
  background-color: ${type === "action" ? "cian" : "red"};
  height: 40px;
  width: 260px;
  font-weight: 600;
  font-size: 16px;
  color: grey;
  outline: none;
  border: none;
  margin-top: 5px;
  cursor: pointer;
  :hover {
    background-color: #363636;
  }
`;
