import React from 'react'
import ExclusiveSection from '../../Components/ExclusiveSection/ExclusiveSection'
import SellingProducts from '../../Components/SellingProducts/SellingProducts'
import NewArrivals from '../../Components/NewArrivals/NewArrivals'
import Hero from '../../Components/Hero/Hero'
import FlashSale from '../../Components/FlashSale/FlashSale'
import Collection from '../../Components/Collection/Collection'
import FeaturedProduct from '../../Components/FeaturedProduct/FeaturedProduct'
import TopBrand from '../../Components/TopBrand/TopBrand'







const Home = () => {
  return (
    <div>
     
      
    <Hero/>
    <FlashSale/>
    <Collection/>

    <FeaturedProduct />
    <TopBrand />

     <SellingProducts/>
      <ExclusiveSection/>
      <NewArrivals/>
    
      
    </div>
  )
}

export default Home