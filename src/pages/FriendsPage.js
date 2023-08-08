import FindFriendForm from "../components/FindFriendForm";
import FriendData from "../components/FriendData";

const FriendsPage = ({ updateUserDelete, setUpdated, currentUser, users, updateUserAdd, currentFriends }) => {

    // console.log("I'm in Friends Page. Users:", users)

    const allResults = currentFriends.map((friend) => {
        return (<FriendData
            key={friend._id}
            friendId={friend._id}
            name={friend.name}
            updateUserDelete={updateUserDelete}
        />
        )
    });

    return (
        <section>
            <FindFriendForm setUpdated={setUpdated} currentUser={currentUser} users={users} updateUserAdd={updateUserAdd} />
            {allResults}
        </section>
    )
};

export default FriendsPage;