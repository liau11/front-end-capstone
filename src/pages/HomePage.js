import Map from "../components/MapContainer";
import RecommendationsResultsList from "../components/RecommendationsResultsList";
import GetRecommendationsForm from "../components/GetRecommendationsForm";
import RestaurantForm from "../components/RestaurantForm";
import './HomePage.css';
import { Container, Row, Col, Tab, Tabs, Card } from 'react-bootstrap';

const HomePage = ({ handleAddToList, currentUser, recommendationsData, updateUserAdd, getFriendsRecommendations, cityCenter, allRestaurants, addNewRestaurant }) => {
    return (
        <section className="body">
            {/* <h2 className="text-center"> Welcome to the Home Page! </h2> */}
            <br />
            <Container className="forms-container">
                <Card>
                    <Card.Header>
                        <Tabs
                        defaultActiveKey="find"
                        id="justify-tab-example"
                        className="mb-3"
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
                        {/* <Nav variant="pills" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link href="#first">Search Restaurants</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#link">Recommend Restaurant</Nav.Link>
                            </Nav.Item>
                        </Nav> */}
                    </Card.Header>
                    {/* <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                            With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                    </Card.Body> */}
                </Card>
                <br />
            </Container>
            <Container fluid >
                {/* <Row className="text-center">
                    <Col>
                        <GetRecommendationsForm 
                            currentUser={currentUser} 
                            getFriendsRecommendations={getFriendsRecommendations}
                        />
                    </Col>
                    <Col>
                        <RestaurantForm
                            currentUser={currentUser}
                            handleAddToList={handleAddToList} 
                            allRestaurants={allRestaurants} 
                            addNewRestaurant={addNewRestaurant} 
                            updateUserAdd={updateUserAdd}
                        ></RestaurantForm>
                    </Col>
                </Row> */}
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