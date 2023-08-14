import React from 'react';
import PropTypes from 'prop-types';
import './RecommendationsResult.css';
import Card from 'react-bootstrap/Card';
// import { BsYelp } from 'react-icons/bs';
import { Icon } from '@iconify/react';
import './RecommendationsResult.css';


const RecommendationsResult = (props) => {

	const openYelpInNewTab = () => {
		window.open(props.url, '_blank');
	};

	let addressString = "";
	for (const address of props.display_address) {
		addressString += (" " + address)
	}

	const openGoogleMaps = () => {
		const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressString}`;
		window.open(googleMapsUrl, '_blank');
	};

	return (
		<section>
			<Card style={{ width: '18rem', marginTop: '40px' }} className='border p-2' id='card'>
				<Card.Img variant="top" src={props.imageUrl} className='centered-image'/>
				<Card.Body>
					<Card.Title>{props.name}</Card.Title>
					<Card.Text>
						<div>{addressString}</div>
						<div>{props.display_phone}</div>
						<div>{props.price}</div>
					</Card.Text>
				</Card.Body>
				<Card.Body className="text-center" style={{ padding: '12px' }}>
					<button class="btn btn-outline-danger btn-sm" onClick={openYelpInNewTab}>
						<Icon icon="bi:yelp" color="red" width="18" height="18" />
						Yelp
					</button>
					<button class="btn btn-sm btn-google-maps" onClick={openGoogleMaps}>
						<Icon icon="bi:map" color="purple" width="17" height="17"/> 
						Google Maps
					</button>
					<button class="btn btn-outline-primary btn-sm" onClick={() => props.handleAddToList("savedList", {"savedList":props.restaurantId } )}>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
							<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
						</svg>
						Save
					</button>
					<button class="btn btn-outline-success btn-sm" onClick={() => props.handleAddToList("recommendations", {"recommendations": props.restaurantId})}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
						<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
					</svg>
						Recommend
					</button>
				</Card.Body>
			</Card>
		</section>
	);
};

RecommendationsResult.propTypes = {
    name: PropTypes.string.isRequired,
    display_phone: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    display_address: PropTypes.array
};

export default RecommendationsResult;