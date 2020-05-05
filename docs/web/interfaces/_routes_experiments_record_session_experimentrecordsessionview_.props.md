[web](../README.md) › [Globals](../globals.md) › ["routes/experiments/record/session/ExperimentRecordSessionView"](../modules/_routes_experiments_record_session_experimentrecordsessionview_.md) › [Props](_routes_experiments_record_session_experimentrecordsessionview_.props.md)

# Interface: Props

## Hierarchy

* **Props**

## Index

### Properties

* [cageDisplayOrder](_routes_experiments_record_session_experimentrecordsessionview_.props.md#cagedisplayorder)
* [cageIds](_routes_experiments_record_session_experimentrecordsessionview_.props.md#cageids)
* [experiment](_routes_experiments_record_session_experimentrecordsessionview_.props.md#experiment)
* [experimentMetadata](_routes_experiments_record_session_experimentrecordsessionview_.props.md#experimentmetadata)
* [onEnd](_routes_experiments_record_session_experimentrecordsessionview_.props.md#onend)
* [rackDisplayOrder](_routes_experiments_record_session_experimentrecordsessionview_.props.md#rackdisplayorder)

## Properties

###  cageDisplayOrder

• **cageDisplayOrder**: *[Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)››*

Defined in packages/web/src/routes/experiments/record/session/ExperimentRecordSessionView.tsx:41

___

###  cageIds

• **cageIds**: *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹number›*

Defined in packages/web/src/routes/experiments/record/session/ExperimentRecordSessionView.tsx:44

___

###  experiment

• **experiment**: *[ExperimentData](_routes_experiment_dashboard_experimentdashboard_.experimentdata.md)*

Defined in packages/web/src/routes/experiments/record/session/ExperimentRecordSessionView.tsx:39

___

###  experimentMetadata

• **experimentMetadata**: *[ExperimentMetaData](_routes_experiments_new_newexperimentview_.experimentmetadata.md)*

Defined in packages/web/src/routes/experiments/record/session/ExperimentRecordSessionView.tsx:42

___

###  onEnd

• **onEnd**: *function*

Defined in packages/web/src/routes/experiments/record/session/ExperimentRecordSessionView.tsx:43

#### Type declaration:

▸ (`newData`: [Map](_types_.routemap.md#map)‹[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹number | string›, number›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newData` | [Map](_types_.routemap.md#map)‹[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹number &#124; string›, number› |

___

###  rackDisplayOrder

• **rackDisplayOrder**: *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

Defined in packages/web/src/routes/experiments/record/session/ExperimentRecordSessionView.tsx:40
