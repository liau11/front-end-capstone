import React, { useState } from 'react';
import PropTypes from "prop-types";


const GetRecommendationsForm = () => {

    const INITIAL_FORM_DATA = {
        location: "",
        term: "",
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
        setFormData(INITIAL_FORM_DATA);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="location">Please enter the city and state: </label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />

                <input type="submit" value="submit" />
            </div>
        </form>
    );
};

GetRecommendationsForm.propTypes = {
    // addNewRestaurant: PropTypes.func
};

export default GetRecommendationsForm;