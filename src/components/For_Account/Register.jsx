import React, { useState } from 'react';
import validation from './SignupValidation';
import axios from 'axios';

const Register = ({ handleOpenPopup }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);

        if (Object.values(validationErrors).every(value => value === '')) {
            try {
                const response = await axios.post('http://localhost:8081/signup', values);
                console.log('registered');
            } catch (error) {
                console.error('registration error', error);
            }
        }
    };

    return (
        <div className="popup-container flex justify-center items-center">
            <div className="popup p-3 rounded w-25 extra-light-blue-glassmorphism">
                <h1 className="text-center text-3xl text-white">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="text-white"><strong>Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            value={values.name}
                            onChange={handleInput}
                            className="form-control rounded-0"
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="text-white"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={values.email}
                            onChange={handleInput}
                            className="form-control rounded-0"
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="text-white"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={values.password}
                            onChange={handleInput}
                            className="form-control rounded-0"
                        />
                    </div>
                    <button type="submit" className="bg-white w-100 rounded-3"><strong>Sign Up</strong></button>
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                    <p style={{ margin: '10px 0' }}></p>

                    <button onClick={handleOpenPopup} className="bg-white w-100 rounded-3"><strong>Log In</strong></button>
                </form>
            </div>
        </div>
    );
};

export default Register;
