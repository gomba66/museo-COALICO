import React, { useState, useEffect } from "react";
import { css } from "@emotion/css";
import Button from "./Button";
import { Storage, API, graphqlOperation } from "aws-amplify";
import { updatePost } from "./graphql/mutations";
import { v4 as uuid } from "uuid";

import axios from "axios";
import S3 from "react-aws-s3";
const config = {
  dirName: `coalico-files` /*optional */,
  bucketName: "files-posts-museo",
  region: "us-east-2",
  accessKeyId: "AKIAQK4G73H7XAQ5IJ4E",
  secretAccessKey: "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",
};

export default function UpdateFileModal({
  title,
  published_year,
  link,
  origin_region,
  description,
  category,
  subcategory,
  file_list,
  id,
  refreshPosts,
}) {
  /* Initial state to hold form input, saving state */
  useEffect(() => {
    setFiles2({ length: file_list.length });
    setFormState({
      title,
      published_year,
      link,
      origin_region,
      description,
      category,
      subcategory,
      file_list,
    });
  }, [
    title,
    published_year,
    link,
    origin_region,
    description,
    category,
    subcategory,
    file_list,
  ]);
  const [files2, setFiles2] = useState({ length: 0 });
  const [files, setFiles] = useState({ length: 0 });
  const [formState, setFormState] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [locationFiles, setLocationFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (file) => {
    let newFileName = uuid();
    const ReactS3Client = new S3(config);
    let res = await ReactS3Client.uploadFile(file, newFileName);
    console.log("s3=>>", res);
    let tempList = locationFiles;
    tempList.push(res.location);
    setLocationFiles(tempList);
    return;
  };
  function onChangeText(e) {
    e.persist();
    setFormState((currentState) => ({
      ...currentState,
      [e.target.name]: e.target.value,
    }));
  }
  const renderImages = (files) => {
    let i = 0;

    let itemsList = [];
    while (i < files.length) {
      itemsList[i] = files[i];

      i++;
    }
    itemsList = itemsList.map((item, index) => {
      function returnFileSize(number) {
        if (number < 1024) {
          return number + "bytes";
        } else if (number >= 1024 && number < 1048576) {
          return (number / 1024).toFixed(1) + "KB";
        } else if (number >= 1048576) {
          return (number / 1048576).toFixed(1) + "MB";
        }
      }
      function handleName(name) {
        if (name.length > 35) {
          return name.slice(0, 35) + " ...";
        } else return name;
      }
      return (
        <div
          key={index}
          className="card"
          style={{
            width: "48%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 5,
              marginTop: 5,
              overflow: "hidden",
            }}
          >
            <b>FileName: </b>
            <u>{handleName(item.name)}</u>
            <b>Size: </b>
            {returnFileSize(item.size)}
          </div>
          <div>
            <img
              alt=""
              src={URL.createObjectURL(item)}
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
          </div>
        </div>
      );
    });

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          flexFlow: "row wrap",
          alignContent: "flex-end",
          justifyContent: "space-between",
        }}
      >
        {itemsList}
      </div>
    );
  };
  async function save() {
    setIsSaving(true);
    const postId = { id };
    let {
      title = "",
      published_year = "",
      link = "",
      origin_region = "",
      description = "",
      category = "",
      subcategory = "",
      file_list = [],
    } = formState;
    if (
      !title ||
      !published_year ||
      !origin_region ||
      !description ||
      !category ||
      !subcategory
    ) {
      setIsSaving(false);
      alert("Por favor no deje campos vacíos");
      return;
    }
    let postInfo = {
      id: postId.id,
      title,
      published_year,
      link,
      origin_region,
      description,
      category,
      subcategory,
      file_list,
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // setUploadingImages(true);
    setProgress(0);
    let newArr = files;
    for (let i = 0; i < newArr.length; i++) {
      await handleUpload(newArr[i]);
      if (i !== 0) {
        let pr = (i / files.length) * 100;
        setProgress(Math.round(pr));
      } else {
        setProgress(0);
      }
    }

    setTimeout(async () => {
      setProgress(0);
    }, 500);
    if (file_list !== null) {
      postInfo.file_list = file_list.concat(locationFiles);
    }
    if (locationFiles.length > 0) {
      postInfo.file_list = locationFiles;
    }

    axios
      .post(
        " https://m6cet1alej.execute-api.us-east-2.amazonaws.com/dev/updatepost",
        postInfo,
        axiosConfig
      )
      .then((res) => {
        console.log(res);
        setIsSaving(false);
        refreshPosts();
        setFiles({ length: 0 });
        alert("Actualizado!");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className={containerStyle}>
      <input
        placeholder="Nombre de la pieza"
        name="title"
        value={formState.title}
        className={inputStyle}
        onChange={onChangeText}
        disabled={isSaving}
      />
      <input
        placeholder="Año de publicación"
        name="published_year"
        value={formState.published_year}
        className={inputStyle}
        onChange={onChangeText}
        disabled={isSaving}
      />
      <input
        placeholder="link de coalico.org"
        name="link"
        value={formState.link}
        className={inputStyle}
        onChange={onChangeText}
        disabled={isSaving}
      />
      <input
        placeholder="Región"
        name="origin_region"
        value={formState.origin_region}
        className={inputStyle}
        onChange={onChangeText}
        disabled={isSaving}
      />
      <input
        placeholder="Descripción"
        name="description"
        value={formState.description}
        className={inputStyle}
        onChange={onChangeText}
        disabled={isSaving}
      />
      <input
        placeholder="Categoría"
        name="category"
        value={formState.category}
        className={inputStyle}
        onChange={onChangeText}
        disabled={isSaving}
      />
      <input
        placeholder="Subcategoría"
        name="subcategory"
        value={formState.subcategory}
        className={inputStyle}
        onChange={onChangeText}
        disabled={isSaving}
      />
      <h6 className="modal-title" id="addNewGroupLabel">
        Archivos ({files2.length})
      </h6>
      <br />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          id="image_uploads1"
          onChange={(e) => {
            setFiles(e.target.files);
            setShowPreview(true);
            console.log(e);
          }}
          type="file"
          multiple
          disabled={isSaving}
        />
      </div>
      <label
        style={{ width: "270px" }}
        className={
          isSaving ? "btn  btn-outline-light active" : "btn btn-outline-primary"
        }
        htmlFor="image_uploads1"
      >
        Agregar archivos al Museo ({files.length})
      </label>
      {files.length > 0 && showPreview ? (
        <div
          className="form-group"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <React.Fragment>
            <div className="modal-backdrop in"></div>
            <div
              className="modal fade in show"
              id="exampleModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
              style={{ display: "block" }}
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg tx-2"
                role="document"
              >
                <div className="modal-content tx-12">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addNewGroupLabel">
                      Subir archivos ({files.length})
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setFiles({ length: 0 })}
                      disabled={isSaving}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div
                      className="card"
                      style={{
                        maxHeight: "500px",
                        minHeight: "325px",
                        overflow: "scroll",
                      }}
                    >
                      <div className="card-body">
                        <div>{renderImages(files)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      disabled={isSaving}
                      className="btn btn-danger tx-13"
                      data-dismiss="modal"
                      onClick={() => setFiles({ length: 0 })}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={async () => {
                        setShowPreview(false);
                      }}
                    >
                      <span
                        className={`spinner-border spinner-border-sm mr-1 ${
                          !isSaving ? "hidden" : ""
                        }`}
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        </div>
      ) : null}
      <Button
        disabled={isSaving}
        title={isSaving ? `Actualizando... ${progress}%` : "Actualizar Post"}
        onClick={(e) => {
          e.preventDefault();
          save();
        }}
      />
      {isSaving ? (
        <p className={savingMessageStyle}>Guardando post...</p>
      ) : null}
    </div>
  );
}

const inputStyle = css`
  margin-bottom: 10px;
  outline: none;
  padding: 7px;
  border: 1px solid #ddd;
  font-size: 16px;
  border-radius: 4px;
`;

const fileStyle = css`
  height: 120px;
  margin: 10px 0px;
  object-fit: contain;
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
  left: 0;
  border-radius: 4px;
  top: 0;
  margin-left: calc(50vw - 30vw);
  /* margin-top: calc(50vh - 230px); */
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.125rem 0.25rem;
  padding: 20px;
`;

const savingMessageStyle = css`
  margin-bottom: 0px;
`;
