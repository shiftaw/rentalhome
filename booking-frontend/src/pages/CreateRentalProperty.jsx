import { CheckBoxWithLabel } from '@/components/CheckboxWithLable'
import { DatePicker } from '@/components/DatePicker'
import { InputWithLabel } from '@/components/InputWithLable'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import SelectorWithLabel from '@/components/SelectorWithLable'
import { data } from 'react-router-dom'
import MultiImageUploader from '@/components/MultiImageUploader'
import AddressPicker from '@/components/Address'
import { RequireAuth } from '@/ProtectedRoute'

export default function CreateRentalProperty() {
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [newRent, setNewRent] = useState({
    title: '',
    rooms: '',
    area: '',
    month_rent: '',
    deposit: '',
    prepaid_rent: '',
    sharable: false,
    pets_allowed: false,
    senior_friendly: false,
    for_student_only: false,
    elevator: false,
    parking: false,
    balcony: false,
    charging_station: false,
    dishwasher: false,
    washing_machine: false,
    tumbler_dryer: false,
    refrigerator: false,
    furnished: false,
    digital_display: false,
    message_via_app: false,
    telephone_contact: false,
    telephone_number: '',
    description: '',
    rent_period: '1 year',
    available_from: '',
  })
  const onValueChange = (name) => (e) => {
    let value = e

    if (typeof e === 'object') {
      value = e.target.value
    }
    setNewRent({ ...newRent, [name]: value })
  }

  const handleDatePicked = (date) => {
    setNewRent((prev) => ({ ...prev, available_from: date }))
  }
  const onSubmit = () => {
    const token = localStorage.getItem('token')
    const formData = new FormData()
    Object.keys(newRent).map((v) => {
      formData.append(v, newRent[v])
    })
    images.map((v) => {
      formData.append('images', v)
    })
    axios
      .post('/api/rent/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Don't set this manually, Axios will do it automatically
        },
      })
      .then((data) => {
        console.log(data)
      })
  }
  return (
    <RequireAuth>
      <div
        className='flex flex-col items-center gap-2 bg-white '
        style={{ background: 'rgb(247, 247, 247)' }}
      >
        <div className=' pb-12  max-w-md bg-white border px-4  pt-8'>
          <div className='py-4 mb-2'>
            <SelectorWithLabel
              options={['Room', 'Apartment', 'House']}
              onValueChange={onValueChange('type')}
              label={' Housing type'}
              value={''}
              placeholder='type'
              important
            ></SelectorWithLabel>
          </div>
          <div className='flex gap-4'>
            <InputWithLabel
              label='Rooms'
              value={newRent.rooms}
              important
              onValueChange={onValueChange('rooms')}
              type='number'
            ></InputWithLabel>
            <InputWithLabel
              label='Area(m2)'
              value={newRent.area}
              important
              onValueChange={onValueChange('area')}
              type='number'
            ></InputWithLabel>
          </div>
          <div className='flex pt-8 '>
            <InputWithLabel
              label='Monthly rent'
              value={newRent.month_rent}
              important
              onValueChange={onValueChange('month_rent')}
              type='number'
            ></InputWithLabel>
          </div>
          <div className='flex pt-8 '>
            <InputWithLabel
              label='Deposit'
              value={newRent.deposit}
              important
              onValueChange={onValueChange('deposit')}
              type='number'
            ></InputWithLabel>
          </div>
          <div className='pt-4'>
            <div className='font-thin'>
              Address <span className='text-red-500'>*</span>
            </div>
            <AddressPicker onSelect={onValueChange('address')}></AddressPicker>
          </div>

          <div className='flex pt-4 '>
            <Select />
          </div>
          <div className='flex flex-col pt-4 '>
            <Label htmlFor='inp' className='font-thin pb-2 '>
              Available from {<span className='text-red-600'>*</span>}
            </Label>
            <DatePicker onValueChange={handleDatePicked} />
          </div>
          <div className='py-4'>
            <SelectorWithLabel
              options={[
                '< 3 Months',
                '3 Months',
                '6 Months',
                '1 year',
                '2 years',
                '3 years',
                'Unlimited',
              ]}
              onValueChange={onValueChange('rent_period')}
              label={'Rent period'}
              value={''}
              placeholder='Select period'
              important
            ></SelectorWithLabel>
          </div>
          <div className='flex flex-col gap-2 pt-8'>
            <div className='font-bold'> LifeStyle</div>
            <div className='flex flex-col gap-2'>
              <CheckBoxWithLabel
                label='Shareable'
                onChange={onValueChange('sharable')}
              />
              <CheckBoxWithLabel
                label='Pets allowed'
                onChange={onValueChange('pets_allowed')}
              />
              <CheckBoxWithLabel
                label='Senior friendly'
                onChange={onValueChange('senior_friendly')}
              />
              <CheckBoxWithLabel
                label='For students only'
                onChange={onValueChange('for_student_only')}
              />
              <CheckBoxWithLabel
                label='For family'
                onChange={onValueChange('for_family_only')}
              />
              <CheckBoxWithLabel
                label='For single'
                onChange={onValueChange('for_single_only')}
              />
            </div>
          </div>

          <div className='flex flex-col gap-2 pt-8'>
            <div className='font-bold'> Facility</div>
            <div className='flex flex-col gap-2'>
              <CheckBoxWithLabel
                label='Elevator'
                checked={newRent.elevator}
                onChange={onValueChange('elevator')}
              />
              <CheckBoxWithLabel
                label='Parking'
                checked={newRent.parking}
                onChange={onValueChange('parking')}
              />
              <CheckBoxWithLabel
                label='Balcony/Terrace'
                checked={newRent.balcony}
                onChange={onValueChange('balcony')}
              />
              <CheckBoxWithLabel
                label='Charging station'
                checked={newRent.charging_station}
                onChange={onValueChange('charging_station')}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 pt-8'>
            <div className='font-bold'> Inventory</div>
            <div className='flex flex-col gap-2'>
              <CheckBoxWithLabel
                label='Dishwasher'
                checked={newRent.dishwasher}
                onChange={onValueChange('dishwasher')}
              />
              <CheckBoxWithLabel
                label='Washing machine'
                checked={newRent.washing_machine}
                onChange={onValueChange('washing_machine')}
              />
              <CheckBoxWithLabel
                label='Tumble dryer'
                checked={newRent.tumbler_dryer}
                onChange={onValueChange('tumbler_dryer')}
              />
              <CheckBoxWithLabel
                label='Refrigerator'
                checked={newRent.refrigerator}
                onChange={onValueChange('refrigerator')}
              />
              <CheckBoxWithLabel
                label='Furnished'
                checked={newRent.furnished}
                onChange={onValueChange('furnished')}
              />
            </div>
          </div>
          <div className='flex pt-8 '>
            <InputWithLabel
              value={newRent.title}
              label='Title'
              onValueChange={onValueChange('title')}
              important
            ></InputWithLabel>
          </div>
          <div className='flex pt-8  flex-col'>
            <Label className='font-thin py-2'>
              Description<span className='w-[1px] text-red-600'>*</span>
            </Label>
            <Textarea
              value={newRent.description}
              onChange={onValueChange('description')}
            />
          </div>
          <div className='pt-8'>
            <MultiImageUploader
              setImages={setImages}
              setPreviews={setPreviews}
              previews={previews}
              images={images}
            ></MultiImageUploader>
          </div>
          <div className='flex pt-8 flex-col'>
            <div>Display(option)</div>
            <CheckBoxWithLabel
              checked={newRent.digital_display}
              border={false}
              label='Digital display'
              onChange={onValueChange('digital_display')}
            />
          </div>
          <div className='flex pt-8  flex-col gap-2'>
            <div>Contact options</div>
            <div>
              <CheckBoxWithLabel
                checked={newRent.message_via_app}
                border={false}
                label='Messages via Shola'
                onChange={onValueChange('message_via_app')}
              />
            </div>
            <div>
              <CheckBoxWithLabel
                checked={newRent.telephone_contact}
                border={false}
                label='Telephone'
                onChange={onValueChange('telephone_contact')}
              />
            </div>
          </div>
          <div className='flex gap-2 mt-4'>
            <Button variant='secondary' className='w-max-sm w-full rounded'>
              Save draft
            </Button>
            <Button onClick={onSubmit} className='w-max-sm w-full rounded'>
              Rent
            </Button>
          </div>
        </div>
      </div>
    </RequireAuth>
  )
}
