

const UserRecommendationData = ({ updateUserDelete, restaurantId, name, address }) => {


    return (
        <section>
            <h3>{name}</h3>
            <div>{address}</div>
            <button onClick={() => updateUserDelete("recommendations", {"recommendations": restaurantId } )}>Remove Recommendation</button>
        </section>
    )
};

export default UserRecommendationData;

