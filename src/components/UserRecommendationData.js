import React from 'react';
import './UserRecommendationData.css';

const UserRecommendationData = ({ updateUserDelete, restaurantId, name, address, url, imageUrl }) => {
    const openYelpInNewTab = () => {
        window.open(url, '_blank');
    };

    
    return (
        <div className='recommendation-card'>
            <img src={imageUrl} alt={name} className='card-image' />
            <div className='card-content'>
                <h3 className='name'>{name}</h3>
                <div className='address'>{address}</div>
                <button className='btn-yelp' onClick={openYelpInNewTab}>Yelp</button>
                <button className='btn-remove' onClick={() => updateUserDelete('recommendations', {'recommendations': restaurantId })}>
                    Remove Recommendation 
                </button>
            </div>
        </div>
    );
};

export default UserRecommendationData;
