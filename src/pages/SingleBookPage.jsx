import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import BookDetail from '../components/BookDetail'
import Footer from '../components/Footer'

function SingleBookPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); 
  return (
       <>
          <Navbar/>
          <BookDetail/>
          <Footer/>
       </>
  )
}

export default SingleBookPage