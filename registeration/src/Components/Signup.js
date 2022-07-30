import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [credentials, setCredentials] = useState({name: "",email: "", password: "", cpassword: ""});
    let navigate = useNavigate();

    const options = {
        position: "top-right",
        autoClose: 10000,
        pauseOnHover: true,
        draggable: false,
        theme: 'dark'
    };

    const handleValidation = () => {
        const {name, password, cpassword} = credentials;

        if(password !== cpassword){
            toast.error('Password and confirm password should be same', options);
            return false;
        }
        else if(name.length < 3){
            toast.error('Name should be of atleast 3 in length', options);
            return false;
        }
        else if(password.length < 8){
            toast.error('Password should be of atleast 8 in length', options);
            return false;
        }

        return true;
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(handleValidation()){
            const { data } = await axios.post("/api/auth/signup", {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            });
            if(data.success){
                localStorage.setItem('token', JSON.stringify(data.authToken));
                navigate("/");
              }
        }
    }

    return (
        <div className='container mt-3'>
            <h2 className='mt-3'>Sign Up</h2>
            <form className='mt-2' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} required minLength={3}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
            <h4 className='mt-4'>Have an account ? <Link to='/login'>Login</Link></h4>
            <ToastContainer/>
        </div>
    )
}

export default SignUp