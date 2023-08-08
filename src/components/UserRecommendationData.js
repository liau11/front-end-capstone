import './UserRecommendationData.css';

const UserRecommendationData = ({ updateUserDelete, restaurantId, name, address, url, imageUrl }) => {
    const openYelpInNewTab = () => {
        window.open(url, '_blank');
    };

    return (
        <section>
            <img src={imageUrl} alt={name} /> 
            <h3>{name}</h3>
            <div>{address}</div>
            <button onClick={openYelpInNewTab}>Yelp</button>
            <button onClick={() => updateUserDelete("recommendations", {"recommendations": restaurantId })}>Remove Recommendation</button>
        </section>
    );
};

export default UserRecommendationData;
