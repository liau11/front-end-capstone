import './UserSavedData.css';

const UserSavedData = ({  restaurantId, name, address, updateUserDelete, url, imageUrl }) => {
    const openYelpInNewTab = () => {
        window.open(url, '_blank');
    };


    return (
        <section>
            <img src={imageUrl} alt={name} /> 
            <h3>{name}</h3>
            <div>{address}</div>
            <button onClick={openYelpInNewTab}>Yelp</button>
            <button onClick={() => updateUserDelete("savedList", {"savedList": restaurantId } )}>Unbookmark</button>
        </section>
    )
};

export default UserSavedData;
