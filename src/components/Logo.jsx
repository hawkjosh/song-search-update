export const Logo = ({ ...props }) => {
	return (
		<svg
			viewBox='0 0 104 100'
			{...props}>
			<path
				fill='white'
				stroke='hsla(39, 100%, 50%, 1)'
				strokeWidth='4.5'
				strokeLinejoin='round'
				d='M52 3a1.35 1 0 0 1 0 71c-3.689 0.049 -7.753 -0.456 -10 -0.75c-4.3333 9.75 -7.6667 18.75 -20 23.75c7 -6.6667 5 -17.3333 0 -30.835c-34.751 -21.646 -15.858 -62.177 30 -63.165z'
			/>

			<text
				fontSize='1.625rem'
				fontWeight='700'
				fill='hsla(209, 95%, 61%, 1)'
				textAnchor='middle'
				x='51%'
				y='49%'>
				TSG...
			</text>
		</svg>
	)
}
