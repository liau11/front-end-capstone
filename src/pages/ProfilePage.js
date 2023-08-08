import FriendsPage from "./FriendsPage";
import UserRecommendationData from "../components/UserRecommendationData";
import UserSavedData from "../components/UserSavedData";

const ProfilePage = ({ savedRestaurants, currentUser, userRecommendations, users, updateUserAdd, currentFriends }) => {
    console.log("ALL MY RECS", userRecommendations)

    const allRecommendationResults = userRecommendations.map((restaurant) => {
        return (<UserRecommendationData
            key={restaurant.id}
            restaurantId={restaurant.id}
            name={restaurant.name}
            address={restaurant.location.display_address}
        />
        )
    });


    const allSavedResults = savedRestaurants.map((restaurant) => {
        return (<UserSavedData
            key={restaurant.id}
            restaurantId={restaurant.id}
            name={restaurant.name}
            address={restaurant.location.display_address}
        />
        )
    });



    return (
        <section>
            <h2>My Friends</h2>
            <FriendsPage currentUser={currentUser} users={users} updateUserAdd={updateUserAdd} currentFriends={currentFriends}/>
            <h2>My Recommendations</h2>
            {allRecommendationResults}
            <h2>My Bookmarks</h2>
            {allSavedResults}
        </section>
    )
};

export default ProfilePage;

