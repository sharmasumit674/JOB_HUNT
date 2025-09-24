import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true));

    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] border border-gray-200 p-6 rounded-md my-8 shadow-sm"
        >
          <h1 className="font-bold text-2xl mb-5 text-center">Login</h1>

          <div className="mt-3">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={formData.email}
              name="email"
              onChange={changeHandler}
            />
          </div>

          <div className="mt-3">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter Your Password"
              value={formData.password}
              name="password"
              onChange={changeHandler}
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex my-5">
              <div className="flex items-center space-x-2 mr-4">
                <input
                  type="radio"
                  value="student"
                  name="role"
                  checked={formData.role === "student"}
                  onChange={changeHandler}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="recruiter"
                  name="role"
                  checked={formData.role === "recruiter"}
                  onChange={changeHandler}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full my-5">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-5">
              Login
            </Button>
          )}

          <span className="text-sm flex justify-center">
            Don't have an account?&nbsp;
            <Link to="/signup" className="text-blue-600 font-medium">
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
