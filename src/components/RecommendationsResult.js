import React from 'react';
import PropTypes from 'prop-types';


const RecommendationsResult = (props) => {

    let addressString = "";
    for (const address of props.display_address) {
        addressString += (" " + address)
    }

    // const validateId = (arrToAdd) => {
    //     if (props.currentUser[arrToAdd].includes(props.restaurantId)) {
    //         return false;
    //     }
    //     return true;
    // }

    // const handleAddToList = (arrToAdd) => {
    //     const isNewRestaurant = validateId(arrToAdd);
    //     if (isNewRestaurant) {
    //         props.updateUserAdd(arrToAdd, { [arrToAdd]: props.restaurantId });
    //         if (arrToAdd === "savedList") {
    //             alert("Bookmarked sucessfully.");
    //         } else if (arrToAdd === "recommendations") {
    //             alert("Thank you for also recommending this restaurant!");
    //         }
    //     } else {
    //         alert("This restaurant is already in your list.");
    //     }
    // };

    return (
        <section>
            <li>
                <h2>{props.name}</h2>
                <div>{addressString}</div>
                <div>{props.display_phone}</div>
                <div>{props.price}</div>
            </li>
            <button onClick={() => props.handleAddToList("savedList", props.restaurantId)}>Save for Later</button>
            <button onClick={() => props.handleAddToList("recommendations", props.restaurantId)}>Upvote, also recommend!</button>
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