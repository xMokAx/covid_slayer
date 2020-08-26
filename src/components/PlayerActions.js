import React from "react";
import { Button } from "react-bootstrap";

export const PlayerActions = (props) => {
  return (
    <div className="h-25 w-100 p-2 d-flex flex-wrap justify-content-center align-items-center">
      {props.ctx.currentPlayer === "0" && !props.ctx.gameover ? (
        <>
          <Button
            className="mx-2"
            variant="primary"
            onClick={() => {
              props.moves.attack();
            }}
          >
            Attack
          </Button>
          <Button
            className="mx-2"
            variant="dark"
            onClick={() => {
              props.moves.powerAttack();
            }}
            disabled={
              props.G.player.health > 50 || !props.G.player.powerAttacks
            }
          >
            Blast
          </Button>
          <Button
            className="mx-2"
            variant="success"
            onClick={() => {
              props.moves.heal();
            }}
            disabled={!props.G.player.healthPotions}
          >
            Heal {props.G.player.healthPotions}
          </Button>
          <Button
            className="mx-2"
            variant="danger"
            onClick={() => {
              props.moves.surrender();
            }}
          >
            Surrender
          </Button>
        </>
      ) : null}
    </div>
  );
};
