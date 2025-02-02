export interface ShieldCoinReceivedModel {
	time: Date
	amount: string
	token: string
	tokenName: string
}

export interface CustomTokenReceivedModel {
	id: number
	createdAt: Date
	updatedAt: Date
	deletedAt?: Date
	tokenId: string
	symbol: string
	name: string
	image: string
	amount: string
	verified: boolean
}

export interface TokenReceivedModel {
	id: number
	createdAt: Date
	updatedAt: Date
	deletedAt?: Date
	tokenId: string
	symbol: string
	originalSymbol: string
	name: string
	contractId: string
	decimals: number
	pDecimals: number
	status: number
	type: number
	currencyType: number
	pSymbol: string
	isDefault: boolean
	userId?: string
	verified: boolean
}

export interface TimeValue {
	time: number
	value: number
}

export interface UsdEvolutionReceived {
	currentAmount: TimeValue[]
	perDayAmount: TimeValue[]
	totalAmount: TimeValue[]
}

export interface PerPair {
	time: number
	volume: number
	liquidity: number
	pair: string
}

export interface TopPairsByLiquidity {
	time: Date
	volume: number
	liquidity: number
	pair: string
}

export interface TopPairsByVolume {
	time: Date
	volume: number
	liquidity: number
	pair: string
}

export interface MarketOverViewModel {
	allTimeVolume: number
	allTimeVolumeEvolution: number
	liquidity: number
	liquidityEvolution: number
	perPair: PerPair[]
	topPairsByLiquidity: TopPairsByLiquidity[]
	totalLiquidity: number
	topPairsByVolume: TopPairsByVolume[]
	totalVolume: number
}
