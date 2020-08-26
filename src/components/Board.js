import React, { useEffect, useState } from "react";
import { PlayerActions } from "./PlayerActions";
import { Avatar } from "./Avatar";
import { Log } from "./Log";
import { Row, Col, Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

let timeInterval;
export const Board = (props) => {
  const history = useHistory();
  const userName = props.user.name.split(" ")[0];
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  const onNoClick = () => {
    history.push("/");
  };

  const onYesClick = async () => {
    await props.onStartClick();
    closeModal();
    props.reset();
  };

  const updateMatch = async () => {
    axios.patch(`/matches/${props.matchId}`, {
      playerId: props.user._id,
      match: {
        timeLeft: props.G.time,
        playerHP: props.G.player.health,
        healthPotions: props.G.player.healthPotions,
        covidHP: props.G.covid.health,
        surrender: props.G.surrender,
      },
    });
  };

  useEffect(() => {
    if (!!props.ctx.gameover) {
      clearInterval(timeInterval);
      updateMatch();
      showModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.ctx.gameover]);

  useEffect(() => {
    let t;
    if (props.ctx.currentPlayer === "1") {
      t = setTimeout(() => {
        if (props.G.covid.powerAttacks > props.G.player.powerAttacks) {
          props.moves.powerAttack();
        } else {
          props.moves.attack();
        }
      }, 1000);
    }
    return () => {
      clearTimeout(t);
    };
  }, [
    props.G.covid.powerAttacks,
    props.G.player.powerAttacks,
    props.ctx.currentPlayer,
    props.moves,
  ]);

  useEffect(() => {
    if (!props.ctx.gameover) {
      timeInterval = setInterval(() => {
        props.moves.countDown();
      }, 1000);
    }

    return () => {
      clearInterval(timeInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.ctx.gameover]);

  return (
    <>
      <Row>
        <Col
          xs={12}
          sm={9}
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 104px)" }}
        >
          <p className="w-100 text-center">{props.G.time}</p>
          <p>
            {props.ctx.currentPlayer === "1"
              ? "Covid"
              : props.user.name.split(" ")[0]}{" "}
            Turn
          </p>
          <div className="flex-fill w-100 d-flex justify-content-between align-items-center">
            <div className="flex-fill">
              <Avatar name={userName} health={props.G.player.health} />
            </div>

            <p className="font-weight-bold">VS</p>
            <div className="flex-fill">
              {" "}
              <Avatar health={props.G.covid.health} />
            </div>
          </div>
          <PlayerActions {...props} />
        </Col>
        <Log userName={userName} log={props.log} />
      </Row>
      <Modal show={show} onHide={closeModal} backdrop="static" keyboard={false}>
        {props.ctx.gameover && (
          <Modal.Body>
            <p className="text-center">
              {props.ctx.gameover.winner === "Covid" ? "You Lose" : "You Win"}!
              Play Again?
            </p>
          </Modal.Body>
        )}
        <Modal.Footer className="justify-content-around">
          <Button variant="secondary" onClick={onNoClick}>
            No
          </Button>
          <Button variant="primary" onClick={onYesClick}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
