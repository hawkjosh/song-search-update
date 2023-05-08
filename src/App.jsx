import { Fragment, useState } from 'react'
import './App.css'

import logo from './assets/TSG App Logo.png'

export const App = () => {
	const [search, setSearch] = useState('')
	const [searchText, setSearchText] = useState('')
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
			console.log(result)

			setSearchText(search)

			const songInfo = result.tracks.items.map((info) => ({
				title: info.data.name,
				artist: info.data.artists.items[0].profile.name,
				album: info.data.albumOfTrack.name,
				artwork: info.data.albumOfTrack.coverArt.sources[0].url,
				spotify: info.data.albumOfTrack.sharingInfo.shareUrl,
			}))
			setSongData(songInfo)
			console.log(songData)
		} catch (error) {
			console.error(error)
		}
	}

	const newSearch = (e) => {
		e.preventDefault()
		getSongData(search)
		setSearch('')
	}

	return (
		<Fragment>
			<header className='w-100 bg-dark text-center p-5'>
				<img
					src={logo}
					alt='TSG Logo'
					style={{ width: '20rem', marginBottom: '2rem' }}
				/>
				<div
					className='card m-auto text-center p-3'
					style={{
						color: 'dodgerblue',
						fontFamily: 'Titan One',
						maxWidth: '1000px',
					}}>
					<form
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '1rem',
							fontFamily: 'arial',
						}}>
						<input
							className='form-control'
							type='text'
							placeholder='The song goes...'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button
							className='btn btn-primary'
							type='submit'
							onClick={newSearch}>
							<span className='material-symbols-outlined'>search</span>
						</button>
					</form>
				</div>
			</header>
			<main style={{ maxWidth: '1280px', margin: '1rem auto' }}>
				<div className='col-9 vh-auto m-auto'>
					{searchText && (
						<Fragment>
							<h3
								className='text-center mt-3'
								style={{ color: 'dodgerblue', fontFamily: 'Titan One' }}>
								Results for...
							</h3>
							<div
								style={{
									background: 'yellow',
									color: 'red',
									fontSize: '1.5rem',
									textAlign: 'center',
									fontWeight: 'bold',
								}}>
								{searchText}
							</div>
							<hr />
						</Fragment>
					)}
					{songData.length !== 0 && (
						<div id='results'>
							{songData.map((info, index) => (
								<Fragment key={index}>
									<div
										className='card'>
										<img
											className='card-img-top'
											src={info.artwork}
											alt='album artwork'
										/>
										<div className='card-body'>
											<div
												className='card-title'
												style={{ textAlign: 'center', fontWeight: 'bold' }}>
												{info.title} - {info.artist}
											</div>
											<div
												className='card-subtitle'
												style={{
													textAlign: 'center',
													fontStyle: 'italic',
												}}>
												(from album{' '}
												<span style={{ fontWeight: 'bold' }}>{info.album}</span>
												)
											</div>
											<div className='text-center'><a href={info.spotify} target='_blank' rel='noreferrer' className='btn btn-success btn-lg mt-3' style={{width: '75%'}}>Play on Spotify</a></div>
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
