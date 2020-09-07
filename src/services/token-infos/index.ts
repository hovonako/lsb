import { useQuery } from 'react-query'
import { TokenUiModel } from 'src/models/token'
import { getListCoinTokens } from './coin-tokens'
import { getListShieldedCoins } from './shielded-coins'
import { getListCustomTokens } from './custom-tokens'

const getListTokens = async (variant: string): Promise<TokenUiModel[]> => {
	try {
		if (variant === 'Coins') {
			return getListCoinTokens()
		}
		if (variant === 'Shielded Tokens') {
			return getListShieldedCoins()
		}
		if (variant === 'Custom Tokens') {
			return getListCustomTokens()
		}
		// eslint-disable-next-line quotes
		throw new Error(`Invalid token variant. Must be one of 'Coins' | 'Shielded Tokens' | 'Custom Tokens'`)
	} catch (error) {
		console.error(error)
	}
	return []
}

export const useTokenInfos = (variant: string) => {
	return useQuery(`getListTokens(${variant})`, () => getListTokens(variant))
}
