import { CheckBoxWithLabel } from '@/components/CheckboxWithLable'
import { DatePicker } from '@/components/DatePicker'
import { InputWithLabel } from '@/components/InputWithLable'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import React, { useState } from 'react'
import { data } from 'react-router-dom'

export default function CreateRentalProperty() {
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
    for_family: false,
    for_single: false,
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
  })
  const onValueChange = (name) => (e) => {
    let value = e
    if (typeof e === 'object') {
      value = e.target.value
    }
    setNewRent({ ...newRent, [name]: value })
  }
  const onSubmit = () => {
    console.log(newRent)
    const data = {
      title: newRent.title,
      description: 'newRent.description',
      rooms: newRent.rooms,
      area: newRent.area,
      month_rent: newRent.month_rent,
      prepaid_rent: newRent.prepaid_rent,
      deposit: newRent.deposit,
      status: 'draft',
    }
    axios
      .post('/api/rent/create', JSON.stringify(newRent), {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((data) => {
        console.log(data)
      })
  }
  return (
    <div
      className='flex flex-col items-center gap-2 bg-white '
      style={{ background: 'rgb(247, 247, 247)' }}
    >
      <div className='py-16  max-w-md bg-white border px-4'>
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
        <div className='flex pt-8 '>
          <InputWithLabel
            label='Prepaid rent'
            value={newRent.prepaid_rent}
            important
            onValueChange={onValueChange('prepaid_rent')}
            type='number'
          ></InputWithLabel>
        </div>
        <div className='flex pt-8 '>
          <Select />
        </div>
        <div className='flex pt-8 '>
          <DatePicker />
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
        <div className='flex pt-8 '>
          <Textarea
            value={newRent.description}
            onChange={onValueChange('description')}
          />
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
              label='Messages via BoligPortal'
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
        <div className='flex gap-2'>
          <Button variant='secondary' className='w-max-sm w-full rounded'>
            Save draft
          </Button>
          <Button onClick={onSubmit} className='w-max-sm w-full rounded'>
            Rent
          </Button>
        </div>
      </div>
    </div>
  )
}
