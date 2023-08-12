import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';



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
                // <Form>
                //     <Form.Row className="align-items-center">
                //         <Col xs="auto">
                //             <Form.Label htmlFor="inlineFormInput" srOnly>
                //                 Name
                //             </Form.Label>
                //             <Form.Control
                //                 className="mb-2"
                //                 id="inlineFormInput"
                //                 placeholder="Jane Doe"
                //             />
                //         </Col>
                //     </Form.Row>
                // </Form>
            // <InputGroup className="mb-3">
            //     <FormControl
            //         placeholder="Recipient's username"
            //         aria-label="Recipient's username"
            //         aria-describedby="basic-addon2"
            //     />
            //     <InputGroup.Append>
            //         <Button variant="outline-secondary">Button</Button>
            //     </InputGroup.Append>
            // </InputGroup>
            <section>
                <h4>Find Restaurants: </h4>
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
                        {' '}<Button as="input" type="submit" value="Search" variant="outline-primary" size="sm"/>
                        {/* <input type="submit" value="Search" /> */}
                    </div>
                </form>
            </section>
    );
};

GetRecommendationsForm.propTypes = {
    getFriendsRecommendations: PropTypes.func
};

export default GetRecommendationsForm;