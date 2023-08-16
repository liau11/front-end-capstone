import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Card, Button, Col, Row, Form } from 'react-bootstrap';
import './CardStyle.css';
import './GetRecommendationsForm.css';

const RestaurantForm = ({ currentUser, handleAddToList, allRestaurants, addNewRestaurant, updateUserAdd }) => {

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

		if (!Object.keys(currentUser).length) {
			alert("Please log in first!");
		}

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
            console.log("HERE", newRestaurantId)
            
            if (!newRestaurantId) {
                alert("This restaurant does not exist. Try again!");
            } else {
                updateUserAdd("recommendations", {"recommendations": newRestaurantId});
		    } 
        }
		setFormData(INITIAL_FORM_DATA);
	}


    return (
    <form onSubmit={handleSubmit}>
        <Card >
            <Card.Body className="card-form justify-content-between">
                <Card.Title className="text-center"> 
                    Recommend a Restaurant:  
                </Card.Title>
                <Form.Group as={Row} className="align-items-center justify-content-center">
                    {/* <Form.Label column sm="2" /> */}
                    <Col sm="4">
                        <Form.Control
                            type="text"
                            id="location"
                            name="location"
                            placeholder="City"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </Col>
                    {/* <Form.Label column sm="2" /> */}
                    <Col sm="4">
                        <Form.Control
                            type="text"
                            id="term"
                            name="term"
                            placeholder="Restaurant Name"
                            value={formData.term}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col sm="1" className="mt-2">
                        <Button type="submit" id="find-restaurants-button" variant="outline-primary" size="sm" className="ms-1">
                            Submit
                        </Button>
                    </Col>
                </Form.Group>
            </Card.Body>
        </Card>
    </form>
    );
};


RestaurantForm.propTypes = {
    addNewRestaurant: PropTypes.func
};

export default RestaurantForm;