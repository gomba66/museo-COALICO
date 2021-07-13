import React, { useState, useEffect } from "react";
import { css } from "@emotion/css";
import UpdateFileModal from "./updateFileModal";

export function UpdateFiles({
  title,
  published_year,
  link,
  origin_region,
  description,
  category,
  subcategory,
  file_list,
  id,
  index,
  refreshPosts,
}) {
  const [modal, setModal] = useState(false);
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    console.log(modal);
  }, [modal]);

  return (
    <>
      <tr>
        <th scope="row">{index}</th>
        <td>
          <i class="bi bi-pencil-square" onClick={() => setModal(!modal)}></i>
        </td>
        <td>{title}</td>
        <td>{published_year}</td>
        <td>
          <div style={{ height: "100px", width: "260px", overflow: "hidden" }}>
            {link}
          </div>
        </td>
        <td>{origin_region}</td>
        <td style={{ maxWidth: "100px" }}>{description}</td>
        <td>{category}</td>
        <td>{subcategory}</td>
        <td>
          <div
            style={{ overflow: "scroll", height: "200px", overflowX: "hidden" }}
          >
            {file_list}
          </div>
        </td>
      </tr>
      {modal ? (
        <UpdateFileModal
          refreshPosts={refreshPosts}
          {...{
            title,
            published_year,
            link,
            origin_region,
            description,
            category,
            subcategory,
            file_list,
            id,
          }}
        />
      ) : null}
    </>
  );
}
