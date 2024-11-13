import { createBrowserRouter } from 'react-router-dom'

// Main
import Landing from './main/landing'
import Home from './main/home'

// Preferences
import Preferences from './preferences'

// Accounts
import AccountLogin from './accounts/login'
import AccountRegister from './accounts/register'
import AccountLogout from './accounts/logout'

// Admin
import AdminTest from './admin/tests'

const router = createBrowserRouter([
	// Main
	{
		path: '/',
		element: <Landing />,
	},
	{
		path: '/home',
		element: <Home />,
	},

	// Preferences
	{
		path: '/preferences',
		element: <Preferences />,
	},

	// Accounts
	{
		path: '/login',
		element: <AccountLogin />,
	},
	{
		path: '/register',
		element: <AccountRegister />,
	},
	{
		path: '/logout',
		element: <AccountLogout />,
	},

	// Admin
	{
		path: '/admin',
		element: <AdminTest />,
	},
])

export default router
