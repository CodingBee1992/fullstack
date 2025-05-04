import React from 'react'

const Modal = ({isOpen,onClose,children}) => {
  return (
    <div>
        {isOpen && (
            <div className='fixed flex items-center justify-center  z-50 inset-0'>
                <div className='fixed inset-0 bg-black opacity-50'></div>
                <div className='absolute top-[40%] left-[20%] bg-white p-4 rounded-lg z-10 text-right'>
                    <button onClick={onClose} className='mr-2 text-black font-semibold hover:text-gray-700'>X</button>
                    {children}
                </div>
            </div>
        )}
    </div>
  )
}

export default Modal