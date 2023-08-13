import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CardStyle.css';
import { Icon } from '@iconify/react';


const UserRecommendationData = ({ updateUserDelete, restaurantId, name, address, url, price, imageUrl }) => {
	const openYelpInNewTab = () => {
		window.open(url, '_blank');
	};

	const openGoogleMaps = () => {
		const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
		window.open(googleMapsUrl, '_blank');
	};

	return (
		<Card style={{ width: '18rem', marginTop: '40px' , marginBottom: '40px'}} className='border p-4' id='card'>
			<div className='card-image-container'>
				<Card.Img variant='top' src={imageUrl} className='centered-image' />
			</div>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>{address}</Card.Text>
				<Card.Text>{price}</Card.Text>
				<Card.Footer  className='d-flex justify-content-center align-items-center'>
				<Button className="btn-sm" variant="outline-danger" onClick={openYelpInNewTab}>
					<Icon icon="bi:yelp" color="red" width="18" height="18" />
				</Button>
				<Button className="btn-sm" variant="info" onClick={openGoogleMaps}>
					<Icon icon="bi:map" color="white" width="18" height="18" />
	      		</Button>
				<Button className='btn-sm' variant='danger' onClick={() => updateUserDelete('recommendations', {'recommendations': restaurantId })}>
					<Icon icon="bi:trash" width="18" height="18" />
				</Button>
				</Card.Footer>
			</Card.Body>
		</Card>
	);
};


export default UserRecommendationData;
