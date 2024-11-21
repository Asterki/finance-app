import {
	FaMoneyBillWave,
	FaGift,
	FaBriefcase,
	FaChartLine,
	FaPiggyBank,
	FaUniversity,
	FaRegMoneyBillAlt,
	FaRegGrinStars,
	FaRegSmileBeam,
	FaHandHoldingUsd,
	FaRegHandshake,
	FaRegGrinHearts,
	FaRegGrinWink,
	FaRegGrinTongue,
	FaRegGrinSquint,
	FaUtensils,
	FaBus,
	FaShoppingCart,
	FaHome,
	FaLightbulb,
	FaFilm,
	FaHeartbeat,
	FaBook,
	FaShieldAlt,
	FaNewspaper,
	FaPlane,
	FaHandsHelping,
	FaPaw,
	FaUser,
	FaTools,
	FaBaby,
	FaMoneyBill,
	FaFileInvoiceDollar,
	FaEllipsisH,
} from 'react-icons/fa'

type Props = {
	type: 'expense' | 'income'
	description: string
	amount: number
	date: string
	category: string
	tags: string[]
	currency: string
	onClick?: () => void
}

const expenseIcons: { [key: string]: JSX.Element } = {
	food: <FaUtensils />,
	transport: <FaBus />,
	shopping: <FaShoppingCart />,
	rent: <FaHome />,
	utilities: <FaLightbulb />,
	entertainment: <FaFilm />,
	health: <FaHeartbeat />,
	education: <FaBook />,
	insurance: <FaShieldAlt />,
	subscriptions: <FaNewspaper />,
	travel: <FaPlane />,
	charity: <FaHandsHelping />,
	pets: <FaPaw />,
	personal_care: <FaUser />,
	home_maintenance: <FaTools />,
	childcare: <FaBaby />,
	loan_repayment: <FaMoneyBill />,
	gifts: <FaGift />,
	taxes: <FaFileInvoiceDollar />,
	savings: <FaPiggyBank />,
	investments: <FaChartLine />,
	other: <FaEllipsisH />,
}

const incomeIcons: { [key: string]: JSX.Element } = {
	salary: <FaMoneyBillWave />,
	bonus: <FaGift />,
	interest: <FaBriefcase />,
	gift: <FaGift />,
	freelance: <FaBriefcase />,
	rental_income: <FaHome />,
	dividends: <FaChartLine />,
	royalties: <FaPiggyBank />,
	investment_profits: <FaChartLine />,
	alimony: <FaRegMoneyBillAlt />,
	child_support: <FaRegGrinStars />,
	inheritance: <FaRegSmileBeam />,
	refunds: <FaHandHoldingUsd />,
	stipend: <FaRegHandshake />,
	scholarship: <FaUniversity />,
	business_income: <FaBriefcase />,
	grants: <FaRegGrinHearts />,
	lottery_winnings: <FaRegGrinWink />,
	cashback: <FaRegGrinTongue />,
	other: <FaRegGrinSquint />,
}

const TransactionCardComponent = (props: Props) => {
	return (
		<div
			className="rounded-sm bg-neutral-700 p-2 flex items-center transition-all hover:brightness-110 cursor-pointer"
			onClick={props.onClick}
		>
			<div className="rounded-full bg-neutral-800/20 p-4">
				{props.type === 'expense'
					? expenseIcons[props.category]
					: incomeIcons[props.category]}
			</div>
			<div className="flex items-center">
				<div className="flex flex-col ml-2">
					<span
						className={
							props.type === 'income'
								? 'text-green-500'
								: 'text-red-500'
						}
					>
						{props.type == 'expense' ? '-' : ''}
						{Math.round(props.amount * 100) / 100} {props.currency}
					</span>
					<span className="text-neutral-500 flex gap-2">
						{props.description}

						{props.tags.map((tag) => (
							<span className="rounded-3xl border border-neutral-600 px-2 transition-all hover:brightness-110 bg-neutral-700">
								#{tag}
							</span>
						))}
					</span>
				</div>
			</div>
		</div>
	)
}

export default TransactionCardComponent