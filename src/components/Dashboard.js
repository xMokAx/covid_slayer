import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { PrivateLayout } from "./PrivateLayout";

function localizeDate(utcDate) {
  return `${utcDate.getFullYear().toString().padStart(4, "0")}-${(
    utcDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${utcDate.getDate().toString().padStart(2, "0")}
    ${utcDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${utcDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${utcDate.getSeconds().toString().padStart(2, "0")}`;
}

const Box = ({ children }) => (
  <div
    style={{ height: 200 }}
    className="w-100 d-flex flex-column justify-content-center align-items-center"
  >
    {children}
  </div>
);

export const Dashboard = ({ setUser, user }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);

  const getMatches = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/matches", {
        params: {
          playerId: user._id,
        },
      });

      setLoading(false);
      setMatches(res.data.matches);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    getMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PrivateLayout setUser={setUser}>
      <h1 className="mb-4 text-center">Match History</h1>
      {error ? (
        <Box>
          <p className="text-danger mb-4">{error}</p>
          <Button variant="primary" disabled={loading} onClick={getMatches}>
            Retry
          </Button>
        </Box>
      ) : loading ? (
        <Box>
          {" "}
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </Box>
      ) : (
        <div style={{ overflowX: "auto" }}>
          {matches.length ? (
            <Table bordered>
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Player HP</th>
                  <th scope="col">Covid HP</th>
                  <th scope="col">Health Postions</th>
                  <th scope="col">Surrender</th>
                  <th scope="col">Time Left</th>
                  <th scope="col">Created At</th>
                </tr>
              </thead>
              <tbody>
                {matches.map(
                  (
                    {
                      playerHP,
                      covidHP,
                      healthPotions,
                      surrender,
                      timeLeft,
                      createdAt,
                    },
                    i
                  ) => {
                    let className = "";
                    if (surrender || covidHP > playerHP) {
                      className = "table-danger";
                    } else if (covidHP < playerHP) {
                      className = "table-success";
                    }
                    return (
                      <tr key={i} className={className}>
                        <td>{playerHP}</td>
                        <td>{covidHP}</td>
                        <td>{healthPotions}</td>
                        <td>{surrender ? "Yes" : "No"}</td>
                        <td>{timeLeft}</td>
                        <td>{localizeDate(new Date(createdAt))}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </Table>
          ) : (
            <p className="text-muted p-4 text-center">
              You didn't play any games yet.
            </p>
          )}
        </div>
      )}
    </PrivateLayout>
  );
};
