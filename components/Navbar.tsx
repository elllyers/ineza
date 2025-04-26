import { Button } from "./ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-[#444444]/20">
      <div className="py-2 px-2 flex items-center justify-end">
        <img src="/ineza.png" alt="inezaLogo" width={80} height={80} />
      </div>
      <div className="flex items-center justify-between gap-5 px-4">
        <div>
          <Button className="text-slate-300">Dashboard</Button>
        </div>
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
