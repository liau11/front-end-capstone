import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const RoutesPath = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/not-found" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default RoutesPath;