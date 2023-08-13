import Map from "../components/MapContainer";
import RecommendationsResultsList from "../components/RecommendationsResultsList";
import GetRecommendationsForm from "../components/GetRecommendationsForm";
import RestaurantForm from "../components/RestaurantForm";
import './HomePage.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HomePage = ({ handleAddToList, currentUser, recommendationsData, updateUserAdd, getFriendsRecommendations, cityCenter, allRestaurants, addNewRestaurant }) => {
    return (
        <section>
            {/* <h2 className="text-center"> Welcome to the Home Page! </h2> */}
            <br />
            <Container fluid >
                <Row className="text-center">
                    <Col>
                        <GetRecommendationsForm 
                            currentUser={currentUser} 
                            getFriendsRecommendations={getFriendsRecommendations}
                        />
                    </Col>
                    <Col>
                        <RestaurantForm
                            handleAddToList={handleAddToList} 
                            allRestaurants={allRestaurants} 
                            addNewRestaurant={addNewRestaurant} 
                            updateUserAdd={updateUserAdd}
                        ></RestaurantForm>
                    </Col>
                </Row>
                <br />
                <Row className="justify-content-center">
                    <Col md={8} lg={8} xl={8}>
                        < Map 
                            cityCenter={cityCenter} 
                            recommendationsData={recommendationsData} 
                        />
                    </Col>
                    {recommendationsData.length && Object.keys(currentUser).length ? 
                    <Col md={3} lg={3} xl={3} className="scrollable-column">
                        <RecommendationsResultsList 
                            handleAddToList={handleAddToList} 
                            currentUser={currentUser} 
                            recommendationsData={recommendationsData} 
                            updateUserAdd={updateUserAdd} 
                        />
                    </Col> : <></>}
                </Row>
            </Container>
        </section>
    );

};

export default HomePage;