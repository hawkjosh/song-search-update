import React, { Fragment, useState } from 'react'

import { rapidApiUrl, rapidApiKey, rapidApiHost } from '../config.js'

import { Logo } from './components/Logo.jsx'
import { SongIcon } from './components/SongIcon.jsx'
import { ArtistIcon } from './components/ArtistIcon.jsx'
import { AlbumIcon } from './components/AlbumIcon.jsx'
import { SpotifyIcon } from './components/SpotifyIcon.jsx'

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

	const scrollStart = (e) => {
		const scrollAmount = e.target.scrollLeftMax

		if (e.target.clientWidth < e.target.scrollWidth) {
			e.target.classList.add('scroll')
			e.target.style.setProperty('--scroll-amount', `${scrollAmount}px`)
		} else {
			e.target.classList.remove('scroll')
		}
	}

	const scrollEnd = (e) => {
		e.target.classList.remove('scroll')
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
				<div className='results-container'>
					{searchText && (
						<Fragment>
							<div className='results-label'>Showing results for:</div>
							<div className='results-wrapper'>
								<div
									className='results-text hover'
									onMouseEnter={scrollStart}
									onMouseLeave={scrollEnd}>
									"{searchText}"
								</div>
							</div>
						</Fragment>
					)}
					{songData.length !== 0 && (
						<div className='cards-wrapper'>
							{songData.map((info, index) => (
								<Fragment key={index}>
									<div className='card'>
										<img
											className='album-img'
											src={info.artwork}
											alt='album artwork'
										/>
										<div className='card-body'>
											<div className='song-info-wrapper'>
												<div className='song-info-box title'>
													<div className='icon-wrapper'>
														<SongIcon className='song-info-icon title' />
													</div>
													<div className='text-wrapper'>
														<div
															className='song-info-title'
															onMouseEnter={scrollStart}
															onMouseLeave={scrollEnd}>
															{info.title}
														</div>
													</div>
												</div>
												<div className='song-info-box artist'>
													<div className='icon-wrapper'>
														<ArtistIcon className='song-info-icon artist' />
													</div>
													<div className='text-wrapper'>
														<div
															className='song-info-artist'
															onMouseEnter={scrollStart}
															onMouseLeave={scrollEnd}>
															{info.artist}
														</div>
													</div>
												</div>
												<div className='song-info-box album'>
													<div className='icon-wrapper'>
														<AlbumIcon className='song-info-icon album' />
													</div>
													<div className='text-wrapper'>
														<div
															className='song-info-album'
															onMouseEnter={scrollStart}
															onMouseLeave={scrollEnd}>
															{info.album}
														</div>
													</div>
												</div>
											</div>
											<button
												className='spotify-btn'
												onClick={() =>
													window.open(`${info.spotify}`, '_blank')
												}>
												{/* <span className='music-icon'>🎵</span> */}
												<SpotifyIcon className='spotify-icon' />
												<span className='spotify-text'>Open in Spotify</span>
											</button>
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
