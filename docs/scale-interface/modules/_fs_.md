[scale-interface](../README.md) › [Globals](../globals.md) › ["fs"](_fs_.md)

# External module: "fs"

## Index

### Interfaces

* [FSBoundaryOptions](../interfaces/_fs_.fsboundaryoptions.md)

### Type aliases

* [Path](_fs_.md#path)

### Functions

* [isPathWithinBoundary](_fs_.md#ispathwithinboundary)
* [mkdir](_fs_.md#mkdir)
* [readFile](_fs_.md#readfile)
* [readdir](_fs_.md#readdir)
* [rmdir](_fs_.md#rmdir)
* [unlink](_fs_.md#unlink)
* [writeFile](_fs_.md#writefile)

## Type aliases

###  Path

Ƭ **Path**: *string*

Defined in fs.ts:12

## Functions

###  isPathWithinBoundary

▸ **isPathWithinBoundary**(`path`: [Path](_fs_.md#path), `boundary`: [Path](_fs_.md#path)): *boolean*

Defined in fs.ts:18

**Parameters:**

Name | Type |
------ | ------ |
`path` | [Path](_fs_.md#path) |
`boundary` | [Path](_fs_.md#path) |

**Returns:** *boolean*

___

###  mkdir

▸ **mkdir**(`path`: [Path](_fs_.md#path), `options`: MakeDirectoryOptions & [FSBoundaryOptions](../interfaces/_fs_.fsboundaryoptions.md)): *Promise‹void›*

Defined in fs.ts:27

**Parameters:**

Name | Type |
------ | ------ |
`path` | [Path](_fs_.md#path) |
`options` | MakeDirectoryOptions & [FSBoundaryOptions](../interfaces/_fs_.fsboundaryoptions.md) |

**Returns:** *Promise‹void›*

___

###  readFile

▸ **readFile**(`path`: [Path](_fs_.md#path), `options`: object & [FSBoundaryOptions](../interfaces/_fs_.fsboundaryoptions.md)): *Promise‹string | Buffer›*

Defined in fs.ts:57

**Parameters:**

Name | Type |
------ | ------ |
`path` | [Path](_fs_.md#path) |
`options` | object & [FSBoundaryOptions](../interfaces/_fs_.fsboundaryoptions.md) |

**Returns:** *Promise‹string | Buffer›*

___

###  readdir

▸ **readdir**(`path`: [Path](_fs_.md#path), `options`: object & [FSBoundaryOptions](../interfaces/_fs_.fsboundaryoptions.md)): *Promise‹string[]›*

Defined in fs.ts:36

**Parameters:**

Name | Type |
------ | ------ |
`path` | [Path](_fs_.md#path) |
`options` | object & [FSBoundaryOptions](../interfaces/_fs_.fsboundaryoptions.md) |

**Returns:** *Promise‹string[]›*

___

###  rmdir

▸ **rmdir**(`path`: [Path](_fs_.md#path), `options`: RmDirAsyncOptions & [FSBoundaryOptions](../interfaces/_fs_.fsboundaryoptions.md)): *Promise‹void›*

Defined in fs.ts:48

**Parameters:**

Name | Type |
------ | ------ |
`path` | [Path](_fs_.md#path) |
`options` | RmDirAsyncOptions & [FSBoundaryOptions](../interfaces/_fs_.fsboundaryoptions.md) |

**Returns:** *Promise‹void›*

___

###  unlink

▸ **unlink**(`path`: [Path](_fs_.md#path), `options`: [FSBoundaryOptions](../interfaces/_fs_.fsboundaryoptions.md)): *Promise‹void›*

Defined in fs.ts:84

**Parameters:**

Name | Type |
------ | ------ |
`path` | [Path](_fs_.md#path) |
`options` | [FSBoundaryOptions](../interfaces/_fs_.fsboundaryoptions.md) |

**Returns:** *Promise‹void›*

___

###  writeFile

▸ **writeFile**(`path`: [Path](_fs_.md#path), `data`: any, `options`: object & [FSBoundaryOptions](../interfaces/_fs_.fsboundaryoptions.md)): *Promise‹void›*

Defined in fs.ts:69

**Parameters:**

Name | Type |
------ | ------ |
`path` | [Path](_fs_.md#path) |
`data` | any |
`options` | object & [FSBoundaryOptions](../interfaces/_fs_.fsboundaryoptions.md) |

**Returns:** *Promise‹void›*
