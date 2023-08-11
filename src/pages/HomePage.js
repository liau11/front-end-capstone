import Map from "../components/MapContainer";
import RecommendationsResultsList from "../components/RecommendationsResultsList";
import GetRecommendationsForm from "../components/GetRecommendationsForm";
import './HomePage.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HomePage = ({ handleAddToList, currentUser, recommendationsData, updateUserAdd, getFriendsRecommendations, cityCenter }) => {
    return (
        <section>
            <h2 className="text-center"> Welcome to the Home Page! </h2>
            <br />
            <Container fluid >
                <Row className="text-center">
                    <GetRecommendationsForm 
                        currentUser={currentUser} 
                        getFriendsRecommendations={getFriendsRecommendations}
                    />
                </Row>
                <br />
                <Row >
                    <Col md={8}>
                        < Map 
                            cityCenter={cityCenter} 
                            recommendationsData={recommendationsData} 
                        />
                    </Col>
                    <Col md={3} className="scrollable-column">
                        <RecommendationsResultsList 
                            handleAddToList={handleAddToList} 
                            currentUser={currentUser} 
                            recommendationsData={recommendationsData} 
                            updateUserAdd={updateUserAdd} 
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );

};

export default HomePage;