import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'
 
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type PathProp = string;

export default function Page({path}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const query = router.query;

  // use useEffect to just grab the data since it's user specific and changing often
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    if (query.id) {
      // only fetch if it loaded the query id
      fetch(path + "/decks/" + query.id + "/cards")
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        });
    }
  }, [path, query]);
 
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data for deck</p>;
 
  // TODO: worry about caching and local storage
 
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
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
