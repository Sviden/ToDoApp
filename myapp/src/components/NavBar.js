import React,{useState} from "react";
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export function NavBar(){
  //  const [active, setActive] = useState(boolean);
   const [allTaskBtnActive, setAllTaskBtn] = useState(false);
   const [addTaskBtnActive, setAddTaskBtn] = useState(false);
   const navigate = useNavigate();
   
   const activeBtnStyle = {color:"rgb(244, 207, 179)", textDecoration: "none" };
   const notActiveBtnStyle = {color: 'black'};



   const onClick = (btn) => {
   console.log(btn);
   if(btn === 'all'){
     setAllTaskBtn(true);
     setAddTaskBtn(false);
   }
   if(btn === "add"){
     setAddTaskBtn(true);
     setAllTaskBtn(false);
    }
   }

   const logOut = () => {
    
    window.localStorage.clear();
   

   }
  
      return (
     <div className={styles.mainContainer}>
   <ul className={styles.ulContainer}>
  <li className="" ></li>
    <NavLink onClick={e => onClick('all')} style = {allTaskBtnActive ? activeBtnStyle : notActiveBtnStyle} className={styles.buttonsStyle} exact="true" to="/alltasks" activeclassname="active" >All Tasks</NavLink> 
  <li className="nav-item">
      <NavLink  onClick={e => onClick("add")} style= {addTaskBtnActive ? activeBtnStyle : notActiveBtnStyle} className={styles.buttonsStyle} exact="true" to="/newtask" activeclassname={styles.activeButton}>Add new task</NavLink>
  </li>
  <li className="nav-item">
      <NavLink exact="true" to="/login" activeclassname={styles.activeButton} >LogIn</NavLink>
  </li>
  <li className="nav-item">
      <NavLink exact="true" to="/login" activeclassname={styles.activeButton} onClick={() => logOut()}>LogOut</NavLink>
  </li>


    </ul>
          </div>
  
      )
  }
