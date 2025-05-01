import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="top-0 flex items-center justify-between bg-[#444444]/20 h-12 py-2  px-4">
      <div className="flex items-center justify-start">
        <img src="/ineza.png" alt="inezaLogo" width={80} height={80} />
      </div>
      <div className="flex items-center justify-between gap-5">
        <Link href="/dashboard">
          <Button className="text-slate-300 cursor-pointer font-semibold">
            Dashboard
          </Button>
        </Link>
        <div className="flex items-center justify-between gap-5 ">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
