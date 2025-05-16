import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddItem from '@/components/AddItem'
import Category from '@/components/Category'
import { useParams, Link, useLocation } from 'react-router-dom'

export default function CountryApartmentList() {
  const [properties, setProperties] = useState([])
  const params = useParams()
  const location = useLocation()
  console.log('location', location)
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/api${location.pathname}/`)
      setProperties(JSON.parse(response.data))
    }
    fetchData()
  }, [location])

  return (
    <div className='flex flex-col  p-4 gap-4'>
      <div className='text-4xl font-semibold'>
        Rents available in {params.city}{' '}
        <span className='text-sm font-normal text-[#686868]'>
          {properties.length} places found
        </span>
      </div>
      <Category></Category>
      {properties.map((ad) => {
        const addressArr = ad.address.split(',')
        const city = addressArr[addressArr.length - 2]
        return (
          <Link to={`/rent/${params.city || city}/detail/${ad._id}`}>
            <AddItem {...ad}></AddItem>
          </Link>
        )
      })}
    </div>
  )
}
