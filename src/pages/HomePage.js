import Map from "../components/MapContainer";
import RecommendationsResultsList from "../components/RecommendationsResultsList";
import GetRecommendationsForm from "../components/GetRecommendationsForm";

const HomePage = ({ handleAddToList, currentUser, recommendationsData, updateUserAdd, getFriendsRecommendations, cityCenter }) => {
    return (
        <section>
            <h1>Welcome to the Home Page!</h1>
            < Map 
                cityCenter={cityCenter} 
                recommendationsData={recommendationsData} 
            />
            <RecommendationsResultsList 
                handleAddToList={handleAddToList} 
                currentUser={currentUser} 
                recommendationsData={recommendationsData} 
                updateUserAdd={updateUserAdd} 
            />
            <GetRecommendationsForm  
                currentUser={currentUser} 
                getFriendsRecommendations={getFriendsRecommendations}
            />
        </section>
    );

};

export default HomePage;