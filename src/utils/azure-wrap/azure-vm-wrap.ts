import { TinyOutcome, TOutcome } from '@/utils/outcome';

import { ComputeManagementClient, VirtualMachine } from '@azure/arm-compute';
import { NetworkManagementClient, NetworkInterfaceIPConfiguration } from '@azure/arm-network';
import { ClientSecretCredential } from '@azure/identity';

export interface IAzureVMStatus {
	id: string;
	name: string;
	location: string;
	size: string;
	status: string;
	osType: string;
	zones: string;
	publicAddress: string;
}


export const AzureCredential = {
	tenantID: process.env.AZURE_TENANT_ID as string ?? "",
	subscriptionID: process.env.AZURE_SUBSCRIPTION_ID as string ?? "",
	clientID: process.env.AZURE_CLIENT_ID as string ?? "",
	clientSecret: process.env.AZURE_CLIENT_SECRET as string ?? "",
}


export class AzureVMWrap {
	private client!: ComputeManagementClient;
	private networkClient!: NetworkManagementClient;

	static create() {
		return new AzureVMWrap();
	}

	constructor() {
		const credential = new ClientSecretCredential(AzureCredential.tenantID, AzureCredential.clientID, AzureCredential.clientSecret);
		this.client = new ComputeManagementClient(credential, AzureCredential.subscriptionID);
		this.networkClient = new NetworkManagementClient(credential, AzureCredential.subscriptionID);

		// console.error(`getVMStatus: ${AzureCredential.tenantID}, ${AzureCredential.subscriptionID}`);
	}
	
	async getVMStatus(resourceGroup: string, vmName: string): Promise<TOutcome<IAzureVMStatus>> {
		// console.error(`getVMStatus: ${AzureCredential.tenantID}, ${AzureCredential.subscriptionID}`);

		try {
			const vm = await this.client.virtualMachines.get(resourceGroup, vmName);
			const outcome = await this.getIPConfigAsync(resourceGroup, vm);
			if (!outcome.success) {
				return TOutcome.error(outcome.message);
			}

			const publicOutcome = await this.getPublicAddressAsync(resourceGroup, outcome.value);
			if (!publicOutcome.success) {
				return TOutcome.error(publicOutcome.message);
			}

			return TOutcome.ok({
				id: vm.id ?? "",
				name: vm.name ?? "",
				location: vm.location,
				size: vm.hardwareProfile?.vmSize ?? "",
				status: vm.provisioningState ?? "",
				osType: vm.storageProfile?.osDisk?.osType ?? "",
				zones: vm.zones?.join(",") ?? "",
				publicAddress: publicOutcome.value,
			});
		} catch (error) {
			console.error(`Failed to list VMs: ${this.client}`);
			console.error(`Failed to list VMs: ${this.networkClient}`);

			console.error('Failed to get VM status:', error);
			return TOutcome.error('Failed to get VM status');
		}
	}

	async listVMs(resourceGroup: string): Promise<TOutcome<IAzureVMStatus[]>> {
		try {
			const vms = await this.client.virtualMachines.list(resourceGroup);
			const vmList: IAzureVMStatus[] = [];
			for await (const vm of vms) {
				const outcome = await this.getIPConfigAsync(resourceGroup, vm);
				if (!outcome.success) {
					return TOutcome.error(outcome.message);
				}

				const publicOutcome = await this.getPublicAddressAsync(resourceGroup, outcome.value);
				if (!publicOutcome.success) {
					return TOutcome.error(publicOutcome.message);
				}
				
				vmList.push({
					id: vm.id ?? "",
					name: vm.name ?? "",
					location: vm.location,
					size: vm.hardwareProfile?.vmSize ?? "",
					status: vm.provisioningState ?? "",
					osType: vm.storageProfile?.osDisk?.osType ?? "",
					zones: vm.zones?.join(",") ?? "",
					publicAddress: publicOutcome.value,
				});
			}

			return TOutcome.ok(vmList);
		} catch (error) {
			console.error(`Failed to list VMs: ${error}`);
			console.error(`Failed to list VMs: ${this.client}`);
			console.error(`Failed to list VMs: ${this.networkClient}`);
			return TOutcome.error(`Failed to list VMs ${error}`);
		}
	}

	async startVM(resourceGroup: string, vmName: string): Promise<TinyOutcome> {
		try {
			const result = await this.client.virtualMachines.beginStart(resourceGroup, vmName);
			await result.pollUntilDone();

			return TinyOutcome.ok();
		} catch (error) {
			console.error('Failed to start VM:', error);
			return TinyOutcome.error('Failed to start VM');
		}
	}

	async stopVM(resourceGroup: string, vmName: string): Promise<TinyOutcome> {
		try {
			const result = await this.client.virtualMachines.beginDeallocate(resourceGroup, vmName);
			await result.pollUntilDone();

			return TinyOutcome.ok();
		} catch (error) {
			console.error('Failed to stop VM:', error);
			return TinyOutcome.error('Failed to stop VM');
		}
	}

	private async getIPConfigAsync(resourceGroup: string, vm: VirtualMachine): Promise<TOutcome<NetworkInterfaceIPConfiguration>> {
		try {
			const nicId = vm.networkProfile?.networkInterfaces?.[0].id;
			if (!nicId) {
				return TOutcome.error('No NIC found');
			}

			const nicName = nicId.split('/').pop() ?? '';
			if(!nicName) {
				return TOutcome.error('Invalid NIC ID');
			}

			const nic = await this.networkClient.networkInterfaces.get(resourceGroup, nicName);
			const ipConfig = nic.ipConfigurations?.[0];
			if (!ipConfig) {
				return TOutcome.error('No IP configuration found');
			}

			return TOutcome.ok(ipConfig);
		} catch (error) {
			console.error('Failed to get public IP:', error);
			return TOutcome.error('Failed to get public IP');
		}
	}

	private async getPublicAddressAsync(resourceGroup: string, ipConfig: NetworkInterfaceIPConfiguration): Promise<TOutcome<string>> {
		try {
            const publicIpId = ipConfig.publicIPAddress?.id;
            if (!publicIpId) {
                return TOutcome.error('No public IP ID found');
            }

            const publicIpName = publicIpId.split('/').pop() ?? '';
            if (!publicIpName) {
                return TOutcome.error('Invalid public IP ID');
            }

            const publicIp = await this.networkClient.publicIPAddresses.get(resourceGroup, publicIpName);
            return TOutcome.ok(publicIp.ipAddress ?? '');
        } catch (error) {
            console.error('Failed to get public IP:', error);
            return TOutcome.error('Failed to get public IP');
        }
	}
}
