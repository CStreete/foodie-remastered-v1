import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProfileHeader } from "@/components/user/pofile-header";
import { currentUser } from "@/lib/currentUser";
import { userById } from "@/server/_actions/users/get-db-user";

import React from "react";

const Profile = async ({ params }: { params: { slug: string } }) => {
  const currentLoggedInUser = await currentUser();
  if (!currentLoggedInUser) {
    return;
  }

  const isUserProfile = currentLoggedInUser?.id === params.slug;

  const { data: user, error: userError } = await userById(
    isUserProfile ? currentLoggedInUser?.id : params.slug
  );

  if (userError) {
    return; //Todo - add better error handling
  }
  if (!user) {
    return <div>Det finns ingen användare</div>; //Todo - add better error handling
  }

  return (
    <MaxWidthWrapper className=" flex w-full ">
      <div className=" w-full flex  lg:ml-[300px]">
        <div className="  w-full  flex flex-col items-center  ">
          <div className="  pt-16  space-x-5 w-full  lg:w-7/12  h-full flex justify-center lg:block">
            <ProfileHeader isUserProfile={isUserProfile} user={user} />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Profile;
