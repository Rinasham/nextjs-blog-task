import Head from "next/head";

export default function Layout({ children, title = "By Rina" }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-very-peri font-mono">
      <Head>{title}</Head>
      <main className="flex flex-1 justify-center items-center w-screen flex-col">
        {children}
      </main>
      <footer className="flex w-full h-7 justify-center items-center text-gray-500 text-sm">
        By RINA
      </footer>
    </div>
  );
}
