import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Home = () => {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
  return (
    <div className='container'>
        <h1>You have logged in successfully</h1>
        {!localStorage.getItem('token') ? <form>

            <Link to='/login' className='mx-2'><button type="button" className="btn btn-primary">Login</button></Link>
            <Link to='/signup'><button type="button" className="btn btn-primary">SignUp</button></Link>
        </form> : <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>}
        </div>
  )
}

export default Home