import React, { useState } from 'react';
import PropTypes from "prop-types";


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

    const validateId = (newFriendId) => {
        if (currentUser.friends.includes(newFriendId)) {
            return false;
        }
        return true;
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        const valueToCheck = formData.friends;
        const exists = currentUser["friends"].some(friend => friend === valueToCheck);

        if (exists) {
            alert(`${valueToCheck} is already your friend! :D`)
        } else {
            const valueToCheck = formData.friends;
            const exists = users.some(user => user.username === valueToCheck);

            if (exists) {
                for (const user_object of users) {
                    if (user_object.username === formData.friends) {
                      formData.friends = user_object._id
                    }
                }
                updateUserAdd("friends", formData);
                setFormData(INITIAL_FORM_DATA);
                alert("Yay, friend has been added!")
            } else {
                alert("Sorry, this user does not exist in our database. Tell them to join!")
            }
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="friends">Please enter friend's username: </label>
                <input
                    type="text"
                    id="friends"
                    name="friends"
                    value={formData.friends}
                    onChange={handleChange}
                />
                <input type="submit" value="Add friend" />
            </div>
        </form>
    );
};

FindFriendForm.propTypes = {
    getFriendsRecommendations: PropTypes.func
};

export default FindFriendForm;