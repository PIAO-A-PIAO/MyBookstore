import React from "react";

interface GameCardProp {
  name: string;
  description: string;
  image: string;
}

const GameCard = (props: GameCardProp) => {
  return (
    <div className="group">
      <div>
        <img
          src={props.image}
          width={300}
          height={200}
          alt={props.name}
          className="rounded-t-lg object-cover"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">{props.name}</h3>
        <p className="text-muted-foreground">{props.description}</p>
      </div>
      <div>
        <button className="group-hover:underline">Play Now</button>
      </div>
    </div>
  );
};

export default GameCard;
