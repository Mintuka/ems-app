import { SignInButton } from "@clerk/nextjs";

type Props = {};
function SignInBox({}: Props) {
  return (
    <SignInButton>
      <button className="btn  btn-secondary w-full text-primary hover:bg-secondary/80">
        Login
      </button>
    </SignInButton>
  );
}
export default SignInBox;
