import React from 'react'
import './head.css';
export default function Head(mainTitle) {
  return (
    <header className='header'>
        <div className="container">
        <h1 className="mainTitle">
          {
            mainTitle.mainTitle
          }
        </h1>
        </div>
    </header>
  )
}
