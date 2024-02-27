
import SuccessView from "../SuccessView";
import "./index.css";

function GameBoard({ cards, onClickCard, score, name, time, gameOver }) {
  return (
    <div className="game-board-container">
      <div className="game-card-container">
        <h1>Matching Game</h1>
        <div className="score-time-container">
          <p>Score: {score}</p>
          <p>Time: {time}</p>
        </div>
        <div className="game-card">
          <h1>Hello, {name}</h1>
          {gameOver ? (
            <SuccessView name={name} score={score} time={time} />
          ) : (
            <ul>
              {cards.map((card) => (
                <li
                  key={card.id}
                  className={`card ${card.flipped ? "flipped" : ""}`}
                  onClick={() => onClickCard(card.id)}
                >
                  {card.flipped && (
                    <img className="img" src={card.cardUrl} alt="Tile" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameBoard;

