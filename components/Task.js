import Link from "next/link";
import { useContext } from "react";
import Cookie from "universal-cookie";
import { StateContext } from "../conetxt/StateContext";

// 更新、削除にはJWTを使って認証をしている
const cookie = new Cookie();

export default function Task({ task, mutate, tasks }) {
  const { setSelectedTask } = useContext(StateContext);

  // 削除リクエスト
  // 削除後に親コンポーネントのmutate関数でuseSWRのtasksからも削除したいのでpropsで受け取っている
  const deleteTaskReq = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 401) {
          alert("JWT token is invalid.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // mutate(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`);
    mutate(tasks.filter((c) => c.id !== task.id));
    console.log("mutate実行");
  };

  return (
    <li>
      <span>{task.created_at}</span>
      {" : "}
      <Link href={`/tasks/${task.id}`}>
        <span className="cursor-pointer text-gray-800 border-gray-500 hover:bg-very-peri hover:text-white">
          {task.title}
        </span>
      </Link>
      <div className="float-right ml-20">
        <svg
          onClick={() => setSelectedTask(task)}
          className="w-6 h-6 float-left cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          ></path>
        </svg>
        <svg
          onClick={deleteTaskReq}
          className="w-6 h-6 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          ></path>
        </svg>
      </div>
    </li>
  );
}
