import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("/api/auth/login", {
                email: credentials.email,
                password: credentials.password
            });
            if(data.success){
                localStorage.setItem('token', JSON.stringify(data.authToken));
                navigate("/");
            }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='container mt-3'>
            <h2 className='mt-3'>Login</h2>
            <form className='mt-2'  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" >Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <h4 className='mt-4'>Don't Have an account ? <Link to='/signup'>Sign Up</Link></h4>
        </div>
    )
}

export default Login