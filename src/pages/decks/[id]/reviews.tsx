import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'

import { GetReviewData, PathProp, ChildComponentPropsType } from '.';
import { shuffleArray } from '@/ts/helper.ts'
import { Card } from '@/ts/types';
import { useState } from 'react';
import Link from 'next/link';

interface OutputType {
  correct: boolean,
  card_id: number
}

const show_review = (
  {data, deck_id, setData, loading}: ChildComponentPropsType
) => {

  const [reveal, setReveal] = useState(false);
  const [stats, setStats] = useState(null);
  const [reviewFinished, setReviewFinished] = useState(false);
  // then, keep track of which data we've finished looking at
  // by setting the data to be different each time...
    // remove the ones we've finished looking at
  // cases:
  // 1. in sessionStorage with a false
  // then we've answered incorrectly before, persist in everything
  // until we answer correctly
  // 2. not in sessionStorage and we answer correctly
  // remove it from data (setData differently) and then set it in sesionStorage

  // function to remove from data
  const removeFromData = (card_id: number) => {
    const data_left = data.filter((card: Card) => (card.id != card_id));
    if (data_left.length == 0) {
      setReviewFinished(true);
    }
    setData(data_left);
  };

  const generateSessionStoragePath = (card_id: number) => {
    return `/decks/${deck_id}/reviews/${card_id}`
  }

  const addToReviews = (card_id: number) => {
    // append to an array, the card ids we need to send out
    const path = `/decks/${deck_id}/reviews`;
    const items = sessionStorage.getItem(path);

    if (!items) {
      // if it's empty, generate a new one with card_id
      sessionStorage.setItem(path, JSON.stringify([card_id]));
      return;
    }

    // now that it's not empty, we need to append to it
    const json_items: Array<number> = JSON.parse(items);
    json_items.push(card_id);
    sessionStorage.setItem(path, JSON.stringify(json_items));
  }

  const handleCorrectClick = (card_id: number) => {
    setReveal(false);
    addToReviews(card_id);

    const path = generateSessionStoragePath(card_id);

    const previousReview = sessionStorage.getItem(path);
    if (previousReview) {
      const review: OutputType = JSON.parse(previousReview);
      if (review.correct) {
        console.log("shouldn't happen...")
      }
      // don't add to session storage
      removeFromData(card_id);
      return;
    }
  
    // this is the first time it's been seen
    // add to session storage a new item that is the output type
    const review: OutputType = {
      correct: true,
      card_id: card_id
    }

    sessionStorage.setItem(path, JSON.stringify(review));
    // has to be last... should fix this lmao
    removeFromData(card_id);
  };

  const handleIncorrectClick = (card_id: number) => {
    setReveal(false);
    addToReviews(card_id);

    const path = generateSessionStoragePath(card_id);
    // add to session storage a new item that is the output type
    const review: OutputType = {
      correct: false,
      card_id: card_id
    }
    sessionStorage.setItem(path, JSON.stringify(review));

    // and remix the data
    setData(shuffleArray(data));
  };

  const handleReviewFinish = async () => {
    // grab all the current items
    const path = `/decks/${deck_id}/reviews`;
    const cur_items: Array<number> = JSON.parse(sessionStorage.getItem(path));
  
    const unique_items: Array<number> = 
      cur_items.filter((value, index, array) => array.indexOf(value) === index);
  
    const json_items: Array<OutputType> = unique_items.map(
      (item) => 
        JSON.parse(sessionStorage.getItem(generateSessionStoragePath(item)))
    );

    var correct: number = 0;    

    for (const answer of json_items) {
      correct += (answer.correct ? 1 : 0);
    }

    setStats({
      correct,
      incorrect: unique_items.length - correct
    })

    console.log(json_items);

    // send info!
    // change headers here
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Accept', 'application/json');

    // change request options here
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(json_items)
    };

    const response = await fetch("http://localhost/api/v1/decks/1/reviews", requestOptions);
    const { data, errors } = await response.json();
    console.log(data);
    console.log(errors);

    // then also clear the session
    sessionStorage.clear();
  }

  if (loading) return <p>Loading...</p>;
  if (!data) {
    return <div>No data...</div>;
  }

  data = data.filter((value) => (new Date(value.next_review) <= new Date()));

  // base it off of session storage
  if (data.length != 0) {
    // send out the batch of data after they get it correct
    return <div>
      <div>From review: {data[0].from_review}</div>
      <button onClick={() => setReveal(true)}>Reveal</button>
      {reveal &&
        <div>To: {data[0].to_review}</div>
      }
      <button onClick={() => handleIncorrectClick(data[0].id)}>Incorrect</button>
      <button onClick={() => handleCorrectClick(data[0].id)}>Correct</button>
    </div>;
  } else {
    if (reviewFinished) {
      handleReviewFinish();
      setReviewFinished(false);
    }
    // then send out the current session storages + display stats
    return <div>
      No more reviews left, stats: {JSON.stringify(stats)}
      <Link href={`/decks/${deck_id}`}>Go back</Link>
    </div>;
  }
}

export default function Page(
  {path}: InferGetStaticPropsType<typeof getStaticProps>
) {
  return GetReviewData({path, child_component: show_review});
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
