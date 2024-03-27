import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credential,setCredential]=useState({email:"",password:""});
  var navigate = useNavigate();
    const host="http://localhost:5008"


  const clickhere = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body:JSON.stringify({email:credential.email,password:credential.password})
     
    });
    const json = await response.json();
    console.log(json);
    if(json.success)
    {
      localStorage.setItem('token',json.authtoken);
      navigate("/")
    }
    else{
      alert("invalid");
    }
  }
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
   };
  return (
    <div>
      <form >
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email" value={credential.email} onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            name="password" value={credential.password} onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={clickhere} >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
