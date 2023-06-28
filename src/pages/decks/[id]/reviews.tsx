import { useRouter } from "next/router";

export default function Page(props) {
  const router = useRouter();
  return <h1>ID: {JSON.stringify(router.query)}</h1>;
}
