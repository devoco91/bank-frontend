import React, {useEffect} from 'react'
import Hero from '../Hero/Hero'
import Navbar from '../../components/pages/Navbar'
import Footer from '../../components/pages/Footer'
import './home.css'
import WhyChooseUs from '../whychooseus/WhyChooseUs'
import Deposit from '../Deposit/Deposit'
import GlobalGrowthSection from '../global/GlobalGrowthSection'
import CoreServices from '../coreservices/CoreServices'
import TeamSection from '../team/TeamSection'
import PartnerSection from '../partner/PartnerSection'


const Home = () => {


  useEffect(()=>{
    window.scrollTo(0,0)
  })
  return (
    <div className='home'>
        <Navbar/>
        <Hero/>
        <WhyChooseUs/>
        <Deposit/>
        <GlobalGrowthSection/>
        <CoreServices/>
        <TeamSection/>
        <PartnerSection/>
        
        <Footer/>
    </div>
  )
}

export default Home