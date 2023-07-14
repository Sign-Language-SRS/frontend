import DeckAaryan from "@/components/DeckAaryan";
import {
  faLemon,
  faPlane,
  faTree,
  faUmbrella,
} from "@fortawesome/free-solid-svg-icons";

// Colors from https://tailwindcolor.com/
// dark are 800s
// light are 500s
// Tailwind JIT wasn't working when colors were passed as props :(
const colors = {
  violet: {
    light: "rgb(139, 92, 246)",
    dark: "rgb(91, 33, 182)",
  },
  orange: {
    light: "rgb(249, 115, 22)",
    dark: "rgb(154, 52, 18)",
  },
  green: {
    light: "rgb(34, 197, 94)",
    dark: "rgb(22, 101, 52)",
  },
  yellow: {
    light: "rgb(234, 179, 8)",
    dark: "rgb(133, 77, 14)",
  },
};

export default function DecksAaryan() {
  const today = new Date();
  return (
    <div
      className={
        "grid sm:grid-col-1 md:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      }
    >
      <DeckAaryan
        title={"Weather"}
        completedCards={15}
        totalCards={20}
        icon={faUmbrella}
        nextReview={new Date(today.getTime() + 0 * 24 * 60 * 60 * 1000)}
        bgColor={colors.violet.light}
        shadowColor={colors.violet.dark}
      />
      <DeckAaryan
        title={"Travel"}
        completedCards={3}
        totalCards={6}
        icon={faPlane}
        nextReview={new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)}
        bgColor={colors.orange.light}
        shadowColor={colors.orange.dark}
      />
      <DeckAaryan
        title={"Nature"}
        completedCards={0}
        totalCards={10}
        icon={faTree}
        nextReview={new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)}
        bgColor={colors.green.light}
        shadowColor={colors.green.dark}
      />
      <DeckAaryan
        title={"Fruit"}
        completedCards={0}
        totalCards={2}
        icon={faLemon}
        nextReview={new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)}
        bgColor={colors.yellow.light}
        shadowColor={colors.yellow.dark}
      />
    </div>
  );
}
