declare interface Headers {
	constructor(headers: any);

	append(name: string, value: string);
	delete(name: string);
	get(name: string): string;
	getAll(name: string): any;
	has(name): boolean;
	set(name: string, value: string);
	forEach(callback: Function, thisArg: any);
}

declare interface Body {
	blob(): Promise<Blob>;

	json(): Promise<any>;

	text(): Promise<string>;
}

declare interface Request {
	url: string;
	credentials: any;
	headers: Headers
	method: string;
	mode: any;
	referrer: any;
}

declare interface Response {
	type: string;
	status: number;
	ok: boolean;
	statusText: string;
	headers: Headers;
	url: string;

	json(): Promise<any>;

	text(): Promise<string>;
}

declare interface URLSearchParams {
}

declare function fetch(input?, init?): Promise<any>;
