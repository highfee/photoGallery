import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {update} from '../redux/searchSlice'
import {update2} from '../redux/authSlice'
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'



function Header() {
  const input = useRef(null)
  const dispatch = useDispatch()

  const handleSubmit = (e) =>{
    e.preventDefault()
    // console.log(input)
    dispatch(update(input.current.value))
    input.current.value = ''
  }
  const logout = () => {
    localStorage.removeItem('user')
    dispatch(update2(null))
  }

  const user = useSelector(state => state.user.value) || null
  return (
    <div className="header">
        <div className="logo">
          <h1>
            <Link to='/'>
              PhotoGallery
            </Link>
            
          </h1>
        </div>
       
        <form onSubmit={handleSubmit}>
            <input 
              type="text"
              placeholder="Search" 
              ref={input}
            />
            <ion-icon name="search-outline"></ion-icon>
        </form>
        <ul>
          {user ? 
          <li 
            style={{display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer'}} 
            onClick={logout}
          >
            <FaSignOutAlt /> Logout
            {' ' + user.name.split(' ')[0]}
          </li> : 
          <>
          <li style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <FaSignInAlt />
                <Link to='/login'>Login</Link> 
          </li>
          <li style={{display: 'flex', alignItems: 'center'}}>
              <FaSignOutAlt />
                <Link to='/register'>Register</Link>
          </li>
        </>
          }
          
            
        </ul>
    </div>
  )
}

export default Header
