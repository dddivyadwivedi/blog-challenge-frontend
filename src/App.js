import "./App.css";
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupForm from "./pages/SignUp/Signup";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./store/reduxIndex";
import LoginForm from "./pages/Login/Login";
import HomePage from "./pages/HomePage/HomePage";
import ManagePost from "./pages/ManagePost/ManagePost";
import BlogPost from "./pages/BlogPost/BlogPost";


function App() {
  const PrivateRoute = ({ children }) => {
    const auth = useSelector((state) => state.UserAuth);
    let Authorized = auth !== undefined && auth.accessToken;
    return Authorized ? children : <Navigate to="/" />;
  };
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/managepost" element={<PrivateRoute><ManagePost /></PrivateRoute>} />
            <Route exact path="/managepost/:id" element={<PrivateRoute><ManagePost /></PrivateRoute>} />
            <Route exact path="/post/:id" element={<PrivateRoute><BlogPost /></PrivateRoute>} />

          </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
