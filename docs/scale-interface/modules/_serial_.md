[scale-interface](../README.md) › [Globals](../globals.md) › ["serial"](_serial_.md)

# External module: "serial"

## Index

### Enumerations

* [ActionReply](../enums/_serial_.actionreply.md)
* [MeasurementType](../enums/_serial_.measurementtype.md)

### Interfaces

* [Measurement](../interfaces/_serial_.measurement.md)

### Type aliases

* [ParserOnce](_serial_.md#parseronce)
* [PortClose](_serial_.md#portclose)
* [PortWrite](_serial_.md#portwrite)
* [Unit](_serial_.md#unit)

### Variables

* [Readline](_serial_.md#readline)
* [portCloseError](_serial_.md#let-portcloseerror)
* [serialPort](_serial_.md#let-serialport)

### Functions

* [changeUnits](_serial_.md#changeunits)
* [close](_serial_.md#close)
* [listenForReply](_serial_.md#listenforreply)
* [noop](_serial_.md#const-noop)
* [open](_serial_.md#open)
* [parse](_serial_.md#parse)
* [requestBalance](_serial_.md#requestbalance)
* [subscribe](_serial_.md#subscribe)
* [subscribeOnce](_serial_.md#subscribeonce)
* [tareBalance](_serial_.md#tarebalance)
* [throwError](_serial_.md#const-throwerror)
* [write](_serial_.md#write)

## Type aliases

###  ParserOnce

Ƭ **ParserOnce**: *function*

Defined in serial.ts:17

#### Type declaration:

▸ (): *object*

* **attachPromise**: *Promise‹void›*

* **dataPromise**: *Promise‹string›*

___

###  PortClose

Ƭ **PortClose**: *function*

Defined in serial.ts:16

#### Type declaration:

▸ (): *Promise‹void›*

___

###  PortWrite

Ƭ **PortWrite**: *function*

Defined in serial.ts:15

#### Type declaration:

▸ (`arg1`: string | number[] | Buffer): *Promise‹number›*

**Parameters:**

Name | Type |
------ | ------ |
`arg1` | string &#124; number[] &#124; Buffer |

___

###  Unit

Ƭ **Unit**: *"g" | "pc" | "%" | "oz" | "lb" | "ozt" | "ct" | "momme" | "dwt" | "grain" | "tael"*

Defined in serial.ts:156

## Variables

###  Readline

• **Readline**: *Readline*

Defined in serial.ts:12

___

### `Let` portCloseError

• **portCloseError**: *Error | null* = null

Defined in serial.ts:29

___

### `Let` serialPort

• **serialPort**: *object | null* = null

Defined in serial.ts:22

## Functions

###  changeUnits

▸ **changeUnits**(): *Promise‹void›*

Defined in serial.ts:329

**Returns:** *Promise‹void›*

___

###  close

▸ **close**(): *Promise‹void›*

Defined in serial.ts:127

**Returns:** *Promise‹void›*

___

###  listenForReply

▸ **listenForReply**(`type`: [ActionReply](../enums/_serial_.actionreply.md)): *Promise‹void›*

Defined in serial.ts:289

**Parameters:**

Name | Type |
------ | ------ |
`type` | [ActionReply](../enums/_serial_.actionreply.md) |

**Returns:** *Promise‹void›*

___

### `Const` noop

▸ **noop**(): *void*

Defined in serial.ts:38

**Returns:** *void*

___

###  open

▸ **open**(`path`: string, `options`: OpenOptions): *Promise‹void›*

Defined in serial.ts:40

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`path` | string | - |
`options` | OpenOptions | {} |

**Returns:** *Promise‹void›*

___

###  parse

▸ **parse**(`data`: string): *[Measurement](../interfaces/_serial_.measurement.md) | [ActionReply](../enums/_serial_.actionreply.md)*

Defined in serial.ts:158

**Parameters:**

Name | Type |
------ | ------ |
`data` | string |

**Returns:** *[Measurement](../interfaces/_serial_.measurement.md) | [ActionReply](../enums/_serial_.actionreply.md)*

___

###  requestBalance

▸ **requestBalance**(): *Promise‹[Measurement](../interfaces/_serial_.measurement.md)›*

Defined in serial.ts:299

**Returns:** *Promise‹[Measurement](../interfaces/_serial_.measurement.md)›*

___

###  subscribe

▸ **subscribe**(`includeActionReplies`: true): *AsyncGenerator‹[Measurement](../interfaces/_serial_.measurement.md) | [ActionReply](../enums/_serial_.actionreply.md)›*

Defined in serial.ts:221

**Parameters:**

Name | Type |
------ | ------ |
`includeActionReplies` | true |

**Returns:** *AsyncGenerator‹[Measurement](../interfaces/_serial_.measurement.md) | [ActionReply](../enums/_serial_.actionreply.md)›*

▸ **subscribe**(`includeActionReplies?`: undefined | false): *AsyncGenerator‹[Measurement](../interfaces/_serial_.measurement.md)›*

Defined in serial.ts:222

**Parameters:**

Name | Type |
------ | ------ |
`includeActionReplies?` | undefined &#124; false |

**Returns:** *AsyncGenerator‹[Measurement](../interfaces/_serial_.measurement.md)›*

___

###  subscribeOnce

▸ **subscribeOnce**(`includeActionReplies`: true): *Promise‹[Measurement](../interfaces/_serial_.measurement.md) | [ActionReply](../enums/_serial_.actionreply.md)›*

Defined in serial.ts:255

**Parameters:**

Name | Type |
------ | ------ |
`includeActionReplies` | true |

**Returns:** *Promise‹[Measurement](../interfaces/_serial_.measurement.md) | [ActionReply](../enums/_serial_.actionreply.md)›*

▸ **subscribeOnce**(`includeActionReplies?`: undefined | false): *Promise‹[Measurement](../interfaces/_serial_.measurement.md)›*

Defined in serial.ts:256

**Parameters:**

Name | Type |
------ | ------ |
`includeActionReplies?` | undefined &#124; false |

**Returns:** *Promise‹[Measurement](../interfaces/_serial_.measurement.md)›*

___

###  tareBalance

▸ **tareBalance**(): *Promise‹void›*

Defined in serial.ts:314

**Returns:** *Promise‹void›*

___

### `Const` throwError

▸ **throwError**(): *void*

Defined in serial.ts:32

**Returns:** *void*

___

###  write

▸ **write**(`data`: string): *Promise‹number›*

Defined in serial.ts:112

**Parameters:**

Name | Type |
------ | ------ |
`data` | string |

**Returns:** *Promise‹number›*
