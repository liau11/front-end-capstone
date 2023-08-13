import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card }from 'react-bootstrap';



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
        <form onSubmit={handleSubmit}>
            <Card className="card">
                <Card.Body>
                    <Card.Title> Find Restaurants: </Card.Title>
                    <Card.Text>
                        <label htmlFor="location">Please enter the city: </label>{' '}
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                        {' '}<Button as="input" type="submit" value="Search" variant="outline-primary" size="sm"/>
                    </Card.Text>
                </Card.Body>
            </Card>
        </form>
    );
};

GetRecommendationsForm.propTypes = {
    getFriendsRecommendations: PropTypes.func
};

export default GetRecommendationsForm;