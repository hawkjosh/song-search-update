import { Fragment, useState } from 'react'
import './App.css'

import logo from './assets/TSG App Logo.png'

export const App = () => {
	const [search, setSearch] = useState('')
	const [songData, setSongData] = useState([])

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

			const songInfo = result.tracks.items.map((info) => ({
				title: info.data.name,
				artist: info.data.artists.items[0].profile.name,
				album: info.data.albumOfTrack.name,
				artwork: info.data.albumOfTrack.coverArt.sources[0].url,
			}))
			setSongData(songInfo)
		} catch (error) {
			console.error(error)
		}
	}

	const newSearch = (e) => {
		e.preventDefault()
		getSongData(search)
		setSearch('')
	}

	const btnStyle = {
		color: 'red',
		height: '50px',
		width: '150px',
		borderRadius: '50px',
		backgroundColor: 'dodgerblue',
		marginTop: '15px',
		marginBottom: '15px',
		fontFamily: 'Titan One',
	}

	return (
		<Fragment>
			<header className='w-100 bg-dark'>
				<img
					src={logo}
					alt='TSG Logo'
					style={{ width: '350px' }}
				/>
				<p className='text-light p-2 header-sub' style={{fontSize: '24pt'}}>
					If you know the words, we know the song!
				</p>
			</header>
			<main>
				<div
					className='card col-9 m-auto text-center'
					style={{ color: 'dodgerblue', fontFamily: 'Titan One' }}>
					<h3
						className='card-title text-center mt-2 mb-4 search-title'
						style={{ color: 'dodgerblue', fontFamily: 'Titan One', fontSize: '30pt' }}>
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
							style={btnStyle}
							onClick={newSearch}>
							Submit
						</button>
					</form>
				</div>

				<div className='col-9 vh-auto m-auto'>
					<h2
						className='text-center'
						style={{ color: 'dodgerblue', fontFamily: 'Titan One' }}>
						Results
					</h2>
					<hr />
					{songData.length !== 0 && (
						<div id='results'>
							{songData.map((info, index) => (
								<Fragment key={index}>
									<div className='card'>
										<div className='card-img'>
											<img
												src={info.artwork}
												alt='album artwork'
											/>
										</div>
										<div className='card-info'>
											<div style={{ fontSize: '2rem' }}>
												Title: {info.title}
											</div>
											<div style={{ fontSize: '1.5rem' }}>
												Artist: {info.artist}
											</div>
											<div style={{ fontSize: '1.25rem' }}>
												Album: {info.album}
											</div>
										</div>
									</div>
								</Fragment>
							))}
						</div>
					)}
				</div>
			</main>
		</Fragment>
	)
}
