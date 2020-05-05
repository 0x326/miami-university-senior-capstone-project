[web](../README.md) › [Globals](../globals.md) › ["routes/experiment-dashboard/ExperimentDashboard"](../modules/_routes_experiment_dashboard_experimentdashboard_.md) › [RackDisplayOrder](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md)

# Interface: RackDisplayOrder

## Hierarchy

* [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›

  ↳ **RackDisplayOrder**

## Index

### Properties

* [size](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#size)

### Methods

* [Indexed](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#indexed)
* [List](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#list)
* [asImmutable](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#asimmutable)
* [asMutable](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#asmutable)
* [clear](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#clear)
* [concat](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#concat)
* [delete](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#delete)
* [deleteIn](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#deletein)
* [filter](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#filter)
* [flatMap](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#flatmap)
* [insert](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#insert)
* [isList](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#islist)
* [map](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#map)
* [merge](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#merge)
* [mergeDeepIn](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#mergedeepin)
* [mergeIn](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#mergein)
* [of](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#of)
* [pop](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#pop)
* [push](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#push)
* [remove](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#remove)
* [removeIn](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#removein)
* [set](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#set)
* [setIn](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#setin)
* [setSize](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#setsize)
* [shift](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#shift)
* [unshift](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#unshift)
* [update](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#update)
* [updateIn](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#updatein)
* [wasAltered](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#wasaltered)
* [withMutations](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#withmutations)
* [zip](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#zip)
* [zipAll](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#zipall)
* [zipWith](_routes_experiment_dashboard_experimentdashboard_.rackdisplayorder.md#zipwith)

## Properties

###  size

• **size**: *number*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[size](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#size)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:192

The number of items in this List.

## Methods

###  Indexed

▸ **Indexed**<**T**>(`collection`: Iterable‹T›): *[Indexed](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#indexed)‹T›*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:3410

Creates a new Collection.Indexed.

Note: `Collection.Indexed` is a conversion function and not a class, and
does not use the `new` keyword during construction.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`collection` | Iterable‹T› |

**Returns:** *[Indexed](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#indexed)‹T›*

___

###  List

▸ **List**(): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹any›*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:183

Create a new immutable List containing the values of the provided
collection-like.

Note: `List` is a factory function and not a class, and does not use the
`new` keyword during construction.

<!-- runkit:activate -->
```js
const { List, Set } = require('immutable')

const emptyList = List()
// List []

const plainArray = [ 1, 2, 3, 4 ]
const listFromPlainArray = List(plainArray)
// List [ 1, 2, 3, 4 ]

const plainSet = Set([ 1, 2, 3, 4 ])
const listFromPlainSet = List(plainSet)
// List [ 1, 2, 3, 4 ]

const arrayIterator = plainArray[Symbol.iterator]()
const listFromCollectionArray = List(arrayIterator)
// List [ 1, 2, 3, 4 ]

listFromPlainArray.equals(listFromCollectionArray) // true
listFromPlainSet.equals(listFromCollectionArray) // true
listFromPlainSet.equals(listFromPlainArray) // true
```

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹any›*

▸ **List**<**T**>(): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹T›*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:184

**Type parameters:**

▪ **T**

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹T›*

▸ **List**<**T**>(`collection`: Iterable‹T›): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹T›*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:185

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`collection` | Iterable‹T› |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹T›*

___

###  asImmutable

▸ **asImmutable**(): *this*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[asImmutable](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#asimmutable)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:537

**`see`** `Map#asImmutable`

**Returns:** *this*

___

###  asMutable

▸ **asMutable**(): *this*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[asMutable](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#asmutable)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:527

An alternative API for withMutations()

Note: Not all methods can be safely used on a mutable collection or within
`withMutations`! Check the documentation for each method to see if it
allows being used in `withMutations`.

**`see`** `Map#asMutable`

**Returns:** *this*

___

###  clear

▸ **clear**(): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[clear](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#clear)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:291

Returns a new List with 0 size and no values in constant time.

<!-- runkit:activate
     { "preamble": "const { List } = require('immutable');" }
-->
```js
List([ 1, 2, 3, 4 ]).clear()
// List []
```

Note: `clear` can be used in `withMutations`.

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

___

###  concat

▸ **concat**<**C**>(...`valuesOrCollections`: Array‹Iterable‹C› | C›): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) | C›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[concat](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#concat)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:548

Returns a new List with other values or collections concatenated to this one.

Note: `concat` can be used in `withMutations`.

**`alias`** merge

**Type parameters:**

▪ **C**

**Parameters:**

Name | Type |
------ | ------ |
`...valuesOrCollections` | Array‹Iterable‹C› &#124; C› |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) | C›*

___

###  delete

▸ **delete**(`index`: number): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[delete](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#delete)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:254

Returns a new List which excludes this `index` and with a size 1 less
than this List. Values at indices above `index` are shifted down by 1 to
fill the position.

This is synonymous with `list.splice(index, 1)`.

`index` may be a negative number, which indexes back from the end of the
List. `v.delete(-1)` deletes the last item in the List.

Note: `delete` cannot be safely used in IE8

<!-- runkit:activate
     { "preamble": "const { List } = require('immutable');" }
-->
```js
List([ 0, 1, 2, 3, 4 ]).delete(0);
// List [ 1, 2, 3, 4 ]
```

Since `delete()` re-indexes values, it produces a complete copy, which
has `O(N)` complexity.

Note: `delete` *cannot* be used in `withMutations`.

**`alias`** remove

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

___

###  deleteIn

▸ **deleteIn**(`keyPath`: Iterable‹any›): *this*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[deleteIn](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#deletein)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:482

Returns a new List having removed the value at this `keyPath`. If any
keys in `keyPath` do not exist, no change will occur.

<!-- runkit:activate -->
```js
const { List } = require('immutable')
const list = List([ 0, 1, 2, List([ 3, 4 ])])
list.deleteIn([3, 0]);
// List [ 0, 1, 2, List [ 4 ] ]
```

Plain JavaScript Object or Arrays may be nested within an Immutable.js
Collection, and removeIn() can update those values as well, treating them
immutably by creating new copies of those values with the changes applied.

<!-- runkit:activate -->
```js
const { List } = require('immutable')
const list = List([ 0, 1, 2, { plain: 'object' }])
list.removeIn([3, 'plain']);
// List([ 0, 1, 2, {}])
```

Note: `deleteIn` *cannot* be safely used in `withMutations`.

**`alias`** removeIn

**Parameters:**

Name | Type |
------ | ------ |
`keyPath` | Iterable‹any› |

**Returns:** *this*

___

###  filter

▸ **filter**<**F**>(`predicate`: function, `context?`: any): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹F›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[filter](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#filter)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:585

Returns a new List with only the values for which the `predicate`
function returns true.

Note: `filter()` always returns a new instance, even if it results in
not filtering out any values.

**Type parameters:**

▪ **F**: *[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)*

**Parameters:**

▪ **predicate**: *function*

▸ (`value`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `index`: number, `iter`: this): *value is F*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |
`index` | number |
`iter` | this |

▪`Optional`  **context**: *any*

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹F›*

▸ **filter**(`predicate`: function, `context?`: any): *this*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[filter](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#filter)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:589

**Parameters:**

▪ **predicate**: *function*

▸ (`value`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `index`: number, `iter`: this): *any*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |
`index` | number |
`iter` | this |

▪`Optional`  **context**: *any*

**Returns:** *this*

___

###  flatMap

▸ **flatMap**<**M**>(`mapper`: function, `context?`: any): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹M›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[flatMap](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#flatmap)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:573

Flat-maps the List, returning a new List.

Similar to `list.map(...).flatten(true)`.

**Type parameters:**

▪ **M**

**Parameters:**

▪ **mapper**: *function*

▸ (`value`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `key`: number, `iter`: this): *Iterable‹M›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |
`key` | number |
`iter` | this |

▪`Optional`  **context**: *any*

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹M›*

___

###  insert

▸ **insert**(`index`: number, `value`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[insert](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#insert)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:276

Returns a new List with `value` at `index` with a size 1 more than this
List. Values at indices above `index` are shifted over by 1.

This is synonymous with `list.splice(index, 0, value)`.

<!-- runkit:activate
     { "preamble": "const { List } = require('immutable');" }
-->
```js
List([ 0, 1, 2, 3, 4 ]).insert(6, 5)
// List [ 0, 1, 2, 3, 4, 5 ]
```

Since `insert()` re-indexes values, it produces a complete copy, which
has `O(N)` complexity.

Note: `insert` *cannot* be used in `withMutations`.

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |
`value` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

___

###  isList

▸ **isList**(`maybeList`: any): *maybeList is List<any>*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:128

True if the provided value is a List

<!-- runkit:activate -->
```js
const { List } = require('immutable');
List.isList([]); // false
List.isList(List()); // true
```

**Parameters:**

Name | Type |
------ | ------ |
`maybeList` | any |

**Returns:** *maybeList is List<any>*

___

###  map

▸ **map**<**M**>(`mapper`: function, `context?`: any): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹M›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[map](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#map)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:563

Returns a new List with values passed through a
`mapper` function.

<!-- runkit:activate
     { "preamble": "const { List } = require('immutable');" }
-->
```js
List([ 1, 2 ]).map(x => 10 * x)
// List [ 10, 20 ]
```

**Type parameters:**

▪ **M**

**Parameters:**

▪ **mapper**: *function*

▸ (`value`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `key`: number, `iter`: this): *M*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |
`key` | number |
`iter` | this |

▪`Optional`  **context**: *any*

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹M›*

___

###  merge

▸ **merge**<**C**>(...`collections`: Array‹Iterable‹C››): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) | C›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[merge](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#merge)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:549

**Type parameters:**

▪ **C**

**Parameters:**

Name | Type |
------ | ------ |
`...collections` | Array‹Iterable‹C›› |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) | C›*

___

###  mergeDeepIn

▸ **mergeDeepIn**(`keyPath`: Iterable‹any›, ...`collections`: Array‹any›): *this*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[mergeDeepIn](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#mergedeepin)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:505

Note: `mergeDeepIn` can be used in `withMutations`.

**`see`** `Map#mergeDeepIn`

**Parameters:**

Name | Type |
------ | ------ |
`keyPath` | Iterable‹any› |
`...collections` | Array‹any› |

**Returns:** *this*

___

###  mergeIn

▸ **mergeIn**(`keyPath`: Iterable‹any›, ...`collections`: Array‹any›): *this*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[mergeIn](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#mergein)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:498

Note: `mergeIn` can be used in `withMutations`.

**`see`** `Map#mergeIn`

**Parameters:**

Name | Type |
------ | ------ |
`keyPath` | Iterable‹any› |
`...collections` | Array‹any› |

**Returns:** *this*

___

###  of

▸ **of**<**T**>(...`values`: Array‹T›): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹T›*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:149

Creates a new List containing `values`.

<!-- runkit:activate -->
```js
const { List } = require('immutable');
List.of(1, 2, 3, 4)
// List [ 1, 2, 3, 4 ]
```

Note: Values are not altered or converted in any way.

<!-- runkit:activate -->
```js
const { List } = require('immutable');
List.of({x:1}, 2, [3], 4)
// List [ { x: 1 }, 2, [ 3 ], 4 ]
```

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`...values` | Array‹T› |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹T›*

___

###  pop

▸ **pop**(): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[pop](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#pop)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:324

Returns a new List with a size ones less than this List, excluding
the last index in this List.

Note: this differs from `Array#pop` because it returns a new
List rather than the removed value. Use `last()` to get the last value
in this List.

```js
List([ 1, 2, 3, 4 ]).pop()
// List[ 1, 2, 3 ]
```

Note: `pop` can be used in `withMutations`.

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

___

###  push

▸ **push**(...`values`: Array‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[push](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#push)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:307

Returns a new List with the provided `values` appended, starting at this
List's `size`.

<!-- runkit:activate
     { "preamble": "const { List } = require('immutable');" }
-->
```js
List([ 1, 2, 3, 4 ]).push(5)
// List [ 1, 2, 3, 4, 5 ]
```

Note: `push` can be used in `withMutations`.

**Parameters:**

Name | Type |
------ | ------ |
`...values` | Array‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)› |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

___

###  remove

▸ **remove**(`index`: number): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[remove](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#remove)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:255

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

___

###  removeIn

▸ **removeIn**(`keyPath`: Iterable‹any›): *this*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[removeIn](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#removein)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:483

**Parameters:**

Name | Type |
------ | ------ |
`keyPath` | Iterable‹any› |

**Returns:** *this*

___

###  set

▸ **set**(`index`: number, `value`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[set](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#set)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:225

Returns a new List which includes `value` at `index`. If `index` already
exists in this List, it will be replaced.

`index` may be a negative number, which indexes back from the end of the
List. `v.set(-1, "value")` sets the last item in the List.

If `index` larger than `size`, the returned List's `size` will be large
enough to include the `index`.

<!-- runkit:activate
     { "preamble": "const { List } = require('immutable');" }
-->
```js
const originalList = List([ 0 ]);
// List [ 0 ]
originalList.set(1, 1);
// List [ 0, 1 ]
originalList.set(0, 'overwritten');
// List [ "overwritten" ]
originalList.set(2, 2);
// List [ 0, undefined, 2 ]

List().set(50000, 'value').size;
// 50001
```

Note: `set` can be used in `withMutations`.

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |
`value` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

___

###  setIn

▸ **setIn**(`keyPath`: Iterable‹any›, `value`: any): *this*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[setIn](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#setin)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:452

Returns a new List having set `value` at this `keyPath`. If any keys in
`keyPath` do not exist, a new immutable Map will be created at that key.

Index numbers are used as keys to determine the path to follow in
the List.

<!-- runkit:activate -->
```js
const { List } = require('immutable')
const list = List([ 0, 1, 2, List([ 3, 4 ])])
list.setIn([3, 0], 999);
// List [ 0, 1, 2, List [ 999, 4 ] ]
```

Plain JavaScript Object or Arrays may be nested within an Immutable.js
Collection, and setIn() can update those values as well, treating them
immutably by creating new copies of those values with the changes applied.

<!-- runkit:activate -->
```js
const { List } = require('immutable')
const list = List([ 0, 1, 2, { plain: 'object' }])
list.setIn([3, 'plain'], 'value');
// List([ 0, 1, 2, { plain: 'value' }])
```

Note: `setIn` can be used in `withMutations`.

**Parameters:**

Name | Type |
------ | ------ |
`keyPath` | Iterable‹any› |
`value` | any |

**Returns:** *this*

___

###  setSize

▸ **setSize**(`size`: number): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[setSize](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#setsize)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:418

Returns a new List with size `size`. If `size` is less than this
List's size, the new List will exclude values at the higher indices.
If `size` is greater than this List's size, the new List will have
undefined values for the newly available indices.

When building a new List and the final size is known up front, `setSize`
used in conjunction with `withMutations` may result in the more
performant construction.

**Parameters:**

Name | Type |
------ | ------ |
`size` | number |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

___

###  shift

▸ **shift**(): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[shift](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#shift)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:360

Returns a new List with a size ones less than this List, excluding
the first index in this List, shifting all other values to a lower index.

Note: this differs from `Array#shift` because it returns a new
List rather than the removed value. Use `first()` to get the first
value in this List.

<!-- runkit:activate
     { "preamble": "const { List } = require('immutable');" }
-->
```js
List([ 0, 1, 2, 3, 4 ]).shift();
// List [ 1, 2, 3, 4 ]
```

Note: `shift` can be used in `withMutations`.

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

___

###  unshift

▸ **unshift**(...`values`: Array‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[unshift](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#unshift)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:340

Returns a new List with the provided `values` prepended, shifting other
values ahead to higher indices.

<!-- runkit:activate
     { "preamble": "const { List } = require('immutable');" }
-->
```js
List([ 2, 3, 4]).unshift(1);
// List [ 1, 2, 3, 4 ]
```

Note: `unshift` can be used in `withMutations`.

**Parameters:**

Name | Type |
------ | ------ |
`...values` | Array‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)› |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

___

###  update

▸ **update**(`index`: number, `notSetValue`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `updater`: function): *this*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[update](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#update)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:404

Returns a new List with an updated value at `index` with the return
value of calling `updater` with the existing value, or `notSetValue` if
`index` was not set. If called with a single argument, `updater` is
called with the List itself.

`index` may be a negative number, which indexes back from the end of the
List. `v.update(-1)` updates the last item in the List.

<!-- runkit:activate
     { "preamble": "const { List } = require('immutable');" }
-->
```js
const list = List([ 'a', 'b', 'c' ])
const result = list.update(2, val => val.toUpperCase())
// List [ "a", "b", "C" ]
```

This can be very useful as a way to "chain" a normal function into a
sequence of methods. RxJS calls this "let" and lodash calls it "thru".

For example, to sum a List after mapping and filtering:

<!-- runkit:activate
     { "preamble": "const { List } = require('immutable');" }
-->
```js
function sum(collection) {
  return collection.reduce((sum, x) => sum + x, 0)
}

List([ 1, 2, 3 ])
  .map(x => x + 1)
  .filter(x => x % 2 === 0)
  .update(sum)
// 6
```

Note: `update(index)` can be used in `withMutations`.

**`see`** `Map#update`

**Parameters:**

▪ **index**: *number*

▪ **notSetValue**: *[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)*

▪ **updater**: *function*

▸ (`value`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)): *[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |

**Returns:** *this*

▸ **update**(`index`: number, `updater`: function): *this*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[update](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#update)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:405

**Parameters:**

▪ **index**: *number*

▪ **updater**: *function*

▸ (`value`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)): *[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |

**Returns:** *this*

▸ **update**<**R**>(`updater`: function): *R*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[update](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#update)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:406

**Type parameters:**

▪ **R**

**Parameters:**

▪ **updater**: *function*

▸ (`value`: this): *R*

**Parameters:**

Name | Type |
------ | ------ |
`value` | this |

**Returns:** *R*

___

###  updateIn

▸ **updateIn**(`keyPath`: Iterable‹any›, `notSetValue`: any, `updater`: function): *this*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[updateIn](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#updatein)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:490

Note: `updateIn` can be used in `withMutations`.

**`see`** `Map#updateIn`

**Parameters:**

▪ **keyPath**: *Iterable‹any›*

▪ **notSetValue**: *any*

▪ **updater**: *function*

▸ (`value`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *this*

▸ **updateIn**(`keyPath`: Iterable‹any›, `updater`: function): *this*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[updateIn](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#updatein)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:491

**Parameters:**

▪ **keyPath**: *Iterable‹any›*

▪ **updater**: *function*

▸ (`value`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *this*

___

###  wasAltered

▸ **wasAltered**(): *boolean*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[wasAltered](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#wasaltered)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:532

**`see`** `Map#wasAltered`

**Returns:** *boolean*

___

###  withMutations

▸ **withMutations**(`mutator`: function): *this*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[withMutations](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#withmutations)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:516

Note: Not all methods can be safely used on a mutable collection or within
`withMutations`! Check the documentation for each method to see if it
allows being used in `withMutations`.

**`see`** `Map#withMutations`

**Parameters:**

▪ **mutator**: *function*

▸ (`mutable`: this): *any*

**Parameters:**

Name | Type |
------ | ------ |
`mutable` | this |

**Returns:** *this*

___

###  zip

▸ **zip**<**U**>(`other`: Collection‹any, U›): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), U]›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[zip](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#zip)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:608

Returns a List "zipped" with the provided collection.

Like `zipWith`, but using the default `zipper`: creating an `Array`.

<!-- runkit:activate
     { "preamble": "const { List } = require('immutable');" }
-->
```js
const a = List([ 1, 2, 3 ]);
const b = List([ 4, 5, 6 ]);
const c = a.zip(b); // List [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
```

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type |
------ | ------ |
`other` | Collection‹any, U› |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), U]›*

▸ **zip**<**U**, **V**>(`other`: Collection‹any, U›, `other2`: Collection‹any, V›): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), U, V]›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[zip](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#zip)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:609

**Type parameters:**

▪ **U**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`other` | Collection‹any, U› |
`other2` | Collection‹any, V› |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), U, V]›*

▸ **zip**(...`collections`: Array‹Collection‹any, any››): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹any›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[zip](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#zip)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:610

**Parameters:**

Name | Type |
------ | ------ |
`...collections` | Array‹Collection‹any, any›› |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹any›*

___

###  zipAll

▸ **zipAll**<**U**>(`other`: Collection‹any, U›): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), U]›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[zipAll](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#zipall)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:631

Returns a List "zipped" with the provided collections.

Unlike `zip`, `zipAll` continues zipping until the longest collection is
exhausted. Missing values from shorter collections are filled with `undefined`.

<!-- runkit:activate
     { "preamble": "const { List } = require('immutable');" }
-->
```js
const a = List([ 1, 2 ]);
const b = List([ 3, 4, 5 ]);
const c = a.zipAll(b); // List [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
```

Note: Since zipAll will return a collection as large as the largest
input, some results may contain undefined values. TypeScript cannot
account for these without cases (as of v2.5).

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type |
------ | ------ |
`other` | Collection‹any, U› |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), U]›*

▸ **zipAll**<**U**, **V**>(`other`: Collection‹any, U›, `other2`: Collection‹any, V›): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), U, V]›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[zipAll](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#zipall)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:632

**Type parameters:**

▪ **U**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`other` | Collection‹any, U› |
`other2` | Collection‹any, V› |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), U, V]›*

▸ **zipAll**(...`collections`: Array‹Collection‹any, any››): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹any›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[zipAll](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#zipall)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:633

**Parameters:**

Name | Type |
------ | ------ |
`...collections` | Array‹Collection‹any, any›› |

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹any›*

___

###  zipWith

▸ **zipWith**<**U**, **Z**>(`zipper`: function, `otherCollection`: Collection‹any, U›): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹Z›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[zipWith](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#zipwith)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:649

Returns a List "zipped" with the provided collections by using a
custom `zipper` function.

<!-- runkit:activate
     { "preamble": "const { List } = require('immutable');" }
-->
```js
const a = List([ 1, 2, 3 ]);
const b = List([ 4, 5, 6 ]);
const c = a.zipWith((a, b) => a + b, b);
// List [ 5, 7, 9 ]
```

**Type parameters:**

▪ **U**

▪ **Z**

**Parameters:**

▪ **zipper**: *function*

▸ (`value`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `otherValue`: U): *Z*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |
`otherValue` | U |

▪ **otherCollection**: *Collection‹any, U›*

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹Z›*

▸ **zipWith**<**U**, **V**, **Z**>(`zipper`: function, `otherCollection`: Collection‹any, U›, `thirdCollection`: Collection‹any, V›): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹Z›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[zipWith](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#zipwith)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:653

**Type parameters:**

▪ **U**

▪ **V**

▪ **Z**

**Parameters:**

▪ **zipper**: *function*

▸ (`value`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `otherValue`: U, `thirdValue`: V): *Z*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |
`otherValue` | U |
`thirdValue` | V |

▪ **otherCollection**: *Collection‹any, U›*

▪ **thirdCollection**: *Collection‹any, V›*

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹Z›*

▸ **zipWith**<**Z**>(`zipper`: function, ...`collections`: Array‹Collection‹any, any››): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹Z›*

*Inherited from [CageSessionData](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md).[zipWith](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#zipwith)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:658

**Type parameters:**

▪ **Z**

**Parameters:**

▪ **zipper**: *function*

▸ (...`any`: Array‹any›): *Z*

**Parameters:**

Name | Type |
------ | ------ |
`...any` | Array‹any› |

▪... **collections**: *Array‹Collection‹any, any››*

**Returns:** *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹Z›*
