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

import FeaturedProduct from '../../Components/FeaturedProduct/FeaturedProduct'
import TopBrand from '../../Components/TopBrand/TopBrand'







const Home = () => {
  return (
    <div>
      
      
     
    <Hero/>
    <Collection/>

    <FeaturedProduct />
    <TopBrand />

     
      <SellingProducts/>
      <ExclusiveSection/>
       <NewArrivals/>
       <ChawkBazarApp/>
       <Testimonials/>
      <NewsletterGallery/>
      
    
    
    
      
    </div>
  )
}

export default Home