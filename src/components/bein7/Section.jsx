import React from 'react'

function Section({ children, ...props }) {
  return (
    <div {...props} className={`w-screen ${props.className}`}>
      {children}
    </div>
  )
}

export default Section