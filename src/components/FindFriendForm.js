import React, { useState } from 'react';
import PropTypes from "prop-types";


const FindFriendForm = ({ updateUserAdd }) => {

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
        console.log("THIS IS FORM DATA", formData)
        updateUserAdd("friends", formData);
        setFormData(INITIAL_FORM_DATA);
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