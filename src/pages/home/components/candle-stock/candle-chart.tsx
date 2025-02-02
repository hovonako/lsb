import React from 'react'
import { createChart, IChartApi, LineStyle } from 'lightweight-charts'
import { useWindowSize } from 'utils/hooks'
import { useCandleSticks } from 'services/revolutions'
import { useTradingState } from 'stores/implements/trading'

export type CandleChartProps = {
	firstToken: string
	secondToken: string
}

export const CandleChart = () => {
	// const { tokenSymbol: symbolSt, tokenName: nameSt, icon: iconSt } = firstToken
	// const { tokenSymbol: symbolNd, tokenName: nameNd, icon: iconNd } = secondToken
	const { paidToken, receivedToken } = useTradingState((state) => state)
	const windowSize = useWindowSize()

	const ref = React.useRef()
	const chartRef = React.useRef<IChartApi>()
	const granuality = useTradingState((s) => s.granuality)
	const { data } = useCandleSticks(`${paidToken}-${receivedToken}`, granuality)

	React.useEffect(() => {
		if (data === undefined || !ref.current) return
		const chart = createChart(ref.current, { width: 575, height: 350 })
		chart.applyOptions({
			timeScale: {
				rightOffset: 1,
				barSpacing: 15,
				lockVisibleTimeRangeOnResize: true,
				rightBarStaysOnScroll: true,
				borderVisible: true,
				fixLeftEdge: true,
				borderColor: '#e3eaf6',
				visible: true,
				timeVisible: true,
				secondsVisible: true,
			},
			crosshair: {
				vertLine: {
					color: '#9ca9cf',
					width: 1,
					style: 0,
					visible: true,
					labelVisible: true,
				},
				horzLine: {
					color: '#9ca9cf',
					width: 1,
					style: 0,
					visible: true,
					labelVisible: true,
				},
			},
			rightPriceScale: {
				// mode: 1,
				autoScale: true,
				// invertScale: true,
				alignLabels: true,
				borderVisible: false,
				borderColor: '#294698',
				scaleMargins: {
					top: 0.2,
					bottom: 0.1,
				},
			},
			grid: {
				vertLines: {
					color: '#e3eaf6',
					style: LineStyle.Dashed,
					visible: true,
				},
				horzLines: {
					color: '#e3eaf6',
					style: LineStyle.Dashed,
					visible: true,
				},
			},
			layout: {
				backgroundColor: 'transparent',
				fontSize: 11,
				fontFamily: '"Montserrat", sans-serif',
				textColor: '#9ca9cf',
			},
		})

		const candlestickSeries = chart.addCandlestickSeries({
			priceFormat: {
				type: 'custom',
				formatter: (price: number) => price.toFixed(7),
			},
			upColor: '#294698',
			downColor: '#e0525f',
			wickVisible: true,
			borderVisible: false,
			wickUpColor: '#294698',
			wickDownColor: '#e0525f',
		})
		candlestickSeries.setData(data)

		const histogram = data.map(({ time, open, close }) => ({
			time,
			value: Math.abs(open - close),
			// color: open < close ? '#34f49030' : '#f3383830',
			color: '#9ca9cf',
		}))

		const histogramSeries = chart.addHistogramSeries({
			priceFormat: {
				type: 'volume',
				precision: 7,
				// formatter: (price) => '',
			},
			priceScaleId: '',
			scaleMargins: {
				top: 0.8,
				bottom: 0,
			},
		})

		histogramSeries.setData(histogram)

		chartRef.current = chart

		return () => {
			chart.removeSeries(candlestickSeries)
			chart.removeSeries(histogramSeries)
			chart.remove()
		}
	}, [data])

	React.useEffect(() => {
		if (chartRef.current) {
			const { width } = windowSize

			if (width > 1280) {
				chartRef.current.resize(575, 350)
			} else if (width > 960) {
				chartRef.current.resize(0.49 * width, 0.6 * 0.49 * width)
			} else {
				chartRef.current.resize(0.9 * width, 0.6 * 0.9 * width)
			}
		}
	}, [windowSize, chartRef])

	return <div ref={ref} id="candle-chart" />
}
