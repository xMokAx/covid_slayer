import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import axios from "axios";
import { GamePage } from "./components/Game";
import { Dashboard } from "./components/Dashboard";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";
import { LoadingPage } from "./components/LoadingPage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      axios
        .get("/signin")
        .then((res) => {
          setLoading(false);
          setUser(res.data.user);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <Switch>
        <PublicRoute path="/signin" user={user}>
          <Signin setUser={setUser} />
        </PublicRoute>
        <PublicRoute path="/signup" user={user}>
          <Signup setUser={setUser} />
        </PublicRoute>
        <PrivateRoute exact path="/" user={user}>
          <Dashboard setUser={setUser} user={user} />
        </PrivateRoute>
        <PrivateRoute exact path="/game" user={user}>
          <GamePage setUser={setUser} user={user} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
