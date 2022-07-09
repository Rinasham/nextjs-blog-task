import Layout from "../components/Layout";
import Cookie from "universal-cookie";
import { Router, useRouter } from "next/router";
import Link from "next/link";

const cookie = new Cookie();

export default function MainPage() {
  const router = useRouter();

  const logout = () => {
    //cookie.remove("access_token");
    cookie.remove("access_token", { path: "/" });
    router.push("/");
  };

  return (
    <Layout title="Main Page">
      <div className="mb-10">
        <Link href="/blog-page">
          <a className="bg-indigo-500 mr-8  hover:bg-indigo-600 text-white px-4 py-12 rounded">
            Visit Blog by SSG + ISR
          </a>
        </Link>
        <Link href="/task-page">
          <a className="bg-gray-500 ml-8 hover:bg-gray-600 text-white px-4 py-12 rounded">
            Visit Task by ISR + CSR
          </a>
        </Link>
      </div>

      <div className="cursor-pointer mt-12 flex" onClick={logout}>
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
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path>
        </svg>
        <span>Logout</span>
      </div>
    </Layout>
  );
}
