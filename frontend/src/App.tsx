import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import EntertainersList from './pages/EntertainersList';
import AddEntertainer from './pages/AddEntertainer';
import EntertainerDetails from './pages/EntertainerDetails';
import EditEntertainer from './pages/EditEntertainer';

// Routes with routing
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/entertainers" element={<EntertainersList />} />
          <Route path="/entertainers/add" element={<AddEntertainer />} />
          <Route path="/entertainers/:id" element={<EntertainerDetails />} />
          <Route path="/entertainers/edit/:id" element={<EditEntertainer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
