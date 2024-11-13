import * as React from 'react'
import QRCode from 'qrcode'
import { allTimezones } from 'react-timezone-select'
import * as Select from '@radix-ui/react-select'

import { FaCheck, FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa'

import useNotification from '../../hooks/useNotification'

import { useAuth } from '../../features/auth'
import { usePreferences } from '../../features/preferences'

import PageLayout from '../../layouts/PageLayout'

const PreferencesPage = () => {
	const { notification, showNotification } = useNotification()
	const { user } = useAuth()
	const {
		preferences,
		updateProfile,
		generateTFASecret,
		enableTFA,
		fetchPreferences,
		disableTFA,
		changePassword,
	} = usePreferences()

	const tfaInputRef = React.useRef<HTMLInputElement>(null)
	const oldPasswordRef = React.useRef<HTMLInputElement>(null)
	const newPasswordRef = React.useRef<HTMLInputElement>(null)

	const [currentPreferences, setCurrentPreferences] =
		React.useState(preferences)

	const [qrCode, setQrCode] = React.useState('')
	const [secret, setSecret] = React.useState('')

	React.useEffect(() => {
		if (preferences && user) return setCurrentPreferences(preferences)
	}, [preferences, user])

	const saveProfileChangesButtonClick = async () => {
		if (currentPreferences) {
			const response = await updateProfile(currentPreferences.user)
			if (response) {
				showNotification(
					'Saved',
					'Profile Updated Successfully',
					'success'
				)

				fetchPreferences()
			} else {
				showNotification('Error', 'Failed to Update Profile', 'error')
			}
		}
	}

	const generateTFASecretButtonClick = async () => {
		if (!user) return

		const secret = (await generateTFASecret()).secret!
		setSecret(secret)
		setQrCode(
			await QRCode.toDataURL(
				`otpauth://totp/MyApp:${
					user!.email
				}?secret=${secret}&issuer=MyApp`
			)
		)
	}

	const enableTFAButtonClick = async () => {
		if (!user || !tfaInputRef.current) return

		const response = await enableTFA(tfaInputRef.current.value, secret)

		if (response.status === 'success') {
			showNotification('Success', 'TFA Enabled', 'success')
			setSecret('')
			setQrCode('')
			// We don't worry about updating the preferences state since the backend already does this for us
			// But we will re-fetch the preferences to get the updated state
			fetchPreferences()
		} else if (response.status === 'invalid-code') {
			showNotification('Error', 'Invalid TFA Code, Try Again', 'error')
		} else {
			showNotification('Error', 'Failed to Enable TFA', 'error')
		}
	}

	const disableTFAButtonClick = async () => {
		if (!user) return

		const password = prompt('Enter your password to disable TFA')
		if (!password) return

		const response = await disableTFA(password)

		if (response.status == 'success') {
			showNotification(
				'Success',
				'TFA has been disabled for your account',
				'success'
			)
			fetchPreferences()
		} else if (response.status == 'invalid-password') {
			showNotification('Error', 'Invalid Password', 'error')
		}
	}

	const changePasswordButtonClick = async () => {
		if (!user) return

		const oldPassword = oldPasswordRef.current?.value
		const newPassword = newPasswordRef.current?.value

		if (!oldPassword || !newPassword) {
			showNotification('Error', 'Please fill out all fields', 'error')
			return
		}

		const response = await changePassword(oldPassword, newPassword)
		if (response.status == 'success') {
			showNotification(
				'Success',
				'Password Changed Successfully',
				'success'
			)
			oldPasswordRef.current!.value = ''
			newPasswordRef.current!.value = ''
		} else if (response.status == 'invalid-password') {
			showNotification('Error', 'Invalid Password', 'error')
			newPasswordRef.current!.value = ''
		} else {
			showNotification('Error', 'Failed to Change Password', 'error')
			newPasswordRef.current!.value = ''
			oldPasswordRef.current!.value = ''
		}
	}

	return (
		<PageLayout
			requiresLogin={true}
			notification={notification}
			className={user && user.preferences.theme == 'dark' ? 'dark' : ''}
		>
			<section className="min-h-screen flex md:flex-row flex-col dark:bg-neutral-600 dark:text-neutral-100 text-neutral-700">
				<div className="md:border-r-2 border-b-2 dark:border-neutral-400 border-neutral-200 p-4 md:w-1/2 w-full">
					<h1 className="text-2xl">General Settings</h1>

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
								<Select.Trigger className="w-full dark:bg-neutral-700 bg-neutral-200 rounded-sm p-2 flex items-center justify-start gap-2">
									<FaChevronCircleDown />
									{currentPreferences.user.language === 'en'
										? 'English'
										: 'Spanish'}
								</Select.Trigger>
								<Select.Content className="dark:bg-neutral-700 bg-neutral-200 rounded-sm *:p-2 *:outline-none *:transition-all *:cursor-pointer *:dark:bg-neutral-700 *:bg-neutral-200">
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
								<Select.Trigger className="w-full dark:bg-neutral-700 bg-neutral-200 rounded-sm p-2 flex items-center justify-start gap-2">
									<FaChevronCircleDown />
									{currentPreferences.user.timezone}
								</Select.Trigger>
								<Select.Content className="dark:bg-neutral-700 bg-neutral-200 rounded-sm *:p-2 *:outline-none *:transition-all *:cursor-pointer *:dark:bg-neutral-700 *:bg-neutral-200">
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
								<Select.Trigger className="w-full dark:bg-neutral-700 bg-neutral-200 rounded-sm p-2 flex items-center justify-start gap-2">
									<FaChevronCircleDown />
									{currentPreferences.user.theme === 'dark'
										? 'Dark'
										: 'Light'}
								</Select.Trigger>
								<Select.Content className="dark:bg-neutral-700 bg-neutral-200 rounded-sm *:p-2 *:outline-none *:transition-all *:cursor-pointer *:dark:bg-neutral-700 *:bg-neutral-200">
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

					<div className="mt-2 w-full">
						<h2 className="text-xl">Currency</h2>
						{currentPreferences && (
							<input
								type="text"
								autoComplete="off"
								className="p-2 dark:bg-neutral-700 bg-neutral-200 rounded-sm w-full"
								placeholder="Your Currency"
								defaultValue={currentPreferences.user.currency}
							/>
						)}
					</div>

					<button
						onClick={() => {
							saveProfileChangesButtonClick()
						}}
						className="mt-4 rounded-sm bg-green-500 text-white p-2 w-full"
					>
						Save Changes
					</button>
				</div>

				<div className="border-neutral-400 p-4 md:w-1/2 w-full">
					<h1 className="text-2xl">Security Settings</h1>

					<div className="mt-2">
						<h2 className="text-xl">Two Factor Authentication</h2>
						{qrCode && (
							<div className="flex items-center gap-2 flex-col">
								<p>
									Scan the QR Code with your Authenticator App
								</p>
								<img src={qrCode} alt="" />
								<input
									type="text"
									name=""
									id=""
									className="p-2 dark:bg-neutral-700 bg-neutral-200 rounded-sm w-full"
									placeholder="Enter TFA Code"
									ref={tfaInputRef}
								/>
								<button
									onClick={() => {
										enableTFAButtonClick()
									}}
									className="rounded-sm bg-green-500 text-white p-2 w-full"
								>
									Verify
								</button>
							</div>
						)}

						{currentPreferences &&
							!qrCode &&
							!currentPreferences.security.twoFactorEnabled && (
								<button
									onClick={() => {
										generateTFASecretButtonClick()
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
										disableTFAButtonClick()
									}}
									className="rounded-sm bg-red-500 text-white p-2 w-full"
								>
									Disable TFA
								</button>
							)}
					</div>

					<div className="mt-4">
						<h2 className="text-xl">Change Password</h2>
						{currentPreferences && (
							<div className="flex flex-col gap-2">
								<input
									type="password"
									ref={oldPasswordRef}
									autoComplete="new-password"
									className="p-2 dark:bg-neutral-700 bg-neutral-200 rounded-sm w-full"
									placeholder="Your Current Password"
								/>
								<input
									type="password"
									ref={newPasswordRef}
									autoComplete="new-password"
									className="p-2 dark:bg-neutral-700 bg-neutral-200 rounded-sm w-full"
									placeholder="Your New Password"
								/>
							</div>
						)}
					</div>

					<button
						onClick={() => {
							changePasswordButtonClick()
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
