import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById"

const CompanySetUp = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const{singleCompany}= useSelector(store=>store.company);
  const[loading,setLoading] = useState(false)
 
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const changeFileHandler = (event) => {
    const file = event?.target?.files?.[0]
    setInput({...input,file});
  };

  const submitHandler = async(event)=>{
    event.preventDefault();
    const data = new FormData();
    data.append("name",input.name);
    data.append("description",input.description);
    data.append("website",input.website);
    data.append("location",input.location);
    if(input.file){
        data.append("file",input.file);
    }

    try {
        setLoading(true)
        const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,data,{
          headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true

        })

        if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/companies");
        }
        
    } 
    catch (error) {
        console.log(error)
        toast.error(error.response.data.message);
    }
    finally{
        setLoading(false);
    }


  }
  useEffect(()=>{
    setInput({
    name: singleCompany.name || "",
    description: singleCompany.description || "",
    website: singleCompany.website || "",
    location: singleCompany.location || "",
    file: singleCompany.file ||  null,
    })
  },[singleCompany])
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form action="" onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
            onClick={()=>{
                navigate("/admin/companies");
            }}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeHandler}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeHandler}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeHandler}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeHandler}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Label>Logo</Label>
            <Input type="file" accept="image/*" onChange={changeFileHandler} />
          </div>
          {
            loading ? <Button type="submit" className="w-full mt-8">Please Wait</Button>
            : <Button type="submit" className="w-full mt-8">Update</Button>
            
          }
          
        </form>
      </div>
    </div>
  );
};

export default CompanySetUp;
