[web](../README.md) › [Globals](../globals.md) › ["routes/experiments/index"](../modules/_routes_experiments_index_.md) › [Props](_routes_experiments_index_.props.md)

# Interface: Props

## Hierarchy

* **Props**

## Index

### Properties

* [experimentIds](_routes_experiments_index_.props.md#experimentids)
* [experimentMetadata](_routes_experiments_index_.props.md#experimentmetadata)
* [experiments](_routes_experiments_index_.props.md#experiments)
* [onCreateExperiment](_routes_experiments_index_.props.md#oncreateexperiment)
* [onDrawerOpen](_routes_experiments_index_.props.md#ondraweropen)

## Properties

###  experimentIds

• **experimentIds**: *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RouteId](../modules/_types_.md#routeid)›*

Defined in packages/web/src/routes/experiments/index.tsx:34

___

###  experimentMetadata

• **experimentMetadata**: *[Map](_types_.routemap.md#map)‹[ExperimentId](../modules/_app_.md#experimentid), [ExperimentMetaData](_routes_experiments_new_newexperimentview_.experimentmetadata.md)›*

Defined in packages/web/src/routes/experiments/index.tsx:36

___

###  experiments

• **experiments**: *[RouteMap](_types_.routemap.md)*

Defined in packages/web/src/routes/experiments/index.tsx:35

___

###  onCreateExperiment

• **onCreateExperiment**: *function*

Defined in packages/web/src/routes/experiments/index.tsx:37

#### Type declaration:

▸ (`experimentMetaData`: [ExperimentMetaData](_routes_experiments_new_newexperimentview_.experimentmetadata.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`experimentMetaData` | [ExperimentMetaData](_routes_experiments_new_newexperimentview_.experimentmetadata.md) |

___

###  onDrawerOpen

• **onDrawerOpen**: *function*

Defined in packages/web/src/routes/experiments/index.tsx:33

#### Type declaration:

▸ (): *void*
