import React from 'react'
import ExclusiveSection from '../../Components/ExclusiveSection/ExclusiveSection'
import SellingProducts from '../../Components/SellingProducts/SellingProducts'
import NewArrivals from '../../Components/NewArrivals/NewArrivals'

const Home = () => {
  return (
    <div>
      <SellingProducts/>
      <ExclusiveSection/>
      <NewArrivals/>
    </div>
  )
}

export default Home