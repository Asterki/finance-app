import React from 'react'
import { motion } from 'framer-motion'

import { useAuth } from '../'
import { useNavigate } from 'react-router-dom'

const LogoutComponent: React.FC = () => {
	const navigate = useNavigate()
	const { logout } = useAuth()

	return (
		<motion.form
			variants={{
				hidden: { opacity: 0, y: -50 },
				showing: { opacity: 1, y: 0 },
			}}
			initial="hidden"
			animate="showing"
			transition={{ duration: 0.5 }}
			className="bg-white dark:bg-neutral-700 rounded-sm shadow-md p-6 w-full"
		>
			<div className="flex flex-col items-center gap-2">
				<img src="/icon.svg" className="w-8" />
				<h1 className="text-xl font-semibold mb-2 dark:text-white text-neutral-700">
					Finance App
				</h1>
			</div>

			<p className="text-center dark:text-white text-neutral-700">
				Click the button below to logout of your account.
			</p>

			<div className="mt-8">
				<button
					type="button"
					onClick={() => {
						logout()
						navigate('/')
					}}
					className="w-full p-2 bg-blue-400 hover:bg-purple-400 rounded-md text-white shadow-md shadow-blue-300 hover:shadow-lg hover:shadow-purple-300 transition-all dark:shadow-none dark:hover:shadow-none"
				>
					Logout
				</button>
			</div>
		</motion.form>
	)
}

export default LogoutComponent
