import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './Admin.css'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Admin = () => {
    const [serial, setSerial] = useState()
    const [voltage, setVoltage] = useState()
    const [ampHour, setAmpHour] = useState()
    const [mfg, setMfg] = useState()
    const [replacement, setReplacement] = useState();
    const [service, setService] = useState()
    const [updateSerial, setUpdateSerial] = useState();
    const [updateVoltage, setUpdateVoltage] = useState();
    const [updateampHour, setUpdateAmpHour] = useState()
    const [updatemfg, setUpdateMfg] = useState()
    const [updatereplacement, setUpdateReplacement] = useState();
    const [updateservice, setUpdateService] = useState()

    const nevigate = useNavigate();
    const token = getCookie('token');
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
      function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

      const stringTodate =  (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const mm = date.getMonth()
        const year = date.getFullYear()
        const day = date.getDate()
        return `${year}-${pad(mm+1)}-${pad(day)}`
        // console.log(date.getMonth(), date.getFullYear())
    }




    const createwarrantycardhandler = async() =>{

        try{

        const cardData = {
            serial:serial,
            volt:voltage,
            amphour:ampHour,
            manifactureDate:mfg,
            ReplacementWarrantyExpireMonth:replacement,
            ServiceWarrantyExpireMonth:service
        }


        
        const response = await axios.post("/api/v1/item/new", cardData);
        console.log(response);
        alert("Warranty Card Created Successfully");
    }
    catch(error){
        alert("Error!! Please Try Again")
    }
        
    }

    const updateSubmitHandler = async() =>{

        try{
        const {data} = await axios.get(`/api/v1/item/${updateSerial}`);
        setUpdateVoltage(data.product.volt);
        setUpdateAmpHour(data.product.amphour);
        setUpdateMfg(data.product.manifactureDate);
        setUpdateReplacement(data.product.ReplacementWarrantyExpireMonth);
        setUpdateService(data.product.ServiceWarrantyExpireMonth);
        
   
        }
        catch(error){
            alert("Please check your serial Number again")
        }



    }

    const updateValueSubmitHandler= async() => {

      try{
        const upadatedData = {
            volt:updateVoltage,
            amphour:updateampHour,
            manifactureDate:updatemfg,
            ReplacementWarrantyExpireMonth:updatereplacement,
            ServiceWarrantyExpireMonth:updateservice




        }

        const upd = await axios.put(`/api/v1/item/${updateSerial}`,upadatedData)
        alert("Success!!")
        console.log(upd);
      }
      catch(err){
        alert("Error! in Updating Document.")
      }
    }

    

    const LogoutHandler =  async() => {
        const tt = await axios.get("/api/v1/logout");
        console.log(tt)
    }

    useEffect(() => {

      if(!token){
          alert("You are not logged in please Login");
        nevigate('/login')
      }

    }, [token]);

  return(
  <>
  <Navbar/>
  {token && 
   <div>
    <div className='create-warranty-card'>

        <h3>Create Warranty Card</h3>
        <div>
        <label>Serial Number</label>
        <input name='serial' onChange={(event)=>{setSerial(event.target.value)}} placeholder='Enter Serial Number'></input>
        </div>

       

        <div>
        <label>Voltage</label>
        <input name='volt' onChange={(event)=>{setVoltage(event.target.value)}} placeholder='Enter Voltage'></input>
    
        </div>

        <div>
        <label>Amp Hour</label>
        <input name='amphour' onChange={(event)=>{setAmpHour(event.target.value)}} placeholder='Enter Emphour'></input>
     
        </div>

        <div>
        <label>Mfg. Month</label>
        <input type='date' onChange={(event)=>{setMfg(event.target.value)}} name='manifactureDate' placeholder='Enter Manifacture Date'></input>
      
        </div>

        <div>
        <label>Replacement Warranty Expire Month</label>
        <input type='date' onChange={(event)=>{setReplacement(event.target.value)}} name='ReplacementWarrantyExpireMonth' placeholder='Enter Replacement Warranty Expire Date'></input>
       
        </div>

        <div>
        <label>ServiceWarrantyExpireMonth</label>
        <input type='date' onChange={(event)=>{setService(event.target.value)}} name='ServiceWarrantyExpireMonth' ></input>
        </div>

        <button onClick={createwarrantycardhandler} >Submit</button>

    </div>


    <div className='update-card'>
        <h3>Update Warranty Card</h3>

        <input placeholder='Enter Serial Number'  onChange={(event)=>{setUpdateSerial(event.target.value)}}></input>
        <br/>
        <button onClick={updateSubmitHandler}>Submit</button>
        <div>
            <label>Voltage</label>
        <input defaultValue={updateVoltage}  onChange={(event)=>{setUpdateVoltage(event.target.value)}} placeholder='Voltage'></input>
        </div>

        <div>
        <label>Amp Hour</label>
        <input defaultValue={updateampHour}  onChange={(event)=>{setUpdateAmpHour(event.target.value)}} placeholder='Amp Hour'></input>
        </div>

        <div>
        <label>Mfg. Date</label>
        <input type='date' value={stringTodate(updatemfg)}  onChange={(event)=>{setUpdateMfg(event.target.value)}} placeholder='mfg'></input>
        </div>

        <div>
        <label>Replacement Warranty Expire Month</label>
        <input type='date' value={ stringTodate(updatereplacement)}  onChange={(event)=>{setUpdateReplacement(event.target.value)}} placeholder='Repleacement'></input>
        </div>

        <div>
        <label>Service Warranty Expire Month</label>
        <input type='date' value={stringTodate(updateservice)}  onChange={(event)=>{setUpdateService(event.target.value)}} placeholder='Service'></input>
        </div>
        <button onClick={updateValueSubmitHandler}>Submit Change</button>

    </div>

    <div id='logout-button-div'>
           <button id='logout-button' onClick={LogoutHandler}>LOGOUT</button>
    </div>

  </div>
}
<Footer/>
  </>);
};

export default Admin;
