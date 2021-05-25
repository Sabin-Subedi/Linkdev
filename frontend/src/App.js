import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import VerifyScreen from './screens/VerifyScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import 'emoji-mart/css/emoji-mart.css'
import ProfileScreen from './screens/ProfileScreen'

const App = () => {
  return (
    <Router>
      <main>
        <Route path='/register' component={RegisterScreen} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/forgotpassword' component={ForgotPasswordScreen} />
        <Route path='/profile/:id' component={ProfileScreen} />
        <Route path='/verify/:token' component={VerifyScreen} />
        <Route path='/verified' component={VerifyScreen} />
        <Route path='/' component={HomeScreen} exact />
      </main>
    </Router>
  )
}

export default App
