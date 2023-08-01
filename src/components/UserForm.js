import React, { useState } from 'react';

const UserForm = ({ createUser, users }) => {

    const [showPassword, setShowPassword] = useState(false);


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const INITIAL_FORM_DATA = {
        name: "",
        username: "",
        password: "",
    };

    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    const handleChange = (event) => {
        const newFormData = {
            ...formData,
            [event.target.name]: event.target.value,
        };
        setFormData(newFormData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleTogglePasswordVisibility()
        
        for (const user of users) {
            if (user.username === formData.username) {
                alert("This username already exists. Please enter a unique username.");
                return;
            }
        };
        
        createUser(formData);
        setFormData(INITIAL_FORM_DATA);
    };

    return (
        <section>
            <h2>Create a New User</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name: </label>
                <input
                    required
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                ></input>
                <label htmlFor="username">Username: </label>
                <input
                    required
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                ></input>
                <label htmlFor="password">Password: </label>
                <input
                    required
                    id="password"
                    name="password"
                    type="text"
                    value={formData.password}
                    onChange={handleChange}
                ></input>
                <input type="submit" value="Create User"></input>
            </form>
        </section>
    );
}

export default UserForm;