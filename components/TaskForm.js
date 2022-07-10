import { useContext } from "react";
import { StateContext } from "../conetxt/StateContext";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export default function TaskForm({ taskCreated }) {
  const { selectedTask, setSelectedTask } = useContext(StateContext);

  // task作成用
  const createTask = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`, {
      method: "POST",
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert("Invalid JWT Token");
      }
    });
    setSelectedTask({ id: 0, title: "" });
    taskCreated(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`);
  };

  // task 更新用
  const updateTask = async (e) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${selectedTask.id}/`,
      {
        method: "PUT",
        body: JSON.stringify({ title: selectedTask.title }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 401) {
          alert("Invalid JWT Token");
        }
      })
      .catch((err) => console.log(err));
    setSelectedTask({ id: 0, title: "" });
    taskCreated();
  };
  return (
    <div>
      <form onSubmit={selectedTask.id !== 0 ? updateTask : createTask}>
        <input
          type="text"
          className="text-gray-800 mb-8 px-2 py-1"
          value={selectedTask.title}
          onChange={(e) => {
            setSelectedTask({ ...selectedTask, title: e.target.value });
          }}
        />
        <button className="bg-gray-500 ml-2 text-white hover:bg-gray-700 text-sm px-2 py-1 rounded uppercase">
          {selectedTask.id !== 0 ? "UPDATE" : "CREATE"}
        </button>
      </form>
    </div>
  );
}
