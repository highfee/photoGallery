import { useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {update2} from '../redux/authSlice'


function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
  

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const { name, email, password, password2} = formData

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password !== password2){
            toast.error('Password does not match')
        }
        if(!email && !password && !password2 && !name){
            toast.error('pls input all fields')
          }
        try {
            const res = await axios.post('https://highfee-photo.heroksuapp.com/api/users/register', formData)
            // const res = await axios.post('http://localhost:8000/api/users/register', formData)
            if(res.data){
                localStorage.setItem('user', JSON.stringify(res.data))
                dispatch(update2(JSON.parse(localStorage.getItem('user'))))
    
                navigate('/')
            }
        } catch (error) {
            if(error.message === "Network Error"){
            toast.error('Pls check your internet connection')
            }
            if(error.response.data.message && error.response.data.message === "Email already exist"){
                toast.error('Email already exist')
              }
        }
       
    }
  


    return (
      <>
          <div className="login">
            <h1>Please Register to start using our service</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Pls input username"
                    name="name"
                    value={name}
                    onChange={onChange}
                />
                <input 
                    type="email" 
                    placeholder="Pls input email"
                    name="email"
                    value={email}
                    onChange={onChange}
                />
                <input 
                    type="password"
                    placeholder="Pls input password" 
                    name="password"
                    value={password}
                    onChange={onChange}
                />
                <input 
                    type="password" 
                    placeholder="Pls confirm password"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                />
                <button 
                    type="submit"
                    style={{cursor: "pointer"}}
                >
                    Register
                </button>
            </form>
        </div>
      </>
    )
  }
  
  export default Register