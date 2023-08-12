import './CardStyle.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Icon } from '@iconify/react';


const UserSavedData = ({  restaurantId, name, address, updateUserDelete, url, price, imageUrl, isClosed }) => {
	const openYelpInNewTab = () => {
		window.open(url, '_blank');
	};

	const openGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(googleMapsUrl, '_blank');
  };

	return (
		<Card style={{ width: '18rem', marginTop: '40px', marginBottom: '40px'}} className='border p-4' id='card'>
			<div className='card-image-container'>
				<Card.Img variant='top' src={imageUrl} className='centered-image' />
			</div>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>{address}</Card.Text>
				<Card.Text>{price}</Card.Text>
				{isClosed ? (
          			<Card.Text>Currently Closed</Card.Text>) : 
					(<Card.Text>Open Now</Card.Text>)
				}
				<Card.Footer  className='d-flex justify-content-center align-items-center'>
				<Button className="btn-size btn-sm btn-yelp" onClick={openYelpInNewTab}>
					<Icon icon="bi:yelp" color="white" width="18" height="18" />
				</Button>
				<Button className="btn-sm btn-google btn-size" onClick={openGoogleMaps}>
					<Icon icon="bi:map" color="white" width="18" height="18" />
	      </Button>
				<Button className='btn-size btn-sm' variant='danger' onClick={() => updateUserDelete('savedList', {'savedList': restaurantId })}>
					<Icon icon="bi:trash" width="18" height="18" />
				</Button>
			</Card.Footer>
			</Card.Body>
		</Card>
  );
};

export default UserSavedData;
