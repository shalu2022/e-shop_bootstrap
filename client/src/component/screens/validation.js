import React, {useState} from 'react'
import {omit} from 'lodash'

//useForm => form validation custom hook

const initState = {
    name: "",
    email:"",
    image: "",
    mobile: "",
    address: ""
}
