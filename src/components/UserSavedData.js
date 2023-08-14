import './CardStyle.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Icon } from '@iconify/react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './UserSavedData.css';

const UserSavedData = ({ restaurantId, name, address, updateUserDelete, url, price, imageUrl, handleMoveToRecommendations }) => {
  const openYelpInNewTab = () => {
    window.open(url, '_blank');
  };

  const openGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(googleMapsUrl, '_blank');
  };


  return (
    <Card style={{ width: '18rem', marginTop: '40px', marginBottom: '40px' }} className='border p-4' id='card'>
      <div className='card-image-container'>
        <Card.Img variant='top' src={imageUrl} className='centered-image' />
      </div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{address}</Card.Text>
        <Card.Text>{price}</Card.Text>
        <Card.Footer className='d-flex justify-content-center align-items-center'>
          <OverlayTrigger placement='top' overlay={<Tooltip id={'yelp-msg'} style={{position:"fixed"}}>Open Yelp</Tooltip>}>
            <Button className="btn-sm" variant="outline-danger" onClick={openYelpInNewTab}>
              <Icon icon="bi:yelp" color="red" width="18" height="18" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement='top' overlay={<Tooltip id={'google-maps-msg'} style={{position:"fixed"}}>Open Google Maps</Tooltip>}>
            <Button className="btn-sm" variant="info" onClick={openGoogleMaps}>
              <Icon icon="bi:map" color="white" width="18" height="18" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement='top' overlay={<Tooltip id={'delete-msg'} style={{position:"fixed"}}>Delete</Tooltip>}>
            <Button className='btn-sm' variant='danger' onClick={() => {
              updateUserDelete('savedList', { 'savedList': restaurantId });
            }}>
              <Icon icon="bi:trash" width="18" height="18" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement='top' overlay={<Tooltip id={'delete-msg'} style={{position:"fixed"}}>Delete & Move to 'My Recommendations'</Tooltip>}>
            <Button className='btn-sm custom' onClick={() => handleMoveToRecommendations(restaurantId)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
            </Button>
          </OverlayTrigger>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default UserSavedData;
