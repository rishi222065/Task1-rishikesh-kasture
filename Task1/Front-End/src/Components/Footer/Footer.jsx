import React from 'react'
import './Footer.css'
import footer_logo from "../Assets/logo_big.png"
import instagram_icon from  "../Assets/instagram_icon.png";
import pintester_icon from "../Assets/pintester_icon.png"
import whatsapp_icon from  "../Assets/whatsapp_icon.png"


const Footer = () => {
  return (
    <div className='Footer'>
        
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>SHOOPER</p>
        </div>

        <ul className='footer-links'>
            <li>company</li>
            <li>products</li>
            <li>offices</li>
            <li>about</li>
            <li>contact</li>
        </ul>
        <div className="footer-social-icons">

            <div className="footer-icons-container">
                <img src={instagram_icon} alt="" />
            </div>

            <div className="footer-icons-container">
                <img src={pintester_icon} alt="" />
            </div>

            <div className="footer-icons-container">
                <img src={whatsapp_icon} alt="" />
            </div>

            <div className="footer-copyright">
                <hr />
                <p>
                    ©2021 SHOOPER Inc. All rights reserved | Design by
                </p>
            </div>
        
        </div>

    </div>
  )
}

export default Footer