const UserSavedData = ({  restaurantId, name, address, updateUserDelete }) => {

    return (
        <section>
            <h3>{name}</h3>
            <div>{address}</div>
            <button onClick={() => updateUserDelete("savedList", {"savedList": restaurantId } )}>Unbookmark</button>
        </section>
    )
};

export default UserSavedData;
