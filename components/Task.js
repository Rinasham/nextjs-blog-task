import Link from "next/link";

export default function Task({ task }) {
  return (
    <li>
      <span>{task.created_at}</span>
      {" : "}
      <Link href={`/tasks/${task.id}`}>
        <span className="cursor-pointer text-gray-800 border-gray-500 hover:bg-very-peri hover:text-white">
          {task.title}
        </span>
      </Link>
    </li>
  );
}
