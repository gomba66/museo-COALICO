import React, { useState, useEffect } from "react";
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
}) {
  const [modal, setModal] = useState(false);
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    console.log(modal);
  }, [modal]);

  return (
    <>
      <tr>
        <th scope="row">1</th>
        <td>
          <i class="bi bi-pencil-square" onClick={() => setModal(!modal)}></i>
        </td>
        <td>{title}</td>
        <td>{published_year}</td>
        <td>{link}</td>
        <td>{origin_region}</td>
        <td>{description}</td>
        <td>{category}</td>
        <td>{subcategory}</td>
        <td>{file_list}</td>
      </tr>
      {modal ? (
        <UpdateFileModal
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
