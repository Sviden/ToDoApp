import React, {useState} from "react";
import { SignUp } from "./SignUp";
import { useNavigate } from 'react-router-dom';

import axios from "axios";


export function Login(){
    const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [wrongInput, setWrongInputDislay] = useState(false);
   
   const onSubmit = async (e) => {
      e.preventDefault();
       console.log(email)
     const resData = await axios.post('http://localhost:3001/login',{
         email,
         password
     });
      
     console.log(resData);
     if(resData.data === 'User does not exist'){
       console.log('error: user does not exist');
          setWrongInputDislay(true);

     }else{
         window.localStorage.setItem('email', resData.data.email);
         setWrongInputDislay(false);
         navigate('/alltasks');
     }
    
   }
  

    return(<>
        <form>
                <h3>LogIn</h3>
                <div>
            
                  <h5><a href="/signup">Create your ToDo Accaunt</a></h5>  
                </div>
                
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => {setEmail(e.target.value)}}/>
                    <small style={{color: 'red', display: wrongInput ? 'block' : 'none'}}>Check your Email</small>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => {setPassword(e.target.value)}}/>
                    <small style={{color: 'red', display: wrongInput ? 'block' : 'none'}}>Check your Password</small>

                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={(e)=> onSubmit(e)}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
            {/* <h5>Create profile</h5>
            <button><SignUp/></button> */}
            
            </>
    )
}