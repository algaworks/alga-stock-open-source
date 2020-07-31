import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'

declare interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = (props) => {
  return <header className="AppHeader">
    <h1>{ props.title }</h1>
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/products">
            Produtos
          </Link>
        </li>
        <li>
          <Link to="/login">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  </header>
}

export default Header