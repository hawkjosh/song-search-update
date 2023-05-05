import { useState } from 'react'
import './App.css'

import logo from './assets/TSG App Logo.png'

export const App = () => {
	const [search, setSearch] = useState('')

	const getSongData = async (search) => {
		const requestUrl = `https://spotify23.p.rapidapi.com/search/?q=${search}&type=multi&offset=0&limit=10&numberOfTopResults=5`
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'd402ff8d8amshb632d3dff23fa99p160c6bjsn9fc2d552e490',
				'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
			},
		}
		try {
			const response = await fetch(requestUrl, options)
			const result = await response.json()
			console.log(result)
		} catch (error) {
			console.error(error)
		}
	}

	const getVideoData = async (search) => {
		const requestUrl = `https://youtube-v31.p.rapidapi.com/search?q=${search}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'd402ff8d8amshb632d3dff23fa99p160c6bjsn9fc2d552e490',
				'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
			},
		}
		try {
			const response = await fetch(requestUrl, options)
			const result = await response.json()
			console.log(result)
		} catch (error) {
			console.error(error)
		}
	}

	const newSearch = (e) => {
		e.preventDefault()
		getSongData(search)
		getVideoData(search)
		setSearch('')
	}

	return (
		<>
			<header className='w-100 bg-dark'>
				<img
					src={logo}
					alt='TSG Logo'
					style={{ width: '350px' }}
				/>
				<p className='text-light p-2 header-sub'>
					If you know the words, we know the song!
				</p>
			</header>
			<main>
				<div className='card col-9 m-auto text-center'>
					<h3 className='card-title text-center mt-2 mb-4 search-title'>
						Search The App
					</h3>
					<form>
						<input
							type='text'
							placeholder='The song goes...'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button
							type='submit'
							onClick={newSearch}>
							Submit
						</button>
					</form>
				</div>

				<div className='col-9 vh-auto m-auto'>
					<h2 className='text-center'>Results</h2>
					<hr />
					<div id='results'></div>
				</div>
			</main>
		</>
	)
}
