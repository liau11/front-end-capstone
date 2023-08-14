import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Form, Row, Col }from 'react-bootstrap';
import './CardStyle.css';


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
        if (!Object.keys(currentUser).length) {
            alert("Please log in first!");
        }
        else if (!currentUser.friends.length) {
            alert("You need to add friends first!");
        } else {
            console.log("You entered here")
            getFriendsRecommendations(formData.location);
            setFormData(INITIAL_FORM_DATA);
        }
    };

    return (
        <div >
            <form onSubmit={handleSubmit}>
                <Card>
                    <Card.Body className="card-form">
                        <Card.Title className="text-center"> Find Restaurants: </Card.Title>
                        <Card.Text className="align-items-center text-center">
                            <Form.Group as={Row} className="align-items-center">
                                <Col sm={5} className="my-1">
                                    <Form.Control 
                                        type="text"
                                        id="location"
                                        name="location"
                                        placeholder="What city are you in?"
                                        value={formData.location}
                                        onChange={handleChange}
                                        >
                                    </Form.Control>
                                </Col>
                                <Col className="my-1">
                                    <Button as="input" type="submit" value="Search" variant="outline-primary" size="sm"/>
                                </Col>
                            </Form.Group>
                            {/* <label htmlFor="location"></label> */}
                            {/* <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="What city?"
                                value={formData.location}
                                onChange={handleChange}
                            /> */}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </form>
        </div>
    );
};

GetRecommendationsForm.propTypes = {
    getFriendsRecommendations: PropTypes.func
};

export default GetRecommendationsForm;