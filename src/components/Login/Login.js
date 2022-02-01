import React, { useState } from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'
import { useEffect } from 'react'

const Login = (props) => {
	const [enteredEmail, setEnteredEmail] = useState('')
	// для ввода электронной почты

	const [emailIsValid, setEmailIsValid] = useState(false)
	// проверяет действенная ли электронная почта которую ввели

	const [enteredPassword, setEnteredPassword] = useState('')
	// для ввода пароля

	const [passwordIsValid, setPasswordIsValid] = useState()
	// проверка пароля

	const [formIsValid, setFormIsValid] = useState(false)
	// проверка формы. валидная/действенная или нет
	// если форма пустая он остается false
	// если форма заполнена то будет true

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('VALID')
			setFormIsValid(
				enteredEmail.includes('@') && enteredPassword.trim().length > 6,
			)
		}, 1000)

		return () => {
			console.log('clean up')
			clearTimeout(identifier)
		}
	}, [enteredEmail, enteredPassword])

	//    useEffect сработает когда enteredEmail и enteredPassword изменятся

	const emailChangeHandler = (event) => {
		setEnteredEmail(event.target.value)
		// вызываются внутри инпута при помощи onChange
		// ---------------------------------------------------------------------
		// setFormIsValid(
		// 	event.target.value.includes('@') &&
		// 		enteredPassword.trim().length > 6,

		// убрали этот лишний код. проверка работает теперь в useeffect вверху

		// так же вызывается setFormIsValid. берет value и проверяет на наличие "@"
		// проверяется введенный пароль. задается условие чтобы пароль был больше 6 символов
		// эти 2 условия должны быть true
		// такая же логика стоит в passwordChangeHandler
		// там и там задается это условие для того чтобы, если в двух местах будет true то formIsValid будет true
		// и  потом если formIsValid будет true вызывается submitHandler
		// ----------------------------------------------------------------------
	}

	const passwordChangeHandler = (event) => {
		setEnteredPassword(event.target.value)
	}

	const validateEmailHandler = () => {
		setEmailsubmitHandler(enteredEmail.includes('@'))
		// если в электронной почте есть  @  = будет Valid = возвращает true
	}

	const validatePasswordHandler = () => {
		setPasswordIsValid(enteredPassword.trim().length > 6)
		// если в пароле больше 6 элементов = возвращает true
		// true сохроняется в useState(true)

		// validateEmailHandler и validatePasswordHandler относятся к ивенту оnBlur
	}

	const submitHandler = (event) => {
		event.preventDefault()
		props.onLogin(enteredEmail, enteredPassword)
	}

	// ивент onBlur принимает булеан значения
	// и исходя от того true or false будет работать
	// если true работают одни стили
	// если false работают другие стили / и не меняется пока пользователь не введет правильные пароль и почту

	// функция disabled у кнопки
	// он будет true когда у formIsValid все условия полностью будут true

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailIsValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						value={enteredEmail}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordIsValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={enteredPassword}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button
						type='submit'
						className={classes.btn}
						disabled={!formIsValid}
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	)
}

export default Login
