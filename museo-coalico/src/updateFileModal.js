import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import Button from './Button';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { updatePost } from './graphql/mutations';

export default function UpdateFileModal({ name, year, link, region, description, category, subcategory, file, id, updatePosts, posts }) {
  /* Initial state to hold form input, saving state */
  useEffect(() => {
    setFormState({
      name,
      year,
      link,
      region,
      description,
      category,
      subcategory,
      file,
    })
  }, [name, year, link, region, description, category, subcategory, file])
/*   const initialState = {
    name: name,
    year: year,
    link: link,
    region: region,
    description: description,
    category: category,
    subcategory: subcategory,
    file: file,
    saving: false
  }; */
  const [formState, setFormState] = useState("");
  const [showModal, setShowModal] = useState();

  async function save() {
    try {
      let { 
        name,
        year,
        link,
        region,
        description,
        category,
        subcategory,
        file } = formState;
        
        category = JSON.stringify(category);
        subcategory = JSON.stringify(subcategory);
        file = JSON.stringify(formState.fileUploaded.name);
        

        console.log("formState ", formState)
      if ( !name || 
        !year || 
        !link || 
        !region || 
        !description || 
        !category || 
        !subcategory || 
        !file) return;
      setFormState(currentState => ({ ...currentState, saving: true }));
      const postId = {id};
      let postInfo = { name, year, link, region, description, category, subcategory, file, id: postId };

      const infoStorage = await Storage.put(formState.fileUploaded.name, formState.fileUploaded.fileInfo);
      console.log('====================================');
      console.log("infoStorage ", infoStorage);
      console.log('====================================');
      console.log('====================================');
      console.log(postInfo);
      console.log('====================================');
      await API.graphql(graphqlOperation(updatePost, { input: postInfo }));
      updatePosts([...posts, { ...postInfo }]);
      setFormState(currentState => ({ ...currentState, saving: false }));
      } catch (err) {
      console.log('error: ', err);
    }
  }

  function onChangeFile(e) {
    e.persist();
    if (! e.target.files[0]) return;
    const fileUploaded = { fileInfo: e.target.files[0], name: `${id}_${e.target.files[0].name}`}
    fileUploaded.name = fileUploaded.name.replace(/\s/g, "_")
    setFormState(currentState => ({ ...currentState, file: URL.createObjectURL(e.target.files[0]), fileUploaded }))
  }

  function onChangeText(e) {
    e.persist();
    setFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }));
  }

  return (
    <div className={containerStyle}>
      <input
        placeholder="Nombre de la pieza"
        name="name"
        value={formState.name}
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Año de publicación"
        name="year"
        value={formState.year}
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="link de coalico.org"
        name="link"
        value={formState.link}
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Región"
        name="region"
        value={formState.region}
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Descripción"
        name="description"
        value={formState.description}
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Categoría"
        name="category"
        value={formState.category}
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Subcategoría"
        name="subcategory"
        value={formState.subcategory}
        className={inputStyle}
        onChange={onChangeText}
      />
      <input 
        type="file"
        name="file"
        onChange={onChangeFile}
      /> 
      { formState.file && <img className={fileStyle} alt="preview" src={formState.file} /> }
      <Button title="Actualizar Post" onClick={save} />
      {/* <Button type="cancel" title="Cancel" onClick={() => updateOverlayVisibility(false)} /> */}
      { formState.saving && <p className={savingMessageStyle}>Guardando post...</p> }
    </div>
  )
}

const inputStyle = css`
  margin-bottom: 10px;
  outline: none;
  padding: 7px;
  border: 1px solid #ddd;
  font-size: 16px;
  border-radius: 4px;
`

const fileStyle = css`
  height: 120px;
  margin: 10px 0px;
  object-fit: contain;
`

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
`

const savingMessageStyle = css`
  margin-bottom: 0px;
`
