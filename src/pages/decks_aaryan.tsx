import DeckAaryan from "@/components/DeckAaryan";
import {
  faLemon,
  faPlane,
  faTree,
  faUmbrella,
} from "@fortawesome/free-solid-svg-icons";

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
        nextReview={new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)}
        bgColor="bg-violet-500"
        shadowColor="rgb(91,33,182)"
      />
      {/* <DeckAaryan
        title={"Travel"}
        completedCards={3}
        totalCards={6}
        icon={faPlane}
        nextReview={new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)}
        bgColor="bg-orange-500"
        shadowColor="rgb(154,52,18)"
      />
      <DeckAaryan
        title={"Nature"}
        completedCards={0}
        totalCards={10}
        icon={faTree}
        nextReview={new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)}
        bgColor="bg-green-500"
        shadowColor=""
      />
      <DeckAaryan
        title={"Fruit"}
        completedCards={0}
        totalCards={2}
        icon={faLemon}
        nextReview={new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)}
        bgColor="bg-yellow-500"
        shadowColor="rgb(133,77,14)"
      /> */}
    </div>
  );
}
