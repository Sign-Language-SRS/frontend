import { Card } from '@/ts/types';
import deckstyle from "@/styles/Deck.module.css";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'
 
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { shuffleArray } from '@/ts/helper';

export type PathProp = string;
export interface ChildComponentPropsType {
  data: Array<Card> | null;
  deck_id: string | string[];
  setData: React.Dispatch<React.SetStateAction<Card[]>>;
  loading: boolean;
}

export function GetReviewData(
  {path, child_component}: {
    path: string,
    child_component: (child_props: ChildComponentPropsType) => JSX.Element
  }
) {
  const router = useRouter();
  const query = router.query;

  // use useEffect to just grab the data since it's user specific and changing often
  const [data, setData] = useState<Array<Card>|null>(null);
  const [isLoading, setLoading] = useState(false);
 
  useEffect(() => {
    setLoading(true);

    const cleanup_fn = () => {};

    if (query.id) {
      const localStoragePath = "decks/" + query.id;

      const deck_data = sessionStorage.getItem(localStoragePath);
      if (sessionStorage.getItem(localStoragePath)) {
        // todo: fix the caching issue
        console.log("not fetching...");
        // set the data to a shuffled version of the deck
        // setData(shuffleArray(JSON.parse(deck_data)));
        // setLoading(false);
        // return cleanup_fn;
      }

      console.log("fetching");

      fetch(path + "/decks/" + query.id + "/cards")
        .then((res) => res.json())
        .then((json) => {
          // we should sort the data and rearrange it how we need
          const card_data = json.map((card) => new Card(card));
          shuffleArray(card_data);
          setData(card_data);
          setLoading(false);
          sessionStorage.setItem(localStoragePath, JSON.stringify(card_data))
        });
    }
    return cleanup_fn;
  }, [path, query]);
 
 
  // TODO: worry about caching and local storage

  return child_component({data, deck_id: query.id, setData, loading: isLoading});
}

const list_next_reviews = ({data, deck_id, setData, loading}: ChildComponentPropsType) => {
  // returns a list of dates for the next reviews
  // and a number of dates that's to be reviewed
  const to_review_cards = data?.filter((card: Card) => (card.next_review > new Date()));
  const cards_to_review = data?.length - to_review_cards?.length;

  const future_reviews = (future_cards: (Array<Card>)) => {
    console.log(future_cards);
    console.log(data);
    if (future_cards.length == 0) {
      return <div>
        No reviews...
      </div>;
    }
    // there are cards to review
    return <div>
      Future Reviews! {
        to_review_cards.map((card: Card, key: number) => {
          return <div key={key}>
            {card.next_review.toLocaleDateString()} at {card.next_review.toLocaleTimeString()}
          </div>;
        })
      }
    </div>;
  }

  if (loading) return <p>Loading...</p>;
  if (!data) {
    return <div>No data...</div>;
  }

  return <article className={deckstyle["card"]}>
    <div>
      {future_reviews(to_review_cards)}
      <div>Current reviews to do: {cards_to_review}</div>
    </div>
    <Link href={`/decks/${deck_id}/reviews`}>Review Deck</Link>
  </article>;
};
 
export default function Page(
  {path}: InferGetStaticPropsType<typeof getStaticProps>
) {
  return GetReviewData({path, child_component: list_next_reviews});
}
 
export const getStaticProps: GetStaticProps<{
  path: PathProp
}> = () => {
  return { props: { path: process.env.API_PATH } };
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true, // false or "blocking"
  }
}
