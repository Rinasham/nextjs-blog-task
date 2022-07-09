import Link from "next/link";
import Layout from "../components/Layout";
import { Post } from "../components/Post";
import { getAllPostsData } from "../lib/getPosts";

export default function BlogPage({ sortedPosts }) {
  return (
    <Layout title="Blog Page">
      <ul>
        {sortedPosts &&
          sortedPosts.map((blogPost) => (
            <Post key={blogPost.id} blogPost={blogPost} />
          ))}
      </ul>
      <Link href="/main-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            ></path>
          </svg>
          Back To Main
        </div>
      </Link>
    </Layout>
  );
}

export async function getStaticProps() {
  const sortedPosts = await getAllPostsData();

  return {
    props: { sortedPosts },
  };
}
