import React, { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Input from "@mui/material/Input";

const UserForm = ({ createUser, users }) => {
	const INITIAL_FORM_DATA = {
		name: "",
		username: "",
		password: "",
	};

	const [formData, setFormData] = useState(INITIAL_FORM_DATA);

	const [values, setValues] = useState({
		password: "",
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleChange = (event) => {
		const newFormData = {
			...formData,
			[event.target.name]: event.target.value,
		};

		setFormData(newFormData);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

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
				<Input
					required
					id="password"
					name="password"
					type={values.showPassword ? "text" : "password"}
					value={formData.password}
					onChange={handleChange}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
							>
								{values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
							</IconButton>
						</InputAdornment>
					}
				/>
				<input type="submit" value="Create User"></input>
			</form>
		</section>
	);
}


export default UserForm;