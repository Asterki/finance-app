/**
 * Formats a number as a currency string with commas.
 * @param amount - The amount to format.
 * @param currency - The currency symbol to use.
 * @returns The formatted currency string.
 */
export const formatMoney = (amount: number, currency: string = '$'): string => {
    return `${currency}${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}

/**
 * Parses a currency string and returns the numeric value.
 * @param moneyString - The currency string to parse.
 * @returns The numeric value.
 */
export const parseMoney = (moneyString: string): number => {
    const numericString = moneyString.replace(/[^0-9.-]+/g, '')
    return parseFloat(numericString)
}