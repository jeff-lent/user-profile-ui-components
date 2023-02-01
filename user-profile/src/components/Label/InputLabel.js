import React from 'react'
export default function InputLabel({className, text}) {
  return (
    <>
            <label htmlFor='' className={`${className}`}>{`${text}:`}</label>
    </>
  )
}