import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressRing from "./ProgressRing";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type TailwindColor = string;
type rgbColor = string;

interface DeckAaryanProps {
  title: string;
  completedCards: number;
  totalCards: number;
  icon: IconProp;
  nextReview: Date;
  bgColor: TailwindColor;
  shadowColor: rgbColor;
}

export default function DeckAaryan({
  title,
  completedCards,
  totalCards,
  icon,
  nextReview,
  bgColor,
  shadowColor,
}: DeckAaryanProps) {
  const daysUntilNextReview = Math.ceil(
    (nextReview.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );

  let badgeBgColor, badgeTextColor, badgeText;
  if (daysUntilNextReview <= 0) {
    badgeBgColor = "bg-rose-500";
    badgeTextColor = "text-white";
    badgeText = "Due for review";
  } else {
    badgeBgColor = "bg-white";
    badgeTextColor = bgColor.replace("bg", "text");
    badgeText = `Next review in ${daysUntilNextReview} days`;
  }

  return (
    <article
      id="card"
      className={`${bgColor} rounded-2xl`}
      style={{ boxShadow: `0px 8px 0px 0px ${shadowColor}` }}
    >
      <div id={"card-content"} className={"flex flex-col p-4"}>
        <div
          id={"progress-container"}
          className={"flex flex-col items-center justify-center"}
        >
          <ProgressRing
            radius={60}
            strokeWidth={8}
            progress={completedCards / totalCards}
          />
          <figure className={"absolute"}>
            <FontAwesomeIcon icon={icon} size={"4x"} className={"text-white"} />
          </figure>
        </div>
        <div className={"flex items-center justify-between py-2"}>
          <h1 className={"text-3xl font-serif text-white"}>{title}</h1>
          <h2 className={"text-2xl font-sans text-white"}>
            {completedCards}/{totalCards}
          </h2>
        </div>
        <p
          className={`w-fit px-2 font-sans ${badgeBgColor} rounded-md`}
          style={{ color: badgeTextColor }}
        >
          {badgeText}
        </p>
      </div>
    </article>
  );
}
