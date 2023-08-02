import React from 'react';
import PropTypes from 'prop-types';


const RecommendationsResult = (props) => {

    let addressString = "";
    for (const address of props.display_address) {
        addressString += (" " + address)
    }

    const addToSavedList = () => {
        props.updateUserAdd("savedList", { "savedList": props.restaurantId })
        console.log("THIS RESTAURANT ID GOT ADDED TO SAVED LIST", props.restaurantId)
    };

    const addToRecommendationsList = () => {
        props.updateUserAdd("recommendations", { "recommendations": props.restaurantId })
        console.log("THIS RESTAURANT ID GOT ADDED TO RECOMMENDATIONS LIST", props.restaurantId)
    };

    return (
        <section>
            <li>
                <h2>{props.name}</h2>
                <div>{addressString}</div>
                <div>{props.display_phone}</div>
                <div>{props.price}</div>
            </li>
            <button onClick={addToSavedList}>Save for Later</button>
            <button onClick={addToRecommendationsList}>Upvote, also recommend!</button>
        </section>
    );
};

RecommendationsResult.propTypes = {
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    display_address: PropTypes.array
};

export default RecommendationsResult;