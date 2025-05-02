import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-full py-[25px] items-center justify-center">
      <SignUp />
    </div>
  );
}
