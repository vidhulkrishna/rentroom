import axios from "axios";
import React, { useState } from "react";
import './Rent.css'
import  { Home, MenuItem,Button, FormControl, InputLabel, Select, TextField  } from '@mui/material';
import Topbar from "../Adminpanel/Topbar";
import Sidebar from "../Adminpanel/Sidebar";

const Rent = () => {
    var[inputs,setInputs]=useState({
      "rname":'',
      "rprice":'',
      "rlocation":'',
      "rcategory":'Rentrooms'
      
    })
    var[selectedimage,setSelectedimage]=useState(null);
    
  
    const inpuHandler =(event) =>{
      const{name,value}=event.target
      setInputs((inputs)=>({...inputs,[name]:value}))
      console.log(inputs)
    }
  
    const savedata=()=>{
      const formdata=new FormData();
      formdata.append('rname',inputs.rname);
      formdata.append('rprice',inputs.rprice);
      formdata.append('rlocation',inputs.rlocation);
      formdata.append('rcategory',inputs.rcategory);
      formdata.append('rimage3',selectedimage)
      fetch('http://localhost:3005/rnew',
      {
          method:'post',
          body:formdata,
      })
      .then((response)=>response.json())
      .then((data)=>{
          alert("record saved")
      })
      .catch((err)=>{
          console.log("error")
      })
  }
  
    //   const addHandler=() =>{
    //     console.log("Clicked")
  
    //     console.log(inputs)
    //     axios.post("http://localhost:3005/new",inputs)
    //     .then((response)=>{
    //       alert("Record Saved")
    //     })
    //     .catch(err=>console.log(err))
        
    // }
  
    const handleimage =(event)=>{
      const file = event.target.files[0];
      setSelectedimage(file)
      inputs.image3=file;
      }
  
      
  
  
    return (
  
      <div>
        <Topbar/>
        <Sidebar/>
      <div className="addrentroom">
      <h2>RentRoom Details</h2>  
        <TextField label="Rentroom name" type="text" name="rname"value={inputs.rname} onChange={(event) => inpuHandler (event)}/> <br /><br />
        <TextField label="Price" type="text" name="rprice" value={inputs.rprice} onChange={(event) => inpuHandler (event)}/><br /><br />
        <TextField label="Location" type="text" name="rlocation" value={inputs.rlocation} onChange={(event) => inpuHandler (event)}/> <br /><br />
  
        <Select label="Category" name="rcategory" value={inputs.rcategory}onChange={inpuHandler}>
          <MenuItem value="Plots">Plots</MenuItem>
              <MenuItem value="Rentrooms">Rentrooms</MenuItem>
              <MenuItem value="Buildings">Buildngs</MenuItem>
        </Select><br /><br />
        <label>Upload file</label>
          <input type="file" onChange={handleimage}></input>
          <br /><br />
        
        <button className="addproduct-btn" onClick={()=>{savedata()}}>ADD</button>
      </div>
      </div>
    )
  }
  
  export default Rent


