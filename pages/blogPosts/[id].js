import Link from "next/link";
import Layout from "../../components/Layout";
import { Router, useRouter } from "next/router";
import { getAllPostIds, getPostDetail } from "../../lib/getPosts";

export default function BlogDetailPage({ blogDetail }) {
  const router = useRouter();

  if (router.isFallback || !blogDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={blogDetail.title}>
      <p className="m-4">
        {"ID : "}
        {blogDetail.id}
      </p>
      <p className="mb-4 text-xl font-bold">{blogDetail.title}</p>
      <p className="mb-12">{blogDetail.created_at}</p>
      <p className="px-10">{blogDetail.content}</p>
      <Link href="/blog-page">
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
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  );
}

// ここのpathsは名前pathsじゃないとダメ
export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const blogDetail = await getPostDetail(params.id);
  return {
    props: {
      blogDetail,
    },
    revalidate: 3,
  };
}
