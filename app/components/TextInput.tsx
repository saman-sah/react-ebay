"use client"

import type { TextInputProps } from '../types'

export default function TextInput({ string, placeholder, error, onUpdate }: TextInputProps) {
  return (
    <>
      <input
        placeholder={placeholder}
        className='w-full bg-white text-gray-800 border text-sm border-[#272727] p-3 placeholder-gray-500 focus:outline-none'
        type='text'
        value={string || ''}
        onChange={(event) => onUpdate(event.target.value)}
        autoComplete='off'
      />
      <div className='text-red-500 text-[14px] font-semibold'>
        {error ? (error) : null}
      </div>
    </>
  )
}