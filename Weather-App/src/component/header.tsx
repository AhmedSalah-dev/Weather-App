import { Link } from 'react-router-dom'
import darkLogo from '../assets/logo.png'
import lightLogo from '../assets/logo2.png'
import{ useTheme } from '../context/Theme-provider';
import { Moon, Sun } from "lucide-react";


const Header = () => {
    const {theme,setTheme} =useTheme();
    const isDark = theme === "dark";



  return (
  <header className='sticky top-0 z-50 w-full border-b bg-background/95'>
    <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link to={"/"}>
        <img 
          src={isDark ? darkLogo : lightLogo}
          alt="Climate.logo"
          className='h-14' />
        </Link>

        <div>
             {/* search  */}
             {/* theme toggle  */}
        </div>
        <div 
         onClick={()=> setTheme(isDark? 'light': 'dark') }
          className={`flex items-center cursor-pointer transition-transform duration-500
          ${isDark ?"rotate-180":"rotate-0"} 
          `} >

            {isDark? (
                <Sun className='h-6 w-6 text-yellow-500 rotate-0 transition-all cursor-pointer' />
            ):(
            <Moon className='h-6 w-6 text-gray-500 rotate-0 transition cursor-pointer'/>
           )}
        </div>
    </div>
  </header>
  )
}

export default Header