import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";


const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useSelector(store=>store.auth);

  const[formData,setFormData] = useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    password:"",
    file:""
  
  })

  const changeHandler =(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setFormData({...formData,[name]:[value]})
  }

  const changeFileHandler = (event) =>{
    setFormData({...formData,file:event.target.files?.[0]});
  }

  const submitHandler = async (event)=>{
    event.preventDefault();
    const data = new FormData();
    data.append("fullname",formData.fullname)
    data.append("email",formData.email)
    data.append("phoneNumber",formData.phoneNumber)
    data.append("password",formData.password)
    data.append("role",formData.role)
    if(formData.file){
      data.append("file",formData.file)
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`,data, {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      })
      if(res.data.success){
        navigate("/login")
        toast.success(res.data.message)
      }
      
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    finally{
      dispatch(setLoading(false))
    }
  
  }
  

  return (
    <div>
      <Navbar />
      <div className="flex fel-col justify-center items-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          action=""
          className="w-1/2 border border-grey-200 p-5 rounded-md my-5"
        >
          <h1 className="font-bold text-2xl mb-5">Sign Up</h1>
          <div > 
            
            <Label>FullName</Label>
            <Input 
             type="text"
             placeholder="Enter Your First name"
             onChange={changeHandler}
             value={formData.fullname}
             name="fullname" />
          </div>

          <div className="mt-3">
            <Label>Email</Label>
            <Input 
             type="email"
             placeholder="Enter Your Email"
             onChange={changeHandler}
             value={formData.email}
             name="email" />
          </div>

          <div className="mt-3">
            <Label>Phone Number</Label>
            <Input 
             type="number"
             placeholder="Enter Your Phone Number"
             onChange={changeHandler}
             value={formData.phoneNumber}
             name="phoneNumber"
              />
          </div>

          <div className="mt-3">
            <Label>Password</Label>
            <Input 
            type="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={changeHandler}
            name="password" 
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup  className="flex my-5">
              <div className="flex items-center space-x-2">
                <input 
                type="radio"
                value="student" 
                name="role"
                checked={formData.role === "student"}
                className="cursor-pointer"
                onChange={changeHandler}/>
                <Label htmlFor="r2">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <input 
                type="radio"
                value="recruiter" 
                name="role"
                checked={formData.role ==="recruiter"}
                onChange={changeHandler}
                className="cursor-pointer"/>
                <Label htmlFor="r1">Recruiter</Label>
              </div>
              
            </RadioGroup>

            <div className="flex justify-center gap-2 items-center ">
              <Label>Profile</Label>
              <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer"/>
            </div>


          </div>

          {
              loading?<Button className="w-full my-5"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button> 
              : <Button type="submit" className="w-full my-5">Register</Button>
          }

          <span className="text-sm">Already have an account? <Link to="/login"><button>Login</button></Link></span>

        </form>
      </div>
    </div>
  );
};

export default Signup;
