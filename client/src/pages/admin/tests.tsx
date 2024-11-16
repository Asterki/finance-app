import React, { useEffect, useRef } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, LineController, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, Title, Tooltip, Legend)

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
        },
    ],
}

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
}

const ChartComponent = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null)
    const chartInstanceRef = useRef<ChartJS | null>(null)

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy()
            }
            chartInstanceRef.current = new ChartJS(chartRef.current, {
                type: 'line',
                data: data,
                options: options,
            })
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy()
            }
        }
    }, [])

    return <canvas ref={chartRef}></canvas>
}

export default ChartComponent