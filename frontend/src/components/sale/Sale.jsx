import React from 'react'
import { Link } from 'react-router-dom'
import saleImg3 from '../../assets/images/saleImg3.jpg'
import one7 from '../../assets/images/one7.jpg'
import salei from '../../assets/images/salei.jpg'


const Sale = () => {
  return (
    <div className=" mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10 lg:max-w-[85rem]">
        <div className="w-full md:w-2/3 lg:w-2/3 xl:3/5 h-full">
            <Link  to=''>
            <img src={salei} alt="" className='h-full w-full object-cover'/>
            </Link>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/3 xl:2/5 h-auto flex flex-col gap-4 lg:gap-10">
            <div className="h-1/2 w-full">
                <Link>
            <img src={one7} alt="" className='h-full w-full  object-cover'/>

                </Link>
            </div>
            <div className="h-1/2 w-full">
                <Link>
            <img src={saleImg3} alt="" className='h-full w-full object-cover' />

                </Link>
            </div>

        </div>
    </div>
  )
}

export default Sale