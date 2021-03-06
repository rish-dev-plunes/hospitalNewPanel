import React, { useState , useEffect } from "react"
import {  useToasts } from 'react-toast-notifications'

const TimeSlot = (props) => {
        console.log(props,"props in TimeSlot")
        const [ hour, setHour ] = useState()
        const [ minutes, setMinutes ] = useState()
        const {addToast} = useToasts()

        useEffect(() => {
            setHour((props.selectedSlot[props.selectedType])['hour'])
            setMinutes((props.selectedSlot[props.selectedType])['minutes'])
          }, [])
      const  getTimeOptions = (shift) =>{
            if(shift==='morning'){
                return (
                    <React.Fragment>
                <ul className="tme_d1">
                    <li onClick= {()=>setHour(9)} className={hour===9?'active cursor-pointer':'cursor-pointer'} >9</li>
                    <li onClick= {()=>setHour(10)} className={hour===10?'active cursor-pointer':' cursor-pointer'}>10</li>
                    <li onClick= {()=>setHour(11)} className={hour===11?'active cursor-pointer':'cursor-pointer'}>11</li>
                    <li onClick= {()=>setHour(12)} className={hour===12?'active cursor-pointer':'cursor-pointer'}>12</li>
                    <li onClick= {()=>setHour(13)} className={hour===13?'active cursor-pointer':' cursor-pointer'}>13</li>
                    <li onClick= {()=>setHour(14)} className={hour===14?'active cursor-pointer':' cursor-pointer'}>14</li>
                </ul>
             <ul className="tme_d">
                    <li onClick= {()=>setMinutes(0)} className={minutes===0?'active cursor-pointer':' cursor-pointer'}>00</li>
                    <li onClick= {()=>setMinutes(10)} className={minutes===10?'active cursor-pointer':' cursor-pointer'}>10</li>
                    <li onClick= {()=>setMinutes(20)} className={minutes===20?'active cursor-pointer':' cursor-pointer'}>20</li>
                    <li onClick= {()=>setMinutes(30)} className={minutes===30?'active cursor-pointer':' cursor-pointer'}>30</li>
                    <li onClick= {()=>setMinutes(40)} className={minutes===40?'active cursor-pointer':' cursor-pointer'}>40</li>
                    <li onClick= {()=>setMinutes(50)} className={minutes===50?'active cursor-pointer':'cursor-pointer'}>50</li>
             </ul>
                    </React.Fragment>
                )
            }else{
                return (
                    <React.Fragment>
                    <ul className="tme_d1">
                        <li onClick= {()=>setHour(15)} className={hour===15?'active cursor-pointer':'cursor-pointer'} >15</li>
                        <li onClick= {()=>setHour(16)} className={hour===16?'active cursor-pointer':'cursor-pointer'}>16</li>
                        <li onClick= {()=>setHour(17)} className={hour===17?'active cursor-pointer':'cursor-pointer'}>17</li>
                        <li onClick= {()=>setHour(18)} className={hour===18?'active cursor-pointer':'cursor-pointer'}>18</li>
                        <li onClick= {()=>setHour(19)} className={hour===19?'active cursor-pointer':' cursor-pointer'}>19</li>
                        <li onClick= {()=>setHour(20)} className={hour===20?'active cursor-pointer':' cursor-pointer'}>20</li>
                    </ul>
                 <ul className="tme_d">
                        <li onClick= {()=>setMinutes(0)} className={minutes===0?'active cursor-pointer':' cursor-pointer'}>00</li>
                        <li onClick= {()=>setMinutes(10)} className={minutes===10?'active cursor-pointer':' cursor-pointer'}>10</li>
                        <li onClick= {()=>setMinutes(20)} className={minutes===20?'active cursor-pointer':' cursor-pointer'}>20</li>
                        <li onClick= {()=>setMinutes(30)} className={minutes===30?'active cursor-pointer':'cursor-pointer'}>30</li>
                        <li onClick= {()=>setMinutes(40)} className={minutes===40?'active cursor-pointer':' cursor-pointer'}>40</li>
                        <li onClick= {()=>setMinutes(50)} className={minutes===50?'active cursor-pointer':'cursor-pointer'}>50</li>
                 </ul>
                        </React.Fragment>
                )
            }
        }

        // if(((!!props.setAvailabilityRet && (props.i === 0)))){
        //     if(!!props.setAvailabilityRet.success){
        //       addToast(props.setAvailabilityRet.message, {appearance: 'success', autoDismiss:true}) 
              
        //     }else{
        //       addToast(props.setAvailabilityRet.message, {appearance: 'error', autoDismiss:true})
        //     }
        //     props.setAvailabilityClr()
        //     props.loadingOff()
        // }

        const submit = () =>{
            let slot = props.selectedSlot
            let type = props.selectedType
            let shift = props.selectedshift
            let test = {}
            let error = false
            let message = ""
            if(type==="from"){
                test = slot.to
                if(hour>test.hour){
                    error=true
                    message = "Invalid time"
                }else if(hour===test.hour){
                    console.log("this one is getting called")
                    if(minutes>test.minutes){
                        error=true
                        message = "Invalid time"
                    }
                }
            }else{
                test = slot.from
                if(hour<test.hour){
                    error=true
                    message = "Invalid time"
                }else if(hour===test.hour){
                    console.log("this one is getting called")
                    if(minutes<test.minutes){
                        error=true
                        message = "Invalid time"
                    }
                }
            }
           
            if(!!error){
              addToast(message, {appearance: 'error', autoDismiss:true})
            }else{
               
                props.submit({
                    hour, minutes
                })
            }
        }
    return (
        <div className ='modal-wrapper-small_ris'>
        <div className="modal-heading_ris set_u_t">Set your Time</div>
        <div className="row modal-p_ris margin-top-small_ris text-center">
    <div className="modal-p_ris col-lg-12 time_s text-center"><h2>{hour>12?hour-12:hour}:{minutes<10?'0'+minutes:minutes}<small>{hour>12?'PM':'AM'}</small></h2>
        </div>
       <div className="new_scr2">
        <div className="new_scrol">
            {getTimeOptions(props.selectedshift)}
          </div>
       </div>
        </div>
      <div className="text-center">
            <button onClick={()=>submit()}
            className="common-button margin-top-small_ris">Choose</button>
         </div>
      </div>         
    )
}

 export default TimeSlot