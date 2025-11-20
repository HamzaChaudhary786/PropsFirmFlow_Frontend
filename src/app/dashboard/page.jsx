"use client"

// import DiamondRingAnimation from '@/components/dashboard/DiamondRingAnimation'
import ExclusiveDeals from '../../components/dashboard/ExclusiveDeals'
import MenuServices from '../../components/dashboard/MenuServices'
import SpecialOffer from '../../components/dashboard/SpecialOffer'
import Ticker from '../../components/dashboard/Ticker'
import TradeHub from '../../components/dashboard/TradeHub'
import WhyChoose from '../../components/dashboard/WhyChoose'
import React from 'react'

const page = () => {
    return (
        <main className="overflow-x-hidden">
      
            {/* <DiamondRingAnimation /> */}
            <Ticker />
            <WhyChoose />
            <MenuServices />
            <SpecialOffer />
            <TradeHub />
            <ExclusiveDeals />


        </main>
    )
}

export default page