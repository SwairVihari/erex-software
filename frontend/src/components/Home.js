import React,{useState} from 'react';
import axios from "axios"
import { Navigate, useNavigate } from 'react-router-dom';
import "./Home.css"
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Navbar from './Navbar';
import Footer from './Footer';
import img from "./img/LOGO-removebg-preview.png"
import manufacture from "./img/manufacturing.png"
import replacement1 from "./img/replace.png"
import servicement from "./img/technical-support.png"
import WorkIcon from './WorkIcon';
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
        try{
        const {data} = await axios.get(`/api/v1/item/${serial}`)
         setData1(data);
         setvoltage(data.product.volt);
         setamphour(data.product.amphour);
         setmfg(data.product.manifactureDate);
         setreplacement(data.product.ReplacementWarrantyExpireMonth);
         setservice(data.product.ServiceWarrantyExpireMonth);
        }
        catch(error){
            alert("Please Enter Valid Serial Number")
        }
    }


    
    const adminHandler = () =>{
       
        nevigate("/admin")
    }

  return (
      <>

<Navbar/>
  <div className='box-1'>
    
         <input id='home-serial-input' placeholder='Enter Your Serial Number' onChange={(event)=>{ setSerial(event.target.value)}} name='serial'></input>
        <button type="submit" onClick={sumbitHandler}>GETDATA</button>
  </div>

  <div className='box-2'>
       

        {data1 &&
        
        (<div className='data-box'> 
        {/* <h1>Serial{data1.product.serial}</h1>  */}
        {/* <h1> Voltage{data1.product.volt}</h1>  */}
        {/* <h1>AmpHour{data1.product.amphour}</h1> */}
            
          <p>  {`Configuration: ${voltage} V ${amphour} AH`} </p>

         </div>)}
 </div>

{data1 && 
<VerticalTimeline>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#c60000', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  #c60000' }}
    date={``}
    iconStyle={{ background: '#f3f3f3', color: '#fff' }}
    icon={<WorkIcon img={manufacture}/>}
    
  >
    <h3 className="vertical-timeline-element-title">Manifacture Month</h3>
    {/* <h4 className="vertical-timeline-element-subtitle"></h4> */}
    <p>
     {`${stringTodate(mfg)}`}
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#c60000', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  #c60000' }}
    date={``}
    iconStyle={{ background: '#f3f3f3', color: '#c60000' }}
    icon={<WorkIcon img={replacement1}/>}
    
  >
    <h3 className="vertical-timeline-element-title">Replacement Warranty* Expire Month</h3>
    <h4 className="vertical-timeline-element-subtitle"></h4>
    <p>
    {`${stringTodate(replacement)}`}
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#c60000', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  #c60000' }}
    date={``}
    iconStyle={{ background: '#f3f3f3', color: '#fff' }}
    icon={<WorkIcon img={servicement}/>}
    
  >
    <h3 className="vertical-timeline-element-title">Service Warranty* Expire Month</h3>
    <h4 className="vertical-timeline-element-subtitle"></h4>
    <p>
    {`${stringTodate(service)}`}
    </p>
  </VerticalTimelineElement>
</VerticalTimeline>}

<div className='termsandcondition'>

    <h3>*Warranty Terms & Condition</h3>

    <div className='warranty-item'>
    <p>1. Battery warranty can be claimed only on functional performance. </p>
    </div>

    <div className='warranty-item'>
    <p>2. Battery warranty can be claimed if battery output performance degrades to 50% or below within Replacement warranty period` </p>
    </div>

    <div className='warranty-item'>
    <p>3. E-Rex Mechatronics Pvt Ltd will first try to replace BMS of battery pack to regain performance of battery pack; if this solution is not working company will replace the battery pack with new one.  </p>
    </div>

    <div className='warranty-item'>
    <p>4. If battery catch fire or blast, E-Rex Mechatronics Pvt Ltd is not responsible for the damages or losses to the battery pack.  </p>
    </div>

    <div className='warranty-item'>
    <p>5. If consumer use any wrong method i.e. tampering with casing or serial number or short circuit etc., to claim battery warranty then manufacturer have rights to deny a warranty  </p>
    </div>

    <div className='warranty-item'>
    <p>6. In “Service Warranty”, E-Rex Mechatronics Pvt Ltd will only repair the battery. Battery is not replaceable in “service warranty” </p>
    </div>

    <div className='warranty-item'>
    <p>7. Water Damage Doesn’t Cover In Standard Warranty Period.  </p>
    </div>

    <div className='warranty-item'>
    <p> 8. Transport from Dealer to service station - Paid by Dealer, .Transport From Service Station to dealer After Repair -Paid By Company </p>
    </div>

    <div className='warranty-item'>
    <p> 9. In case battery Pack opened or stickers are removed etc., to claim battery warranty then manufacturer have rights to deny a warranty claim </p>
    </div>

    <div className='warranty-item'>
    <p>10. All legal preceding related to any dispute arising out of or in connection with this warranty, shall be subjected to the jurisdiction of the appropriate courts at Palanpur Gujarat only.  </p>
    </div>

    <div id='last-term' className='warranty-item'>
    <p> Customers are deemed to have read, understood and agreed to this condition at the time of purchase.</p>
    </div>

</div>

<button id='admin-button' onClick={adminHandler}>ADMIN Pannel Login</button>

<Footer/>
  </>);
};

export default Home;
