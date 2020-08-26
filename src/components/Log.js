import React, { useMemo, useRef, useLayoutEffect } from "react";
import { Col } from "react-bootstrap";

export const Log = ({ userName, log }) => {
  const filteredLog = useMemo(
    () =>
      log.length
        ? log.filter(
            ({ action }) =>
              action.payload.type !== "countDown" &&
              action.payload.type !== "endTurn"
          )
        : [],
    [log]
  );
  const container = useRef(null);
  useLayoutEffect(() => {
    if (container.current && filteredLog.length) {
      container.current.scrollTo(0, container.current.scrollHeight);
    }
  }, [filteredLog.length]);
  return (
    <Col
      xs={12}
      sm={3}
      className="bg-light p-4"
      style={{
        minHeight: "400px",
        maxHeight: "calc(100vh - 104px)",
        overflowY: "auto",
      }}
      ref={container}
    >
      {filteredLog.length
        ? filteredLog.map(({ turn, action }) => {
            let name = turn % 2 === 0 ? "Covid" : userName;
            switch (action.payload.type) {
              case "attack":
                return (
                  <p
                    key={turn}
                    className={
                      name === "Covid" ? "text-danger" : "text-primary"
                    }
                  >
                    {name} Attacked
                  </p>
                );
              case "powerAttack":
                return (
                  <p
                    key={turn}
                    className={
                      name === "Covid" ? "text-danger" : "text-primary"
                    }
                  >
                    {name} Power Attacked
                  </p>
                );
              case "heal":
                return (
                  <p key={turn} className="text-primary">
                    {name} Healed
                  </p>
                );
              case "surrender":
                return (
                  <p key={turn} className="text-primary">
                    {name} Surrendered
                  </p>
                );
              default:
                return null;
            }
          })
        : null}
    </Col>
  );
};
