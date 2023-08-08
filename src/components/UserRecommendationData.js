import React from 'react';

const UserRecommendationData = ({ updateUserDelete, restaurantId, name, address, url }) => {
    const openYelpInNewTab = () => {
        window.open(url, '_blank');
    };

    return (
        <section>
            <h3>{name}</h3>
            <div>{address}</div>
            <button onClick={openYelpInNewTab}>Yelp</button>
            <button onClick={() => updateUserDelete("recommendations", {"recommendations": restaurantId })}>Remove Recommendation</button>
        </section>
    );
};

export default UserRecommendationData;
