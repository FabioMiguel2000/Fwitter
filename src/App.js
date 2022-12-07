import CreateAccount from "./Pages/createAccount";
import LogIn from "./Pages/login";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<LogIn />} />
        <Route path="/create_account" element={<CreateAccount />} />
        <Route path="/homepage" element={<Home />} />
      </Routes>
    </Router>

  );
}

export default App;
