import React from 'react';
import PropTypes from 'prop-types';
import './RecommendationsResult.css';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import './RecommendationsResult.css';


const RecommendationsResult = ({ url, display_address, display_phone, imageUrl, name, price, handleAddToList, restaurantId }) => {
	const openYelpInNewTab = () => {
		window.open(url, '_blank');
	};

	let addressString = "";

	for (const address of display_address) {
		addressString += (" " + address)
	}

	const openGoogleMaps = () => {
		const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressString}`;
		window.open(googleMapsUrl, '_blank');
	};

	return (
		<section>
			<Card style={{ width: '18rem', marginTop: '40px' }} className='border p-2' id='card'>
				<Card.Img variant="top" src={imageUrl} className='centered-image' />
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Text>
						<div>{addressString}</div>
						<div>{display_phone}</div>
						<div>{price}</div>
					</Card.Text>
				</Card.Body>
				<Card.Footer id="restaurant-card-footer" className="d-flex align-items-end justify-content-between" >
					<div class="footer-item">
						<OverlayTrigger placement='bottom' overlay={<Tooltip id={'save-msg'} style={{ position: "fixed" }}>Save for Later</Tooltip>}>
							<button id="save-btn" class="btn btn-sm" onClick={() => handleAddToList("savedList", { "savedList": restaurantId })}>
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
									<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
								</svg>
							</button>
						</OverlayTrigger>
					</div>
					<div class="footer-item">
						<OverlayTrigger placement='bottom' overlay={<Tooltip id={'recommend-msg'} style={{ position: "fixed" }}>Add to Recommendations</Tooltip>}>
							<button id="recommend-btn" class="btn btn-sm" onClick={() => handleAddToList("recommendations", { "recommendations": restaurantId })}>
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
									<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
								</svg>
							</button>
						</OverlayTrigger>
					</div>
					<div class="footer-item">
						<OverlayTrigger placement='bottom' overlay={<Tooltip id={'yelp-msg'} style={{ position: "fixed" }}>Open Yelp</Tooltip>}>
							<button id="yelp-btn" class="btn btn-sm" onClick={openYelpInNewTab}>
								<Icon icon="bi:yelp" color="red" width="22" height="22" />
							</button>
						</OverlayTrigger>
					</div>
					<div class="footer-item">
						<OverlayTrigger placement='bottom' overlay={<Tooltip id={'google-maps-msg'} style={{ position: "fixed" }}>Open Google Maps</Tooltip>}>
							<button id="google-btn" class="btn btn-sm" onClick={openGoogleMaps}>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-map" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z" />
								</svg>
							</button>
						</OverlayTrigger>
					</div>
				</Card.Footer>
			</Card>
		</section>
	);
};

RecommendationsResult.propTypes = {
	name: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	display_phone: PropTypes.string.isRequired,
	display_address: PropTypes.array.isRequired,
	url: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	handleAddToList: PropTypes.func.isRequired,
	restaurantId: PropTypes.string.isRequired,
};


export default RecommendationsResult;