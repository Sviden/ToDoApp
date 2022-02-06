import React, {useState} from "react";
import styles1 from '../styles/UpdateWindow.module.css'
import styles from '../styles/addNewTaskStyle.module.css'
import Axios from "axios";


export function UpdateWindow (props){

    let [taskTitle, setTaskTitle] = useState(props.taskTitle);
    const [details, setDetails] = useState(props.detailsText);
    const [backInputColor, setColor] = useState({});
    
    

    const clearInput = () => {
      setTaskTitle("");
      setDetails("");
    };


    //update
    const updateTask = async() => {
        console.log(props.updateObjData)
        await Axios.put(`http://localhost:3001/updatetask/${props.updateObjData._id}`, {
            taskTitle: taskTitle,
            details: details,
        });
        console.log(details)
        clearInput();
        
    }

    const onInputChange = (e) =>{
        setColor({ backgroundColor: 'rgba(255, 241, 230, 0.158)', color: 'white' });
        }

    return(
        <div id={styles1.container}>
    <div className={`card ${styles.cardContainer}`} style={{flexWrap: 'wrap', alignContent: "center"}}>
         
    
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Title:
              </label>
              <input
                type="text"
                className={`form-control ${styles.inputStyle}`}
                id="exampleFormControlInput1"
                placeholder=""
                defaultValue={props.titleText}
                style={backInputColor}

                onChange={(e) => {
                  setTaskTitle(e.target.value);
                }}
                autoComplete="off"
                onClick={onInputChange}

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
                defaultValue={props.detailsText}
                style={backInputColor}

                onChange={(e) => {
                  setDetails(e.target.value);
                }}
                onClick={onInputChange}

                autoComplete="off"
              ></textarea>
            </div>
    
            <div className="mb-3">
            </div>      
        <div className={styles.btnContainer}>
          <div
            onClick={() => {updateTask(); props.showUpdateWindowFn()}}
            type="button"
            className={`font-effect-emboss ${styles1.button1}`} style={{fontSize: '0.6em', cursor:'pointer'}}>
            Update
          </div>
          <div href="#"  className={`font-effect-emboss ${styles1.button1}`}
            onClick={props.showUpdateWindowFn}
            style={{fontSize: '0.6em', marginLeft: '1em' , cursor:'pointer'}}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
    )
}