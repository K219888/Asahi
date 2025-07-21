import Nav from "./components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen items-center justify-center bg-[#fdfaf6] p-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Asahi
        </h1>
      </main>
    </>
  );
}
