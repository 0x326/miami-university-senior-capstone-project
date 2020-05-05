[web](../README.md) › [Globals](../globals.md) › ["xlsx"](_xlsx_.md)

# External module: "xlsx"

## Index

### Enumerations

* [cols](../enums/_xlsx_.cols.md)
* [rows](../enums/_xlsx_.rows.md)

### Interfaces

* [Comments](../interfaces/_xlsx_.comments.md)
* [DummyMap](../interfaces/_xlsx_.dummymap.md)
* [Metadata](../interfaces/_xlsx_.metadata.md)

### Variables

* [lists](_xlsx_.md#const-lists)
* [numbers](_xlsx_.md#const-numbers)
* [staticColCount](_xlsx_.md#const-staticcolcount)

### Functions

* [binToDisplay](_xlsx_.md#bintodisplay)
* [displayToWB](_xlsx_.md#displaytowb)
* [experimentToWS](_xlsx_.md#experimenttows)
* [metadataToWS](_xlsx_.md#metadatatows)
* [parseData](_xlsx_.md#parsedata)
* [parseMeta](_xlsx_.md#parsemeta)
* [treatmentPair](_xlsx_.md#treatmentpair)

## Variables

### `Const` lists

• **lists**: *string[]* = [
  'treatments',
]

Defined in packages/web/src/xlsx.ts:70

___

### `Const` numbers

• **numbers**: *string[]* = [
  'date initialized',
  'last updated',
  'num treatments',
  'total sessions',
]

Defined in packages/web/src/xlsx.ts:62

___

### `Const` staticColCount

• **staticColCount**: *3* = 3

Defined in packages/web/src/xlsx.ts:46

## Functions

###  binToDisplay

▸ **binToDisplay**(`dat`: Uint8Array): *[[ExperimentMetaData](../interfaces/_routes_experiments_new_newexperimentview_.experimentmetadata.md), [Map](../interfaces/_types_.routemap.md#map)‹string, [ExperimentData](../interfaces/_routes_experiment_dashboard_experimentdashboard_.experimentdata.md)›, [RackDisplayOrder](../interfaces/_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md), [CageDisplayOrder](../interfaces/_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md), [DummyMap](../interfaces/_xlsx_.dummymap.md), [Comments](../interfaces/_xlsx_.comments.md)]*

Defined in packages/web/src/xlsx.ts:232

**Parameters:**

Name | Type |
------ | ------ |
`dat` | Uint8Array |

**Returns:** *[[ExperimentMetaData](../interfaces/_routes_experiments_new_newexperimentview_.experimentmetadata.md), [Map](../interfaces/_types_.routemap.md#map)‹string, [ExperimentData](../interfaces/_routes_experiment_dashboard_experimentdashboard_.experimentdata.md)›, [RackDisplayOrder](../interfaces/_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md), [CageDisplayOrder](../interfaces/_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md), [DummyMap](../interfaces/_xlsx_.dummymap.md), [Comments](../interfaces/_xlsx_.comments.md)]*

___

###  displayToWB

▸ **displayToWB**(`metadata`: [ExperimentMetaData](../interfaces/_routes_experiments_new_newexperimentview_.experimentmetadata.md), `ex`: [ExperimentData](../interfaces/_routes_experiment_dashboard_experimentdashboard_.experimentdata.md), `rdo`: [RackDisplayOrder](../interfaces/_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md), `cdo`: [CageDisplayOrder](../interfaces/_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md), `dm`: [DummyMap](../interfaces/_xlsx_.dummymap.md), `co`: [Comments](../interfaces/_xlsx_.comments.md)): *WorkBook*

Defined in packages/web/src/xlsx.ts:327

**Parameters:**

Name | Type |
------ | ------ |
`metadata` | [ExperimentMetaData](../interfaces/_routes_experiments_new_newexperimentview_.experimentmetadata.md) |
`ex` | [ExperimentData](../interfaces/_routes_experiment_dashboard_experimentdashboard_.experimentdata.md) |
`rdo` | [RackDisplayOrder](../interfaces/_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md) |
`cdo` | [CageDisplayOrder](../interfaces/_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md) |
`dm` | [DummyMap](../interfaces/_xlsx_.dummymap.md) |
`co` | [Comments](../interfaces/_xlsx_.comments.md) |

**Returns:** *WorkBook*

___

###  experimentToWS

▸ **experimentToWS**(`md`: [Metadata](../interfaces/_xlsx_.metadata.md), `ex`: [ExperimentData](../interfaces/_routes_experiment_dashboard_experimentdashboard_.experimentdata.md), `rdo`: [RackDisplayOrder](../interfaces/_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md), `cdo`: [CageDisplayOrder](../interfaces/_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md), `dm`: [DummyMap](../interfaces/_xlsx_.dummymap.md)): *WorkSheet*

Defined in packages/web/src/xlsx.ts:267

**Parameters:**

Name | Type |
------ | ------ |
`md` | [Metadata](../interfaces/_xlsx_.metadata.md) |
`ex` | [ExperimentData](../interfaces/_routes_experiment_dashboard_experimentdashboard_.experimentdata.md) |
`rdo` | [RackDisplayOrder](../interfaces/_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md) |
`cdo` | [CageDisplayOrder](../interfaces/_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md) |
`dm` | [DummyMap](../interfaces/_xlsx_.dummymap.md) |

**Returns:** *WorkSheet*

___

###  metadataToWS

▸ **metadataToWS**(`md`: [Metadata](../interfaces/_xlsx_.metadata.md)): *WorkSheet*

Defined in packages/web/src/xlsx.ts:258

**Parameters:**

Name | Type |
------ | ------ |
`md` | [Metadata](../interfaces/_xlsx_.metadata.md) |

**Returns:** *WorkSheet*

___

###  parseData

▸ **parseData**(`ds`: WorkSheet, `md`: [ExperimentMetaData](../interfaces/_routes_experiments_new_newexperimentview_.experimentmetadata.md)): *[[Map](../interfaces/_types_.routemap.md#map)‹[ExperimentId](_app_.md#experimentid), [ExperimentData](../interfaces/_routes_experiment_dashboard_experimentdashboard_.experimentdata.md)›, [DummyMap](../interfaces/_xlsx_.dummymap.md)]*

Defined in packages/web/src/xlsx.ts:153

**Parameters:**

Name | Type |
------ | ------ |
`ds` | WorkSheet |
`md` | [ExperimentMetaData](../interfaces/_routes_experiments_new_newexperimentview_.experimentmetadata.md) |

**Returns:** *[[Map](../interfaces/_types_.routemap.md#map)‹[ExperimentId](_app_.md#experimentid), [ExperimentData](../interfaces/_routes_experiment_dashboard_experimentdashboard_.experimentdata.md)›, [DummyMap](../interfaces/_xlsx_.dummymap.md)]*

___

###  parseMeta

▸ **parseMeta**(`sheet`: WorkSheet): *[ExperimentMetaData](../interfaces/_routes_experiments_new_newexperimentview_.experimentmetadata.md)*

Defined in packages/web/src/xlsx.ts:74

**Parameters:**

Name | Type |
------ | ------ |
`sheet` | WorkSheet |

**Returns:** *[ExperimentMetaData](../interfaces/_routes_experiments_new_newexperimentview_.experimentmetadata.md)*

___

###  treatmentPair

▸ **treatmentPair**(`datPair`: [CellObject, CellObject]): *[string, number]*

Defined in packages/web/src/xlsx.ts:141

**Parameters:**

Name | Type |
------ | ------ |
`datPair` | [CellObject, CellObject] |

**Returns:** *[string, number]*
