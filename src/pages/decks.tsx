import { Deck } from "../ts/types.ts"
import deckstyle from "../styles/Deck.module.css";
import Image from 'next/image';
import { useState } from "react";
import Link from "next/link";

function DeckComponent(props: Deck) {
  return (
    <article className={deckstyle["card"]}>
      <header className={deckstyle["card-header"]}>
        <p>Created on: {props.created_on.toLocaleDateString()}, {props.created_on.toLocaleTimeString()}</p>
        <h2>{props.name}</h2>
      </header>

      <Link href={`/decks/${props.id}/`}>Go to Deck Info</Link>
      <Link href={`/decks/${props.id}/reviews`}>Go to reviews</Link>

      <div className={deckstyle["card-author"]}>
        <a className={deckstyle["author-avatar"]} href="#">
          <Image src="/jsl.png" alt='jsl' width={48} height={48}/>
        </a>
        <svg className={deckstyle["half-circle"]} viewBox="0 0 106 57">
          <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
        </svg>

        <div className={deckstyle["author-name"]}>
          <div className={deckstyle["author-name-prefix"]}>SRS Application</div>
        </div>
      </div>
    </article>
  );
}

export default function Decks(props: {decks: Array<{name: string, created_on: string, id: number}>}) {
  // turn it into decks as necessary
  const decks: Array<Deck> = props.decks.map(
    (deck) => new Deck(deck["name"], deck["created_on"], deck["id"])
  );

  return <section className={deckstyle["card-list"]}>
    {decks.map((deck: Deck, key: number) => {
      return <DeckComponent {...deck} key={key}/>
    })}
  </section>;
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
