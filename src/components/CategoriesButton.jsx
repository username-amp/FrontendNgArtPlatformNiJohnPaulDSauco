import React from 'react'

const CategoriesButton = ({ label, onClick}) => {
  return (
    <button
        onClick={onClick}
        className='px-4 py-2 bg-blue-500 text-white rouded-lg hover:bg-blue-600 transition-all w-3/6'
    >
        {label}
    </button>
  )
}

export default CategoriesButton