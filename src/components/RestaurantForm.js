import React, { useState } from 'react';
import PropTypes from "prop-types";


const RestaurantForm = ({ allRestaurants, addNewRestaurant, updateUserAdd }) => {

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



    const handleSubmit = async (event) => {
        event.preventDefault();

        let restaurantExists = false;

        for (const restaurantObject of allRestaurants) {  
            if (restaurantObject.name.toLowerCase() === formData.term.toLowerCase()) {
                formData.term = restaurantObject._id
                restaurantExists = true;
            }
        }

        console.log("New restaurant?", restaurantExists)

        if (restaurantExists) {
                updateUserAdd("recommendations", {"recommendations": formData.term})
        } else {
            const newRestaurantId = await addNewRestaurant(formData);
            updateUserAdd("recommendations", {"recommendations": newRestaurantId})
            setFormData(INITIAL_FORM_DATA);
        }
    }

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

RestaurantForm.propTypes = {
    addNewRestaurant: PropTypes.func
};

export default RestaurantForm;