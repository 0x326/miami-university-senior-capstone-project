[scale-interface](../README.md) › [Globals](../globals.md) › ["webSocketServer"](_websocketserver_.md)

# External module: "webSocketServer"

## Index

### Functions

* [createServer](_websocketserver_.md#createserver)
* [createWebSocketEmitter](_websocketserver_.md#createwebsocketemitter)
* [createWebSocketHandler](_websocketserver_.md#createwebsockethandler)
* [emitScaleData](_websocketserver_.md#emitscaledata)
* [handleGetExperiment](_websocketserver_.md#handlegetexperiment)
* [handleGetRootDir](_websocketserver_.md#handlegetrootdir)
* [handleListExperimentPaths](_websocketserver_.md#handlelistexperimentpaths)
* [handleListExperiments](_websocketserver_.md#handlelistexperiments)
* [handleWriteExperiment](_websocketserver_.md#handlewriteexperiment)

## Functions

###  createServer

▸ **createServer**(`port`: number): *Server*

Defined in webSocketServer.ts:220

**Parameters:**

Name | Type |
------ | ------ |
`port` | number |

**Returns:** *Server*

___

###  createWebSocketEmitter

▸ **createWebSocketEmitter**<**EmitterData**>(`emitter`: function): *WebSocketServer*

Defined in webSocketServer.ts:127

**Type parameters:**

▪ **EmitterData**

**Parameters:**

▪ **emitter**: *function*

▸ (): *AsyncGenerator‹EmitterData›*

**Returns:** *WebSocketServer*

___

###  createWebSocketHandler

▸ **createWebSocketHandler**<**HandlerData**, **HandlerResponse**>(`handler`: function): *WebSocketServer*

Defined in webSocketServer.ts:75

**Type parameters:**

▪ **HandlerData**

▪ **HandlerResponse**

**Parameters:**

▪ **handler**: *function*

▸ (`data`: HandlerData): *Promise‹HandlerResponse›*

**Parameters:**

Name | Type |
------ | ------ |
`data` | HandlerData |

**Returns:** *WebSocketServer*

___

###  emitScaleData

▸ **emitScaleData**(): *AsyncGenerator‹ScaleData›*

Defined in webSocketServer.ts:212

**Returns:** *AsyncGenerator‹ScaleData›*

___

###  handleGetExperiment

▸ **handleGetExperiment**(`options`: GetExperimentOptions): *Promise‹GetExperimentResponse›*

Defined in webSocketServer.ts:167

**Parameters:**

Name | Type |
------ | ------ |
`options` | GetExperimentOptions |

**Returns:** *Promise‹GetExperimentResponse›*

___

###  handleGetRootDir

▸ **handleGetRootDir**(): *Promise‹GetRootDirResponse›*

Defined in webSocketServer.ts:151

**Returns:** *Promise‹GetRootDirResponse›*

___

###  handleListExperimentPaths

▸ **handleListExperimentPaths**(`options`: ListExperimentPathsOptions): *Promise‹ListExperimentPathsResponse›*

Defined in webSocketServer.ts:180

**Parameters:**

Name | Type |
------ | ------ |
`options` | ListExperimentPathsOptions |

**Returns:** *Promise‹ListExperimentPathsResponse›*

___

###  handleListExperiments

▸ **handleListExperiments**(`options`: ListExperimentsOptions): *Promise‹ListExperimentsResponse›*

Defined in webSocketServer.ts:155

**Parameters:**

Name | Type |
------ | ------ |
`options` | ListExperimentsOptions |

**Returns:** *Promise‹ListExperimentsResponse›*

___

###  handleWriteExperiment

▸ **handleWriteExperiment**(`options`: WriteExperimentOptions): *Promise‹WriteExperimentResponse›*

Defined in webSocketServer.ts:192

**Parameters:**

Name | Type |
------ | ------ |
`options` | WriteExperimentOptions |

**Returns:** *Promise‹WriteExperimentResponse›*
