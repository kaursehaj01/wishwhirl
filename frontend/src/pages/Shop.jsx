import React from 'react'
import Hero from '../components/hero/Hero'
import Popular from '../components/popular/Popular'
import Offer from '../components/offer/Offer'
import NewCollection from '../components/newcollection/NewCollection'
import NewsLetter from '../components/newsletter/NewsLetter'
import NavbarBottom from '../components/navbar/NavbarBottom'
// import Xsidebar from '../components/sidebar/Xsidebar'
import Sale from '../components/sale/Sale'
import Promo from '../components/promo/Promo'

const Shop = () => {
  return (
    <div>
      
      <Hero/>
      <Sale/>
      <Popular/>
      <Offer/>
      <Popular/>
      <Promo/>
      <NewCollection/>
      <NewsLetter/>
    </div>
  )
}

export default Shop


