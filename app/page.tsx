import Link from "next/link";

export default function Home() {
  return (
    <>
      <section>
        <h1>tappeli</h1>
        <Link href="/products">products</Link>
      </section>
    </>
  );
}
