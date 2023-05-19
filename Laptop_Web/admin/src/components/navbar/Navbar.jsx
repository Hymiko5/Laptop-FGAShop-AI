import "./navbar.scss"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext"
import  { useLocation, useNavigate } from 'react-router-dom'
import { createBrowserHistory } from "history";

export const Navbar = () => {
  const location = useLocation();
  let path = location.pathname.split("/")[2];
  const { dispatch } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [keywords, setKeywords] = useState("");
  const navigate = useNavigate();
  const history = createBrowserHistory();
  const redirectToSearch = () => {
    navigate(`?keywords=${keywords}`)
    navigate(0)
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  }
  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." onChange={ (e) => setKeywords(e.target.value) } />
          <SearchOutlinedIcon onClick={ () => { redirectToSearch() } }/>
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className="icon" onClick={() => dispatch({ type: "TOGGLE" })} />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          {user ? <><div className="item">
            <img
              src={user.photo}
              alt=""
              className="avatar"
            />
          </div>
            <div className="item">
              <button className="navButton" onClick={handleLogout}>Logout</button>
            </div> </> :
            <div className="navItems">
              <button className="navButton">Register</button>
              <button className="nacButton">Login</button>
            </div>
          }

        </div>
      </div>
    </div>
  )
}
