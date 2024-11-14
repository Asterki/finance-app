import { Transaction } from "../models"

export interface GetTransactionByIDRequestBody {
    transactionId: string
}

export interface GetTransactionByIDResponseData {
    status: 'success' | 'transaction-not-found'
    transaction?: Transaction
}