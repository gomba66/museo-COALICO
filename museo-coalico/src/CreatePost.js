import React, { useState } from 'react';
import { css } from '@emotion/css';
import Button from './Button';
import { v4 as uuid } from 'uuid';
import { Storage, API, Auth, graphqlOperation } from 'aws-amplify';
import { createPost } from './graphql/mutations';

/* Initial state to hold form input, saving state */
const initialState = {
  name: '',
  year: '',
  creation: '',
  link: '',
  published: '',
  region: '',
  description: '',
  category: '',
  subcategory: '',
  file: '',
  saving: false
};

export function CreatePost({
  updatePosts, posts
}) {
  /* 1. Create local state with useState hook */
  const [formState, updateFormState] = useState(initialState)
  

  /* 2. onChangeText handler updates the form state when a user types into a form field */
  function onChangeText(e) {
    e.persist();
    updateFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }));
  }

  /* 3. onChangeFile handler will be fired when a user uploads a file  */
  function onChangeFile(e) {
    e.persist();
    if (! e.target.files[0]) return;
    const fileUploaded = { fileInfo: e.target.files[0], name: `${uuid()}_${e.target.files[0].name}`}
    fileUploaded.name = fileUploaded.name.replace(/\s/g, "_")
    updateFormState(currentState => ({ ...currentState, file: URL.createObjectURL(e.target.files[0]), fileUploaded }))
  }

  /* 4. Save the post  */
  async function save() {
    try {
      let { 
        name,
        year,
        creation,
        link,
        published,
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
        !creation || 
        !link || 
        !published || 
        !region || 
        !description || 
        !category || 
        !subcategory || 
        !file) return;
      updateFormState(currentState => ({ ...currentState, saving: true }));
      const postId = uuid();
      let postInfo = { name, year, creation, link, published, region, description, category, subcategory, file, id: postId };

      const infoStorage = await Storage.put(formState.fileUploaded.name, formState.fileUploaded.fileInfo);
      console.log('====================================');
      console.log("infoStorage ", infoStorage);
      console.log('====================================');
      console.log('====================================');
      console.log(postInfo);
      console.log('====================================');
      await API.graphql(graphqlOperation(createPost, { input: postInfo }));
      updatePosts([...posts, { ...postInfo }]);
      updateFormState(currentState => ({ ...currentState, saving: false }));
      } catch (err) {
      console.log('error: ', err);
    }
  }

  return (
    <div className={containerStyle}>
        name,
        year,
        creation,
        link,
        published,
        region,
        description,
        category,
        subcategory,
        file,
      <input
        placeholder="Nombre de la pieza"
        name="name"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Año de publicación"
        name="year"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Fecha de creación"
        name="creation"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="link de coalico.org"
        name="link"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Publicado/No publicado"
        name="published"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Región"
        name="region"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Descripción"
        name="description"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Categoría"
        name="category"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Subcategoría"
        name="subcategory"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input 
        type="file"
        name="file"
        onChange={onChangeFile}
      /> 
      { formState.file && <img className={fileStyle} alt="preview" src={formState.file} /> }
      <Button title="Create New Post" onClick={save} />
      {/* <Button type="cancel" title="Cancel" onClick={() => updateOverlayVisibility(false)} /> */}
      { formState.saving && <p className={savingMessageStyle}>Saving post...</p> }
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