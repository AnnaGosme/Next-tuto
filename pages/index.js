import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home({ posts }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCount((n) => n + 1), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Mon blog</title>
      </Head>
      <h1>Count: {count}</h1>
      <ul>
        {posts.map((post) => (
          <li>
            <Link href={`/blog/${post.id}`}>
              <a>
                <h3>
                  {post.id} - {post.title}
                </h3>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

// export async function getStaticProps() {
//   const posts = await fetch(
//     "https://jsonplaceholder.typicode.com/posts?_limit=4"
//   ).then((res) => res.json());

//   return {
//     props: {
//       posts,
//     },
//   };
// }
export async function getServerSideProps() {
  const posts = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=4"
  ).then((res) => res.json());

  return {
    props: {
      posts,
    },
  };
}
