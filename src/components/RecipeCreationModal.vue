<template>
    <dialog open>
      <b-form class="content">
              <div id="item1">
                  <label for="title">Title:</label>
                  <b-form-input
                  id="title"
                  v-model="form.title"
                  type="text"
                  >
                  </b-form-input>
              </div>
              <div id="item2">
                  <label for="summary">Summary:</label>
                  <b-form-input
                  id="summary"
                  type="textarea"
                  v-model="form.summary"
                  >
                  </b-form-input>
              </div>
              <div id="item3">
                  <label for="time">Time:</label>    
                  <b-form-input
                      id="time"
                      type="time"
                      v-model="form.time"
                  ></b-form-input>
              </div>
              <div id="item4">more...</div>
              <div id="item5">Ingridents...</div>
              <div id="item6">

  
              </div>
              <div id="item7">
                  <label for="image">Image:</label>
                  <b-form-input
                      id="image"
                      type="url"
                      v-model="form.image"
                  ></b-form-input
                  >
              </div>
              <div id="item8">
                  <img id="recipe-image"  :src="imgSrc" alt="image.alt"/>
              </div>
              <div id="item9">
                  <b-form>

                    <b-row>
                        <b-col sm="5">
                              <label for="name">Instruction name:</label>
                              <b-form-input id="name" type="text"></b-form-input>                              
                        </b-col>
                    </b-row>
                    <b-row>
                    <b-col sm="6">
                      <label for="step">Step description:</label>
                      <b-form-input
                          id="step"
                          type="text"
                      ></b-form-input>
                    </b-col>
                    <b-col sm="2">
                            <label for="length">Length:</label>
                            <b-form-input id="length" type="time"></b-form-input>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3">
                      <label for="ingredients">Ingridents: </label>
                      <b-form-input id="ingredients" type="text"></b-form-input>
                    </b-col>
                    <b-col sm="3">
                      <label for="equipment">Equipment:</label>
                      <b-form-input id="equipment" type="text"></b-form-input>
                    </b-col>
                    </b-row>
                  </b-form>
              </div>
      </b-form>
  
      </dialog>
      
  </template>
  
  <script>
  
  export default {
      name: "RecipeCreationModal",
      data() {
          return {
                  form:
                  {
                  title: "",
                  readyInMinutes: 0,
                  image: "",
                  vegan: false,
                  vegetarian: false,
                  glutenFree: false,
                  extendedIngreidents: [],
                  step: [],
              }
          }
      },
      computed: {
          imgSrc() {
              return this.form.image
          }
      },
      components: {
          
      }
  }
  </script>
  
  <style>
      dialog {
        position: fixed;
        border: 2px solid rgb(255, 0, 0);
        z-index: 3;
        display: grid;
        place-items: center;
        background: #2b346799;
        height: 100%;
        width: 100%;
        overflow: scroll;
      }
  
      dialog .content{
          display: grid;
          position: relative;
          grid-template-rows: repeat(8, 12.5%);
          grid-template-columns: repeat(4, 25%);
          grid-auto-flow: row;
          border: 2px solid rgb(255, 255, 255);
          background-color: #BAD7E9;
          background-size:  200%;
          width: 70%;
          height: 90%;
          min-height: 800px;
          min-width: 600px;
          overflow: scroll;
      }
  
      dialog .content > * {
          /* background-color: #FCFFE7; */
          border: 1px solid #2b346799;

      }
      

      dialog .content #item8 #recipe-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          
      }
  
      #item1 {   
          grid-column: 1 / 5;
          grid-row: 1
      }
  
      #item2 {
          grid-column: 3 / 5;
          grid-row: 2;
      }
  
      #item3 {
          grid-column: 3 / 5;
          grid-row: 3;
      }
  
      #item4 {
          grid-column: 3 / 5;
          grid-row: 4;
      }
  
      #item5 {
          grid-column: 1 / 5;
          grid-row: 7;
      }
      
      /* #item6 {
          grid-column: 1 / 2;
          grid-row: 8;
      } */
  
      #item7 {
          grid-row: 2 / 3;
          grid-column: 1 / 3;
      }
  
      #item8 {
          grid-row: 3 / 7;
          grid-column: 1 / 3;
      }
  
      #item9 {
          grid-column: 1 /5;
          grid-row: 8 / 10;
      }
  </style>
  