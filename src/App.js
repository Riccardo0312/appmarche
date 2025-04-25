import Register from './Register';
import Login from "./Login";
import StruttureMarche from './StruttureMarche';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/strutture" element={<StruttureMarche />} />
          </Routes>
      </Router>
  );
}
export default App;
