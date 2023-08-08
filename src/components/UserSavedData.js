const UserSavedData = ({  restaurantId, name, address, updateUserDelete, url }) => {
    const openYelpInNewTab = () => {
        window.open(url, '_blank');
    };

    return (
        <section>
            <h3>{name}</h3>
            <div>{address}</div>
            <button onClick={openYelpInNewTab}>Yelp</button>
            <button onClick={() => updateUserDelete("savedList", {"savedList": restaurantId } )}>Unbookmark</button>
        </section>
    )
};

export default UserSavedData;
