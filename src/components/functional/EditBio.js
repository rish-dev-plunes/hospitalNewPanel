import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import React, { useRef , useEffect} from "react"

 const EditBio= (props) => {
  const { addToast } = useToasts()
  const textareaRef =  useRef()


  useEffect(() =>{
    if(!!props.editBioRet){
      if(!!props.editBioRet.success){
        addToast(props.editBioRet.message, {appearance: 'success', autoDismiss:true}) 
        // props.getUserDetails()
        props.set_user_info({
          biography:props.biography
        })
        props.toggleEditBio()
      }else{
        addToast(props.editBioRet.message, {appearance: 'success', autoDismiss:true})
      }
      props.loadingOff()
      props.editBioClr()
  }
  },[props.editBioRet])

 const  keyPress =(e)=>{
    if(e.keyCode === 13){
      
       // put the login here
    }else{
        props.handleBioChange(e)
    }
 }

   const submitdetails = () => {
        if(props.biography === ''){
            addToast("Enter bio",{ appearance: 'error', autoDismiss:true })
        }else{
          if(props.biography !== props.user.biography){
            props.editBio({
                biography:props.biography
            })
          }
        }
    }


  return (
    <div className="row HospitalBio">
    <p className="intro col-lg-9 auto_center"><strong>Introduction</strong> </p>
    <p style={{position:'relative'}}  className="intro col-lg-2 save_edit_ris auto_center">
    {props.editBioFlag && <span style={{position:'absolute',right:'4rem', width:'fit-content'}} onClick={()=>submitdetails()} className="edi_intr hover_underline">Save</span> }
    <span onClick={()=>props.toggleEditBio()} className="edi_intr hover_underline">{props.editBioFlag?"Cancel":'Edit'}</span>
    </p>
    <div className="col-lg-12 text_cmt">
    {props.loading && <LoaderComponent />}
   {((!props.editBioFlag) && (props.user.biography)) && <p className="loc">{props.user.biography}</p>}
  {props.editBioFlag &&  <textarea 
   name="biography" 
   ref={textareaRef}
//    onKeyDown={keyPress}
   onChange ={props.handleBioChange}
   value={props.biography} 
   rows="4" 
   cols="90"
   name="comment" 
   form="usrform" /> 
   }
    </div>
    </div>
  )
}

export default EditBio