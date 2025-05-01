import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute bottom-0 left-[-10%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-1/2 right-[-10%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center px-4 py-6 my-16">
          <p className="text-4xl md:text-6xl text-white font-extrabold tracking-wider leading-9">
            Seamless <span className="text-[#8648C8]/64">Services</span>, Just
            for You
          </p>
        </div>

        <div className="px-2 mx-2 my-4 w-[800px]">
          <p className="text-lg md:text-2xl text-[#BFC6F5] font-semibold tracking-tight text-center ">
            Ineza delivers services easily and efficiently. From digital banking
            to <span className="text-white/50">everyday needs</span>, everything
            is just a click away
          </p>
        </div>

        <div className="flex gap-3 mt-8 p-1 items-center justify-center w-[209px] h-[38px]">
          <div>
            <Button variant="default" className="text-white h-9 cursor-pointer">
              Get Started
            </Button>
          </div>
          <div>
            <Button
              variant="outline"
              className="text-white h-9 outline-2 cursor-pointer"
            >
              learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
