import { Transaction } from "../models"

export interface GetTransactionByIDRequestBody {
    transactionId: string
}

export interface GetTransactionByIDResponseData {
    status: 'success' | 'transaction-not-found'
    transaction?: Transaction
}

export interface CreateTransactionRequestBody {
    date: Date
    type: 'expense' | 'income'
    amount: number
    category: string
    description: string
    tags: string[]
}
export interface CreateTransactionResponseData {
    status: 'success'
    transaction: Transaction
}

export interface DeleteTransactionRequestBody {
    transactionID: string
}
export interface DeleteTransactionResponseData {
    status: 'success'
    transaction: Transaction
}