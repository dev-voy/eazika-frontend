import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to <span className="text-blue-500">Eazika</span>
      </h1>
      <p className="text-lg mb-8">
        Experience the future of shopping with Eazika. Discover, order, and own
        your favorite products in just 10 minutes. No waiting, just Eazika.
      </p>
      <Image
        src="/web-app-manifest-512x512.png"
        alt="Eazika Logo"
        width={200}
        height={200}
        className="rounded-full mb-8"
      />
    </main>
  );
}
