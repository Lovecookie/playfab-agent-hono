import { ZodError } from "zod";


export interface IBaseOutcome<TData, TError> {
    error: TError;
    success: boolean;
    value: TData;
    message: string;    
}

export class TinyOutcome {
    private msg?: string;

    public get success(): boolean {
        return this.msg === undefined;
    }

    public get message(): string {
        return this.msg ?? ""
    }

    constructor(message?: string) {
        this.msg = message
    }

    static ok() {
        return new TinyOutcome();
    }

    static error(message: string) {
        return new TinyOutcome(message);
    }
}


export class TOutcome<TData> implements IBaseOutcome<TData, boolean> {
   private data?: TData;
   private msgs?: string[];

    constructor(data?: TData, messages?: string[]) {
        this.data = data
        this.msgs = messages
    }

    static ok<TData>(value: TData) {
        return new TOutcome(value);
    }

    static error<TData>(message: string) {
        return new TOutcome<TData>(undefined, [message]);
    }

    static errors<TData>(messages?: string[]) {
        return new TOutcome<TData>(undefined, messages);
    }

	public get error(): boolean {
		return this.msgs !== undefined;
	}	

    public get success(): boolean {
        return this.data !== undefined;
   	}

	public get value(): TData {
		return this.data as TData;
	}

	public get message(): string {
		const message = this.msgs ?? [""]
        return message[0]
	}
}


export class ZodDtoOutcome<TData> implements IBaseOutcome<TData, ZodError> {
    private data?: TData;
    private _error?: ZodError;

    constructor(data?: TData, errors?: ZodError) {
        this.data = data
        this._error = errors        
    }

    static ok<TData>(value: TData) {
        return new ZodDtoOutcome(value);
    }

    static error<TData>(zodError?: ZodError) {
        return new ZodDtoOutcome<TData>(undefined, zodError)
    }

    public get error(): ZodError {
        return this._error ?? new ZodError([])
    }

    public get success(): boolean {
        return this.data !== undefined
    }

    public get value(): TData {
        return this.data as TData
    }

    public get message(): string {
        return ""
    }

    public get messages(): string[] {
        if(this._error === undefined) {
            return [""]
        }

        return this._error.errors.map((error) => error.message)
    }
}
