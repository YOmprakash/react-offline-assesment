// App.js component
import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import SuccessView from "./components/SuccessView";
import UserName from "./components/UserName";

const cardList = [
  {
    cardUrl:
      "https://thumbs.dreamstime.com/b/pisc-o-emoticon-isolado-laptop-129601678.jpg",
  },
  {
    cardUrl:
      "https://static-00.iconduck.com/assets.00/keyboard-and-mouse-emoji-2048x920-kqcdl7zo.png",
  },
  {
    cardUrl:
      "https://thumbs.dreamstime.com/z/smileys-birthday-surprise-vector-design-smiley-emojis-gift-box-balloons-confetti-celebration-elements-birth-day-p-235321206.jpg",
  },
  {
    cardUrl:
      "https://p7.hiclipart.com/preview/238/701/107/golf-course-emoji-flag-green-golf.jpg",
  },
  {
    cardUrl:
      "https://www.shutterstock.com/shutterstock/photos/2357815551/display_1500/stock-vector-happy-cool-emoji-with-done-sign-vector-web-illustration-isolated-on-white-background-success-2357815551.jpg",
  },
  {
    cardUrl:
      "https://www.shutterstock.com/image-vector/briefcase-bag-emoji-icon-illustration-260nw-2032881002.jpg",
  },
];

const App = () => {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleUserNameSubmit = (submittedName) => {
    setName(submittedName);
  };

  useEffect(() => {
    if (name && !gameOver) {
      const intervalId = setInterval(() => setTime((time) => time + 1), 1000);
      return () => clearInterval(intervalId);
    }
  }, [name, gameOver]);

  const handleCardClick = (clickedCardId) => {
    const clickedCard = cards.find((card) => card.id === clickedCardId);
    if (clickedCard.matched || clickedCard.flipped) {
      return;
    }

    const updatedCard = cards.map((card) =>
      card.id === clickedCardId ? { ...card, flipped: true } : card,
    )

    setCards(updatedCard);

    if (choiseOne === null) {
      setChoiseOne(clickedCardId);
    } else {
      setChoiseTwo(clickedCardId);
    }
  };

  useEffect(() => {
    const duplicatedCards = [...cardList, ...cardList].map((card) => ({
      ...card,
      id: Math.random(),
      flipped: false,
      matched: false,
    }));
    setCards(duplicatedCards.sort(() => Math.random() - 0.5));
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const resetSelect = () => {
    setChoiseOne(null);
    setChoiseTwo(null);
  }

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      const cardOne = cards.find((card) => card.id === choiseOne);
      const cardTwo = cards.find((card) => card.id === choiseTwo);

      if (cardOne.cardUrl === cardTwo.cardUrl) {
        const updatedCards = cards.map((card) =>
          card.id === choiseOne || card.id === choiseTwo
            ? { ...card, matched: true }
            : card,
        );
        setCards(updatedCards);
        setScore((score) => score + 1);
        if (updatedCards.every((card) => card.matched)) {
          setGameOver(true);
        }
      } else {
        const updatedCards = cards.map((card) =>
          card.id === choiseOne || card.id === choiseTwo
            ? { ...card, flipped: true }
            : card,
        );
        setCards(updatedCards);

        setTimeout(() => {
          const updatedCards = cards.map((card) =>
            card.id === choiseOne || card.id === choiseTwo
              ? { ...card, flipped: false }
              : card,
          );
          setCards(updatedCards);
        }, 1000);

        setScore((score) => score - 1);
      }

      resetSelect();
    }
  }, [choiseOne, choiseTwo]);

  console.log(cards);
  return (
    <div className="App">
      {name ? (
        <GameBoard
          cards={cards}
          onClickCard={handleCardClick}
          score={score}
          time={formatTime(time)}
          name={name}
          gameOver={gameOver}
        />
      ) : (
        <UserName onSubmit={handleUserNameSubmit} />
      )}
    </div>
  );
};

export default App;
