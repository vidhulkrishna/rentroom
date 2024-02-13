import React, { useEffect, useState } from 'react'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import Topbar from '../Adminpanel/Topbar'
import Sidebar from '../Adminpanel/Sidebar'
import './Rent.css'



const Rentdedit = (props) => {
    var[ca,setCa]=useState([])
    useEffect(()=>{
      axios.get("http://localhost:3005/rsubview")
      .then(response=>{
        console.log(response.data)
        setCa(response.data)

      })
      .catch(err=>console.log(err))
    },[])


    var[inputs,setInputs]=useState(props.data)
    const inputHandler=(event)=>
    {

        const { name, value } =event.target
        setInputs((inputs) => ({ ...inputs,[name]: value }))
        console.log(inputs)
    }
    const addHandler=()=>{
        if(props.method==='put'){

            axios.put("http://localhost:3005/redit/"+inputs._id,inputs)
            .then(response=>{
                console.log("post data"+response.data)
                alert("Success")
                window.location.reload(false)
            })
            .catch(err=>console.log(err))
        }
    }
  return (
    <div>
      <Topbar/>
      <Sidebar/>
      <h2>Edit </h2>
    
  
  {/* <FormControl sx={{ m: 1, minWidth: 120 }}> */}
  <TextField label="rentroom name" name="name" variant="filled" value={inputs.name}onChange={inputHandler}>
    {
      ca.map((value,index)=>{
        return(
          <MenuItem key={index}
          value={value.name} >{value.name}</MenuItem>
        )
      })
    }
    </TextField> <br /><br />
    <TextField  label="price" type='text' name="price" variant="filled" value={inputs.price}onChange={inputHandler}/><br /><br />
    <TextField  label="location" type='text' name="location" variant="filled" value={inputs.location}onChange={inputHandler}/><br /><br />
    <Select
   labelId="demo-simple-select-label"
    name='category'value={inputs.category} onChange={inputHandler}>
   <MenuItem value="Plots">Plots</MenuItem>
        <MenuItem value="Rentrooms">Rentrooms</MenuItem>
        <MenuItem value="Buildings">Buildings</MenuItem>
  </Select><br /><br />
{/* </FormControl><br/><br/> */}
  <Button variant="contained" onClick={addHandler} >Update</Button>
  </div>
    
  )
}

export default Rentdedit