import "./App.css"

import HomePage from "./pages/homepage/homepage.component"
import ShopPage from "./pages/shop/shop.component"
import Header from "./components/header/header.component"
import Auth from "./pages/auth/auth.component"
import Checkout from "./pages/checkout/checkout.component.jsx"

import { auth, createUserProfileDocument } from "./firebase/firebase.utils"

import { Route, Switch, Redirect } from "react-router-dom"
import React from "react"
import { connect } from "react-redux"
import { setCurrentUser } from "./redux/user/user-actions"
import { selectCurrentUser } from "./redux/user/user-selector"
import { createStructuredSelector } from "reselect"

class App extends React.Component {
  //function to be used when the component is unmounted
  //close the connection to firebase
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          })
        })
      }
      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={Checkout}/>
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <Auth />
            }
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
