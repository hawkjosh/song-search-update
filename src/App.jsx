import { Fragment, useState } from 'react'

import { rapidApiUrl, rapidApiKey, rapidApiHost } from '../config.js'

import { Logo } from './components/Logo.jsx'

import './App.css'

export const App = () => {
	const [search, setSearch] = useState('')
	const [searchText, setSearchText] = useState('')
	const [songData, setSongData] = useState([])

	const getSongData = async (search) => {
		const requestUrl = `${rapidApiUrl}?q=${search}&type=tracks&offset=0&limit=12`
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': rapidApiKey,
				'X-RapidAPI-Host': rapidApiHost,
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
			<header>
				<div className='container'>
					<Logo className='logo' />
					<div className='search-wrapper'>
						<form>
							<input
								className='search-input'
								type='text'
								placeholder='The song goes...'
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<button
								className='search-btn'
								type='submit'
								onClick={newSearch}>
								<span className='search-btn-icon'>🔍</span>
							</button>
						</form>
					</div>
				</div>
			</header>
			<main>
				<div className='container'>
					{searchText && (
						<Fragment>
							<div className='results-label'>Showing results for:
							</div>
							<div className='text-wrapper'>
								<div
									className='text'
									title={searchText}>
									"{searchText}"
								</div>
							</div>
						</Fragment>
					)}
					{songData.length !== 0 && (
						<div className='content-wrapper'>
							{songData.map((info, index) => (
								<Fragment key={index}>
									<div className='card'>
										<img
											className='card-img'
											src={info.artwork}
											alt='album artwork'
										/>
										<div className='card-body'>
											<div className='card-title' title={`${info.title} - ${info.artist}`}>
												{info.title} - {info.artist}
											</div>
											<div className='card-subtitle' title={info.album}>
												(from album{' '}
												<span className='subtitle-focus'>{info.album}</span>)
											</div>
											<div className='card-btn-wrapper'>
												<a
													className='btn-link'
													type='button'
													href={info.spotify}
													target='_blank'
													rel='noreferrer'>
													<div className='btn-text-wrapper'>
														<span className='btn-icon'>🎵</span>
														<span className='btn-text'>
															Open in Spotify
														</span>
													</div>
												</a>
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
