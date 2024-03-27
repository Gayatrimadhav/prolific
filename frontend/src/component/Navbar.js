import React,{useEffect} from 'react';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";



const Navbar = () => {
  var navigate = useNavigate();

  const clickLogout=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  var location=useLocation();
  useEffect(()=>{
    console.log(location.pathname);
  },[location])
  return (
    <div>
<nav className="navbar navbar-expand-lg  bg-dark navbar-dark">
  <div className="container-fluid">

    <Link className="navbar-brand" to="/">inotebook</Link>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? 'active':""}`} aria-current="page" to="/">Home1</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? 'active':""}`} to="/about">About</Link>
        </li>
              </ul>
           {!localStorage.getItem('token') ?  <form className="d-flex">
        <Link  className="btn btn-primary mx-2"  to="/login" role="button" >Login</Link>
        <Link className="btn btn-primary mx-2"  to="/signup" role="button">signup</Link>
      </form>:<button onClick={clickLogout} className='btn btn-primary'>Logout</button>} 
    </div>
  </div>
</nav>    </div>
  );
}

export default Navbar;
