import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CardStyle.css';
import { Icon } from '@iconify/react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
// import '../pages/ProfilePage.css'; 


const UserRecommendationData = ({ updateUserDelete, restaurantId, name, address, url, price, imageUrl }) => {
	const openYelpInNewTab = () => {
		window.open(url, '_blank');
	};

	const openGoogleMaps = () => {
		const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
		window.open(googleMapsUrl, '_blank');
	};

	return (
		<div className='grid-item'>
			<Card style={{ width: '18rem', marginTop: '20px' , marginBottom: '5px', padding: "1.5rem 1.5rem .5rem" }}  id='card'>
				<div className='card-image-container'>
					<Card.Img variant='top' src={imageUrl} className='centered-image' />
				</div>
				<Card.Body style={{ paddingBottom: "0px" }}>
					<Card.Title className='card-title'>{name}</Card.Title>
					<Card.Text>{address}</Card.Text>
					<Card.Text>{price}</Card.Text>
					<Card.Footer id="restaurant-card-footer" className='d-flex justify-content-center align-items-center'>
						<div class="footer-item-btn-recs">
							<OverlayTrigger
								placement='top'
								overlay={<Tooltip id={'yelp-msg'} style={{position:"fixed"}}>Open Yelp</Tooltip>}
							>
								<Button id="yelp-btn" className="btn-sm" variant="outline-danger" onClick={openYelpInNewTab}>
									<Icon icon="bi:yelp" color="red" width="22" height="22" />
								</Button>
							</OverlayTrigger>
						</div>
						<div class="footer-item-btn-recs">
							<OverlayTrigger
								placement='top'
								overlay={<Tooltip id={'google-maps-msg'} style={{position:"fixed"}}>Open Google Maps</Tooltip>}
								>
								<Button id="google-btn" className="btn-sm" onClick={openGoogleMaps}>
									<Icon icon="bi:map" width="20" height="20" />
								</Button>
							</OverlayTrigger>
						</div>
						<div class="footer-item-btn-recs">
							<OverlayTrigger
								placement='top'
								overlay={<Tooltip id={'delete-msg'} style={{position:"fixed"}}>Delete Recommendation</Tooltip>}
								>
								<Button id="delete-btn" className='btn-sm' variant='danger' onClick={() => updateUserDelete('recommendations', {'recommendations': restaurantId })}>
									<Icon icon="bi:trash" width="24" height="24" />
								</Button>
							</OverlayTrigger>
						</div>
					</Card.Footer>
				</Card.Body>
			</Card>
		</div>
	);
};


export default UserRecommendationData;
