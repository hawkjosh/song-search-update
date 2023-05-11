import React, { Fragment, useEffect, useRef, useState } from 'react'

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

	const textRef = useRef('')
	// const [isHovered, setIsHovered] = useState(false)

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

	// const textElement = textRef.current

	// useEffect(() => {
	// 	if (textElement) {
	// 		textElement.addEventListener('mouseover', handleHoverStart)
	// 		textElement.addEventListener('mouseleave', handleHoverStop)
	// 	}

	// 	return () => {
	// 		if (textElement) {
	// 			textElement.removeEventListener('mouseover', handleHoverStart)
	// 			textElement.removeEventListener('mouseleave', handleHoverStop)
	// 		}
	// 	}
	// }, [])

	// const handleHoverStart = () => {
	// 	if (textElement) {
	// 		if (textElement.clientWidth - textElement.scrollWidth >= 0) {
	// 			handleHoverStop()
	// 		} else {
	// 			const scrollDiff = textElement.clientWidth - textElement.scrollWidth

	// 			const keyframes = `
	// 				@keyframes left-scroll {
	// 					0% { transform: translateX(0); }
	// 					100% { transform: translateX(${scrollDiff}); }
	// 				}
	// 			`

	// 			textElement.style.animationKeyframes = keyframes
	// 			textElement.style.animation = 'left-scroll 7.5s linear 0.5s'
	// 			textElement.style.overflow = 'visible'
	// 			textElement.style.overflowX = 'auto'
	// 			textElement.style.textOverflow = 'string'
	// 			textElement.style.cursor = 'pointer'
	// 		}
	// 	}
	// }

	// const handleHoverStop = () => {
	// 	textElement.style.animation = 'none'
	// 	textElement.style.overflow = 'hidden'
	// 	textElement.style.cursor = 'default'
	// }

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
								<div className='results-text' ref={textRef}>
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
														<div className='song-info-text title'>
															{info.title}
														</div>
													</div>
												</div>
												<div className='song-info-box artist'>
													<div className='icon-wrapper'>
														<ArtistIcon className='song-info-icon artist' />
													</div>
													<div className='text-wrapper'>
														<div className='song-info-text artist'>
															{info.artist}
														</div>
													</div>
												</div>
												<div className='song-info-box album'>
													<div className='icon-wrapper'>
														<AlbumIcon className='song-info-icon album' />
													</div>
													<div className='text-wrapper'>
														<div className='song-info-text album'>
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
