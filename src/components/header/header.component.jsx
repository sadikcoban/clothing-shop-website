import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import CartIcon from "../cart-icon/cart-icon.component"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"

import { ReactComponent as Logo } from "../../assets/crown.svg" //way to import svg
import { auth } from "../../firebase/firebase.utils"
import "./header.styles.scss"

import {createStructuredSelector} from "reselect"

import {selectCartHidden} from "../../redux/cart/cart-selectors"

import {selectCurrentUser} from "../../redux/user/user-selector"

const Header = (props) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>
      {props.currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          sign out
        </div>
      ) : (
        <Link className="option" to="/signin">
          sign in
        </Link>
      )}

      <CartIcon />
    </div>
    {props.hidden ? null : <CartDropdown />}
  </div>
)

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps, null)(Header)
