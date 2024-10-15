import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BooksGrid from '../components/BooksGrid'

function BookPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []); 

  return (
    <>
     <Navbar/>
     <BooksGrid/>
     <Footer/>
    </>
  )
}

export default BookPage