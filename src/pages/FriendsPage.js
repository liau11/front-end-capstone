import FindFriendForm from "../components/FindFriendForm";
import FriendData from "../components/FriendData";
import './FriendsPage.css';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';



const FriendsPage = ({ updateUserDelete, setUpdated, currentUser, users, updateUserAdd, currentFriends }) => {

    const allResults = currentFriends.map((friend) => {
			return (<FriendData
				key={friend._id}
				friendId={friend._id}
				name={friend.name}
				email={friend.username}
				updateUserDelete={updateUserDelete}
			/>
			)
    });

		const [show, setShow] = useState(false);

		const handleClose = () => setShow(false);
		const handleShow = () => setShow(true);

	return (
		<section>
			<div className="page-body">
				<div className="btn-add">
					<Button variant="primary" onClick={handleShow}>
						Add a friend
					</Button>
				</div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Search for your friend</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FindFriendForm setUpdated={setUpdated} currentUser={currentUser} users={users} updateUserAdd={updateUserAdd} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
				{allResults}
			</div>
		</section>
	)
};

export default FriendsPage;