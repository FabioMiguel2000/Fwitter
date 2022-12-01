import CreateAccount from "./pages/createAccount";
import LogIn from "./pages/login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<LogIn />} />
        <Route path="/create_account" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
