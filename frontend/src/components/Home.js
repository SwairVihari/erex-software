import React,{useState} from 'react';
import axios from "axios"
import { Navigate, useNavigate } from 'react-router-dom';
import "./Home.css"
const Home = () => {
    const nevigate = useNavigate();
    const [serial, setSerial] = useState('')
    const [data1, setData1] = useState();
    const [voltage, setvoltage] = useState();
    const [amphour, setamphour] = useState();
    const [mfg, setmfg] = useState();
    const [replacement, setreplacement] = useState();
    const [service, setservice] = useState();


    const stringTodate =  (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear()

        return month + " " + year
        // console.log(date.getMonth(), date.getFullYear())
    }



    const sumbitHandler = async () => {
        const {data} = await axios.get(`/api/v1/item/${serial}`)
         setData1(data);
         setvoltage(data.product.volt);
         setamphour(data.product.amphour);
         setmfg(data.product.manifactureDate);
         setreplacement(data.product.ReplacementWarrantyExpireMonth);
         setservice(data.product.ServiceWarrantyExpireMonth);
    }


    
    const adminHandler = () =>{
       
        nevigate("/admin")
    }

  return (
      <>
  <div className='box-1'>
    
         <input placeholder='Enter Your Serial Number' onChange={(event)=>{ setSerial(event.target.value)}} name='serial'></input>
        <button type="submit" onClick={sumbitHandler}>GETDATA</button>
  </div>

  <div className='box-2'>
        <button id='admin-button' onClick={adminHandler}>ADMIN Pannel Login</button>

        {data1 &&
        
        (<div className='data-box'> 
        {/* <h1>Serial{data1.product.serial}</h1>  */}
        {/* <h1> Voltage{data1.product.volt}</h1>  */}
        {/* <h1>AmpHour{data1.product.amphour}</h1> */}
        
        <div className='row'>
            <p>Volt</p>
            <p>{voltage}   Volts</p>
        </div>

        <div className='row'>
            <p>Amp Hour</p>
            <p>{amphour}   Ah</p>
        </div>

        <div className='row'>
            <p>Mfg. Date</p>
            <p>{stringTodate(mfg)}</p>
        </div>



        <div className='row'>
            <p>Replacement Warranty Expire Month</p>
            <p>{stringTodate(replacement)}</p>
        </div>

        <div className='row'>
            <p>Service Warranty Expire Month</p>
            <p>{stringTodate(service)}</p>
        </div>

         </div>)}
    </div>
  </>);
};

export default Home;
