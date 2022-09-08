import React, {useState} from 'react'
import {omit} from 'lodash'

function useValidate(name, value) {
    const [errors, setErrors] = useState({})

    const errPrint = (prop, msg) =>{
        setErrors({...errors, [prop]: msg})
    } 

    const validate = (name, value) => {
        // console.log('name = ', name, 'value =', value)
        switch(name){
            case "name":
                if(value.length===0){
                    errPrint(name,"Name Field should not be empty")
                } else if (value.length < 3 ){
                    errPrint(name,"Name should be atleast 3 letters")
                } else if (!new RegExp(/^[a-z A-Z\s]+$/).test(value)){
                    errPrint(name, "Invalid Name")
                }  else {
                    let newOb = omit(errors, name)
                    setErrors(newOb)
                }
            break;
            case "email":
                if(value.length===0){
                    errPrint(name,"Email Field should not be empty")
                } else if (!new RegExp(/^[a-z0-9\s]+@[a-z\s]+\.[(com|in|co.in|org|net)\s]+$/).test(value)){
                    errPrint(name, "Invalid Email Format")
                } else {
                    let newOb = omit(errors, name)
                    setErrors(newOb)
                }
             
            break;
            case "mobile":
                if(value.length===0){
                    errPrint(name,"Mobile Field should not be empty")
                } else if (!new RegExp(/^[6-9]\d{9}$/).test(value)){
                    errPrint(name, "Invalid Indian Mobile Number")
                } else {
                    let newOb = omit(errors, name)
                    setErrors(newOb)
                }
            break;
            case "password":
                if(value.length===0){
                    errPrint(name, "Password field must be filled")
                } else if (value.length > 10) {
                    errPrint(name, "Password should not greater than 10 characters")
                }else if (value.length < 6) {
                    errPrint(name, "Password should contain 6 characters atleast")
                } else if (!new RegExp(/^[a-z A-Z 0-9\s &*#-]+$/).test(value)){
                    errPrint(name, "Password can include only a-z, A-Z, 0-9, & * # - Characters ")
                } else {
                    let newOb = omit(errors, name)
                    setErrors(newOb)
                }
            break;
            default:
            break;
        }
    }

  return {
    errors,
    validate
  }
}

export default useValidate