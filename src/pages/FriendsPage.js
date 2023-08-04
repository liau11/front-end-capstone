import FindFriendForm from "../components/FindFriendForm";

const FriendsPage = ({ updateUserAdd, currentFriends }) => {

    console.log(currentFriends)

    return (
        <section>
            <FindFriendForm updateUserAdd={updateUserAdd} />
        </section>
    )
};

export default FriendsPage;