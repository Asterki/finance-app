import { createBrowserRouter } from 'react-router-dom'

// Accounts
import AccountLogin from './accounts/login'
import AccountRegister from './accounts/register'
import AccountLogout from './accounts/logout'

// Admin
import AdminTest from './admin/tests'

const router = createBrowserRouter([
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
