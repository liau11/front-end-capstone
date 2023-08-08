import FriendsPage from "./FriendsPage";
import UserRecommendationData from "../components/UserRecommendationData";
import UserSavedData from "../components/UserSavedData";

const ProfilePage = ({ updateUserDelete, savedRestaurants, currentUser, userRecommendations, users, updateUserAdd, currentFriends }) => {
    console.log("ALL MY RECS", userRecommendations)

    const allRecommendationResults = userRecommendations.map((restaurant) => {
        return (<UserRecommendationData
            key={restaurant._id}
            restaurantId={restaurant._id}
            name={restaurant.name}
            address={restaurant.location.display_address}
            updateUserDelete={updateUserDelete}
        />
        )
    });


    const allSavedResults = savedRestaurants.map((restaurant) => {
        return (<UserSavedData
            key={restaurant._id}
            restaurantId={restaurant._id}
            name={restaurant.name}
            address={restaurant.location.display_address}
            updateUserDelete={updateUserDelete}
        />
        )
    });



    return (
        <section>
            <h2>My Friends</h2>
            <FriendsPage updateUserDelete={updateUserDelete} currentUser={currentUser} users={users} updateUserAdd={updateUserAdd} currentFriends={currentFriends}/>
            <h2>My Recommendations</h2>
            {allRecommendationResults}
            <h2>My Bookmarks</h2>
            {allSavedResults}
        </section>
    )
};

export default ProfilePage;

