import React, {  useState, useEffect } from "react";
import Axios from "axios";
import styles from "../styles/AllTasks.module.css";
import '@material-ui/icons/Menu';
import {UpdateWindow} from './UpdateWindow'
export function AllTasks() {
  let [taskList, setTaskList] = useState([]);
  let [labelStyle, setLabelStyle] = useState({});
  const [showUpdateWindow, setUpdateStatus] = useState(false);
  const [updateTitle, setUpdateTitle] = useState('title');
  const [updateDescription, setUpdateDescription] = useState('description');
  const [updateTaskObj, setUpdateTaskObj] = useState({});
  const userMail = window.localStorage.getItem('email');

    
  useEffect(() => {createTaskList();},[])


  const createTaskList = async () => {
    
    const tasks = await  Axios.get(`http://localhost:3001/alltasks?email=${userMail}`);
    console.log(tasks);
    setTaskList(tasks.data);
  }



  const deleteOp = async (id) => {
    console.log(id);
    await Axios.delete(`http://localhost:3001/deletetask/${id}/${userMail}`);
    createTaskList();
  }
  


  // Update 

  const updateWindowShow = async (id) => {
    setUpdateStatus(!showUpdateWindow);
    const t = taskList.find(x => x._id === id);
    setUpdateTaskObj(t);
    setUpdateTitle(t.title);
    setUpdateDescription(t.description);
    console.log(updateTaskObj); 
  }
   
 const showUpdateWindowFn =()=>{
   setUpdateStatus(!showUpdateWindow);
 }

  const checkedLabel = "line-through";
  const notCheckedLabel = "none";

  //  let labelStyle;
  const onCheckboxClick = (position) => {
    if (!labelStyle[position] || labelStyle[position] === false) {
      labelStyle[position] = true;
    } else {
      labelStyle[position] = false;
    }

    setLabelStyle({ ...labelStyle });
    //   : setLabelStyle(notCheckedLabel);
  };

  const getState = (pos) => {
    return labelStyle[pos];
  };
  return (
    <div className={styles.mainContainer}>
          {showUpdateWindow? <UpdateWindow titleText={updateTitle} detailsText={updateDescription} updateObjData={updateTaskObj} showUpdateWindowFn={showUpdateWindowFn}/> : null}

      <div className={`container ${styles.tasksContainer}`}>   
         <h1 className={styles.headerStyle}>All Tasks</h1>
        {taskList.map((el, key) => {
          return (
            <div id={key} key={key} className={`${styles.liContainer}`}>

              <li className={`row ${styles.liStyles}`}>
                 <input className={`col-lg-1 ${styles.checkboxStyles}`}
                  id={`custom-checkbox-${key}`}
                  type="checkbox"
                  name={el.title}
                  value={el.title}
                  onChange={() => onCheckboxClick(key)}
                ></input>
                <label className={`col-lg-9 ${styles.titleStyle}`}
                  htmlFor={`custom-checkbox-${key}`}
                  style={{
                    textDecorationLine: getState(key)
                      ? checkedLabel
                      : notCheckedLabel,
                  }}
                >
                  {" "}
                  {el.title}
                </label>
                            <i className={`fa-lg bi bi-x col-lg-1 ${styles.deleteIcon}`} onClick={()=>deleteOp(el._id)}></i>

                </li>

 
                <p className={styles.descriptionStyle}>{el.description}</p>
                <small className={styles.smallStyle}>{el.createDate}</small>
               <div><p className={styles.editBtn} onClick={()=>updateWindowShow(el._id)}>Edit task</p></div> 
            </div>
          );
        })}
      </div>
    </div>
  );
}
