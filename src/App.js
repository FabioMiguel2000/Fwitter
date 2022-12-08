import CreateAccount from "./pages/createAccount";
import LogIn from "./pages/login";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gun from "gun/gun";
import "gun/sea";

function App() {
  const gun = Gun({
    file: "db/data.json",
    peers: [`http://localhost:8765/gun`],
  });
  const user = gun.user().recall({ sessionStorage: true });

  return (
    <Router>
      <Routes>
        <Route index element={<LogIn gun={gun} user={user} />} />
        <Route
          path="/create_account"
          element={<CreateAccount gun={gun} user={user} />}
        />
        <Route path="/homepage" element={<Home gun={gun} user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
