import React, { useState } from 'react'

function MultiImageUploader({ setImages, setPreviews, images, previews }) {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages(files)
    setPreviews(files.map((file) => URL.createObjectURL(file)))
  }

  const handleRemove = (indexToRemove) => {
    const updatedImages = images.filter((_, i) => i !== indexToRemove)
    const updatedPreviews = previews.filter((_, i) => i !== indexToRemove)

    setImages(updatedImages)
    setPreviews(updatedPreviews)
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: 10,
          marginBottom: 16,
          gap: 10,
        }}
      >
        {previews.map((src, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <img
              src={src}
              alt={`preview-${i}`}
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
            <button
              onClick={() => handleRemove(i)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'red',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 6px',
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <label
        htmlFor='upload'
        className='cursor-pointer bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700'
      >
        Upload images
      </label>
      <span className='px-4'>{images.length == 0 && 'No images chosen'}</span>
      <input
        id='upload'
        type='file'
        accept='image/*'
        multiple
        onChange={handleImageChange}
        className='hidden'
      />
    </div>
  )
}

export default MultiImageUploader
