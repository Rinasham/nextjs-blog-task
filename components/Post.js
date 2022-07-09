import Link from "next/link";

export function Post({ blogPost }) {
  return (
    <li>
      <span>{blogPost.created_at}</span>
      {" : "}
      <Link href={`/blogPosts/${blogPost.id}`}>
        <span className="cursor-pointer text-gray-800 border-gray-500 hover:bg-very-peri hover:text-white">
          {blogPost.title}
        </span>
      </Link>
    </li>
  );
}
