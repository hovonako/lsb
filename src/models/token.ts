export interface TokenUiModel {
	tokenSymbol: string
	tokenName: string
	icon: string
	tokenId: string
	originalSymbol?: string
	contractId?: string
	decimals?: number
	pDecimals?: number
	status?: number
	type?: number
	currencyType?: number
	pSymbol?: string
	isDefault?: boolean
	verified?: boolean
	gradients?: string[]
	colors?: string[]
}

export interface PairCandleStickModel {
	time: any
	open: number
	close: number
	high: number
	low: number
}

export interface PairDetail {
	pair: string
	exchange24h: number
	exchange24hPercent: number
	exchangeWeek: number
	exchangeWeekPercent: number
	last2Item?: PairCandleStickModel[]
}
