import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import HomeBook from '../components/HomeBook'

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []); 

  return (
    <>
      <Navbar/>
      <Banner/>
      <HomeBook/>
      <Footer/>
    </>
  )
}

export default HomePage