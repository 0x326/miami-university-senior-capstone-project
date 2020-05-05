[scale-interface](../README.md) › [Globals](../globals.md) › ["fsOperations"](_fsoperations_.md)

# External module: "fsOperations"

## Index

### Variables

* [rootPath](_fsoperations_.md#const-rootpath)
* [schema](_fsoperations_.md#const-schema)

### Functions

* [getExperiment](_fsoperations_.md#getexperiment)
* [listExperimentPaths](_fsoperations_.md#listexperimentpaths)
* [listExperiments](_fsoperations_.md#listexperiments)
* [valid](_fsoperations_.md#valid)
* [writeExperiment](_fsoperations_.md#writeexperiment)

## Variables

### `Const` rootPath

• **rootPath**: *"./SCALE_INTERFACE_DAT"* = "./SCALE_INTERFACE_DAT"

Defined in fsOperations.ts:77

___

### `Const` schema

• **schema**: *ObjectSchema‹›* = Joi.object({
  name: Joi.string()
    .min(1)
    .pattern(/^[^_]*$/) // anything but an underscore
    .required(),
  primaryExperimenter: Joi.string()
    .min(1)
    .pattern(/^[^_]*$/)
    .required(),
  dateInitialized: Joi.number()
    .integer()
    .greater(+new Date('2019'))
    .required(),
  lastUpdated: Joi.number()
    .integer()
    .greater(+new Date('2019'))
    .required(),
  isComplete: Joi.boolean()
    .required(),
  totalSessions: Joi.number()
    .integer()
    .greater(0)
    .required(),
  totalColsBegin: Joi.number()
    .integer()
    .required(),
  totalColsMid: Joi.number()
    .integer()
    .required(),
  totalColsEnd: Joi.number()
    .integer()
    .required(),
  subSessionLabelsBegin: Joi.array()
    .items(
      Joi.string(),
      Joi.link('/subSessionLabelsBegin'),
    ),
  subSessionLabelsMid: Joi.array()
    .items(
      Joi.string(),
      Joi.link('/subSessionLabelsMid'),
    ),
  subSessionLabelsEnd: Joi.array()
    .items(
      Joi.string(),
      Joi.link('/subSessionLabelsEnd'),
    ),
  cages: Joi.array().items(
    Joi.object({
      cageWeight: Joi.number().required(),
      cageLabel: Joi.string().required(),
      sessions: Joi.array()
        .items(Joi.object({}).pattern(/./, Joi.number()))
        .max(Joi.ref('/totalSessions')),
    }),
  ),
})

Defined in fsOperations.ts:19

## Functions

###  getExperiment

▸ **getExperiment**(`searchPath`: string): *Promise‹Experiment›*

Defined in fsOperations.ts:100

**Parameters:**

Name | Type |
------ | ------ |
`searchPath` | string |

**Returns:** *Promise‹Experiment›*

experiment object parsed from file at absolute path

___

###  listExperimentPaths

▸ **listExperimentPaths**(`query`: object): *Promise‹Array‹string››*

Defined in fsOperations.ts:144

**Parameters:**

▪ **query**: *object*

Name | Type |
------ | ------ |
`dateEnd` | Date |
`dateStart` | Date |
`experimentName` | string |
`path` | string |
`primaryExperimenter` | string |

**Returns:** *Promise‹Array‹string››*

a list of file paths matching query

___

###  listExperiments

▸ **listExperiments**(`query`: object): *Promise‹Array‹Experiment››*

Defined in fsOperations.ts:113

**Parameters:**

▪ **query**: *object*

Name | Type |
------ | ------ |
`filter` | null &#124; Experiment |
`path` | string |

**Returns:** *Promise‹Array‹Experiment››*

___

###  valid

▸ **valid**(`data`: Experiment): *Experiment*

Defined in fsOperations.ts:83

uses Joi to validate form of data.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Experiment |   |

**Returns:** *Experiment*

___

###  writeExperiment

▸ **writeExperiment**(`filePath`: string, `data`: Experiment): *Promise‹void›*

Defined in fsOperations.ts:196

simply writes stringified experiment json to file at path.

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |
`data` | Experiment |

**Returns:** *Promise‹void›*
