import CreateAccount from "./Pages/createAccount";
import LogIn from "./Pages/login";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Gun from "gun/gun";
import "gun/sea";
// import "gun/axe";

function App() {
  const gun = Gun({
    file: "db/data.json",
    peers: [`http://localhost:8765/gun`],
  });
  // const gun = Gun();
  const user = gun.user().recall({ sessionStorage: true });

  return (
    <Router>
      <Routes>
        <Route index element={<LogIn gun={gun} user={user} />} />
        <Route
          path="/create_account"
          element={<CreateAccount gun={gun} user={user} />}
        />
        {user ? <Route path="/homepage" element={<Home gun={gun} />} /> : <Route index element={<LogIn gun={gun} user={user} />} />}
      </Routes>
    </Router>
  );
}

export default App;
