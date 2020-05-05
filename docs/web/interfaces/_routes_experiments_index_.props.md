[web](../README.md) › [Globals](../globals.md) › ["routes/experiments/index"](../modules/_routes_experiments_index_.md) › [Props](_routes_experiments_index_.props.md)

# Interface: Props

## Hierarchy

* **Props**

## Index

### Properties

* [cageDisplayOrder](_routes_experiments_index_.props.md#cagedisplayorder)
* [comments](_routes_experiments_index_.props.md#comments)
* [connectScale](_routes_experiments_index_.props.md#connectscale)
* [connectionStatus](_routes_experiments_index_.props.md#connectionstatus)
* [dummyMap](_routes_experiments_index_.props.md#dummymap)
* [experimentMetadata](_routes_experiments_index_.props.md#experimentmetadata)
* [experiments](_routes_experiments_index_.props.md#experiments)
* [onAddCages](_routes_experiments_index_.props.md#onaddcages)
* [onCreateExperiment](_routes_experiments_index_.props.md#oncreateexperiment)
* [onDrawerOpen](_routes_experiments_index_.props.md#ondraweropen)
* [onNewWeights](_routes_experiments_index_.props.md#onnewweights)
* [rackDisplayOrder](_routes_experiments_index_.props.md#rackdisplayorder)
* [scaleConnectionStatus](_routes_experiments_index_.props.md#scaleconnectionstatus)

## Properties

###  cageDisplayOrder

• **cageDisplayOrder**: *[Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)››*

Defined in packages/web/src/routes/experiments/index.tsx:53

___

###  comments

• **comments**: *[Comments](_xlsx_.comments.md)*

Defined in packages/web/src/routes/experiments/index.tsx:56

___

###  connectScale

• **connectScale**: *function*

Defined in packages/web/src/routes/experiments/index.tsx:58

#### Type declaration:

▸ (): *void*

___

###  connectionStatus

• **connectionStatus**: *string*

Defined in packages/web/src/routes/experiments/index.tsx:62

___

###  dummyMap

• **dummyMap**: *[DummyMap](_xlsx_.dummymap.md)*

Defined in packages/web/src/routes/experiments/index.tsx:55

___

###  experimentMetadata

• **experimentMetadata**: *[Map](_types_.routemap.md#map)‹[ExperimentId](../modules/_app_.md#experimentid), [ExperimentMetaData](_routes_experiments_new_newexperimentview_.experimentmetadata.md)›*

Defined in packages/web/src/routes/experiments/index.tsx:54

___

###  experiments

• **experiments**: *[Map](_types_.routemap.md#map)‹[ExperimentId](../modules/_app_.md#experimentid), [ExperimentData](_routes_experiment_dashboard_experimentdashboard_.experimentdata.md)›*

Defined in packages/web/src/routes/experiments/index.tsx:51

___

###  onAddCages

• **onAddCages**: *function*

Defined in packages/web/src/routes/experiments/index.tsx:59

#### Type declaration:

▸ (`numCages`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`numCages` | number |

___

###  onCreateExperiment

• **onCreateExperiment**: *function*

Defined in packages/web/src/routes/experiments/index.tsx:57

#### Type declaration:

▸ (`experimentMetaData`: [ExperimentMetaData](_routes_experiments_new_newexperimentview_.experimentmetadata.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`experimentMetaData` | [ExperimentMetaData](_routes_experiments_new_newexperimentview_.experimentmetadata.md) |

___

###  onDrawerOpen

• **onDrawerOpen**: *function*

Defined in packages/web/src/routes/experiments/index.tsx:50

#### Type declaration:

▸ (): *void*

___

###  onNewWeights

• **onNewWeights**: *function*

Defined in packages/web/src/routes/experiments/index.tsx:60

#### Type declaration:

▸ (`newData`: [Map](_types_.routemap.md#map)‹[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹React.ReactText›, number›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newData` | [Map](_types_.routemap.md#map)‹[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹React.ReactText›, number› |

___

###  rackDisplayOrder

• **rackDisplayOrder**: *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

Defined in packages/web/src/routes/experiments/index.tsx:52

___

###  scaleConnectionStatus

• **scaleConnectionStatus**: *boolean*

Defined in packages/web/src/routes/experiments/index.tsx:61
