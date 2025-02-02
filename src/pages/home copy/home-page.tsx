import React from 'react'
import styled from 'styled-components'
import { Typography, Grid, createStyles, makeStyles, Theme, Button } from '@material-ui/core'
import { SearchAutoComplete } from 'components/common/autocomplete/search-autocomplete'
import { TokenCard } from 'components/common/token-card'
import { TokenUiModel } from 'models/token'
import { Eth, Btc, Incognito } from 'assets/token-logos'
import clsx from 'clsx'
import { Link, useHistory } from 'react-router-dom'
import { SingleColumnLayout } from 'components/layouts/single-column-layout'

const featureTokens: TokenUiModel[] = [
	{
		tokenId: '',
		tokenSymbol: 'PRV',
		tokenName: 'Privacy Coin',
		icon: Incognito,
		colors: ['#303030', '#00bcd4'],
		gradients: ['rgb(238, 238, 238)', 'rgb(194, 194, 194)'],
	},
	{
		tokenId: '',
		tokenSymbol: 'pETH',
		tokenName: 'Ethereum',
		icon: Eth,
		colors: ['rgb(69, 105, 207)', 'rgb(69, 105, 207)'],
		gradients: ['rgb(228, 234, 253)', 'rgb(188, 200, 241)'],
	},
	{
		tokenId: '',
		tokenSymbol: 'pBTC',
		tokenName: 'Bitcoin',
		icon: Btc,
		colors: ['rgb(255, 210, 51)', 'rgb(255, 210, 51)'],
		gradients: ['rgb(255, 246, 231)', 'rgb(255, 237, 209)'],
	},
]

const HomePageContainer = styled.div`
	min-height: 100vh;
`

const Slogan = styled(Typography)`
	font-weight: 400;
`

const Emphrasis = styled.span`
	color: #00bcd4;
	font-size: 3.75rem;
	font-weight: 500;

	@media (max-width: 768px) {
		font-size: 2.4rem;
		font-weight: 400;
	}
`

const Center = styled(Grid)`
	display: flex;
	justify-content: center;
	align-items: center;
`

const StyledButton = styled(Button)`
	align-self: center;
	--button-horizontal-padding: 36px;
`

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		slogan: {
			margin: '3vw 0',
		},
		flex: {
			display: 'flex',
		},
		selfCenter: {
			justifyContent: 'center',
			alignItems: 'center',
		},
		cardWrapper: {
			margin: '3vw 0 1.5vw',
		},
		bottomMargin: {
			marginBottom: '2vw',
		},
	}),
)

export const HomePage = () => {
	const classes = useStyles()
	const history = useHistory()
	return (
		<SingleColumnLayout>
			<HomePageContainer>
				<Grid container alignItems="center" justify="center">
					<Grid className={classes.slogan} item xs={12}>
						<Slogan variant="h2" align="center">
							Simple crypto trading <br /> for <Emphrasis>Incognito.</Emphrasis>
						</Slogan>
					</Grid>
					<Grid className={clsx(classes.flex, classes.selfCenter)} item xs={10}>
						<SearchAutoComplete maxWidth="480px" />
					</Grid>
				</Grid>

				{/* Featured token cards */}
				<Grid className={classes.cardWrapper} container alignItems="center" justify="center" spacing={2}>
					{featureTokens.map((token, i) => (
						<Center key={token.tokenSymbol} item xs={9} sm={6} md={4} lg={3}>
							<TokenCard state={token} timeout={300 * i} />
						</Center>
					))}
				</Grid>

				{/* Show more button */}
				<Grid container className={classes.bottomMargin} xs={12} justify="center" alignItems="center">
					<Button variant="outlined" onClick={() => history.push('/showroom')}>
						Show More
					</Button>
				</Grid>

				{/* Paralax scrolling animation */}

				{/* Market infomation */}
			</HomePageContainer>
		</SingleColumnLayout>
	)
}
