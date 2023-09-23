import Link from 'next/link'
import React from 'react'
import '@/Styles/footer.css'

const footer = () => {
  return (
    <>
    <div className="foot">
        <span className="link-foot1">
            <Link href='/' className='link-foot'>Instagram</Link>
            <Link href="/" className='link-foot'>Twitter</Link>
            <Link href="/" className='link-foot'>Facebook</Link>
            <Link href="/" className='link-foot'>Whatsapp</Link>
        </span>
        <span className="foot-text">
            copyright to @sumitkkumar639
        </span>
    </div>
    </>
  )
}

export default footer