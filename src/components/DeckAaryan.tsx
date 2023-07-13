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
      className={`${bgColor} rounded-2xl shadow-[0px_8px_0px_0px_rgb(91,33,182)]`}
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
            <FontAwesomeIcon icon={icon} size={"4x"} />
          </figure>
        </div>
        <div className={"flex items-center justify-between py-2"}>
          <h1 className={"text-3xl font-serif"}>{title}</h1>
          <h2 className={"text-2xl font-sans"}>
            {completedCards}/{totalCards}
          </h2>
        </div>
        <span
          className={`w-fit px-2 font-sans ${badgeTextColor} ${badgeBgColor} rounded-md`}
        >
          {badgeText}
        </span>
      </div>
    </article>
  );
}
