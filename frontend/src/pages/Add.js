import {  useState } from "react"
import  axios  from "axios";
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";

export const AddNurse = () => {
    const navigate = useNavigate();

    const clearData = {

        firstName : "",
        lastName : "",
        ward : "1",
        email: ""
    }

    let [formData, setFormData] = useState(clearData)

    const submitForm = async () => {
        const nurseInfo = {
            firstName : formData.firstName,
            lastName : formData.lastName,
            ward : formData.ward,
            email: formData.email
        }
        await axios.post("/api/addNurse", nurseInfo)
        

        navigate("/");
    }
    
   


    return (
       <div className="container">
        <h3>Add nurse data</h3>
        
        <div className="form-group row">
            <label htmlFor="firstName"  className="col-sm-2 col-form-label">First Name : </label>
            <div className="col-sm-10">
                <input type="text" className="form-control" id="firstName" placeholder="First Name"
                value = {formData.firstName}
                onChange={(event)=>{setFormData({...formData, firstName : event.target.value})}}
                />
            </div>
        </div>
        
        <div className="form-group row">
            <label htmlFor="lastName"  className="col-sm-2 col-form-label">First Name : </label>
            <div className="col-sm-10">
                <input type="text" className="form-control" id="lastName" placeholder="Last Name"
                value = {formData.lastName}
                onChange={(event)=>{setFormData({...formData, lastName : event.target.value})}}
                />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="ward"  className="col-sm-2 col-form-label">Ward : </label>
            <div className="col-sm-10">
            <select className="form-control" id="ward" value = {formData.ward} onChange={(event)=>{setFormData({...formData, ward : event.target.value})}}>
                <option value="1">Red</option>
                <option value="2">Green</option>
                <option value="3">Blue</option>
                <option value="4">Yellow</option>

            </select>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="email"  className="col-sm-2 col-form-label">Email : </label>
            <div className="col-sm-10">
                <input type="text" className="form-control" id="email" placeholder="example@mail.com"
                value = {formData.email}
                onChange={(event)=>{setFormData({...formData, email : event.target.value})}}
                />
            </div>
        </div>

        <button onClick={submitForm} type="submit" className="btn btn-primary">Add</button>
        <Link className="btn btn-primary" to={"/"} >Cancel</Link>
       </div>

       
    )
}