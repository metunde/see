import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

export default function Register(){
const [formData, setFormData] = useState({
   email:"",
    password: "",
});

const nav = useNavigate();
const [errors, setErrors] = useState({});
const {setToken} = useContext(AppContext);

 const  handleLogin = async (e) =>{
    e.preventDefault();



const res =await fetch("api/login", {
  method: "post",
  body: JSON.stringify(formData)
})
const data = await res.json();

if (data.errors) {
    setErrors(data.errors)
    
}else{
    localStorage.setItem('token', data.token)
   setToken(data.token)
    nav('/')
    

    // setFormData({})
}



    // console.log(formData);
}

    return(
        <>
        <h1 className="title">
          Login to your account
        </h1>
        <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-3" action="">
         
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" 
                value={formData.email}
                onChange={(e) =>setFormData({...formData, email:e.target.value })}
                />
                 {errors.email && <p className="error">{errors.email[0]}</p>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"
                value={formData.password}
                onChange={(e) =>setFormData({...formData, password:e.target.value })}
                />
                {errors.password && <p className="error">{errors.password[0]}</p>}

            </div>
        

            <button className="primary-btn">Login</button>
        </form>
        </>
    )
    
    
    }