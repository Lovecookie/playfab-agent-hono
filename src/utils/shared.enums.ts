


/////////////////////////////////////////////////////////////////////////////////////
// EAppType
export const EAppType = {
	None: 0,
	Gateway: 1,
	LoginServer: 2,
	WorldManager: 3,
	GameServer: 4,
	DBMW: 5,
	RelayServer: 6,
	Dedi: 7,
	LogServer: 8

	// TestClient = 199,
	// TestDedi = 200
} as const;
export type EAppType = typeof EAppType[keyof typeof EAppType];

export function convertStringToAppType(appType: string): EAppType {
	switch (appType) {
		case 'None':
			return EAppType.None;
		case 'Gateway':
			return EAppType.Gateway;
		case 'LoginServer':
			return EAppType.LoginServer;
		case 'WorldManager':
			return EAppType.WorldManager;
		case 'GameServer':
			return EAppType.GameServer;
		case 'DBMW':
			return EAppType.DBMW;
		case 'RelayServer':
			return EAppType.RelayServer;
		case 'Dedi':
			return EAppType.Dedi;
		case 'LogServer':
			return EAppType.LogServer;		
		default:
			return EAppType.None;
	}
}

export function convertToAppTypeString(appType: EAppType | number): string {
	if (typeof appType === 'number') {
		appType = appType as EAppType;
	}

	switch (appType) {
		case EAppType.None:
			return 'None';
		case EAppType.Gateway:
			return 'Gateway';
		case EAppType.LoginServer:
			return 'LoginServer';
		case EAppType.WorldManager:
			return 'WorldManager';
		case EAppType.GameServer:
			return 'GameServer';
		case EAppType.DBMW:
			return 'DBMW';
		case EAppType.RelayServer:
			return 'RelayServer';
		case EAppType.Dedi:
			return 'Dedi';
		case EAppType.LogServer:
			return 'LogServer';	
		default:
			return 'Unknown';
	}
}

/////////////////////////////////////////////////////////////////////////////////////
// ELogLevel
export const ELogLevel = {
	Debug: -1,
	Info: 0,
	Warn: 1,
	Error: 2,
	DPanic: 3,
	Panic: 4,
	Fatal: 5
} as const;
export type ELogLevel = typeof ELogLevel[keyof typeof ELogLevel];

export function convertStringToLogLevel(logLevel: string): ELogLevel {
	switch (logLevel) {
		case 'Debug':
			return ELogLevel.Debug;
		case 'Info':
			return ELogLevel.Info;
		case 'Warn':
			return ELogLevel.Warn;
		case 'Error':
			return ELogLevel.Error;
		case 'DPanic':
			return ELogLevel.DPanic;
		case 'Panic':
			return ELogLevel.Panic;
		case 'Fatal':
			return ELogLevel.Fatal;
		default:
			return ELogLevel.Info;
	}
}

export function convertToLogLevelString(logLevel: ELogLevel | number): string {
	if (typeof logLevel === 'number') {
		logLevel = logLevel as ELogLevel;
	}

	switch (logLevel) {
		case ELogLevel.Debug:
			return 'Debug';
		case ELogLevel.Info:
			return 'Info';
		case ELogLevel.Warn:
			return 'Warn';
		case ELogLevel.Error:
			return 'Error';
		case ELogLevel.DPanic:
			return 'DPanic';
		case ELogLevel.Panic:
			return 'Panic';
		case ELogLevel.Fatal:
			return 'Fatal';
		default:
			return 'Unknown';
	}
}


/////////////////////////////////////////////////////////////////////////////////////
// EUserSearchType
export const EUserSearchType = {
	None: -1,
	ID: 0,
	AccountIndex: 1
} as const;
export type EUserSearchType = typeof EUserSearchType[keyof typeof EUserSearchType];

export function convertStringToUserSearchType(userSearchType: string): EUserSearchType {
	switch (userSearchType) {
		case 'Name':
			return EUserSearchType.ID;
		case 'AccountIndex':
			return EUserSearchType.AccountIndex;
		default:
			return EUserSearchType.ID;
	}
}

export function convertToUserSearchTypeString(userSearchType: EUserSearchType | number): string {
	if (typeof userSearchType === 'number') {
		userSearchType = userSearchType as EUserSearchType;
	}

	switch (userSearchType) {
		case EUserSearchType.ID:
			return 'Name';
		case EUserSearchType.AccountIndex:
			return 'AccountIndex';
		default:
			return 'None';
	}
}

/////////////////////////////////////////////////////////////////////////////////////
// EAdminSearchType
export const EAdminSearchType = {
	None: -1,
	Email: 0,	
	NickName: 1
} as const;
export type EAdminSearchType = typeof EAdminSearchType[keyof typeof EAdminSearchType];

export function convertStringToAdminSearchType(adminSearchType: string): EAdminSearchType {
	switch (adminSearchType) {
		case 'Email':
			return EAdminSearchType.Email;		
		case 'NickName':
			return EAdminSearchType.NickName;
		default:
			return EAdminSearchType.Email;
	}
}

export function convertToAdminSearchTypeString(adminSearchType: EAdminSearchType | number): string {
	if (typeof adminSearchType === 'number') {
		adminSearchType = adminSearchType as EAdminSearchType;
	}

	switch (adminSearchType) {
		case EAdminSearchType.Email:
			return 'Email';		
		case EAdminSearchType.NickName:
			return 'NickName';
		default:
			return 'None';
	}
}


/////////////////////////////////////////////////////////////////////////////////////
// EUserType
export const EUserType = {
	Developer: 'Developer',
	Adventure: 'Adventure',
	Tamers: 'Tamers',
	Frontier: 'Frontier',
	Savers: 'Savers',
} as const;
export type EUserType = typeof EUserType[keyof typeof EUserType];

export function convertToIndexUserType(userType: EUserType): number {
	switch (userType) {
		case EUserType.Developer:
			return 0;
		case EUserType.Adventure:
			return 1;
		case EUserType.Tamers:
			return 2;
		case EUserType.Frontier:
			return 3;
		case EUserType.Savers:
			return 4;
		default:
			return 4;
	}
}


/////////////////////////////////////////////////////////////////////////////////////
// EServerStateType
export const EServerStateType = {
	Good: 'Good',
	MaybeGood: 'MaybeGood',
	Warning: 'Warning',
	Panic: 'Panic',	
} as const;
export type EServerStateType = typeof EServerStateType[keyof typeof EServerStateType]


export function convertToIndexServerStateType(state: EServerStateType): number {
	switch (state) {
		case EServerStateType.Good:
			return 0;
		case EServerStateType.MaybeGood:
			return 1;
		case EServerStateType.Warning:
			return 2;
		case EServerStateType.Panic:
			return 3;
		default:
			return 0;
	}
}

/////////////////////////////////////////////////////////////////////////////////////
// EContainerState
export const EContainerState = {
	Unknown: 'Unknown',
	Panic: 'Panic',
	Running: 'Running',
	// Paused: 'Paused',	
} as const
export type EContainerState = typeof EContainerState[keyof typeof EContainerState]

export function StringToContainerState(state: string): EContainerState {
	return EContainerState[state as keyof typeof EContainerState] ?? EContainerState.Unknown;
}

