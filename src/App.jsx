import { useState } from 'react'
import './App.css'

import logo from './assets/TSG App Logo.png'

export const App = () => {
	const [search, setSearch] = useState('')

	const getSongData = async (search) => {
		const requestUrl = `https://shazam.p.rapidapi.com/search?term=${search}&locale=en-US&offset=0&limit=5/`
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '7e218f9294mshed130077e09c28bp11d981jsnb67b9fe814b1',
				'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
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
	}

	// request
	// submitEl.addEventListener('click', () => {
	// 	if (resultsEl.children[0]) {
	// 		reset(
	// 			resultsEl.children[0],
	// 			resultsEl.children[1],
	// 			resultsEl.children[2],
	// 			resultsEl.children[3],
	// 			resultsEl.children[4]
	// 		)
	// 	}
	// 	const requestUrl =
	// 		'https://shazam.p.rapidapi.com/search?term=' +
	// 		searchEl.value +
	// 		'&locale=en-US&offset=0&limit=5/'
	// 	const options = {
	// 		method: 'GET',
	// 		headers: {
	// 			'X-RapidAPI-Key': '7e218f9294mshed130077e09c28bp11d981jsnb67b9fe814b1',
	// 			'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
	// 		},
	// 	}
	// 	fetch(requestUrl, options)
	// 		.then((response) => response.json())
	// 		.then((response) => createResults(response))

	// 		.catch((err) => console.error(err))
	// })

	// function createResults(response) {
	// 	for (let i = 0; i < response.tracks.hits.length; i++) {
	// 		// creates display elements
	// 		let resultsTab = document.createElement('div')
	// 		let resultsName = document.createElement('h3')
	// 		let resultImg = document.createElement('img')
	// 		let shazamEl = document.createElement('a')

	// 		// sets track name and shazam message
	// 		resultsName.innerHTML = response.tracks.hits[i].track.share.subject
	// 		shazamEl.innerHTML = 'Listen on Shazam'

	// 		// set class and attributes for style and links
	// 		resultImg.setAttribute(
	// 			'src',
	// 			response.tracks.hits[i].track.images.coverart
	// 		)
	// 		shazamEl.setAttribute('href', response.tracks.hits[i].track.url)
	// 		shazamEl.setAttribute('target', '_blank')
	// 		resultsName.setAttribute('target', '_blank')
	// 		resultImg.classList.add('img-fluid', 'd-inline-block', 'col-6')
	// 		resultsName.classList.add('text-dark', 'd-inline-block', 'col-4')
	// 		shazamEl.classList.add('card-text')
	// 		shazamEl.classList.add('d-block')

	// 		// appends create elements
	// 		resultsEl.appendChild(resultsTab)
	// 		resultsTab.appendChild(resultImg)
	// 		resultsTab.appendChild(resultsName)

	// 		resultsName.appendChild(shazamEl)

	// 		// add responses to array

	// 		searchByKeyword(resultsName, response.tracks.hits[i].track.share.subject)
	// 	}
	// }

	// calls youtube api and sets anchor elements
	// function searchByKeyword(name) {
	// 	const options = {
	// 		method: 'GET',
	// 		headers: {
	// 			'X-RapidAPI-Key': '7e218f9294mshed130077e09c28bp11d981jsnb67b9fe814b1',
	// 			'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
	// 		},
	// 	}

	// 	fetch(
	// 		'https://youtube-v31.p.rapidapi.com/search?q=' +
	// 			searchEl.value +
	// 			'&part=id%2Csnippet&type=video&maxResults=1',
	// 		options
	// 	)
	// 		.then((response) => response.json())
	// 		.then((response) => {
	// 			console.log(response)
	// 			let youtubeEl = document.createElement('a')
	// 			youtubeEl.innerHTML = 'Listen on Youtube'
	// 			youtubeEl.classList.add('youtube-link', 'd-block')
	// 			youtubeEl.setAttribute(
	// 				'href',
	// 				'https://www.youtube.com/watch?v=' + response.items[0].id.videoId
	// 			)
	// 			youtubeEl.setAttribute('target', '_blank')
	// 			name.appendChild(youtubeEl)
	// 		})
	// 		.catch((err) => console.error(err))
	// }

	// function reset(node1, node2, node3, node4, node5) {
	// 	resultsEl.removeChild(node1)
	// 	resultsEl.removeChild(node2)
	// 	resultsEl.removeChild(node3)
	// 	resultsEl.removeChild(node4)
	// 	resultsEl.removeChild(node5)
	// }

	return (
		<>
			<header className='w-100 bg-dark'>
				<img
					src={logo}
					alt='TSG Logo'
					style={{ width: '350px' }}
				/>
				<p className='text-light p-2 header-sub'>
					If you know the words, we'll find the song for you!
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
						<button type='submit' onClick={newSearch}>Submit</button>
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
