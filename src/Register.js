import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import axios from 'axios';

function Register() {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [currentBatch, setcurrentBatch] = useState("5-6 PM");
    const [payment, setPayment] = useState(false);
    const [validateage,setValidateage] = useState(true);

    function onChangeValue(event) {
      setGender(event.target.value);
      console.log(event.target.value);
    }

    function handleChange(e){
      setcurrentBatch(e.target.value)
    }
    const x=Number(age)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

    const configuration = {
        method : "post",
        url : "https://yoga-backend-4aft.onrender.com/register",
        data : {
            name,
            age,
            gender,
            dateOfJoining,
            currentBatch,
        },
    }
    if(x>= 18 && x<=65){
      // setValidateage(true);
    axios(configuration)
    .then((result)=>{
        console.log(result)
        alert("User Registered Successfully");
        setName("");
        setAge("");
        setGender("");
        setDateOfJoining("");
        setcurrentBatch("");
        setPayment(false);
    })
    .catch((error)=>{
        error= new Error("")
    })
    }
  
  else{
    alert("cannot submit the form as age entered is not valid")
    setValidateage(false)
  }
}

    const handlePayment = (e) => {
        if(x>=18 && x<=65){
          setPayment(true)
           
        } 
        else{
          alert("cannot accept payment as age is not valid")
        } 
        
    }

  return (
    <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
    <Form style={{width:"40%" , border:'1px solid', padding:'10px'}} onSubmit={(e)=>handleSubmit(e)}>

        <h1>Yoga Registration Form</h1>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type = "name" placeholder = "Enter your Name" name = "name" value = {name} onChange = {(e) => setName(e.target.value)}/>
      </Form.Group>
 
      <Form.Group className="mb-3" controlId="formBasicAge">
        <Form.Label>Age</Form.Label>
        <Form.Control type="text" placeholder="Enter Age" name = "age" value = {age} onChange = {(e) => setAge(e.target.value)}/>
        {validateage?(<p className = "text-success">kindly enter age between 18 to 65</p>) : (<p className = "text-danger">Age entered is not valid</p>)}
      </Form.Group>

      <Form.Group>
      <Form.Label>Select Gender :</Form.Label>
      <div onChange={onChangeValue} style={{display:'flex' , justifyContent:'space-around' , margin:'20px 0px'}}>
      <input type="radio" value="Male" name="gender" checked={gender === "Male"} /> Male
      <input type="radio" value="Female" name="gender" checked={gender === "Female"}/> Female
      <input type="radio" value="Other" name="gender" checked={gender === "Other"} /> Other
      </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasidDate">
        <Form.Label>Date Of Joining</Form.Label>
        <Form.Control type="text" placeholder="Start Date" name = "dateOfJoining" value = {dateOfJoining} onChange = {(e) => setDateOfJoining(e.target.value)}/>
      </Form.Group>

      <Form.Group>
      <Form.Label style={{paddingRight:'10px'}}>Select Batch Timings</Form.Label>
      <select value={currentBatch} onChange={handleChange} style={{margin:'25px 0px'}}>
      <option value="6-7 AM">6-7 AM</option>
      <option value="7-8 AM">7-8 AM</option>
      <option value="8-9 AM">8-9 AM</option>
      <option value="5-6 PM">5-6 PM</option>
      </select>
      </Form.Group>

      <Button onClick={(e)=>handlePayment(e)} style={{width:'100%'}}>Pay Rs 500</Button>
      {payment?(<p className = "text-success">Payment Successful</p>) : (<p className = "text-danger">Kindly pay Rs 500 for classes</p>)}
      <Button onClick={(e)=>handleSubmit(e)} variant="primary" style={{width:'100%'}} type="submit" >
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default Register;