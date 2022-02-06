import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import styles from "../styles/addNewTaskStyle.module.css";
import Axios from "axios";

export function NewTaskForm() {


  const [taskTitle, setTaskTitle] = useState("");
  const [details, setDetails] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [randomPhrase, setPhrase] = useState('');
  const [backInputColor, setColor] = useState({});
  const clearInput = () => {
    setTaskTitle("");
    setDetails("");
    setImageUrl("");
  };

  const addToList = async (e) => {
    const date = await new Date().toDateString();
    await Axios.post("http://localhost:3001/addtask", {
      taskTitle: taskTitle,
      details: details,
      imageUrl: imageUrl,
      createDate: date,
      userEmail: window.localStorage.getItem('name')
    });
    clearInput();
   
  };


  const randPhrase = async () => {
    if (!randomPhrase)
    {
     const rnd = Math.floor(Math.random() * 6) + 1;
   const res = await Axios.get('http://localhost:3001/newtask');
  const phrase = res.data[rnd].text;  
  setPhrase(phrase);
  }
  
   }
  randPhrase();

   const onInputChange = (e) =>{
  setColor({ backgroundColor: 'rgba(255, 241, 230, 0.158)', color: 'white' });
  }






  return (
    <div className={styles.mainContainer}>
    <div className={`card ${styles.cardContainer}`}>
          <p  className={`${styles.phraseContainer}`}>
    {randomPhrase}
          </p>
    
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Title:
              </label>
              <input
                type="text"
                className={`form-control ${styles.inputStyle}`}
                style={backInputColor}
                id="exampleFormControlInput1"
                placeholder=""
                value={taskTitle}
                onChange={(e) => {
                  setTaskTitle(e.target.value);
                }}
                onClick={onInputChange}
                autoComplete="off"

              />
            </div>
        
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Details:
              </label>
              <textarea className={`form-control ${styles.inputStyle}`}
              
                id="exampleFormControlTextarea1"
                rows="3"
                value={details}
                style={backInputColor}

                onChange={(e) => {
                  setDetails(e.target.value);
                }}
                onClick={onInputChange}

                autoComplete="off"
              ></textarea>
            </div>
    
            <div className="mb-3">
              <label>
                Image url:
              </label>
              <input
                type="text"
                className={`form-control ${styles.inputStyle}`}
                id="inputGroupFile01"
                value={imageUrl}
                style={backInputColor}

                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
                onClick={onInputChange}

              />
            </div>
       
      
        <div className={styles.btnContainer}>
          <div
            type="button"
            className={`font-effect-emboss ${styles.button1}`}
       
            onClick={addToList}
          >
            Add
          </div>
          <div href="#"  className={`font-effect-emboss ${styles.button1}`}
    
            onClick={clearInput}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}
