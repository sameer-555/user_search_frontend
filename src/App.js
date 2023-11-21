import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import AddUser from "./pages/AddUser.tsx";
import UserSearchList from './pages/SearchUser.tsx';
const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<AddUser />} />
        <Route exact path="search" element={<UserSearchList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;