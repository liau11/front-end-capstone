import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const RoutesPath = () => {
    return (
        <Router>
            <nav style={{ margin: 10 }}>
                <Link to="/" style={{ padding: 5 }}>
                Home
                </Link>
                <Link to="/not-found" style={{ padding: 5 }}>
                About
                </Link>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/not-found" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default RoutesPath;