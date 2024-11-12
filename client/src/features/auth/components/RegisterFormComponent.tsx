import React from 'react'
import { Link } from 'react-router-dom'

// Icons
import {
	HiOutlineMail,
	HiOutlineLockClosed,
	HiOutlineUserCircle,
	HiEye,
	HiEyeOff,
} from 'react-icons/hi'
import { FaMoneyBill, FaSpinner } from 'react-icons/fa'

import { motion } from 'framer-motion'

import { User } from '../../../../../shared/models'

interface LoginFormProps {
	onSubmit: (
		email: string,
    name: string,
    currency: string,
    password: string,
    repeatPassword: string
	) => Promise<void>
	registerLoading: boolean
	user?: User | null
	authStatus: string
}

const RegisterForm: React.FC<LoginFormProps> = ({
	onSubmit,
	registerLoading,
	user,
	authStatus,
}) => {
	const [passwordVisible, setPasswordVisible] = React.useState(false)
	const [repeatPasswordVisible, setRepeatPasswordVisible] =
		React.useState(false)

	const nameRef = React.useRef<HTMLInputElement>(null)
	const emailRef = React.useRef<HTMLInputElement>(null)
	const currencyRef = React.useRef<HTMLInputElement>(null)
	const passwordRef = React.useRef<HTMLInputElement>(null)
	const repeatPasswordRef = React.useRef<HTMLInputElement>(null)

	const handleSubmit = async () => {
    const email = emailRef.current?.value || ''
    const username = nameRef.current?.value || ''
    const currency = currencyRef.current?.value || ''
    const password = passwordRef.current?.value || ''
    const repeatPassword = repeatPasswordRef.current?.value || ''

		await onSubmit(email, username, currency, password, repeatPassword)
	}

	return (
		<motion.form
			variants={{
				hidden: { opacity: 0, y: -50 },
				showing: { opacity: 1, y: 0 },
			}}
			initial="hidden"
			animate="showing"
			transition={{ duration: 0.5 }}
			className="bg-white dark:bg-neutral-700 rounded-sm shadow-md p-6 md:w-4/12"
		>
			<div className="flex flex-col items-center">
				<img src="/icon.svg" className="w-8" />
				<h1 className="text-xl font-semibold mb-2 dark:text-white">
					Finance App
				</h1>
			</div>

			<div className="my-4">
				<label
					className="font-bold dark:text-white flex items-center gap-[2px]"
					htmlFor="name-input"
				>
					<HiOutlineUserCircle className="inline-block" />
					Name
				</label>
				<input
					id="name-input"
					type="text"
					autoComplete="name"
					ref={nameRef}
					placeholder="Your Name"
					className="w-full p-2 dark:bg-neutral-600 border-2 dark:border-neutral-600 border-slate-200  outline-none rounded-md transition-all focus:!border-blue-400 hover:border-slate-300 dark:hover:border-neutral-500 dark:text-white"
				/>
			</div>

			<div className="my-4">
				<label
					className="font-bold dark:text-white flex items-center gap-[2px]"
					htmlFor="email-input"
				>
					<HiOutlineMail className="inline-block" />
					Email
				</label>
				<input
					type="email"
					autoComplete="email"
					id="email-input"
					ref={emailRef}
					placeholder="Your email"
					className="w-full p-2 dark:bg-neutral-600 border-2 dark:border-neutral-600 border-slate-200  outline-none rounded-md transition-all focus:!border-blue-400 hover:border-slate-300 dark:hover:border-neutral-500 dark:text-white"
				/>
			</div>

			<div className="my-4 relative">
				<label
					className="font-bold dark:text-white flex items-center gap-[2px]"
					htmlFor="currency-input"
				>
					<FaMoneyBill className="inline-block" />
					Currency
				</label>
				<div className="relative">
					<input
						type="text"
						id="currency-input"
						autoComplete="off"
						ref={currencyRef}
						placeholder="EUR"
						className="w-full p-2 dark:bg-neutral-600 border-2 dark:border-neutral-600 border-slate-200  outline-none rounded-md transition-all focus:!border-blue-400 hover:border-slate-300 dark:hover:border-neutral-500 dark:text-white"
					/>
				</div>
			</div>

			<div className="my-4 relative">
				<label
					className="font-bold dark:text-white flex items-center gap-[2px]"
					htmlFor="password-input"
				>
					<HiOutlineLockClosed className="inline-block" />
					Password
				</label>
				<div className="relative">
					<input
						id="password-input"
						autoComplete="new-password"
						type={passwordVisible ? 'text' : 'password'}
						ref={passwordRef}
						placeholder="••••••••"
						className="w-full p-2 dark:bg-neutral-600 border-2 dark:border-neutral-600 border-slate-200  outline-none rounded-md transition-all focus:!border-blue-400 hover:border-slate-300 dark:hover:border-neutral-500 dark:text-white"
					/>

					<button
						className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
						type="button"
						onClick={() => {
							setPasswordVisible(!passwordVisible)
						}}
					>
						{passwordVisible ? <HiEye /> : <HiEyeOff />}
					</button>
				</div>
			</div>

			<div className="my-4 relative">
				<label
					className="font-bold dark:text-white flex items-center gap-[2px]"
					htmlFor="repeat-password-input"
				>
					<HiOutlineLockClosed className="inline-block" />
					Repeat Password
				</label>
				<div className="relative">
					<input
						type={repeatPasswordVisible ? 'text' : 'password'}
						id="repeat-password-input"
						autoComplete="new-password"
						ref={repeatPasswordRef}
						placeholder="••••••••"
						className="w-full p-2 dark:bg-neutral-600 border-2 dark:border-neutral-600 border-slate-200  outline-none rounded-md transition-all focus:!border-blue-400 hover:border-slate-300 dark:hover:border-neutral-500 dark:text-white"
					/>

					<button
						className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
						type="button"
						onClick={() => {
							setRepeatPasswordVisible(!repeatPasswordVisible)
						}}
					>
						{repeatPasswordVisible ? <HiEye /> : <HiEyeOff />}
					</button>
				</div>
			</div>

			<div className="mt-8">
				<button
					className="w-full p-2 bg-blue-400 hover:bg-purple-400 rounded-md text-white shadow-md shadow-blue-300 hover:shadow-lg hover:shadow-purple-300 transition-all dark:shadow-none dark:hover:shadow-none"
					type="button"
					onClick={handleSubmit}
				>
					{registerLoading && (
						<FaSpinner className="animate-spin inline-block" />
					)}
					Register
				</button>
			</div>

			{authStatus == 'authenticated' && (
				<div className="mt-4 dark:text-white">
					<span className="font-bold">Important Notice:</span> You're
					already logged in as{' '}
					<span className="font-semibold">{user?.name}</span>, by
					registering a new account you will be logged out from this
					account.{' '}
					<Link to="/home" className="text-blue-500 hover:underline">
						Return Home
					</Link>
				</div>
			)}
		</motion.form>
	)
}

export default RegisterForm
