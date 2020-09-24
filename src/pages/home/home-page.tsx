import React from 'react'
import styled from 'styled-components'
import { TradeLayout } from 'components/trade-layout'
import { useDispatch } from 'react-redux'
import { changeToken, resetTrading } from 'stores/implements/trading'

import { usePairsFromUrl } from 'utils/hooks'
import { SwapBox as Other, TokenList, SwapBoxInfo, CandleStock, ChainHistory } from './components'
import { SwapBox } from './components/swap-box/swap-box'

const SwapboxContainer = styled.div`
	padding: 8px;
	min-height: calc(100vh - 90px);
`

const TokenListContainer = styled.div`
	padding: 8px;
	height: 100%;
	min-height: calc(100vh - 90px);
`

const CandleChartContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: calc(60vh - 90px);
`

export const HomePage = () => {
	const dispatch = useDispatch()
	const { paidToken = 'PRV', receivedToken = 'pUSDT' } = usePairsFromUrl()

	/* Effect */
	React.useEffect(() => {
		dispatch(changeToken({ paidToken, receivedToken }))
		return () => dispatch(resetTrading())
	}, [paidToken, receivedToken])

	const SwapBoxComponent = (
		<SwapboxContainer>
			<SwapBox />
			<SwapBoxInfo />
		</SwapboxContainer>
	)

	const TokenPairs = (
		<TokenListContainer>
			<TokenList />
		</TokenListContainer>
	)

	return (
		<TradeLayout left={TokenPairs} right={SwapBoxComponent}>
			<CandleChartContainer>
				<CandleStock />
				<ChainHistory />
			</CandleChartContainer>
		</TradeLayout>
	)
}
