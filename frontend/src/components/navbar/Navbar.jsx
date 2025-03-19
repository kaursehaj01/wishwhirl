import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt2 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { motion } from "framer-motion";
import { GiClothes } from "react-icons/gi";
import { AiOutlineGold } from "react-icons/ai";
import { MdSportsTennis } from "react-icons/md";
import { GiLipstick } from "react-icons/gi";
import { FaHeadphonesAlt } from "react-icons/fa";
import { GiSchoolBag } from "react-icons/gi";
const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [showMenu, setShowMenu] = useState(true); // Default to true to show menu on larger screens
  const [sidenav, setSidenav] = useState(false); // For mobile side nav toggle
  const menuRef = useRef();

  // Detect window size changes and update showMenu state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setSidenav(!sidenav);
  };

  return (
    <div className="w-full h-[72px] bg-[#F5F5F3] sticky top-0 z-[60] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto  relative">
        <div className="flex items-center justify-between h-full ">
          {/* all category button / */}
          <div className="all-category-field">

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#f5f5f3] px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  All category
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute left-1 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1 ">
                  <MenuItem className="inline-flex gap-x-3">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                  <GiClothes aria-hidden="true" className="-mr-1 size-5 text-gray-400" />

                     Fashion & clothing
                    </a>
                  </MenuItem>
                  <MenuItem className="inline-flex gap-x-3">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                  <AiOutlineGold aria-hidden="true" className="-mr-1 size-5 text-gray-400" />

                  Jewelry & Accessories 
                    </a>
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem className="inline-flex gap-x-3">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                  <GiLipstick aria-hidden="true" className="-mr-1 size-5 text-gray-400" />

                  Beauty & Wellness
                    </a>
                  </MenuItem>
                  <MenuItem className="inline-flex gap-x-3">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >

                  <GiClothes aria-hidden="true" className="-mr-1 size-5 text-gray-400" />

                  Kids & Babies

                    </a>
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem className="inline-flex gap-x-3">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                  <GiClothes aria-hidden="true" className="-mr-1 size-5 text-gray-400" />

                     Girls & Women
                    </a>
                  </MenuItem>
                  <MenuItem className="inline-flex gap-x-3">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                  <MdSportsTennis aria-hidden="true" className="-mr-1 size-5 text-gray-400" />

                      sports & outdoors
                    </a>
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem className="inline-flex gap-x-3">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                  <GiClothes aria-hidden="true" className="-mr-1 size-5 text-gray-400" />

                     Men's Clothes
                    </a>
                  </MenuItem>
                  <MenuItem className="inline-flex gap-x-3">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                  <GiSchoolBag aria-hidden="true" className="-mr-1 size-5 text-gray-400" />

                     Bags & Footwear
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>

          {/* Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center w-auto gap-3 lg:gap-6 justify-self-center "
              >
                
                <li onClick={() => { setMenu("shop"); }} className="relative">
                  <Link to="/" className="text-base font-medium hover:text-gray-700">Home</Link>
                  {menu === "shop" && <hr className="absolute bottom-0 w-full border-t-2 border-black" />}
                </li>
                {/* <li onClick={() => { setMenu("shops"); }} className="relative">
                  <Link to="/shops" className="text-base font-medium hover:text-gray-700">Shop</Link>
                  {menu === "shops" && <hr className="absolute bottom-0 w-full border-t-2 border-black" />}
                </li> */}
                <li onClick={() => { setMenu("about"); }} className="relative">
                  <Link to="/about" className="text-base font-medium hover:text-gray-700">About</Link>
                  {menu === "about" && <hr className="absolute bottom-0 w-full border-t-2 border-black" />}
                </li>
                <li onClick={() => { setMenu("mensclothes"); }} className="relative">
                  <Link to="/mensclothes" className="text-base font-medium hover:text-gray-700">Men's</Link>
                  {menu === "mensclothes" && <hr className="absolute bottom-0 w-full border-t-2 border-black" />}
                </li>
                <li onClick={() => { setMenu("Womensclothes"); }} className="relative">
                  <Link to="/Womensclothes" className="text-base font-medium hover:text-gray-700">Women's</Link>
                  {menu === "Womensclothes" && <hr className="absolute bottom-0 w-full border-t-2 border-black" />}
                </li>
                <li onClick={() => { setMenu("kidsclothes"); }} className="relative">
                  <Link to="/kidsclothes" className="text-base font-medium hover:text-gray-700">Kids</Link>
                  {menu === "kidsclothes" && <hr className="absolute bottom-0 w-full border-t-2 border-black" />}
                </li>
                <li onClick={() => { setMenu("accessories"); }} className="relative">
                  <Link to="/accessories" className="text-base font-medium hover:text-gray-700">Accessories</Link>
                  {menu === "accessories" && <hr className="absolute bottom-0 w-full border-t-2 border-black" />}
                </li>
                <li onClick={() => { setMenu("beauty"); }} className="relative">
                  <Link to="/beauty" className="text-base font-medium hover:text-gray-700">Beauty</Link>
                  {menu === "beauty" && <hr className="absolute bottom-0 w-full border-t-2 border-black" />}
                </li>
                <li onClick={() => { setMenu("menbags"); }} className="relative">
                  <Link to="/menbags" className="text-base font-medium hover:text-gray-700">Bags</Link>
                  {menu === "menbags" && <hr className="absolute bottom-0 w-full border-t-2 border-black" />}
                </li>
                <li onClick={() => { setMenu("contact"); }} className="relative">
                  <Link to="/contact" className="text-base font-medium hover:text-gray-700">Contact</Link>
                  {menu === "contact" && <hr className="absolute bottom-0 w-full border-t-2 border-black" />}
                </li>
              </motion.ul>
            )}
          </div>

          {/* Mobile Hamburger Icon */}
          <HiMenuAlt2
            onClick={toggleMobileMenu}
            className="md:hidden inline-block cursor-pointer w-8 h-6"
          />

          {/* Mobile Menu (SideNav) */}
          {sidenav && (
            <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-[80%] h-full relative bg-white p-6"
              >
                {/* Close Button */}
                <span
                  onClick={() => setSidenav(false)}
                  className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer"
                >
                  <MdClose />
                </span>

                {/* Mobile Links */}
                <ul className="text-gray-700 flex flex-col gap-4">
                <li onClick={() => { setMenu("kidsclothes"); }} className="relative">
                    <Link to="/kidsclothes" className="text-lg  font-bold">WishWhirl</Link>
                  </li>
                  <li onClick={() => { setMenu("shop"); }} className="relative">
                    <Link to="/" className="text-base font-medium">Shop</Link>
                  </li>
                  <li onClick={() => { setMenu("mens"); }} className="relative">
                    <Link to="/mens" className="text-base font-medium">Men's Cloth</Link>
                  </li>
                  <li onClick={() => { setMenu("womens"); }} className="relative">
                    <Link to="/womens" className="text-base font-medium">Women's Cloth</Link>
                  </li>
                  <li onClick={() => { setMenu("kidsclothes"); }} className="relative">
                    <Link to="/kidsclothes" className="text-base font-medium">Kid's Cloths</Link>
                  </li>
                  <li onClick={() => { setMenu("accessories"); }} className="relative">
                    <Link to="/accessories" className="text-base font-medium">Jewelry & Accessories </Link>
                  </li>
                  <li onClick={() => { setMenu("menbags"); }} className="relative">
                    <Link to="/menbags" className="text-base font-medium">Bags & Backpack </Link>
                  </li>
                  <li onClick={() => { setMenu("kids"); }} className="relative">
                    <Link to="/kids" className="text-base font-medium">Beauty & Wellness</Link>
                  </li>
                  <li onClick={() => { setMenu("kids"); }} className="relative">
                    <Link to="/kids" className="text-base font-medium">Sports & Outdoors</Link>
                  </li>
                  
                </ul>
              </motion.div>
            </div>
          )}

          {/* contact*/}
          <div className="hidden lg:flex items-center">
            <FaHeadphonesAlt className='-mr-1 size-8 pr-2 text-slate-700'/>
            <div className="block">
              <p className='text-lg  leading-none font-bold'>1200-399</p>
              <p className='text-[10px]'>24/7 support center</p>
              
            </div>
          </div>

          
        </div>
      </nav>
    </div>
  );
};

