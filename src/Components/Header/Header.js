import React from 'react'


import styles from './Header.module.css'
import logo from '../../Assets/chat.png'

const Header = () => {
  return (
    <div className={styles.header}><img src={logo} alt="Logo"/>Messaging App</div>
  )
}

export default Header