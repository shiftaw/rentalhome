import React, { useState } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
export default function AddressPicker({ onSelect }) {
  const [address, setAddress] = useState('')

  const handleSelect = async (value) => {
    setAddress(value)
    onSelect(value)
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className='overflow-hidden'>
          <input
            className=' zoom-in-0 w-full text-sm focus:border-blue-300 focus:outline-hidden border-gray-300 border p-2 rounded-md'
            {...getInputProps({ placeholder: 'Enter address...' })}
          />
          <div className='bg-[#f1f1f1] max-[100px] '>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => (
              <div
                className='p-2 '
                key={suggestion.placeId}
                {...getSuggestionItemProps(suggestion)}
              >
                {suggestion.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}
