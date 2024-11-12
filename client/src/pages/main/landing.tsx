import { useNavigate } from 'react-router-dom'

import PageLayout from '../../layouts/PageLayout'

const LandingPage = () => {
	const navigate = useNavigate()

	return (
		<PageLayout className="min-h-screen bg-[url('/img/bg.jpg')]">
			<section className="min-h-screen flex">
				<div className="md:w-1/2 w-full flex flex-col items-center justify-center bg-black/20 backdrop-blur-md p-4">
					<img src="/icon.svg" className="w-96" />

					<h1 className="text-5xl text-center font-bold text-white">
						Welcome to this financial app
					</h1>
					<p className="text-white text-center mt-2">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Animi dolorum officia voluptates quasi iste cupiditate
						provident, autem, quaerat nemo eaque tempora vero
						molestiae et. Sapiente adipisci veritatis hic numquam
						sit.
					</p>

					<div className="flex gap-2 mt-2">
						<button
							onClick={() => {
								navigate('/register')
							}}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm transition-all"
						>
							Sign Up
						</button>
						<button
							onClick={() => {
								navigate('/login')
							}}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm transition-all"
						>
							Log In
						</button>
					</div>
				</div>
			</section>
		</PageLayout>
	)
}

export default LandingPage
