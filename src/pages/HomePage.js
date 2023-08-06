import Map from "../components/MapContainer";
import RecommendationsResultsList from "../components/RecommendationsResultsList";
import GetRecommendationsForm from "../components/GetRecommendationsForm";

const HomePage = ({ currentUser, recommendationsData, updateUserAdd, getFriendsRecommendations }) => {
    return (
        <section>
            <h1>Welcome to the Home Page!</h1>
            < Map recommendationsData={recommendationsData} ></Map >
            <RecommendationsResultsList currentUser={currentUser} recommendationsData={recommendationsData} updateUserAdd={updateUserAdd} />
            <GetRecommendationsForm  currentUser={currentUser} getFriendsRecommendations={getFriendsRecommendations}></GetRecommendationsForm>
        </section>
    );

};

export default HomePage;