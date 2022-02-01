import React, { useState, useEffect } from 'react'

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import MainHeader from './components/MainHeader/MainHeader'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	// isLoggedIn состояние = выполнилось ли Logged In
	// setIsLoggedIn примет true или false
	// если примет true  рендерится компонента HOME
	// А КОМПОНЕНТА LOGIN исчезнет 
	// 




	useEffect(() => {
		const storedUserLoggedInfo = localStorage.getItem('isLoggedin')
		if (storedUserLoggedInfo === '1') {
			setIsLoggedIn(true)
			// если storedUserLoggedInfo равен 1 то в  функцию setIsLoggedIn сохранится rue
		}
	}, [])


	// Onlogin submitHandler

	const loginHandler = (email, password) => {
		// loginHandler сработатет когда сработает событие onLogin
		// onLogin находится в submitHandler
		// при работе loginHandler обращаемся в localStorage
		// local storage написали внутри события
		// setItem сработает когда loginHandler вызовится в submitHandler

		localStorage.setItem('isLoggedin', '1')
		setIsLoggedIn(true)
	} 

	const logoutHandler = () => {
		setIsLoggedIn(false)
		// если не будет setIsLoggedIn(false). removeItem сработает
		// но рирендора не будет 
		// компонента login не выйдет
		// поэтому false)
		localStorage.removeItem('isLoggedin')
	}

	return (
		<React.Fragment>
			<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
			<main>
				{!isLoggedIn && <Login onLogin={loginHandler} />}
				{isLoggedIn && <Home onLogout={logoutHandler} />}
			</main>
		</React.Fragment>
	)
}

export default App
