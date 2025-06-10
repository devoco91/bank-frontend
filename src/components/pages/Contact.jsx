import React,{useEffect} from 'react'
import ContactHeader from '../ContactHeader'
import ContactForm from '../ContactForm'
// import { Navbar } from 'react-bootstrap'
import Footer from './Footer'
import  Navbar  from '../pages/Navbar'

const Contact = () => {


     useEffect(()=>{
        window.scrollTo(0,0)
      })
  return (
    <div style={{marginTop:'80px'}}>
        <Navbar/>
        <ContactHeader/>
        <ContactForm/>
        <Footer/>
    </div>
  )
}

export default Contact