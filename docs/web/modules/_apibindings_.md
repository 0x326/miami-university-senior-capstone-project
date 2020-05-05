[web](../README.md) › [Globals](../globals.md) › ["apiBindings"](_apibindings_.md)

# External module: "apiBindings"

## Index

### Variables

* [webSockets](_apibindings_.md#let-websockets)

### Functions

* [connect](_apibindings_.md#connect)
* [disconnect](_apibindings_.md#disconnect)
* [getExperiment](_apibindings_.md#getexperiment)
* [getRootDir](_apibindings_.md#getrootdir)
* [listExperimentPaths](_apibindings_.md#listexperimentpaths)
* [listExperiments](_apibindings_.md#listexperiments)
* [openWebSocket](_apibindings_.md#openwebsocket)
* [scaleData](_apibindings_.md#scaledata)
* [socketSend](_apibindings_.md#socketsend)
* [writeExperiment](_apibindings_.md#writeexperiment)

## Variables

### `Let` webSockets

• **webSockets**: *null | object* = null

Defined in packages/web/src/apiBindings.ts:66

## Functions

###  connect

▸ **connect**(`host`: string, `port`: number, `timeout`: number): *Promise‹void›*

Defined in packages/web/src/apiBindings.ts:105

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`host` | string | "localhost" |
`port` | number | 8080 |
`timeout` | number | 1500 |

**Returns:** *Promise‹void›*

___

###  disconnect

▸ **disconnect**(): *void*

Defined in packages/web/src/apiBindings.ts:131

**Returns:** *void*

___

###  getExperiment

▸ **getExperiment**(`options`: GetExperimentOptions): *Promise‹Experiment | undefined›*

Defined in packages/web/src/apiBindings.ts:257

**Parameters:**

Name | Type |
------ | ------ |
`options` | GetExperimentOptions |

**Returns:** *Promise‹Experiment | undefined›*

___

###  getRootDir

▸ **getRootDir**(): *Promise‹string›*

Defined in packages/web/src/apiBindings.ts:239

**Returns:** *Promise‹string›*

___

###  listExperimentPaths

▸ **listExperimentPaths**(`options`: ListExperimentPathsOptions): *Promise‹Array‹string› | undefined›*

Defined in packages/web/src/apiBindings.ts:267

**Parameters:**

Name | Type |
------ | ------ |
`options` | ListExperimentPathsOptions |

**Returns:** *Promise‹Array‹string› | undefined›*

___

###  listExperiments

▸ **listExperiments**(`options`: ListExperimentsOptions): *Promise‹Array‹Experiment› | undefined›*

Defined in packages/web/src/apiBindings.ts:247

**Parameters:**

Name | Type |
------ | ------ |
`options` | ListExperimentsOptions |

**Returns:** *Promise‹Array‹Experiment› | undefined›*

___

###  openWebSocket

▸ **openWebSocket**(`path`: string, `timeout`: number): *Promise‹WebSocket›*

Defined in packages/web/src/apiBindings.ts:75

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`timeout` | number |

**Returns:** *Promise‹WebSocket›*

___

###  scaleData

▸ **scaleData**(`callback`: function): *void*

Defined in packages/web/src/apiBindings.ts:285

**Parameters:**

▪ **callback**: *function*

▸ (`measurement`: ScaleData): *void*

**Parameters:**

Name | Type |
------ | ------ |
`measurement` | ScaleData |

**Returns:** *void*

___

###  socketSend

▸ **socketSend**(`endpoint`: GetExperimentEndpoint, `options`: GetExperimentOptions): *Promise‹GetExperimentResponse›*

Defined in packages/web/src/apiBindings.ts:145

**Parameters:**

Name | Type |
------ | ------ |
`endpoint` | GetExperimentEndpoint |
`options` | GetExperimentOptions |

**Returns:** *Promise‹GetExperimentResponse›*

▸ **socketSend**(`endpoint`: GetRootDirEndpoint, `options`: GetRootDirOptions): *Promise‹GetRootDirResponse›*

Defined in packages/web/src/apiBindings.ts:150

**Parameters:**

Name | Type |
------ | ------ |
`endpoint` | GetRootDirEndpoint |
`options` | GetRootDirOptions |

**Returns:** *Promise‹GetRootDirResponse›*

▸ **socketSend**(`endpoint`: ListExperimentPathsEndpoint, `options`: ListExperimentPathsOptions): *Promise‹ListExperimentPathsResponse›*

Defined in packages/web/src/apiBindings.ts:155

**Parameters:**

Name | Type |
------ | ------ |
`endpoint` | ListExperimentPathsEndpoint |
`options` | ListExperimentPathsOptions |

**Returns:** *Promise‹ListExperimentPathsResponse›*

▸ **socketSend**(`endpoint`: ListExperimentsEndpoint, `options`: ListExperimentsOptions): *Promise‹ListExperimentsResponse›*

Defined in packages/web/src/apiBindings.ts:160

**Parameters:**

Name | Type |
------ | ------ |
`endpoint` | ListExperimentsEndpoint |
`options` | ListExperimentsOptions |

**Returns:** *Promise‹ListExperimentsResponse›*

▸ **socketSend**(`endpoint`: WriteExperimentEndpoint, `options`: WriteExperimentOptions): *Promise‹WriteExperimentResponse›*

Defined in packages/web/src/apiBindings.ts:165

**Parameters:**

Name | Type |
------ | ------ |
`endpoint` | WriteExperimentEndpoint |
`options` | WriteExperimentOptions |

**Returns:** *Promise‹WriteExperimentResponse›*

___

###  writeExperiment

▸ **writeExperiment**(`options`: WriteExperimentOptions): *Promise‹void›*

Defined in packages/web/src/apiBindings.ts:277

**Parameters:**

Name | Type |
------ | ------ |
`options` | WriteExperimentOptions |

**Returns:** *Promise‹void›*
