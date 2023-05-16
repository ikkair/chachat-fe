import React from 'react'
import { Link } from "react-router-dom";
import styles from './Button.module.css'

const Button = ({children, width, height, onClick, href, inverse}) => {
  if(!href){
    href = ""
  }
  if(!width){
    width = "100%"
  }
  const inlineStyle = {
    width: `${width}`,
  }
  let type = styles.button
  if (inverse){
    type = styles.buttonInverse
  }
  if (height){
    inlineStyle.height = height
  }
  return (
    <Link href={href}>
      <button className={`${type} rounded`} style={inlineStyle} onClick={onClick}> {children}</button>
    </Link>
  )

}

export default Button