import React, { useRef, userEffect } from 'react'
import {throttle} from 'throttle-debounce';

const SearchComponent = (props) =>{
  console.log(props.selected_speciality,"props.selected_speciality")
    const searchRef  = useRef()
    const  searchCall = () =>{
        if(!!searchRef.current){
            if(searchRef.current.value.length!==0){
                 props.searchProcedures({
                   searchQuery:searchRef.current.value,
                   page:1,
                   limit:50,
                   specialityId:props.selected_speciality
                 })
              }else{
                props.searchProcedures({
                  searchQuery:searchRef.current.value,
                  page:1,
                  limit:50,
                  specialityId:props.selected_speciality
                })
              }
              }
        } 
    const throttleSearch =  throttle(1500, searchCall);
    const  clearSearch = (e)=>{
     
      }
    const  onChange =(e) =>{
        // e.persist()
        throttleSearch() 
      }
    return (
          <React.Fragment>
              <input
               type="text" 
               ref= {searchRef} 
               onChange={onChange} 
               placeholder="Name the procedure or test here." 
               name="search" 
               className='catalogueSearchbar no-border'
               
               />
          </React.Fragment>
      )
}

export default SearchComponent