import React, { useEffect } from "react";
import "../style/App.css";
import Navbar from "./Navbar.js";
import { Route, Routes } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Login from "./Login";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import PollPage from "./PollPage";
import New from "./New";
import { handleInitialData } from "../actions/shared.js";
import RouteLogin from "./RouteLogin.js";
import Error404 from "./404.js";

const App = (props) => {
  const { logIn } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch, logIn]);

  return (
    <div className="container bg-light">
      {logIn && <Navbar />}
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route
          path="/"
          element={
            <RouteLogin>
              <Home />
            </RouteLogin>
          }
        />
        <Route
          path="/leaderboard"
          exact
          element={
            <RouteLogin>
              <Leaderboard />
            </RouteLogin>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <RouteLogin>
              <PollPage />
            </RouteLogin>
          }
        />
        <Route
          path="/add"
          exact
          element={
            <RouteLogin>
              <New />
            </RouteLogin>
          }
        />
        <Route path="/*" exact element={<Error404 />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  logIn: Boolean(authedUser),
});

export default connect(mapStateToProps)(App);