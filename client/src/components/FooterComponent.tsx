// components/FooterComponent.tsx
import React from 'react'

const FooterComponent: React.FC = () => {
	return (
		<footer className="text-neutral-700 dark:text-white w-full flex flex-col items-center justify-between p-4 h-auto dark:bg-neutral-700 bg-white shadow-md z-10">
			<div className="w-full flex justify-between items-center mb-4">
				<div className="text-lg font-bold">
					&copy; {new Date().getFullYear()} Finance App
				</div>
				<div className="flex justify-center items-center space-x-4">
					<a href="/privacy" className="text-sm hover:underline">
						Privacy Policy
					</a>
					<a href="/terms" className="text-sm hover:underline">
						Terms of Service
					</a>
					<a href="/contact" className="text-sm hover:underline">
						Contact Us
					</a>
				</div>
			</div>
		</footer>
	)
}

export default FooterComponent
