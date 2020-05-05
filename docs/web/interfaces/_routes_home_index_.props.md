[web](../README.md) › [Globals](../globals.md) › ["routes/home/index"](../modules/_routes_home_index_.md) › [Props](_routes_home_index_.props.md)

# Interface: Props

## Hierarchy

* **Props**

## Index

### Properties

* [metaData](_routes_home_index_.props.md#metadata)
* [onDrawerOpen](_routes_home_index_.props.md#ondraweropen)
* [onExperimentDataChange](_routes_home_index_.props.md#onexperimentdatachange)

## Properties

###  metaData

• **metaData**: *[Map](_types_.routemap.md#map)‹[ExperimentId](../modules/_app_.md#experimentid), [ExperimentMetaData](_routes_experiments_new_newexperimentview_.experimentmetadata.md)›*

Defined in packages/web/src/routes/home/index.tsx:42

___

###  onDrawerOpen

• **onDrawerOpen**: *function*

Defined in packages/web/src/routes/home/index.tsx:35

#### Type declaration:

▸ (): *void*

___

###  onExperimentDataChange

• **onExperimentDataChange**: *function*

Defined in packages/web/src/routes/home/index.tsx:36

#### Type declaration:

▸ (`newExperimentData`: [Map](_types_.routemap.md#map)‹string, [ExperimentData](_routes_experiment_dashboard_experimentdashboard_.experimentdata.md)›, `newMetaData`: [Map](_types_.routemap.md#map)‹string, [ExperimentMetaData](_routes_experiments_new_newexperimentview_.experimentmetadata.md)›, `newRackDisplayOrder`: [RackDisplayOrder](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md), `newCageDisplayOrder`: [CageDisplayOrder](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md), `newDummyMap`: [DummyMap](_xlsx_.dummymap.md), `comments`: [Comments](_xlsx_.comments.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newExperimentData` | [Map](_types_.routemap.md#map)‹string, [ExperimentData](_routes_experiment_dashboard_experimentdashboard_.experimentdata.md)› |
`newMetaData` | [Map](_types_.routemap.md#map)‹string, [ExperimentMetaData](_routes_experiments_new_newexperimentview_.experimentmetadata.md)› |
`newRackDisplayOrder` | [RackDisplayOrder](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md) |
`newCageDisplayOrder` | [CageDisplayOrder](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md) |
`newDummyMap` | [DummyMap](_xlsx_.dummymap.md) |
`comments` | [Comments](_xlsx_.comments.md) |
