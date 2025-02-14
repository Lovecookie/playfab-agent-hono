import { StatusCode } from "hono/utils/http-status"


export class ApiError extends Error {
	statusCode: number
	isOperational: boolean

	constructor(statusCode: number, message: string, isOperational: boolean = true) {
		super(message)
		this.statusCode = statusCode
		this.isOperational = isOperational
	}		
}