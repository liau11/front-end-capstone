import React, { useState } from 'react';
import PropTypes from "prop-types";


const GetRecommendationsForm = ({ currentUser, getFriendsRecommendations }) => {

    const INITIAL_FORM_DATA = {
        location: ""
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
        console.log("You just hit submit. this is current user", currentUser)
        if (!currentUser.friends.length) {
            alert("You need to add friends first!")
        } else {
            console.log("You entered here")
            getFriendsRecommendations(formData.location);
            setFormData(INITIAL_FORM_DATA);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="location">Please enter the city: </label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <input type="submit" value="Search" />
            </div>
        </form>
    );
};

GetRecommendationsForm.propTypes = {
    getFriendsRecommendations: PropTypes.func
};

export default GetRecommendationsForm;