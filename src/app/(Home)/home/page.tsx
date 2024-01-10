import { Button } from "@/components/ui/button";
import React from "react";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ForYouRecipes } from "@/components/recipe/for-you-recipes";
import RecommendedUser from "@/components/recipe/reccomended-users";

const Home = async () => {
  //TODO - add optimistic ui update

  return (
    <MaxWidthWrapper className=" flex w-full  ">
      <div className=" w-full flex  ">
        <div className=" lg:w-3/4 w-full  flex flex-col items-center lg:ml-[300px]">
          <div className="  pt-16  space-x-5  w-full lg:w-[450px] block">
            <div className=" w-full sm:w-[450px] md:w-[450px]">
              <Button
                size={"sm"}
                className=" w-24 rounded-lg bg-darkPink font-bold hover:bg-buttonPink"
              >
                För Dig
              </Button>
              <Button
                size={"sm"}
                variant={"ghost"}
                className=" w-24 rounded-lg   font-bold hover:bg-buttonPink"
              >
                Följer
              </Button>
            </div>
            <ForYouRecipes />
          </div>

          {/* Content Here */}
        </div>
        <div className=" lg:w-1/4 hidden lg:flex lg:flex-col pt-16  lg:items-start   ">
          <div className=" flex space-x-5 font-bold text-lg">
            <span>{}</span>
          </div>
          <div className=" flex flex-col pt-5">
            <span className=" text-muted-foreground">
              Recommenderade konton
            </span>
            <RecommendedUser />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Home;
