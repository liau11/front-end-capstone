const FriendData = (props) => {

    return (
        <section>
            <h2>{props.name}</h2>
            <button onClick={() => props.updateUserDelete("friends", {"friends": props.friendId} )}>Delete Friend :(</button>
        </section>
    );

};

export default FriendData;