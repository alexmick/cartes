'use client'
import styled from 'styled-components'

export const Header = styled.header`
	margin-top: 0rem;
	h1 {
		margin-top: 0;
	}
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
	> div {
		margin-left: 1rem;
		max-width: 600px;
	}
	img {
		max-width: 12vw;
		height: auto;
		border-radius: 0.6rem;
	}
	@media (max-width: 800px) {
		img {
			display: none;
		}
		div {
			margin-left: 0;
		}
	}
`

export const Sources = styled.aside`
	margin-top: 6rem;
	hr {
		opacity: 0.3;
		color: var(--lightColor);
	}
`
