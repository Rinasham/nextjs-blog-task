import Link from "next/link";
import Layout from "../../components/Layout";
import { Router, useRouter } from "next/router";
import { getAllTaskIds, getTaskDetail } from "../../lib/getTasks";
import useSWR from "swr";
import { useEffect } from "react";

const fetcher = (url) => {
  fetch(url).then((res) => res.json());
};

export default function TaskDetailPage({ taskDetail }) {
  const router = useRouter();

  const apiURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${taskDetail?.id}`;

  const { data: task, mutate } = useSWR(apiURL, fetcher, {
    fallbackData: taskDetail,
  });

  useEffect(() => {
    mutate();
  }, []);

  if (router.isFallback || !taskDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={task.title}>
      <p className="m-4">
        {"ID : "}
        {task.id}
      </p>
      <p className="mb-4 text-xl font-bold">{task.title}</p>
      <p className="mb-12">{task.created_at}</p>
      <p className="px-10">{task.content}</p>
      <Link href="/task-page">
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
          <span>Back to task-page</span>
        </div>
      </Link>
    </Layout>
  );
}

// ここのpathsは名前pathsじゃないとダメ
// paths = { params: String(task.id)} <= getAllTaskIds()
export async function getStaticPaths() {
  const paths = await getAllTaskIds();
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const taskDetail = await getTaskDetail(params.id);
  return {
    props: {
      taskDetail,
    },
    revalidate: 3,
  };
}
