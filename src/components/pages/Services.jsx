import React,{useEffect} from 'react'
import ServicesHeader from '../ServicesHeader'
import CoreServices from '../coreservices/CoreServices'
import TeamSection from '../team/TeamSection'
import Navbar  from '../pages/Navbar'
import Footer from './Footer'
// import { useEffect } from 'react'

const Services = () => {

 useEffect(()=>{
    window.scrollTo(0,0)
  })

  return (
    <div style={{marginTop:'70px'}}>
        <Navbar/>
        <ServicesHeader/>
        <CoreServices/>
        <TeamSection/>
        <Footer/>
    </div>
  )
}

export default Services