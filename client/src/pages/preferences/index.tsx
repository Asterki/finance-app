import * as React from 'react'
import QRCode from 'qrcode'
import { allTimezones } from 'react-timezone-select'
import speakeasy from 'speakeasy'
import * as Select from '@radix-ui/react-select'

import { FaCheck, FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa'

import useNotification from '../../hooks/useNotification'

import { useAuth } from '../../features/auth'
import { usePreferences } from '../../features/preferences'

import PageLayout from '../../layouts/PageLayout'

const PreferencesPage = () => {
	const { notification, showNotification } = useNotification()
	const { user, authStatus } = useAuth()
	const { preferences, updateProfile } = usePreferences()

	const [currentPreferences, setCurrentPreferences] =
		React.useState(preferences)

	const [qrCode, setQrCode] = React.useState('')
	const [secret, setSecret] = React.useState('')
	const [tfaCode, setTfaCode] = React.useState('')

	React.useEffect(() => {
		if (preferences && user) return setCurrentPreferences(preferences)
	}, [preferences, user])

	const saveProfileChanges = async () => {
		if (currentPreferences) {
			const response = await updateProfile(currentPreferences.user)
			if (response) {
				showNotification(
					'Saved',
					'Profile Updated Successfully',
					'success'
				)
			} else {
				showNotification('Error', 'Failed to Update Profile', 'error')
			}
		}
	}

	const generateTFASecret = async () => {
		const secret = speakeasy.generateSecret({
			length: 20,
		}).base32
		setSecret(secret)
		setQrCode(
			speakeasy.otpauthURL({
				secret: secret,
				label: 'Finance App',
				issuer: 'Finance App',
			})
		)
	}

	return (
		<PageLayout
			requiresLogin={true}
			notification={notification}
			className="dark:bg-neutral-600 dark:text-neutral-100"
		>
			<section className="min-h-screen flex">
				<div className="text-2xl border-2 rounded-sm border-neutral-400 p-4">
					<h1 className="">General Settings</h1>

					<div className="mt-2">
						<h2 className="text-xl">App Language</h2>
						{currentPreferences && (
							<Select.Root
								onValueChange={(value) => {
									setCurrentPreferences({
										...currentPreferences,
										user: {
											...currentPreferences.user,
											language: value,
										},
									})
								}}
								defaultValue={currentPreferences.user.language}
							>
								<Select.Trigger className="w-full bg-neutral-700 rounded-sm p-2 flex items-center justify-start gap-2">
									<FaChevronCircleDown />
									{currentPreferences.user.language === 'en'
										? 'English'
										: 'Spanish'}
								</Select.Trigger>
								<Select.Content className="bg-neutral-700 rounded-sm *:p-2 *:outline-none *:transition-all *:cursor-pointer *:bg-neutral-700">
									<Select.Item
										className="hover:brightness-110 flex gap-2 items-center"
										value="en"
									>
										<Select.ItemIndicator>
											<FaCheck />
										</Select.ItemIndicator>
										English
									</Select.Item>
									<Select.Item
										className="hover:brightness-110 flex gap-2 items-center"
										value="es"
									>
										<Select.ItemIndicator>
											<FaCheck />
										</Select.ItemIndicator>
										Spanish
									</Select.Item>
								</Select.Content>
							</Select.Root>
						)}
					</div>

					<div className="mt-2">
						<h2 className="text-xl">Timezone</h2>
						{currentPreferences && (
							<Select.Root
								onValueChange={(value) => {
									setCurrentPreferences({
										...currentPreferences,
										user: {
											...currentPreferences.user,
											timezone: value,
										},
									})
								}}
								defaultValue={currentPreferences.user.timezone}
							>
								<Select.Trigger className="w-full bg-neutral-700 rounded-sm p-2 flex items-center justify-start gap-2">
									<FaChevronCircleDown />
									{currentPreferences.user.timezone}
								</Select.Trigger>
								<Select.Content className="overflow-hidden bg-neutral-700 rounded-sm *:p-2 *:outline-none *:transition-all *:cursor-pointer *:bg-neutral-700">
									<Select.ScrollUpButton className="text-2xl text-red-400 flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
										<FaChevronCircleDown />
									</Select.ScrollUpButton>
									<Select.Viewport className="p-[5px]">
										{Object.keys(allTimezones).map(
											(zone: string) => (
												<Select.Item
													className="hover:brightness-110 flex gap-2 items-center"
													value={zone}
												>
													<Select.ItemIndicator>
														<FaCheck />
													</Select.ItemIndicator>
													{zone}
												</Select.Item>
											)
										)}
									</Select.Viewport>
									<Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
										<FaChevronCircleUp />
									</Select.ScrollUpButton>
								</Select.Content>
							</Select.Root>
						)}
					</div>

					<div className="mt-2">
						<h2 className="text-xl">App Theme</h2>
						{currentPreferences && (
							<Select.Root
								onValueChange={(value) => {
									setCurrentPreferences({
										...currentPreferences,
										user: {
											...currentPreferences.user,
											theme: value,
										},
									})
								}}
								defaultValue={currentPreferences.user.theme}
							>
								<Select.Trigger className="w-full bg-neutral-700 rounded-sm p-2 flex items-center justify-start gap-2">
									<FaChevronCircleDown />
									{currentPreferences.user.theme === 'dark'
										? 'Dark'
										: 'Light'}
								</Select.Trigger>
								<Select.Content className="bg-neutral-700 rounded-sm *:p-2 *:outline-none *:transition-all *:cursor-pointer *:bg-neutral-700">
									<Select.Item
										className="hover:brightness-110 flex gap-2 items-center"
										value="dark"
									>
										<Select.ItemIndicator>
											<FaCheck />
										</Select.ItemIndicator>
										Dark
									</Select.Item>
									<Select.Item
										className="hover:brightness-110 flex gap-2 items-center"
										value="light"
									>
										<Select.ItemIndicator>
											<FaCheck />
										</Select.ItemIndicator>
										Light
									</Select.Item>
								</Select.Content>
							</Select.Root>
						)}
					</div>

					<div className="mt-2">
						<h2 className="text-xl">Currency</h2>
						{currentPreferences && (
							<input
								type="text"
								name=""
								id=""
								className="p-2 bg-neutral-700 rounded-sm"
								placeholder="Your Currency"
								defaultValue={currentPreferences.user.currency}
							/>
						)}
					</div>

					<button
						onClick={() => {
							saveProfileChanges()
						}}
						className="mt-4 rounded-sm bg-green-500 text-white p-2 w-full"
					>
						Save Changes
					</button>
				</div>

				<div className="text-2xl border-2 rounded-sm border-neutral-400 p-4">
					<h1 className="">Security Settings</h1>

					<div className="mt-2">
						<h2 className="text-xl">Two Factor Authentication</h2>
						{qrCode && <img src={qrCode} alt="" />}

						{currentPreferences &&
							!currentPreferences.security.twoFactorEnabled && (
								<button
									onClick={() => {
										generateTFASecret()
									}}
									className="rounded-sm bg-green-500 text-white p-2 w-full"
								>
									Enable TFA
								</button>
							)}
						{currentPreferences &&
							currentPreferences.security.twoFactorEnabled && (
								<button
									onClick={() => {
										saveProfileChanges()
									}}
									className="rounded-sm bg-red-500 text-white p-2 w-full"
								>
									Disable TFA
								</button>
							)}
					</div>

					<div className="mt-4">
						<h2 className="text-xl">Change Password</h2>
						{currentPreferences && <div>ewq</div>}
					</div>

					<button
						onClick={() => {
							saveProfileChanges()
						}}
						className="mt-4 rounded-sm bg-green-500 text-white p-2 w-full"
					>
						Save Changes
					</button>
				</div>
			</section>
		</PageLayout>
	)
}

export default PreferencesPage
