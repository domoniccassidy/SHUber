import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import { signIn } from '../actions/users';

const initForm = {
    username:"",
    password:""
}

const Index = () => {
    const [userData,setUserData] = useState(initForm)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) =>{
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(signIn(userData,history));
    }
    return (
        <>    
            <div className="main">
                <div className="navbar">
                    <div className="icon">
                        <h2 className="logo">SHUber</h2>
                    </div>
                </div>
                <div className="content">
                    <h1>WELCOME TO <br/><span>SHUber</span></h1>
                    <p className="details">This is SHUber, the best modern taxi system you ever got your eyes onto, 
                        <br/>SO SIGN UP NOW to order your first ride!! 
                        <br/>Only Positive vibes, when there are positive rides...</p>
                    
                        
                        
                        <form className="form" onSubmit = {handleSubmit}>
                            <h2>Login Here</h2>
                            <input type="text" name="username" placeholder="Enter Username" onChange = {handleChange}/>
                            <input type="password" name="password" placeholder="Enter Password" onChange = {handleChange}/>
                            <button type = "submit" className="btn2">Login</button>

                            <p className="link">Don't have an account<br/>
                            <a href="#">Sign up here</a></p>
                            
                        </form>
                </div>
            </div>      
        </>
    )
}

export default Index
