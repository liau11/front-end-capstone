import Map from "../components/MapContainer";
import RecommendationsResultsList from "../components/RecommendationsResultsList";
import GetRecommendationsForm from "../components/GetRecommendationsForm";
import RestaurantForm from "../components/RestaurantForm";
import './HomePage.css';
import { Container, Row, Col, Tab, Tabs, Card } from 'react-bootstrap';

const HomePage = ({ handleAddToList, currentUser, recommendationsData, updateUserAdd, getFriendsRecommendations, cityCenter, allRestaurants, addNewRestaurant }) => {
    return (
        <section className="body">
            <br />
            <Container className="forms-container d-flex align-items-center justify-content-center">
                <Card id="get-recs-card">
                    <Card.Header>
                        <Tabs
                        // activeKey={activeTab} 
                        // onSelect={handleTabSelect}
                        defaultActiveKey="find"
                        id="justify-tab"
                        className="home-tabs mb-3"
                        justify
                        >
                            <Tab eventKey="find" title="Find Restaurants">
                                <GetRecommendationsForm 
                                currentUser={currentUser} 
                                getFriendsRecommendations={getFriendsRecommendations}
                                />
                            </Tab>
                            <Tab eventKey="recommend" title="Recommend a Restaurant">
                                <RestaurantForm
                                currentUser={currentUser}
                                handleAddToList={handleAddToList} 
                                allRestaurants={allRestaurants} 
                                addNewRestaurant={addNewRestaurant} 
                                updateUserAdd={updateUserAdd}
                                />
                            </Tab>
                        </Tabs>
                    </Card.Header>
                </Card>
                <br />
            </Container>
            <Container fluid >
                <br />
                <Row className="justify-content-center">
                    <Col md={8} lg={8} xl={8} style={{paddingRight: "30px"}}>
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