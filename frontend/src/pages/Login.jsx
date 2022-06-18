import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {update2} from '../redux/authSlice'


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
      const res = await axios.post('https://highfee-photo.herokuapp.com/api/users/login', formData)
      if(res.data){
        localStorage.setItem('user', JSON.stringify(res.data))
        dispatch(update2(JSON.parse(localStorage.getItem('user'))))
        navigate('/')
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
                <button type="submit">Login</button>
            </form>
        </div>
    </>
  )
}

export default Login