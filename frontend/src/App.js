import {BrowserRouter, Routes, Route,  Outlet} from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/Navbar';
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Footer from "./components/footer/Footer";
import men_banner from './assets/banner_mens.png';
import women_banner from './assets/banner_women.png';
import kid_banner from './assets/banner_kids.png';
import FooterBottom from "./components/footer/FooterBottom";
import SpecialCase from "./components/specialcase/SpecialCase";
import NavbarUpper from "./components/navbar/NavbarUpper";
import WishList from "./pages/WishList";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
import Checkout from "./pages/Checkout";

function App() {
  return (
  <div>
  <BrowserRouter>
  
  <NavbarUpper/>
  <Navbar/>
  <SpecialCase/>
  
  <Outlet/>
  
  <Routes>
   <Route path="/" element={<Shop/>} />
   <Route path="/mensclothes" element={<ShopCategory banner ={men_banner} category="MensClothes"/>} />
   <Route path="/Womensclothes" element={<ShopCategory banner={women_banner} category="WomenClothes"/>} />
   <Route path="/kidsclothes" element={<ShopCategory banner={kid_banner} category="KidClothes"/>} />
   <Route path="/kidfootwear" element={<ShopCategory banner={kid_banner} category="KidFootwear"/>} />
   <Route path="/womenfootwear" element={<ShopCategory banner={kid_banner} category="WomenFootwear"/>} />
   <Route path="/menfootwear" element={<ShopCategory banner={kid_banner} category="MenFootwear"/>} />
   <Route path="/menbags" element={<ShopCategory banner={kid_banner} category="MenBags"/>} />
   <Route path="/womenbags" element={<ShopCategory banner={kid_banner} category="WomenBags"/>} />
   <Route path="/kidbags" element={<ShopCategory banner={kid_banner} category="KidBags"/>} />
   <Route path="/accessories" element={<ShopCategory banner={kid_banner} category="Accessories"/>} />
   {/* <Route path="/product/:productId" element={<Product />} /> */}
   <Route path="/product/:productId" element={<Product />} />

   {/* <Route path="/product" element={<Product/>} >
   <Route path=":productId" element={<Product/>} />
   </Route> */}
   <Route path="/cart" element={<Cart/>} />
   <Route path="/wishlist" element={<WishList/>}/>
   <Route path="/login" element={<LoginSignup/>} />
   <Route path="/contact" element={<ContactUs/>}/>
   <Route path="/about" element={<About/>}/>
   <Route path="/checkout" element={<Checkout/>}/>
   


  </Routes>
  <Footer/>
  <FooterBottom/>
  </BrowserRouter>
  </div>
  );
}

export default App;

// import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
// import './App.css';
// import Navbar from './components/navbar/Navbar';
// import Shop from './pages/Shop';
// import ShopCategory from './pages/ShopCategory';
// import Product from './pages/Product';
// import Cart from './pages/Cart';
// import LoginSignup from './pages/LoginSignup';
// import Footer from './components/footer/Footer';
// import men_banner from './assets/banner_mens.png';
// import women_banner from './assets/banner_women.png';
// import kid_banner from './assets/banner_kids.png';
// import FooterBottom from './components/footer/FooterBottom';
// import SpecialCase from './components/specialcase/SpecialCase';
// import NavbarUpper from './components/navbar/NavbarUpper';

// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//         <NavbarUpper />
//         <Navbar />
//         <SpecialCase />
//         <Outlet />
//         <Routes>
//           <Route path="/" element={<Shop />} />
//           <Route path="/mens" element={<ShopCategory banner={men_banner} category="MensClothes" />} />
//           <Route path="/womens" element={<ShopCategory banner={women_banner} category="WomenClothes" />} />
//           <Route path="/kids" element={<ShopCategory banner={kid_banner} category="KidClothes" />} />
//           <Route path="/kidfootwear" element={<ShopCategory banner={kid_banner} category="KidFootwear" />} />
//           <Route path="/womenfootwear" element={<ShopCategory banner={women_banner} category="WomenFootwear" />} />
//           <Route path="/menfootwear" element={<ShopCategory banner={men_banner} category="MenFootwear" />} />
//           <Route path="/menbags" element={<ShopCategory banner={men_banner} category="MenBags" />} />
//           <Route path="/womenbags" element={<ShopCategory banner={women_banner} category="WomenBags" />} />
//           <Route path="/kidbags" element={<ShopCategory banner={kid_banner} category="KidBags" />} />
//           <Route path="/accessories" element={<ShopCategory banner={kid_banner} category="Accessories" />} />
//           <Route path="/product" element={<Product />}>
//             <Route path=":productId" element={<Product />} />
//           </Route>
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/login" element={<LoginSignup />} />
//         </Routes>
//         <Footer />
//         <FooterBottom />
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
