import './CardStyle.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const UserSavedData = ({  restaurantId, name, address, updateUserDelete, url, imageUrl }) => {
    const openYelpInNewTab = () => {
        window.open(url, '_blank');
    };

    return (
      <Card style={{ width: '18rem', marginTop: '40px' }} className='border p-4'>
          <div className='card-image-container'>
              <Card.Img variant='top' src={imageUrl} className='centered-image' />
          </div>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{address}</Card.Text>
                <Card.Footer  className='d-flex justify-content-center align-items-center'>
                <Button variant='primary' onClick={openYelpInNewTab}>Yelp</Button>
                <Button variant='danger' onClick={() => updateUserDelete('savedList', {'savedList': restaurantId })}>
                    Remove Recommendation 
                </Button>
				      </Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default UserSavedData;
