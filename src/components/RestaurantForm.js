import React, { useState } from 'react';

const RestaurantForm = ({ getRestaurantYelp }) => {

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
        getRestaurantYelp(formData);
        setFormData(INITIAL_FORM_DATA);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="location">Location</label>
            <input
                required
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
            />
            <label htmlFor="term">Restaurant Name</label>
            <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                value={formData.term}
                onChange={handleChange}
            />
            <input type="submit" value="submit" />
        </form>
    );
};

export default RestaurantForm;