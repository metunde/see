import { Link, Outlet } from "react-router-dom"
import { AppContext } from "../Context/AppContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"


export default function Layout(){

  const {user, token ,setUser, setToken} = useContext(AppContext);
  const nav= useNavigate();

  async function handleLogout(e) {
    e.preventDefault();

    const res = await fetch('/api/logout', 
     { 
      method: "post",
      headers: {
        Authorization : `Bearer ${token}`
      }}
    )

    const data = await res.json();
    console.log(data)

    if (res.ok) {
      setUser(null);
      setToken(null);
localStorage.removeItem("token");
nav("/")
    }
  }

    return(
        <>
        
        <header>
   <nav>
    <div className="flex items-center space-x-4">
    <Link to="/" className="nav-link">Home</Link>
    <Link to="/visitors" className="nav-link">Visitors</Link>
    <Link to="/visitors" className="nav-link">Visits</Link>
    <Link to="/hosts" className="nav-link">Staff</Link>
    </div>
    
 
       {user?( <div className="flex items-center space-x-4"><p className="nav-link">{user.name}!</p>
       <form onSubmit={handleLogout}>
        <button className="nav-link" type="submit">Logout</button>
       </form>
       </div>
       )
       :(<div> <Link to='/register' className="nav-link">Register</Link>
        <Link to='/login' className="nav-link">Login</Link></div>) }
    

   </nav>
        </header>
        <main>
       
            <Outlet></Outlet>
        </main>
       
        </>
    )
    
    
    }