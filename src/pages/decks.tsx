import Deck, { DeckProps } from '@/components/Deck'
import { faLemon } from "@fortawesome/free-solid-svg-icons";

export default function Decks(props: {decks: Array<{name: string, created_on: string, id: number}>}) {
  // turn it into decks as necessary
  const decks: DeckProps[] = props.decks.map(
    (deck) => ({
      title: deck["name"],
      completedCards: 0,
      totalCards: 10,
      icon: faLemon,
      nextReview: new Date(),
      bgColor:"rgb(139, 92, 246)",
      shadowColor:"rgb(91, 33, 182)"
    })
  );

  return (
    <div
      className={
        "grid sm:grid-col-1 md:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      }
    >
      {decks.map((deck: DeckProps, key: number) => {
        return <Deck {...deck} key={key}/>
      })}
    </div>
  )
}

export async function getStaticProps() {
  // let's grab the necessary json we need
  const data = await fetch(process.env.API_PATH + "/decks");
  const json = await data.json();

  return {
    props: {
      decks: json
    },
    revalidate: 30
  };
}
