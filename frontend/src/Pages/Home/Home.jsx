import React from 'react'
import ExclusiveSection from '../../Components/ExclusiveSection/ExclusiveSection'
import SellingProducts from '../../Components/SellingProducts/SellingProducts'
import NewArrivals from '../../Components/NewArrivals/NewArrivals'
import Hero from '../../Components/Hero/Hero'
import FlashSale from '../../Components/FlashSale/FlashSale'
import Collection from '../../Components/Collection/Collection'
import ChawkBazarApp from '../../Components/ChawkBazarApp/ChawkBazarApp'
import Testimonials from '../../Components/Testimonials/Testimonials'
import NewsletterGallery from '../../Components/NewsletterGallery/NewsletterGallery'








const Home = () => {
  return (
    <div>
      <SellingProducts/>
      <ExclusiveSection/>
       <NewArrivals/>
       <ChawkBazarApp/>
       <Testimonials/>
       <NewsletterGallery/>
      
      
    <Hero/>
    <FlashSale/>
    <Collection/>
    
    
    
      
    </div>
  )
}

export default Home