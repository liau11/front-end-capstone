import React from 'react';
import PropTypes from 'prop-types';


const RecommendationsResult = (props) => {

    // const value = props.restaurantId.valueOf()

    let addressString = "";
    for (const address of props.display_address) {
        addressString += (" " + address)
    }

    const addToSavedList = () => {
        props.updateUserAdd("savedList", { "savedList": value })
        console.log(value)
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
            {/* <button></button> */}
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