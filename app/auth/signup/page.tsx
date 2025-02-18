import Link from 'next/link';
import { signup } from '../actions';

export default function SignUpPage() {
  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen">
        <form className="flex flex-col gap-4">
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          <button formAction={signup}>Sign Up</button>
          <Link href="/auth/login">Already have an account? Log in</Link>
        </form>
      </section>
    </>
  );
}
