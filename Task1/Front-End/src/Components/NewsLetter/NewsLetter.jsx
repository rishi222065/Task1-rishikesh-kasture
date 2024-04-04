import React from 'react'
import './NewsLetter.css'


const NewsLetter = () => {
  return (
    <div className='NewsLetter'>
        <h1>get offer on your email</h1>
        <p>Subscribe to our newsletter and get exclusive offers directly in your mailbox.</p>
        <div>
            <input type="email" placeholder='Ypur Email-ID '/>
            <button>subscribe</button>
        </div>

    </div>
  )
}

export default NewsLetter