import FindFriendForm from "../components/FindFriendForm";
import FriendData from "../components/FriendData";

const FriendsPage = ({ updateUserAdd, currentFriends }) => {

    const allResults = currentFriends.map((friend) => {
        return (<FriendData
            key={friend._id}
            friendId={friend._id}
            name={friend.name}
        />
        )
    });

    return (
        <section>
            <FindFriendForm updateUserAdd={updateUserAdd} />
            {allResults}
        </section>
    )
};

export default FriendsPage;