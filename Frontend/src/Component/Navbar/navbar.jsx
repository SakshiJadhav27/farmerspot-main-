import {useState,useEffect} from "react";
import "./navbar.css";
import { FaCartShopping } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import axios from 'axios';
import { useLanguage } from '../LanguageTranslate/LanguageContext';

function Navbar (){
    const {translate ,changeLanguage } = useLanguage();

    const handleLanguageChange = (e) => {
      const selectedLanguage = e.target.value;
      changeLanguage(selectedLanguage);
    };
    return(
        <div>
        <nav class="navbar navbar-expand-lg navbar-light custom-navbar p-3">
            <a class="navbar-brand text-light" href="/">Farmer's Spot</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav  ml-auto">
                <a class="text-light nav-item nav-link navbar-text active" href="/">{translate('Home')}<span class="sr-only">(current)</span></a>
                <a class="text-light nav-item nav-link navbar-text" href="/login">{translate('login')}</a>
                <a class="text-light nav-item nav-link navbar-text" href="/about">{translate('about')}</a>
                <a class="text-light nav-item nav-link navbar-text" href="/contact">{translate('contact')}</a>
                <div className="lang">
                <select class="text-light" onChange={handleLanguageChange}>
                <option class="text-dark" value="en">English</option>
                <option class="text-dark" value="hi">हिन्दी</option>
                <option class="text-dark" value="mr">मराठी</option>
                <option class="text-dark" value="ta">தமிழ்</option>
                </select>
                </div>
                <a class="text-light nav-item nav-link navbar-text" href="/admin"><RiAdminFill /></a>
                </div>
            </div>
        </nav>
    </div>
    )
}
function FarmerNavbar (){
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Make a GET request to the backend endpoint to fetch current user data
        const response = await axios.get('/farmer/currentuser', {
          withCredentials: true, // Include cookies in the request
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching current user:', error);
        // Handle error, e.g., show error message
      }
    };

    fetchCurrentUser();
  }, []); // Run once on component mount

    const handleLogout = async () => {
      try {
        // Send a GET request to the logout endpoint
        await axios.get('/farmer/logout');
        
        // Clear token from localStorage
        localStorage.removeItem('token');
        window.location.href = '/farmerLogin';
        // Redirect or perform other actions after successful logout
      } catch (error) {
        console.error('Logout error:', error);
        // Handle logout error, e.g., show error message
      }
    }

    const {translate ,changeLanguage } = useLanguage();

    const handleLanguageChange = (e) => {
      const selectedLanguage = e.target.value;
      changeLanguage(selectedLanguage);
    };
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user) {
      return <div>User not found</div>;
    }
  
    return(
        <nav class="navbar navbar-expand-lg navbar-light custom-navbar p-3">
            <a class="navbar-brand text-light" href="/">Farmer's Spot</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ml-auto">
                <a class="text-light nav-item nav-link  navbar-text active" href="/farmerHome">{translate('Home')}<span class="sr-only">(current)</span></a>
                <a class="text-light nav-item nav-link  navbar-text" href="/about">{translate('about')}</a>
                <a class="text-light nav-item nav-link  navbar-text" href="/weather">{translate('weather')}</a>
                <a class="text-light nav-item nav-link  navbar-text" href="/AddProduct">{translate('addproduct')}</a>
                <a class="text-light nav-item nav-link  navbar-text" href="/governScheme">{translate('gscheme')}</a>
                <a class="text-light nav-item nav-link  navbar-text" href="/contact">{translate('contact')}</a>
                <div className="lang">
                <select class="text-light" onChange={handleLanguageChange}>
                <option class="text-dark" value="en">English</option>
                <option class="text-dark" value="hi">हिन्दी</option>
                <option class="text-dark" value="mr">मराठी</option>
                <option class="text-dark" value="ta">தமிழ்</option>
                </select>
                </div>
                <div className="username">
                <button><span>{user.fullName}</span></button>
                </div>
                <div className="lbutton">
                <button onClick={handleLogout} ><IoLogOut className="l-icon"/></button>
                </div>
                </div>
            </div>
        </nav>
    )
}
function WholesalerNavbar (){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
      fetchCartItemCount();
    }, []);
  
    const fetchCartItemCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/addToCart/cartItemCount');
        setCartItemCount(response.data.count);
      } catch (error) {
        console.error('Error fetching cart item count:', error);
      }
    };
    const handleLogout = async () => {
      try {
        // Send a GET request to the logout endpoint
        await axios.get('/wholeseller/logout');
        
        // Clear token from localStorage
        localStorage.removeItem('token');
        window.location.href = '/wholesalerLogin';
        // Redirect or perform other actions after successful logout
      } catch (error) {
        console.error('Logout error:', error);
        // Handle logout error, e.g., show error message
      }
    }
  
    useEffect(() => {
      const fetchCurrentUser = async () => {
        try {
          // Make a GET request to the backend endpoint to fetch current user data
          const response = await axios.get('/wholeseller/currentuser', {
            withCredentials: true, // Include cookies in the request
          });
          setUser(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching current user:', error);
          // Handle error, e.g., show error message
        }
      };
  
      fetchCurrentUser();
    }, []); // Run once on component mount
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user) {
      return <div>User not found</div>;
    }
    return(
        <nav class="navbar navbar-expand-lg navbar-light custom-navbar p-3">
            <a class="navbar-brand text-light" href="/">Farmer's Spot</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav  ml-auto">
                <a class="text-light nav-item nav-link navbar-text active" href="/wholesalerHome">Home <span class="sr-only">(current)</span></a>
                <a class="text-light nav-item nav-link navbar-text" href="/login">Login</a>
                <a class="text-light nav-item nav-link navbar-text" href="/cart">AddtoCart</a>
                <a class="text-light nav-item nav-link navbar-text" href="/">Price Prediction</a>
                <a class="text-light nav-item nav-link navbar-text" href="/about">About</a>
                <a class="text-light nav-item nav-link navbar-text" href="/contact">Contact</a>
                <a class="text-light nav-item nav-link navbar-text" href="/addtocart"><FaCartShopping />
                {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>} 
                </a>
                <div className="username">
                <button><span>{user.fullName}</span></button>
                </div>
                <div className="lbutton">
                <button onClick={handleLogout} ><IoLogOut className="l-icon"/></button>
                </div>
                </div>
            </div>
        </nav>
    )
}
function AdminNavbar (){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleLogout = async () => {
    try {
      // Send a GET request to the logout endpoint
      await axios.get('/admin/logout');
      
      // Clear token from localStorage
      localStorage.removeItem('token');
      window.location.href = '/adminLogin';
      // Redirect or perform other actions after successful logout
    } catch (error) {
      console.error('Logout error:', error);
      // Handle logout error, e.g., show error message
    }
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Make a GET request to the backend endpoint to fetch current user data
        const response = await axios.get('/admin/currentuser', {
          withCredentials: true, // Include cookies in the request
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching current user:', error);
        // Handle error, e.g., show error message
      }
    };

    fetchCurrentUser();
  }, []); // Run once on component mount
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }
    return(
        <nav class="navbar navbar-expand-lg navbar-light custom-navbar p-3">
            <a class="navbar-brand text-light" href="/">Farmer's Spot</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav  ml-auto">
                <a class="text-light nav-item nav-link navbar-text active" href="/adminHome">Home <span class="sr-only">(current)</span></a>
                <a class="text-light nav-item nav-link navbar-text" href="/farmerd">Farmer</a>
                <a class="text-light nav-item nav-link navbar-text" href="/wholesalerd">Wholesaler</a>
                <div className="username">
                <button><span>{user.fullName}</span></button>
                </div>
                <div className="lbutton">
                <button onClick={handleLogout} ><IoLogOut className="l-icon"/></button>
                </div>
                </div>
            </div>
        </nav>
    )
}
export {AdminNavbar};
export {WholesalerNavbar};
export {Navbar};
export {FarmerNavbar};