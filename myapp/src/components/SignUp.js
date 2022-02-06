import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

export function SignUp () {
    const navigate = useNavigate();
   const [userName, setUserName] = useState('');
   const [userEmail, setEmail] = useState('');
   const [userPassword, setPassword] = useState('');
   const [userExist, setUserExist] = useState();
   
   const onSubmit = async (e) => {
       e.preventDefault();
      const newUser =  await axios.post("http://localhost:3001/signup", {
          user: userName,
          password: userPassword,
          email: userEmail
      }); 

         console.log(newUser.data);
       
      if(newUser.data === 'userExist'){ 
         setUserExist(true);
      }else {
          setUserExist(false);
          navigate('/login')
        };
   
     
   }
   
   const renderWarning = () => {
    if(userExist){
        return <p style={{color: 'red'}}>Email already in use, use another or login</p>
    }
   }

    return(      
        <form>
        <h3>Sign Up</h3>

        <div className="form-group">
            <label>User name</label>
            <input type="text" className="form-control" placeholder="User name" onChange={(e) => {setUserName(e.target.value)}}/>
        </div>
        <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => {setEmail(e.target.value)}}/>
            {renderWarning()}
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => {setPassword(e.target.value)}}/>
        </div>

        <button type="submit" className="btn btn-primary btn-block" onClick={(e) => onSubmit(e)}>Sign Up</button>
        <p className="forgot-password text-right">
            Already registered <a href="#">sign in?</a>
        </p>
    </form>
    )
     
}