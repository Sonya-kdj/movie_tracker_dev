import axios from 'axios'

export default defineNuxtPlugin(() => {
	const api = axios.create({
		baseURL: 'http://localhost:8889/api', // backend URL
		headers: {
			'Content-Type': 'application/json',
		},
	})
	api.interceptors.request.use(config => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	})
	return {
		provide: {
			api,
		},
	}
})
