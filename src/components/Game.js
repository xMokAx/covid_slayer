import React, { useState } from "react";
import { Client } from "boardgame.io/react";
import { Button } from "react-bootstrap";
import { PrivateLayout } from "./PrivateLayout";
import { Board } from "./Board";
import { random } from "lodash-es";
import axios from "axios";

const Game = {
  setup: () => ({
    time: 60,
    surrender: false,
    actions: ["Game started"],
    player: {
      health: 100,
      healthPotions: 3,
      potionPower: [5, 15],
      attack: [1, 10],
      powerAttack: [10, 30],
      powerAttacks: 1,
    },
    covid: {
      health: 100,
      attack: [1, 10],
      powerAttack: [10, 30],
      powerAttacks: 1,
    },
  }),
  turn: {
    moveLimit: 1,
  },
  moves: {
    countDown: {
      move: (G, ctx) => {
        G.time -= 1;
      },
      undoable: false, // prevents undoing the move.
      redact: true, // prevents the move arguments from showing up in the log.
      noLimit: true, // prevents the move counting towards a player’s number of moves.
    },
    attack(G, ctx, id) {
      if (ctx.currentPlayer === "0") {
        G.covid.health -= random(...G.player.attack);
      } else {
        G.player.health -= random(...G.covid.attack);
      }
    },
    powerAttack(G, ctx, id) {
      if (ctx.currentPlayer === "0") {
        G.covid.health -= random(...G.player.powerAttack);
        G.player.powerAttacks -= 1;
      } else {
        G.player.health -= random(...G.covid.powerAttack);
        G.covid.powerAttacks -= 1;
      }
    },
    heal(G, ctx, id) {
      G.player.health += random(...G.player.potionPower);
      G.player.healthPotions -= 1;
    },
    surrender(G, ctx, id) {
      G.surrender = true;
    },
  },
  endIf: (G, ctx) => {
    if (G.surrender === true) {
      return { winner: "Covid" };
    } else if (G.time === 0 || G.player.health <= 0 || G.covid.health <= 0) {
      if (G.player.health > G.covid.health) {
        return { winner: "Player" };
      } else if (G.player.health === G.covid.health) {
        return { winner: null };
      } else {
        return { winner: "Covid" };
      }
    }
  },
};

const GameClient = Client({
  debug: false,
  game: Game,
  board: Board,
  numPlayers: 2,
});

export const GamePage = ({ setUser, user }) => {
  const [matchId, setMatchId] = useState("");
  const onStartClick = async () => {
    try {
      const res = await axios.post("/matches", { playerId: user._id });
      setMatchId(res.data.match._id);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  return (
    <PrivateLayout setUser={setUser}>
      {matchId ? (
        <GameClient user={user} matchId={matchId} onStartClick={onStartClick} />
      ) : (
        <div
          className="d-flex flex-column justify-content-around align-items-center"
          style={{ height: "50vh" }}
        >
          <h1 className="text-center">Covid Slayer</h1>
          <Button variant="primary" size="lg" onClick={onStartClick}>
            Start Game
          </Button>
        </div>
      )}
    </PrivateLayout>
  );
};
