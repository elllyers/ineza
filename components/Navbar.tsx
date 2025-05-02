import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { cn } from "@/lib/utils";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="top-0 flex items-center justify-between bg-[#444444]/20 h-12 py-2 px-4">
      <Link className="flex items-center justify-start" href={"/"}>
        <img src="/ineza.png" alt="inezaLogo" width={80} height={80} />
      </Link>

      {user?.id ? (
        <div className="flex items-center justify-between gap-5">
          <Link href="/dashboard">
            <Button className="text-slate-300 cursor-pointer font-semibold">
              Dashboard
            </Button>
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <Link href="/signin" className="flex items-center justify-between">
            <Button className={cn(`cursor-pointer font-semibold text-white`)}>
              Login
            </Button>
          </Link>
          <Link href="/signup" className="flex items-center justify-start">
            <Button
              variant={"default"}
              className={cn(
                `text-slate-100 cursor-pointer font-semibold bg-[#0e78f9] hover:bg-[#0e78f9] hover:text-white`
              )}
            >
              Signup
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Navbar;
