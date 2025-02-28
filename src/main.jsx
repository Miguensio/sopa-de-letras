import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router'
import './index.css'
import Home from './pages/Main-page.jsx'
import HowToPlay from './pages/How-to-play.jsx'

const router = createHashRouter([
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/HowToPlay',
		element: <HowToPlay />
	},
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
