import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CardStyle.css';

const FriendData = (props) => {
    return (
        <Card className="card">
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>Email: {props.email}</Card.Text>
                <Button variant="danger" onClick={() => props.updateUserDelete("friends", {"friends": props.friendId})}>Delete Friend :(</Button>
            </Card.Body>
        </Card>
    );
};

export default FriendData;
