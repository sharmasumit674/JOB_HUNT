import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {  Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobs from "./AppliedJobs";
import UpdatedProfile from "./UpdatedProfile";
import { useSelector } from "react-redux";
import useGetAllAppliedJobs from "../hooks/useGetAllAppliedJobs"

const Profile = () => {
  useGetAllAppliedJobs()
  const skills=["Html","css","js","java"];
  const[open,setOpen] = useState(false);
  const isResume = true;
  const {user} = useSelector(store=>store.auth)
  return (
    <div>
      <Navbar />

      <div className="mx-auto max-w-7xl border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex items-center gap-5 justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.profile.profilePhoto}
                height="100"
                width="80"
                className="rounded"
              />
            </Avatar>
            
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>

          <Button onClick={()=>setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex gap-5 items-center my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>

          <div className="flex gap-5 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div>
          <h1 className="font-bold">Skills</h1>
          
            <div className="gap-3 flex items-center my-2">
            {user?.profile?.skills && user.profile.skills.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge key={index} className="gap-5">
                  {item}
                </Badge>
              ))
            ) : (
              <h2>No Skills Found</h2>
            )}
          </div>

        </div>

        <div className="grid w-full max-w-sm items-center my-3 gap-1.5">
          <Label className="font-bold text-md">Resume</Label>
          {
            isResume?<a target="blank" href={user?.profile?.resume} className="w-full text-blue-500 cursor-pointer hover:underline"> sumit sharma</a>:<span>NA</span>
          }
        </div>

       


      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-2xl my-2">
          <h1 className="font-bold text-md">Applied Jobs</h1>
          <AppliedJobs/>
      </div>

      <UpdatedProfile open={open} setOpen={setOpen}/>


    </div>
  );
};

export default Profile;
