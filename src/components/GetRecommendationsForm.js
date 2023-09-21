import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import './CardStyle.css';
import './GetRecommendationsForm.css';


const GetRecommendationsForm = ({ currentUser, getFriendsRecommendations }) = {
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
		} else if (!currentUser.friends.length) {
			alert("You need to add friends first!");
		} else {
			getFriendsRecommendations(formData.location);
			setFormData(INITIAL_FORM_DATA);
		}
	};


	return(
		<form onSubmit = { handleSubmit } >
			<Card id="find-recs-card">
				<Card.Body className="card-form justify-content-between">
					<Card.Title id="form-title" className="text-center"> Find Restaurants: </Card.Title>
					<Card.Text className="align-items-center text-center">
						<Form.Group as={Row} className="align-items-center justify-content-center">
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
							<Col sm="1" className="my-1">
								<Button as="input" type="submit" value="Search" id="find-restaurants-button" variant="outline-primary" size="sm" />
							</Col>
						</Form.Group>
					</Card.Text>
				</Card.Body>
			</Card>
		</form >
	);
};

GetRecommendationsForm.propTypes = {
	getFriendsRecommendations: PropTypes.func
};

export default GetRecommendationsForm;