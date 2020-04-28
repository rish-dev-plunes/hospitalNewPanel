import { ToastProvider, useToasts } from 'react-toast-notifications'
import React from "react"

 const ProfileImage= (props) => {
    console.log(props,"props in Profile Image");
    
  const { addToast } = useToasts()
  if(!!props.uploadRet){
      if(!!props.uploadRet.success){
        addToast(props.uploadRet.message, {appearance: 'success', autoDismiss:true}) 
        props.updateImage({
            imageUrl:props.uploadRet.url
        })
      }else{
        addToast(props.uploadRet.message, {appearance: 'error', autoDismiss:true})
      }
      props.uploadRetClr()
  }

  if(!!props.updateImageRet){
    if(!!props.updateImageRet.success){
      addToast(props.updateImageRet.message, {appearance: 'success', autoDismiss:true}) 
      props.getProfileDetails()
    }else{
      addToast(props.updateImageRet.message, {appearance: 'error', autoDismiss:true})
    }
    props.updateImageClr()
}

  const handleImageClick = ()=>{
      let element = document.getElementById('uploadInput')
      element.click()
      console.log(element,"element in handleImage Click")
  }

  const handleUploadImage = (e) => {
    console.log("inside handleUploadImage", e)
    e.preventDefault();
    e.stopPropagation()
    var reader = new FileReader();
    var file = e.target.files[0];

    if(!!file){
      if (file.size > 2 * 1024 * 1024) {
        console.log("File Tooo Big")
        addToast('File size should be less than 2MB', {appearance: 'error', autoDismiss:true})
      } else {
        props.upload({ file: file, field: 'file' })
        reader.onloadend = () => {
        reader.readAsDataURL(file);
      }
    }
  }else{
    addToast('No File Found', {appearance: 'error', autoDismiss:true})
  }
}

   const uploadImage = () => {
       let deviceId = localStorage.getItem('deviceId' || [])
        if(deviceId){
          props.logoutOtherDevices({
                deviceId:deviceId
           })
            // addToast("Enter all the details",{ appearance: 'error', autoDismiss:true  })
        }else if(props.newPassword !== props.rePassword){
          addToast("Please refresh and try again",{ appearance: 'error', autoDismiss:true  })
        }else{
            props.logoutOtherDevices({
                 deviceId:[deviceId]
            })
        }
    }

  return (
<React.Fragment>
    <input  
    style={{display:'inline',display:'none'}}
    id="uploadInput"
    type="file" accept="image/jpe ,image/png, image/jpeg" 
    onChange ={(e)=>handleUploadImage(e)}
    />
    <img 
    onClick={(e)=>handleImageClick(e)}
    className="blackdot"
    style={{cursor:'pointer'}}
    src={(!!props.user?props.user.imageUrl:'/profile.png')} 
    alt=""> 
    </img>
</React.Fragment>
  )
}
 

export default ProfileImage