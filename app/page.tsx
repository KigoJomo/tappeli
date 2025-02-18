import { signout } from "./auth/actions";

export default function Home() {
  return (
    <>
      <section>
        <h1>tappeli</h1>
        <button onClick={signout}>signout</button>
      </section>
    </>
  );
}
