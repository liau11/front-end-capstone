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
            <h1>Welcome to the Home Page!</h1>
            <Container fluid>
                <Row>
                    <Col sm={5} >
                        < Map 
                            cityCenter={cityCenter} 
                            recommendationsData={recommendationsData} 
                        />
                    </Col>
                    <Col>
                        <RecommendationsResultsList 
                            handleAddToList={handleAddToList} 
                            currentUser={currentUser} 
                            recommendationsData={recommendationsData} 
                            updateUserAdd={updateUserAdd} 
                        />
                    </Col>
                </Row>
                <Row>
                    {/* <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col> */}
                    <GetRecommendationsForm  
                        currentUser={currentUser} 
                        getFriendsRecommendations={getFriendsRecommendations}
                    />
                </Row>
            </Container>
    
            
        </section>
    );

};

export default HomePage;