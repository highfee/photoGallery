import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {update2} from '../redux/authSlice'
import { toast } from 'react-toastify'


function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })


const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
}
const { email, password} = formData

  const handleSubmit = async(e) => {
      e.preventDefault()
      if(!email && !password){
        toast.error('pls input all fields')
      }
      try {
        const res = await axios.post('https://highfee-photo.herokuapp.com/api/users/login', formData)
        if(res.data){
          localStorage.setItem('user', JSON.stringify(res.data))
          dispatch(update2(JSON.parse(localStorage.getItem('user'))))
          navigate('/')
        }
      } catch (error) {
        if(error.message === "Network Error"){
          toast.error('Pls check your internet connection')
        }
        if(error.response.data.message === "Invalid credentials"){
          toast.error('Invalid credentials')
        }
      }
  }

  return (
    <>
        <div className="login">
            <h1>Please login to start using our service</h1>
            <form onSubmit={handleSubmit}>
                <input 
                  type="text"
                  placeholder="Pls input email"
                  name='email'
                  value={email}
                  onChange={onChange}
                />
                <input 
                  type="password" 
                  placeholder="Pls input password" 
                  name='password'
                  value={password}
                  onChange={onChange}
                />
                <button type="submit" style={{cursor: 'pointer'}}>Login</button>
            </form>
        </div>
    </>
  )
}

export default Login