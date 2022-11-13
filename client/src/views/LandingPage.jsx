import { useState, useEffect } from 'react'
import api from '../api'
import WelcomePage from './WelcomePage'


const LandingPage = () => {
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    (async () => {
      try { 
        const response = await api.get("//localhost:5000/@me")
        setUser(response.data);
      }
      catch (error) {
        
      }

    })()
  }, [])
  
  const logoutUser = async () => {
    await api.post('//localhost:5000/logout');
    window.location.href = "/"
  }
  
  return (
    <>
      {user != null ? (
        <>
          <h2>{user.message}</h2>
          <button style={{cursor:"pointer"
          }}onClick={logoutUser}>
            Logout
          </button>
        </>
      ) : (
        <>
        <WelcomePage/>
        </>
      )}
    </>
  );
}

export default LandingPage