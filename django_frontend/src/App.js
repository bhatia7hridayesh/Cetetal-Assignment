import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
function App() {
  const { access_token } = useSelector(state => state.auth)
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={!access_token ? <LoginReg /> : <Navigate to="/dashboard" />}>
            <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
          </Route>
          <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
