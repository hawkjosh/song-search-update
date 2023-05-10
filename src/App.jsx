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
				<div className='results-container'>
					{searchText && (
						<Fragment>
							<div className='results-label'>Showing results for:</div>
							<div className='results-wrapper'>
								<div
									className='results-text'
									title={searchText}>
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
												<div className='song-info-box'>
													<SongIcon className='song-info-icon' />
													<div className='song-info'>{info.title}</div>
												</div>
												<div className='song-info-box'>
													<ArtistIcon className='song-info-icon' />
													<div className='song-info'>{info.artist}</div>
												</div>
												<div className='song-info-box'>
													<AlbumIcon className='song-info-icon' />
													<div className='song-info'>{info.album}</div>
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
