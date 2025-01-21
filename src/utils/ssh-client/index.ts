

import {Client} from 'ssh2';
import {readFileSync} from 'fs';


export interface ISSHConnectInfo {
	address: string;
	username: string;
	privateKeyPath: string;
}

export class SSHClient {
	private client: Client;

	constructor() {
		this.client = new Client();
	}

	connect(connectInfo: ISSHConnectInfo): Promise<void> {
		return new Promise((resolve, reject) => {
			this.client
			.on('ready', () => {
				console.log('SSH Connection established');
				resolve();
			})
			.on('error', (err) => {
				console.error('SSH Connection error', err);
				reject(err);
			})
			.connect({
				host: connectInfo.address,
				username: connectInfo.username,
				privateKey: readFileSync(connectInfo.privateKeyPath),
			});
		});
	}

	async executeAsync(command: string): Promise<{stdout: string, stderr: string}> {
		return new Promise((resolve, reject) => {
			this.client.exec(command, (err, stream) => {
				if(err) {
					reject(err);
				}

				let stdout = '';
				let stderr = '';

				stream
				.on('close', () => {
					resolve({stdout, stderr});
				})
				.on('data', (data: Buffer) => {
					stdout += data.toString();
				})
				.stderr.on('data', (data: Buffer) => {
					stderr += data.toString();
				});
			});
		});
	}

	disconnect() {
		this.client.end();
	}
}