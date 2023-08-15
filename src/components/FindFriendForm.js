import React, { useState } from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';


const FindFriendForm = ({ currentUser, users, updateUserAdd }) => {

    const INITIAL_FORM_DATA = {
        friends: "",
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

        // Check if friend exists as a user.
        let userExists = false;

        for (const user_object of users) {
            if (user_object.username === formData.friends) {
              formData.friends = user_object._id
              userExists = true;
            }
        }

        // Check if user is in friends array already
        if (userExists) {
            const valueToCheck = formData.friends;
            const friendExists = currentUser["friends"].some(friend => friend === valueToCheck);
            if (friendExists) {
                alert(`You have already added this person! :D`)
            } else {
                updateUserAdd("friends", formData);
                setFormData(INITIAL_FORM_DATA);
                alert("Yay, friend has been added!")
            }
        } else {
            alert("Sorry, this user does not exist in our database. Tell them to join!")
        }
    };


	return (
		<form onSubmit={handleSubmit}>
			<div>
				<input
						type="text"
						id="friends"
						name="friends"
						placeholder="Enter friend's email"
						value={formData.friends}
						onChange={handleChange}
				/>
				<Button variant="primary" className='btn-sm' type="submit" value="Add friend">
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						width="16" 
						height="16" 
						fill="currentColor" 
						class="bi bi-person-add" 
						viewBox="0 0 16 16">
						<path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
						<path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
					</svg>
				</Button>
			</div>
		</form>
	);
};

FindFriendForm.propTypes = {
    getFriendsRecommendations: PropTypes.func
};

export default FindFriendForm;