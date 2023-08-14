import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './footer.css';
export default function Footer() {
  return (
    <div className='footer'>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">

              <p className="text">
              COPYRIGHT &copy; 2023 AHMAD SULTAN
              </p>
            </div>
            <div className="col-sm-6">
              <div className="iconDiv">
                <a href="https://instagram.com/kingahmad2015?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D" className='icon instagram' target='_blank'>
                  <FontAwesomeIcon icon="fa-brands fa-instagram" />
                </a>
                <a href="https://www.linkedin.com/in/ahmad-sultan-7a63a7240" className='icon linkedin' target='_blank'>
                  <FontAwesomeIcon icon="fa-brands fa-linkedin" />
                </a>
                <a href="mailto:as5049859@gmail.com" className='icon email' target='_blank'>
                  <FontAwesomeIcon icon="fa-solid fa-envelope" />
                </a>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
