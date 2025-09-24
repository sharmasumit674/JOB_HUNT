import React, { useState } from "react";
import { Popover } from "../ui/popover.jsx";
import { Avatar } from "../ui/avatar.jsx";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { AvatarImage } from "@radix-ui/react-avatar";
import { User2, LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/authSlice.js";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.res?.data?.data?.message);
    }
  };

  return (
    <div className="bg-white shadow">
      {/* desktop */}
      <div className="flex justify-between items-center mx-auto max-w-7xl h-16 px-4 md:px-8">
        <div className="text-2xl font-bold">
          <Link to="/">
            <h1>
              Hire <span className="text-[#F83002]">Haven</span>
            </h1>
          </Link>
        </div>

        {/* desktop menu */}
        <div className="hidden md:flex gap-12 items-center">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <Link to="/admin/companies">
                  <li className="cursor-pointer">Companies</li>
                </Link>
                <Link to="/admin/jobs">
                  <li className="cursor-pointer">Jobs</li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <li className="cursor-pointer">Home</li>
                </Link>
                <Link to="/jobs">
                  <li className="cursor-pointer">Jobs</li>
                </Link>
                <Link to="/browse">
                  <li className="cursor-pointer">Browser</li>
                </Link>
              </>
            )}
          </ul>

          {/* buttons */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2]">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile.profilePhoto} alt="profile" className="w-full" />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 border shadow-md p-4">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={user?.profile.profilePhoto} alt="profile" className="w-full" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>

                <div>
                  {user && user.role === "student" && (
                    <div className="mt-4 flex gap-3">
                      <User2 />
                      <Link to="/profile">
                        <button>View Profile</button>
                      </Link>
                    </div>
                  )}

                  <div className="mt-4 flex gap-3">
                    <LogOut />
                    <button onClick={logoutHandler}>Logout</button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* mobile menu icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 space-y-3">
          <ul className="space-y-3 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <Link to="/admin/companies">
                  <li className="cursor-pointer" onClick={() => setIsOpen(false)}>
                    Companies
                  </li>
                </Link>
                <Link to="/admin/jobs">
                  <li className="cursor-pointer" onClick={() => setIsOpen(false)}>
                    Jobs
                  </li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <li className="cursor-pointer" onClick={() => setIsOpen(false)}>
                    Home
                  </li>
                </Link>
                <Link to="/jobs">
                  <li className="cursor-pointer" onClick={() => setIsOpen(false)}>
                    Jobs
                  </li>
                </Link>
                <Link to="/browse">
                  <li className="cursor-pointer" onClick={() => setIsOpen(false)}>
                    Browser
                  </li>
                </Link>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex flex-col gap-3">
              <Link to="/login">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2]" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <Link to="/profile">
                <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                  Profile
                </Button>
              </Link>
              <Button className="w-full" variant="destructive" onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
