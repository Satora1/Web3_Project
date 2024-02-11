
import React from 'react';
import { useState } from 'react';
import validation from './SignupValidation';
import axios from "axios"



const Register = ({ handleOpenPopup }) => {


    const [values, setValues] = useState({
        name: '',
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
        if (errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    console.log("registerd")
                }
                )
                .catch(err => console.log(err))
        }
    }








    return (
        <div className='popup-container flex justify-center items-center '>
            <div className='popup p-3 rounded w-25 extra-light-blue-glassmorphism'>
                <h1 className="text-center text-3xl text-white">Register</h1>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong className="text-white">Name</strong></label>
                        <input type="text" placeholder='Enter name' name='name'
                          onChange={handleInput}  className='form-control rounded-0' />
                            {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong className="text-white">Email</strong></label>
                        <input type="email" placeholder='Enter email' name='email'
                        onChange={handleInput}     className='form-control rounded-0' />
                         {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong className="text-white">Password</strong></label>
                        <input type="password" placeholder='Enter password' name='password'
                         onChange={handleInput}    className='form-control rounded-0' />
                    </div>
                    <button type="submit" className=' bg-white w-100 rounded-3 '><strong>Sign Up</strong></button>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                    <p style={{ margin: '10px 0' }}></p>

                    <button onClick={handleOpenPopup} className=' bg-white w-100 rounded-3 '><strong>Log In</strong></button>
                </form>
            </div>
        </div>

    )

}

export default Register;