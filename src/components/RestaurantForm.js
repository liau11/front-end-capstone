import React, { useState } from 'react';
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import './CardStyle.css';

const RestaurantForm = ({ handleAddToList, allRestaurants, addNewRestaurant, updateUserAdd }) => {

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


        if (restaurantExists) {
            handleAddToList("recommendations", {"recommendations": formData.term})
        } else {
            const newRestaurantId = await addNewRestaurant(formData);
            updateUserAdd("recommendations", {"recommendations": newRestaurantId})
            setFormData(INITIAL_FORM_DATA);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className="card">
                <Card.Body>
                    <Card.Title> Recommend a Restaurant:  </Card.Title>
                    <Card.Text>
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                        <label htmlFor="term">Restaurant Name:</label>
                        <input
                            type="text"
                            id="term"
                            name="term"
                            value={formData.term}
                            onChange={handleChange}
                        />
                        <input type="submit" value="submit" />
                    </Card.Text>
                </Card.Body>
            </Card>
        </form>
    );
};

RestaurantForm.propTypes = {
    addNewRestaurant: PropTypes.func
};

export default RestaurantForm;