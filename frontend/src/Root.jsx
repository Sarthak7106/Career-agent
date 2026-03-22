import { useState } from 'react'
import './index.css'
import App from './App'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import LoginModal from './components/LoginModal'

export default function Root() {
  const [page, setPage] = useState('home')
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <Navbar
        page={page}
        setPage={setPage}
        onLoginClick={() => setShowLogin(true)}
      />
      {page === 'home' && (
        <HomePage
          onStartAssessment={() => setPage('dashboard')}
          onLoginClick={() => setShowLogin(true)}
        />
      )}
      {page === 'dashboard' && (
        <App onGoHome={() => setPage('home')} />
      )}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
    </>
  )
}
