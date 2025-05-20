import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-950/80 backdrop-blur-sm border-b border-gray-800 h-12 py-2 px-4">
      <Link className="flex items-center justify-start" href={"/"}>
        <div className="flex items-center gap-1.5">
          {" "}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <Image
              src="/logo-service.svg"
              alt="Ineza Services Logo"
              width={32}
              height={32}
              className="transform transition-transform duration-300 hover:scale-110"
              priority
            />
          </div>
          <span className="text-lg font-bold text-white/90">INEZA</span>
        </div>
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
