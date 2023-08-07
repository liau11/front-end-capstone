import FriendsPage from "./FriendsPage";

const ProfilePage = ({ currentUser, users, updateUserAdd, currentFriends }) => {


    return (
        <section>
            <FriendsPage currentUser={currentUser} users={users} updateUserAdd={updateUserAdd} currentFriends={currentFriends}/>
        </section>
    )
};

export default ProfilePage;