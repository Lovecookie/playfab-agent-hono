import { EContainerState } from '@/utils/shared.enums'


export interface IDockerContainerInfo {
	id: string;
	image: string;
	command: string;
	created: string;
	status: string;
	state: EContainerState;
	ports: string[];
	names: string;
}

export function parse_docker_ps(output: string): IDockerContainerInfo[] {
	const containers: IDockerContainerInfo[] = [];
	const lines = output.split('\n').filter(line => line.trim());

	for(let i = 1; i < lines.length; i++) {
		const line = lines[i];
		const parts = line.split(/\s+/);

		const container: IDockerContainerInfo = {
			id: parts[0],
			image: parts[1],
			command: parts[2].replace(/"|'/g, ''),
			created: `${parts[3]} ${parts[4]} ${parts[5]}`,
			status: "",
			state: EContainerState.Unknown,
			ports: [],
			names: "",
		};

		if(parts[6] === 'Up') {
			container.status = `${parts[6]} ${parts[7]} ${parts[8]}`;
			container.ports = parts[9].split(',').map(p => p.trim());
			container.names = parts[parts.length - 1];
		} else {
			container.status = `${parts[6]} ${parts[7]} ${parts[8]} ${parts[9]}`;
			container.ports = [];
			container.names = parts[parts.length - 1];
		}

		container.state = get_container_state(container.status)

		containers.push(container);
	}

	return containers;
}

function get_container_state(status: string): EContainerState {
	return status.split(' ')[0] === 'Up' ? EContainerState.Running : EContainerState.Panic;
}