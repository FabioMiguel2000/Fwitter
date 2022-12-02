import CreateAccount from "./pages/createAccount";
import LogIn from "./pages/login";
import Home from "./pages/home";
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
