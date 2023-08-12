import FindFriendForm from "../components/FindFriendForm";
import FriendData from "../components/FriendData";

const FriendsPage = ({ updateUserDelete, setUpdated, currentUser, users, updateUserAdd, currentFriends }) => {

    const allResults = currentFriends.map((friend) => {
			return (<FriendData
				key={friend._id}
				friendId={friend._id}
				name={friend.name}
				email={friend.username}
				updateUserDelete={updateUserDelete}
			/>
			)
    });

    return (
			<section>
				<FindFriendForm setUpdated={setUpdated} currentUser={currentUser} users={users} updateUserAdd={updateUserAdd} />
				<div className='grid-container'>
					{allResults}
				</div>
			</section>
    )
};

export default FriendsPage;