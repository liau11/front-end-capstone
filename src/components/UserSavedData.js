import './CardStyle.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Icon } from '@iconify/react';


const UserSavedData = ({  restaurantId, name, address, updateUserDelete, url, imageUrl }) => {
	const openYelpInNewTab = () => {
		window.open(url, '_blank');
	};

	return (
		<Card style={{ width: '18rem', marginTop: '40px' }} className='border p-4' id='card'>
			<div className='card-image-container'>
					<Card.Img variant='top' src={imageUrl} className='centered-image' />
			</div>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>{address}</Card.Text>
				<Card.Footer  className='d-flex justify-content-center align-items-center'>
					<Button class="btn btn-outline-danger btn-sm" onClick={openYelpInNewTab}>
						<Icon icon="bi:yelp" color="red" width="18" height="18" />
						Yelp
					</Button>
					<Button variant='danger' onClick={() => updateUserDelete('savedList', {'savedList': restaurantId })}>
							<Icon icon="bi:trash" />
					</Button>
			</Card.Footer>
			</Card.Body>
		</Card>
  );
};

export default UserSavedData;
