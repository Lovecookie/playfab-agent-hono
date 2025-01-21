import { TOutcome } from '@/utils/outcome'

import { ContainerInstanceManagementClient, ContainerState } from '@azure/arm-containerinstance'
import { DefaultAzureCredential } from '@azure/identity'


export interface IAzureContainerStatus {
	success: boolean
	status: string
	containers: {
		name: string
		status: string | ContainerState
		previousStatus: string | ContainerState
	}[];
}


export class AzureContainerWrap {
	private client: ContainerInstanceManagementClient
	private resourceGroup: string
	private subscriptionId: string

	constructor() {
		this.resourceGroup = process.env.AZURE_RESOURCE_GROUP as string ?? ""
		this.subscriptionId = process.env.AZURE_SUBSCRIPTION_ID as string ?? ""		
		this.client = new ContainerInstanceManagementClient(new DefaultAzureCredential(), this.subscriptionId)
	}

	async getContainerStatus(containerGroup: string, resourceGroup?: string): Promise<TOutcome<IAzureContainerStatus>> {
		resourceGroup = resourceGroup ?? this.resourceGroup
		
		try {
			const containerGroupStatus = await this.client.containerGroups.get(resourceGroup, containerGroup);
			return TOutcome.ok({
				success: true,
				status: containerGroupStatus.instanceView?.state ?? "",
				containers: containerGroupStatus.containers.map(container => ({
					name: container.name,
					status: container.instanceView?.currentState ?? "",
					previousStatus: container.instanceView?.previousState ?? "",
				}))
			})
		} catch (error) {
			console.error('Failed to get container status:', error)
			return TOutcome.error('Failed to get container status')
		}
	}
}