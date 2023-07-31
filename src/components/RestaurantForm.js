import React, { useState } from 'react';

const RestaurantForm = ({ addNewRestaurant }) => {

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
        addNewRestaurant(formData);
        setFormData(INITIAL_FORM_DATA);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <label htmlFor="term">Restaurant Name</label>
                <input
                    type="text"
                    id="term"
                    name="term"
                    value={formData.term}
                    onChange={handleChange}
                />
                <input type="submit" value="submit" />
            </div>
        </form>
    );
};

export default RestaurantForm;