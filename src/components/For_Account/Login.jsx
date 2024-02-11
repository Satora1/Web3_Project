import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation';
import axios from 'axios';
import Register from './Register';


const Login = () => {
    const [showLogin, setShowLogin] = useState(true);

    const handleOpenPopup = () => {
        setShowLogin(!showLogin);
    };
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }



    const handleSubmit = (event) => {


        event.preventDefault();
        setErrors(validation(values))
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                    if (res.data === "Sucess") {
                       console.log("sucess")
                    }
                    else {
                        alert("No record existed")
                    }
                }
                )
                .catch(err => console.log(err))
        }
    }

    return (
        <div>
            {showLogin ? (
                <div className='popup-container flex justify-center items-center '>
                    <div className='popup p-3 rounded w-25 extra-light-blue-glassmorphism'>
                        <h1 className="text-center text-3xl text-white">Log-in</h1>
                        <form action='' onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor='email'><strong className="text-white">Email</strong></label>
                                <input type="email" placeholder='Enter email' name="email"
                                    onChange={handleInput} className='form-control rounded-0' />
                                     {errors.email && <span className='text-danger'>{errors.email}</span>}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='password'><strong className="text-white">Password</strong></label>
                                <input type="password" placeholder='Enter password' name="password"
                                  onChange={handleInput}  className='form-control rounded-0' />
                                  {errors.password && <span className='text-danger'>{errors.password}</span>}
                            </div>
                            <button type='submit' className=' bg-white w-100 rounded-3 '><strong>Log In</strong></button>
                            <p style={{ margin: '10px 0' }}></p>

                            <button className=' bg-white w-100 rounded-3 ' onClick={handleOpenPopup}><strong>Create Account</strong></button>
                        </form>
                    </div>
                </div>
            ) : (
                <Register handleOpenPopup={handleOpenPopup} />
            )}
        </div>
    );
};

export default Login;
