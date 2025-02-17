import Link from 'next/link';
import { login } from '../actions';

export default function LoginPage() {
  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen">
        <form className="flex flex-col gap-4">
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          <button formAction={login}>Log In</button>
          <Link href="/auth/signup">Don&apos;t have an account? Sign up</Link>
        </form>
      </section>
    </>
  );
}
