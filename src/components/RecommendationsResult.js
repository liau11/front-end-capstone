import React from 'react';
import PropTypes from 'prop-types';
import './RecommendationsResult.css';
import Card from 'react-bootstrap/Card';

const RecommendationsResult = (props) => {

    const openYelpInNewTab = () => {
        window.open(props.url, '_blank');
    };

    let addressString = "";
    for (const address of props.display_address) {
        addressString += (" " + address)
    }


    return (
        <section>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.imageUrl}/>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        <div>{addressString}</div>
                        <div>{props.display_phone}</div>
                        <div>{props.price}</div>
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <button onClick={openYelpInNewTab}>Yelp</button>
                    <button onClick={() => props.handleAddToList("savedList", {"savedList":props.restaurantId } )}>Save for Later</button>
                    <button onClick={() => props.handleAddToList("recommendations", {"recommendations": props.restaurantId})}>Upvote, also recommend!</button>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
            {/* <li>
                <img src={props.imageUrl} alt={props.name} /> 
                <h2>{props.name}</h2>
                <div>{addressString}</div>
                <div>{props.display_phone}</div>
                <div>{props.price}</div>
            </li>
            <button onClick={openYelpInNewTab}>Yelp</button>
            <button onClick={() => props.handleAddToList("savedList", {"savedList":props.restaurantId } )}>Save for Later</button>
            <button onClick={() => props.handleAddToList("recommendations", {"recommendations": props.restaurantId})}>Upvote, also recommend!</button> */}
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