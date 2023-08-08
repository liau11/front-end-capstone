const FriendData = (props) => {

    return (
        <section>
            <li>
                <h2>{props.name}</h2>
                <button onClick={() => props.updateUserDelete("friends", {"friends": props.friendId} )}>Delete Friend :(</button>
            </li>
        </section>
    );

};

export default FriendData;