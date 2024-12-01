import {AiOutlineHome, AiOutlineBook} from 'react-icons/ai';
import {FaUser} from "react-icons/fa";


// This is the menu items array
const MenuItems = [
    {name: 'Home', icon: <AiOutlineHome />, href: '/#'},
    {name: 'Service', icon: <AiOutlineBook/>, href: '/#service'},
    {name: 'Login', icon: <FaUser className="text-indigo-600"/>, href: '/auth'}];

export default MenuItems;