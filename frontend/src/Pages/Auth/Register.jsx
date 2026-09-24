import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

export default function Register(){
const [formData, setFormData] = useState({
    name: "",
    email:"",
    password: "",
    password_confirmation: ""
});

const nav = useNavigate();
const [errors, setErrors] = useState({});
const {setToken} = useContext(AppContext);

 const  handleRegister = async (e) =>{
    e.preventDefault();



const res =await fetch("api/register", {
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
    console.log(data)

    setFormData({})
}



    // console.log(formData);
}

    return(
        <>
        <h1 className="title">
            Register new account
        </h1>
        <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-3" action="">
            <div>
                <label htmlFor="name">Name</label>
                <input  type="text" name="name" id="name" 
                value={formData.name}
                 onChange={(e) =>setFormData({...formData, name:e.target.value })}
                />
               {errors.name && <p className="error">{errors.name[0]}</p>}
            </div>
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
            <div>
                <label htmlFor="password_confirmation">Confirm Password</label>
                <input type="password" name="password_confirmation" id="password_confirmation"
                value={formData.password_confirmation}
                onChange={(e) =>setFormData({...formData, password_confirmation:e.target.value })}
                />

            </div>

            <button className="primary-btn">Register</button>
        </form>
        </>
    )
    
    
    }