export default Navbar;






// import React, { useContext, useState, useEffect, useRef } from 'react';
// import logo from '../../assets/logo.png';
// import cart_icon from '../../assets/cart_icon.png';
// import { Link } from 'react-router-dom';
// import { ShopContext } from '../../context/ShopContext';
// import nav_dropdown from '../../assets/nav_dropdown.png';
// import { HiMenuAlt2 } from "react-icons/hi";
// import { MdClose } from "react-icons/md";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   const [menu, setMenu] = useState("shop");
//   const [showMenu, setShowMenu] = useState(true); // Default to true to show menu on larger screens
//   const [sidenav, setSidenav] = useState(false); // For mobile side nav toggle
//   const { getTotalCartItem } = useContext(ShopContext);
//   const menuRef = useRef();

//   // Detect window size changes and update showMenu state
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 667) {
//         setShowMenu(false);
//       } else {
//         setShowMenu(true);
//       }
//     };

//     handleResize(); // Initial check
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   // Toggle mobile menu visibility
//   const toggleMobileMenu = () => {
//     setSidenav(!sidenav);
//   };

//   return (
//     <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
//       <nav className="h-full px-4 max-w-container mx-auto relative">
//         <div className="flex items-center justify-between h-full">
//           {/* Logo */}
//           <Link to="/" className="flex items-center">
//             <img src={logo} alt="Logo" className="w-10 h-10" />
//             <p className="text-xl font-bold ml-2">WishWhirl</p>
//           </Link>

//           {/* Menu (Desktop) */}
//           <div className="hidden md:flex items-center space-x-6">
//             {showMenu && (
//               <motion.ul
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="flex items-center w-auto gap-6"
//               >
//                 <li onClick={() => { setMenu("shop"); }} className="relative">
//                   <Link to="/" className="text-base font-medium hover:text-gray-700">Shop</Link>
//                   {menu === "shop" && <hr className="absolute bottom-0 w-full border-t-2 border-black" />}
//                 </li>
//                 <li onClick={() => { setMenu("mens"); }} className="relative">
//                   <Link to="/mens" className="text-base font-medium hover:text-gray-700">Men</Link>
//                   {menu === "mens" && <hr className="absolute bottom-0 w-full border-t-2 border-black" />}
//                 </li>
//                 <li onClick={() => { setMenu("womens"); }} className="relative">
//                   <Link to="/womens" className="text-base font-medium hover:text-gray-700">Women</Link>
//                   {menu === "womens" && <hr className="absolute bottom-0 w-full border-t-2 border-black" />}
//                 </li>
//                 <li onClick={() => { setMenu("kids"); }} className="relative">
//                   <Link to="/kids" className="text-base font-medium hover:text-gray-700">Kids</Link>
//                   {menu === "kids" && <hr className="absolute bottom-0 w-full border-t-2 border-black" />}
//                 </li>
//               </motion.ul>
//             )}
//           </div>

//           {/* Mobile Hamburger Icon */}
//           <HiMenuAlt2
//             onClick={toggleMobileMenu}
//             className="md:hidden inline-block cursor-pointer w-8 h-6"
//           />

//           {/* Mobile Menu (SideNav) */}
//           {sidenav && (
//             <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
//               <motion.div
//                 initial={{ x: -300, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="w-[80%] h-full relative bg-white p-6"
//               >
//                 {/* Close Button */}
//                 <span
//                   onClick={() => setSidenav(false)}
//                   className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer"
//                 >
//                   <MdClose />
//                 </span>

//                 {/* Mobile Links */}
//                 <ul className="text-gray-700 flex flex-col gap-4">
//                   <li onClick={() => { setMenu("shop"); }} className="relative">
//                     <Link to="/" className="text-base font-medium">Shop</Link>
//                   </li>
//                   <li onClick={() => { setMenu("mens"); }} className="relative">
//                     <Link to="/mens" className="text-base font-medium">Men</Link>
//                   </li>
//                   <li onClick={() => { setMenu("womens"); }} className="relative">
//                     <Link to="/womens" className="text-base font-medium">Women</Link>
//                   </li>
//                   <li onClick={() => { setMenu("kids"); }} className="relative">
//                     <Link to="/kids" className="text-base font-medium">Kids</Link>
//                   </li>
//                 </ul>
//               </motion.div>
//             </div>
//           )}

//           {/* Cart and Auth */}
//           <div className="flex items-center space-x-4">
//             {localStorage.getItem('auth_token') ? (
//               <button onClick={() => { localStorage.removeItem('auth_token'); window.location.replace("/"); }} className="text-base">Logout</button>
//             ) : (
//               <Link to='/login'>
//                 <button className="text-base">Login</button>
//               </Link>
//             )}
//             <Link to='/cart'>
//               <img src={cart_icon} alt="Cart" className="w-6 h-6" />
//               <div className="absolute top-5 right-2 bg-red-600 text-white rounded-full text-xs px-1 py-0">{getTotalCartItem()}</div>
//             </Link>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

