[web](../README.md) › [Globals](../globals.md) › ["routes/experiment-dashboard/ExperimentDashboard"](../modules/_routes_experiment_dashboard_experimentdashboard_.md) › [CageDisplayOrder](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md)

# Interface: CageDisplayOrder

## Hierarchy

* [Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)››

  ↳ **CageDisplayOrder**

## Index

### Properties

* [size](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#size)

### Methods

* [Keyed](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#keyed)
* [Map](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#map)
* [asImmutable](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#asimmutable)
* [asMutable](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#asmutable)
* [clear](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#clear)
* [concat](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#concat)
* [delete](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#delete)
* [deleteAll](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#deleteall)
* [deleteIn](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#deletein)
* [filter](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#filter)
* [flatMap](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#flatmap)
* [flip](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#flip)
* [isMap](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#ismap)
* [map](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#map)
* [mapEntries](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#mapentries)
* [mapKeys](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#mapkeys)
* [merge](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#merge)
* [mergeDeep](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#mergedeep)
* [mergeDeepIn](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#mergedeepin)
* [mergeDeepWith](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#mergedeepwith)
* [mergeIn](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#mergein)
* [mergeWith](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#mergewith)
* [of](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#of)
* [remove](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#remove)
* [removeAll](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#removeall)
* [removeIn](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#removein)
* [set](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#set)
* [setIn](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#setin)
* [update](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#update)
* [updateIn](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#updatein)
* [wasAltered](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#wasaltered)
* [withMutations](_routes_experiment_dashboard_experimentdashboard_.cagedisplayorder.md#withmutations)

## Properties

###  size

• **size**: *number*

*Inherited from [RouteMap](_types_.routemap.md).[size](_types_.routemap.md#size)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:771

The number of entries in this Map.

## Methods

###  Keyed

▸ **Keyed**<**K**, **V**>(`collection`: Iterable‹[K, V]›): *[Keyed](_types_.routemap.md#keyed)‹K, V›*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:3249

Creates a Collection.Keyed

Similar to `Collection()`, however it expects collection-likes of [K, V]
tuples if not constructed from a Collection.Keyed or JS Object.

Note: `Collection.Keyed` is a conversion function and not a class, and
does not use the `new` keyword during construction.

**Type parameters:**

▪ **K**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`collection` | Iterable‹[K, V]› |

**Returns:** *[Keyed](_types_.routemap.md#keyed)‹K, V›*

___

###  Map

▸ **Map**<**K**, **V**>(`collection`: Iterable‹[K, V]›): *[Map](_types_.routemap.md#map)‹K, V›*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:761

Creates a new Immutable Map.

Created with the same key value pairs as the provided Collection.Keyed or
JavaScript Object or expects a Collection of [K, V] tuple entries.

Note: `Map` is a factory function and not a class, and does not use the
`new` keyword during construction.

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
Map({ key: "value" })
Map([ [ "key", "value" ] ])
```

Keep in mind, when using JS objects to construct Immutable Maps, that
JavaScript Object properties are always strings, even if written in a
quote-less shorthand, while Immutable Maps accept keys of any type.

<!-- runkit:activate
     { "preamble": "const { Map } = require('immutable');" }
-->
```js
let obj = { 1: "one" }
Object.keys(obj) // [ "1" ]
assert.equal(obj["1"], obj[1]) // "one" === "one"

let map = Map(obj)
assert.notEqual(map.get("1"), map.get(1)) // "one" !== undefined
```

Property access for JavaScript Objects first converts the key to a string,
but since Immutable Map keys can be of any type the argument to `get()` is
not altered.

**Type parameters:**

▪ **K**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`collection` | Iterable‹[K, V]› |

**Returns:** *[Map](_types_.routemap.md#map)‹K, V›*

▸ **Map**<**V**>(`obj`: object): *[Map](_types_.routemap.md#map)‹string, V›*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:762

**Type parameters:**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`obj` | object |

**Returns:** *[Map](_types_.routemap.md#map)‹string, V›*

▸ **Map**<**K**, **V**>(): *[Map](_types_.routemap.md#map)‹K, V›*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:763

**Type parameters:**

▪ **K**

▪ **V**

**Returns:** *[Map](_types_.routemap.md#map)‹K, V›*

▸ **Map**(): *[Map](_types_.routemap.md#map)‹any, any›*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:764

**Returns:** *[Map](_types_.routemap.md#map)‹any, any›*

___

###  asImmutable

▸ **asImmutable**(): *this*

*Inherited from [RouteMap](_types_.routemap.md).[asImmutable](_types_.routemap.md#asimmutable)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1320

The yin to `asMutable`'s yang. Because it applies to mutable collections,
this operation is *mutable* and may return itself (though may not
return itself, i.e. if the result is an empty collection). Once
performed, the original mutable copy must no longer be mutated since it
may be the immutable result.

If possible, use `withMutations` to work with temporary mutable copies as
it provides an easier to use API and considers many common optimizations.

**`see`** `Map#asMutable`

**Returns:** *this*

___

###  asMutable

▸ **asMutable**(): *this*

*Inherited from [RouteMap](_types_.routemap.md).[asMutable](_types_.routemap.md#asmutable)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1298

Another way to avoid creation of intermediate Immutable maps is to create
a mutable copy of this collection. Mutable copies *always* return `this`,
and thus shouldn't be used for equality. Your function should never return
a mutable copy of a collection, only use it internally to create a new
collection.

If possible, use `withMutations` to work with temporary mutable copies as
it provides an easier to use API and considers many common optimizations.

Note: if the collection is already mutable, `asMutable` returns itself.

Note: Not all methods can be used on a mutable collection or within
`withMutations`! Read the documentation for each method to see if it
is safe to use in `withMutations`.

**`see`** `Map#asImmutable`

**Returns:** *this*

___

###  clear

▸ **clear**(): *this*

*Inherited from [RouteMap](_types_.routemap.md).[clear](_types_.routemap.md#clear)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:853

Returns a new Map containing no keys or values.

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
Map({ key: 'value' }).clear()
// Map {}
```

Note: `clear` can be used in `withMutations`.

**Returns:** *this*

___

###  concat

▸ **concat**<**KC**, **VC**>(...`collections`: Array‹Iterable‹[KC, VC]››): *[Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) | KC, [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› | VC›*

*Inherited from [RouteMap](_types_.routemap.md).[concat](_types_.routemap.md#concat)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:984

**Type parameters:**

▪ **KC**

▪ **VC**

**Parameters:**

Name | Type |
------ | ------ |
`...collections` | Array‹Iterable‹[KC, VC]›› |

**Returns:** *[Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) | KC, [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› | VC›*

▸ **concat**<**C**>(...`collections`: Array‹object›): *[Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) | string, [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› | C›*

*Inherited from [RouteMap](_types_.routemap.md).[concat](_types_.routemap.md#concat)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:985

**Type parameters:**

▪ **C**

**Parameters:**

Name | Type |
------ | ------ |
`...collections` | Array‹object› |

**Returns:** *[Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) | string, [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› | C›*

___

###  delete

▸ **delete**(`key`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)): *this*

*Inherited from [RouteMap](_types_.routemap.md).[delete](_types_.routemap.md#delete)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:820

Returns a new Map which excludes this `key`.

Note: `delete` cannot be safely used in IE8, but is provided to mirror
the ES6 collection API.

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
const originalMap = Map({
  key: 'value',
  otherKey: 'other value'
})
// Map { "key": "value", "otherKey": "other value" }
originalMap.delete('otherKey')
// Map { "key": "value" }
```

Note: `delete` can be used in `withMutations`.

**`alias`** remove

**Parameters:**

Name | Type |
------ | ------ |
`key` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |

**Returns:** *this*

___

###  deleteAll

▸ **deleteAll**(`keys`: Iterable‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›): *this*

*Inherited from [RouteMap](_types_.routemap.md).[deleteAll](_types_.routemap.md#deleteall)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:838

Returns a new Map which excludes the provided `keys`.

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
const names = Map({ a: "Aaron", b: "Barry", c: "Connor" })
names.deleteAll([ 'a', 'c' ])
// Map { "b": "Barry" }
```

Note: `deleteAll` can be used in `withMutations`.

**`alias`** removeAll

**Parameters:**

Name | Type |
------ | ------ |
`keys` | Iterable‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)› |

**Returns:** *this*

___

###  deleteIn

▸ **deleteIn**(`keyPath`: Iterable‹any›): *this*

*Inherited from [RouteMap](_types_.routemap.md).[deleteIn](_types_.routemap.md#deletein)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1138

Returns a new Map having removed the value at this `keyPath`. If any keys
in `keyPath` do not exist, no change will occur.

Note: `deleteIn` can be used in `withMutations`.

**`alias`** removeIn

**Parameters:**

Name | Type |
------ | ------ |
`keyPath` | Iterable‹any› |

**Returns:** *this*

___

###  filter

▸ **filter**<**F**>(`predicate`: function, `context?`: any): *[Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), F›*

*Inherited from [RouteMap](_types_.routemap.md).[filter](_types_.routemap.md#filter)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1369

Returns a new Map with only the entries for which the `predicate`
function returns true.

Note: `filter()` always returns a new instance, even if it results in
not filtering out any values.

**Type parameters:**

▪ **F**: *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›*

**Parameters:**

▪ **predicate**: *function*

▸ (`value`: [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›, `key`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `iter`: this): *value is F*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› |
`key` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |
`iter` | this |

▪`Optional`  **context**: *any*

**Returns:** *[Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), F›*

▸ **filter**(`predicate`: function, `context?`: any): *this*

*Inherited from [RouteMap](_types_.routemap.md).[filter](_types_.routemap.md#filter)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1373

**Parameters:**

▪ **predicate**: *function*

▸ (`value`: [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›, `key`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `iter`: this): *any*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› |
`key` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |
`iter` | this |

▪`Optional`  **context**: *any*

**Returns:** *this*

___

###  flatMap

▸ **flatMap**<**KM**, **VM**>(`mapper`: function, `context?`: any): *[Map](_types_.routemap.md#map)‹KM, VM›*

*Inherited from [RouteMap](_types_.routemap.md).[flatMap](_types_.routemap.md#flatmap)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1357

Flat-maps the Map, returning a new Map.

Similar to `data.map(...).flatten(true)`.

**Type parameters:**

▪ **KM**

▪ **VM**

**Parameters:**

▪ **mapper**: *function*

▸ (`value`: [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›, `key`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `iter`: this): *Iterable‹[KM, VM]›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› |
`key` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |
`iter` | this |

▪`Optional`  **context**: *any*

**Returns:** *[Map](_types_.routemap.md#map)‹KM, VM›*

___

###  flip

▸ **flip**(): *[Map](_types_.routemap.md#map)‹[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›, [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

*Inherited from [RouteMap](_types_.routemap.md).[flip](_types_.routemap.md#flip)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1381

**`see`** Collection.Keyed.flip

**Returns:** *[Map](_types_.routemap.md#map)‹[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›, [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›*

___

###  isMap

▸ **isMap**(`maybeMap`: any): *maybeMap is Map<any, any>*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:704

True if the provided value is a Map

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
Map.isMap({}) // false
Map.isMap(Map()) // true
```

**Parameters:**

Name | Type |
------ | ------ |
`maybeMap` | any |

**Returns:** *maybeMap is Map<any, any>*

___

###  map

▸ **map**<**M**>(`mapper`: function, `context?`: any): *[Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), M›*

*Inherited from [RouteMap](_types_.routemap.md).[map](_types_.routemap.md#map)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1331

Returns a new Map with values passed through a
`mapper` function.

    Map({ a: 1, b: 2 }).map(x => 10 * x)
    // Map { a: 10, b: 20 }

**Type parameters:**

▪ **M**

**Parameters:**

▪ **mapper**: *function*

▸ (`value`: [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›, `key`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `iter`: this): *M*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› |
`key` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |
`iter` | this |

▪`Optional`  **context**: *any*

**Returns:** *[Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), M›*

___

###  mapEntries

▸ **mapEntries**<**KM**, **VM**>(`mapper`: function, `context?`: any): *[Map](_types_.routemap.md#map)‹KM, VM›*

*Inherited from [RouteMap](_types_.routemap.md).[mapEntries](_types_.routemap.md#mapentries)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1347

**`see`** Collection.Keyed.mapEntries

**Type parameters:**

▪ **KM**

▪ **VM**

**Parameters:**

▪ **mapper**: *function*

▸ (`entry`: [[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›], `index`: number, `iter`: this): *[KM, VM]*

**Parameters:**

Name | Type |
------ | ------ |
`entry` | [[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›] |
`index` | number |
`iter` | this |

▪`Optional`  **context**: *any*

**Returns:** *[Map](_types_.routemap.md#map)‹KM, VM›*

___

###  mapKeys

▸ **mapKeys**<**M**>(`mapper`: function, `context?`: any): *[Map](_types_.routemap.md#map)‹M, [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)››*

*Inherited from [RouteMap](_types_.routemap.md).[mapKeys](_types_.routemap.md#mapkeys)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1339

**`see`** Collection.Keyed.mapKeys

**Type parameters:**

▪ **M**

**Parameters:**

▪ **mapper**: *function*

▸ (`key`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `value`: [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›, `iter`: this): *M*

**Parameters:**

Name | Type |
------ | ------ |
`key` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |
`value` | [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› |
`iter` | this |

▪`Optional`  **context**: *any*

**Returns:** *[Map](_types_.routemap.md#map)‹M, [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)››*

___

###  merge

▸ **merge**<**KC**, **VC**>(...`collections`: Array‹Iterable‹[KC, VC]››): *[Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) | KC, [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› | VC›*

*Inherited from [RouteMap](_types_.routemap.md).[merge](_types_.routemap.md#merge)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:982

Returns a new Map resulting from merging the provided Collections
(or JS objects) into this Map. In other words, this takes each entry of
each collection and sets it on this Map.

Note: Values provided to `merge` are shallowly converted before being
merged. No nested values are altered.

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
const one = Map({ a: 10, b: 20, c: 30 })
const two = Map({ b: 40, a: 50, d: 60 })
one.merge(two) // Map { "a": 50, "b": 40, "c": 30, "d": 60 }
two.merge(one) // Map { "b": 20, "a": 10, "d": 60, "c": 30 }
```

Note: `merge` can be used in `withMutations`.

**`alias`** concat

**Type parameters:**

▪ **KC**

▪ **VC**

**Parameters:**

Name | Type |
------ | ------ |
`...collections` | Array‹Iterable‹[KC, VC]›› |

**Returns:** *[Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) | KC, [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› | VC›*

▸ **merge**<**C**>(...`collections`: Array‹object›): *[Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) | string, [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› | C›*

*Inherited from [RouteMap](_types_.routemap.md).[merge](_types_.routemap.md#merge)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:983

**Type parameters:**

▪ **C**

**Parameters:**

Name | Type |
------ | ------ |
`...collections` | Array‹object› |

**Returns:** *[Map](_types_.routemap.md#map)‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) | string, [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› | C›*

___

###  mergeDeep

▸ **mergeDeep**(...`collections`: Array‹Iterable‹[[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›]› | object›): *this*

*Inherited from [RouteMap](_types_.routemap.md).[mergeDeep](_types_.routemap.md#mergedeep)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1033

Like `merge()`, but when two Collections conflict, it merges them as well,
recursing deeply through the nested data.

Note: Values provided to `merge` are shallowly converted before being
merged. No nested values are altered unless they will also be merged at
a deeper level.

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
const one = Map({ a: Map({ x: 10, y: 10 }), b: Map({ x: 20, y: 50 }) })
const two = Map({ a: Map({ x: 2 }), b: Map({ y: 5 }), c: Map({ z: 3 }) })
one.mergeDeep(two)
// Map {
//   "a": Map { "x": 2, "y": 10 },
//   "b": Map { "x": 20, "y": 5 },
//   "c": Map { "z": 3 }
// }
```

Note: `mergeDeep` can be used in `withMutations`.

**Parameters:**

Name | Type |
------ | ------ |
`...collections` | Array‹Iterable‹[[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›]› &#124; object› |

**Returns:** *this*

___

###  mergeDeepIn

▸ **mergeDeepIn**(`keyPath`: Iterable‹any›, ...`collections`: Array‹any›): *this*

*Inherited from [RouteMap](_types_.routemap.md).[mergeDeepIn](_types_.routemap.md#mergedeepin)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1246

A combination of `updateIn` and `mergeDeep`, returning a new Map, but
performing the deep merge at a point arrived at by following the keyPath.
In other words, these two lines are equivalent:

```js
map.updateIn(['a', 'b', 'c'], abc => abc.mergeDeep(y))
map.mergeDeepIn(['a', 'b', 'c'], y)
```

Note: `mergeDeepIn` can be used in `withMutations`.

**Parameters:**

Name | Type |
------ | ------ |
`keyPath` | Iterable‹any› |
`...collections` | Array‹any› |

**Returns:** *this*

___

###  mergeDeepWith

▸ **mergeDeepWith**(`merger`: function, ...`collections`: Array‹Iterable‹[[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›]› | object›): *this*

*Inherited from [RouteMap](_types_.routemap.md).[mergeDeepWith](_types_.routemap.md#mergedeepwith)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1054

Like `mergeDeep()`, but when two non-Collections conflict, it uses the
`merger` function to determine the resulting value.

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
const one = Map({ a: Map({ x: 10, y: 10 }), b: Map({ x: 20, y: 50 }) })
const two = Map({ a: Map({ x: 2 }), b: Map({ y: 5 }), c: Map({ z: 3 }) })
one.mergeDeepWith((oldVal, newVal) => oldVal / newVal, two)
// Map {
//   "a": Map { "x": 5, "y": 10 },
//   "b": Map { "x": 20, "y": 10 },
//   "c": Map { "z": 3 }
// }
```

Note: `mergeDeepWith` can be used in `withMutations`.

**Parameters:**

▪ **merger**: *function*

▸ (`oldVal`: any, `newVal`: any, `key`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`oldVal` | any |
`newVal` | any |
`key` | any |

▪... **collections**: *Array‹Iterable‹[[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›]› | object›*

**Returns:** *this*

___

###  mergeIn

▸ **mergeIn**(`keyPath`: Iterable‹any›, ...`collections`: Array‹any›): *this*

*Inherited from [RouteMap](_types_.routemap.md).[mergeIn](_types_.routemap.md#mergein)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1232

A combination of `updateIn` and `merge`, returning a new Map, but
performing the merge at a point arrived at by following the keyPath.
In other words, these two lines are equivalent:

```js
map.updateIn(['a', 'b', 'c'], abc => abc.merge(y))
map.mergeIn(['a', 'b', 'c'], y)
```

Note: `mergeIn` can be used in `withMutations`.

**Parameters:**

Name | Type |
------ | ------ |
`keyPath` | Iterable‹any› |
`...collections` | Array‹any› |

**Returns:** *this*

___

###  mergeWith

▸ **mergeWith**(`merger`: function, ...`collections`: Array‹Iterable‹[[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›]› | object›): *this*

*Inherited from [RouteMap](_types_.routemap.md).[mergeWith](_types_.routemap.md#mergewith)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1005

Like `merge()`, `mergeWith()` returns a new Map resulting from merging
the provided Collections (or JS objects) into this Map, but uses the
`merger` function for dealing with conflicts.

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
const one = Map({ a: 10, b: 20, c: 30 })
const two = Map({ b: 40, a: 50, d: 60 })
one.mergeWith((oldVal, newVal) => oldVal / newVal, two)
// { "a": 0.2, "b": 0.5, "c": 30, "d": 60 }
two.mergeWith((oldVal, newVal) => oldVal / newVal, one)
// { "b": 2, "a": 5, "d": 60, "c": 30 }
```

Note: `mergeWith` can be used in `withMutations`.

**Parameters:**

▪ **merger**: *function*

▸ (`oldVal`: [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›, `newVal`: [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›, `key`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›*

**Parameters:**

Name | Type |
------ | ------ |
`oldVal` | [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› |
`newVal` | [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› |
`key` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |

▪... **collections**: *Array‹Iterable‹[[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›]› | object›*

**Returns:** *this*

___

###  of

▸ **of**(...`keyValues`: Array‹any›): *[Map](_types_.routemap.md#map)‹any, any›*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:722

Creates a new Map from alternating keys and values

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
Map.of(
  'key', 'value',
  'numerical value', 3,
   0, 'numerical key'
)
// Map { 0: "numerical key", "key": "value", "numerical value": 3 }
```

**`deprecated`** Use Map([ [ 'k', 'v' ] ]) or Map({ k: 'v' })

**Parameters:**

Name | Type |
------ | ------ |
`...keyValues` | Array‹any› |

**Returns:** *[Map](_types_.routemap.md#map)‹any, any›*

___

###  remove

▸ **remove**(`key`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)): *this*

*Inherited from [RouteMap](_types_.routemap.md).[remove](_types_.routemap.md#remove)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:821

**Parameters:**

Name | Type |
------ | ------ |
`key` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |

**Returns:** *this*

___

###  removeAll

▸ **removeAll**(`keys`: Iterable‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)›): *this*

*Inherited from [RouteMap](_types_.routemap.md).[removeAll](_types_.routemap.md#removeall)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:839

**Parameters:**

Name | Type |
------ | ------ |
`keys` | Iterable‹[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)› |

**Returns:** *this*

___

###  removeIn

▸ **removeIn**(`keyPath`: Iterable‹any›): *this*

*Inherited from [RouteMap](_types_.routemap.md).[removeIn](_types_.routemap.md#removein)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1139

**Parameters:**

Name | Type |
------ | ------ |
`keyPath` | Iterable‹any› |

**Returns:** *this*

___

###  set

▸ **set**(`key`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `value`: [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›): *this*

*Inherited from [RouteMap](_types_.routemap.md).[set](_types_.routemap.md#set)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:796

Returns a new Map also containing the new key, value pair. If an equivalent
key already exists in this Map, it will be replaced.

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
const originalMap = Map()
const newerMap = originalMap.set('key', 'value')
const newestMap = newerMap.set('key', 'newer value')

originalMap
// Map {}
newerMap
// Map { "key": "value" }
newestMap
// Map { "key": "newer value" }
```

Note: `set` can be used in `withMutations`.

**Parameters:**

Name | Type |
------ | ------ |
`key` | [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid) |
`value` | [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› |

**Returns:** *this*

___

###  setIn

▸ **setIn**(`keyPath`: Iterable‹any›, `value`: any): *this*

*Inherited from [RouteMap](_types_.routemap.md).[setIn](_types_.routemap.md#setin)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1128

Returns a new Map having set `value` at this `keyPath`. If any keys in
`keyPath` do not exist, a new immutable Map will be created at that key.

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
const originalMap = Map({
  subObject: Map({
    subKey: 'subvalue',
    subSubObject: Map({
      subSubKey: 'subSubValue'
    })
  })
})

const newMap = originalMap.setIn(['subObject', 'subKey'], 'ha ha!')
// Map {
//   "subObject": Map {
//     "subKey": "ha ha!",
//     "subSubObject": Map { "subSubKey": "subSubValue" }
//   }
// }

const newerMap = originalMap.setIn(
  ['subObject', 'subSubObject', 'subSubKey'],
  'ha ha ha!'
)
// Map {
//   "subObject": Map {
//     "subKey": "subvalue",
//     "subSubObject": Map { "subSubKey": "ha ha ha!" }
//   }
// }
```

Plain JavaScript Object or Arrays may be nested within an Immutable.js
Collection, and setIn() can update those values as well, treating them
immutably by creating new copies of those values with the changes applied.

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
const originalMap = Map({
  subObject: {
    subKey: 'subvalue',
    subSubObject: {
      subSubKey: 'subSubValue'
    }
  }
})

originalMap.setIn(['subObject', 'subKey'], 'ha ha!')
// Map {
//   "subObject": {
//     subKey: "ha ha!",
//     subSubObject: { subSubKey: "subSubValue" }
//   }
// }
```

If any key in the path exists but cannot be updated (such as a primitive
like number or a custom Object like Date), an error will be thrown.

Note: `setIn` can be used in `withMutations`.

**Parameters:**

Name | Type |
------ | ------ |
`keyPath` | Iterable‹any› |
`value` | any |

**Returns:** *this*

___

###  update

▸ **update**(`key`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `notSetValue`: [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›, `updater`: function): *this*

*Inherited from [RouteMap](_types_.routemap.md).[update](_types_.routemap.md#update)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:957

Returns a new Map having updated the value at this `key` with the return
value of calling `updater` with the existing value.

Similar to: `map.set(key, updater(map.get(key)))`.

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
const aMap = Map({ key: 'value' })
const newMap = aMap.update('key', value => value + value)
// Map { "key": "valuevalue" }
```

This is most commonly used to call methods on collections within a
structure of data. For example, in order to `.push()` onto a nested `List`,
`update` and `push` can be used together:

<!-- runkit:activate
     { "preamble": "const { Map, List } = require('immutable');" }
-->
```js
const aMap = Map({ nestedList: List([ 1, 2, 3 ]) })
const newMap = aMap.update('nestedList', list => list.push(4))
// Map { "nestedList": List [ 1, 2, 3, 4 ] }
```

When a `notSetValue` is provided, it is provided to the `updater`
function when the value at the key does not exist in the Map.

<!-- runkit:activate
     { "preamble": "const { Map } = require('immutable');" }
-->
```js
const aMap = Map({ key: 'value' })
const newMap = aMap.update('noKey', 'no value', value => value + value)
// Map { "key": "value", "noKey": "no valueno value" }
```

However, if the `updater` function returns the same value it was called
with, then no change will occur. This is still true if `notSetValue`
is provided.

<!-- runkit:activate
     { "preamble": "const { Map } = require('immutable');" }
-->
```js
const aMap = Map({ apples: 10 })
const newMap = aMap.update('oranges', 0, val => val)
// Map { "apples": 10 }
assert.strictEqual(newMap, map);
```

For code using ES2015 or later, using `notSetValue` is discourged in
favor of function parameter default values. This helps to avoid any
potential confusion with identify functions as described above.

The previous example behaves differently when written with default values:

<!-- runkit:activate
     { "preamble": "const { Map } = require('immutable');" }
-->
```js
const aMap = Map({ apples: 10 })
const newMap = aMap.update('oranges', (val = 0) => val)
// Map { "apples": 10, "oranges": 0 }
```

If no key is provided, then the `updater` function return value is
returned as well.

<!-- runkit:activate
     { "preamble": "const { Map } = require('immutable');" }
-->
```js
const aMap = Map({ key: 'value' })
const result = aMap.update(aMap => aMap.get('key'))
// "value"
```

This can be very useful as a way to "chain" a normal function into a
sequence of methods. RxJS calls this "let" and lodash calls it "thru".

For example, to sum the values in a Map

<!-- runkit:activate
     { "preamble": "const { Map } = require('immutable');" }
-->
```js
function sum(collection) {
  return collection.reduce((sum, x) => sum + x, 0)
}

Map({ x: 1, y: 2, z: 3 })
  .map(x => x + 1)
  .filter(x => x % 2 === 0)
  .update(sum)
// 6
```

Note: `update(key)` can be used in `withMutations`.

**Parameters:**

▪ **key**: *[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)*

▪ **notSetValue**: *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›*

▪ **updater**: *function*

▸ (`value`: [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› |

**Returns:** *this*

▸ **update**(`key`: [RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid), `updater`: function): *this*

*Inherited from [RouteMap](_types_.routemap.md).[update](_types_.routemap.md#update)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:958

**Parameters:**

▪ **key**: *[RackId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#rackid)*

▪ **updater**: *function*

▸ (`value`: [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›): *[List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [List](_routes_experiment_dashboard_cagesessiontable_.cagesessiondata.md#list)‹[CageId](../modules/_routes_experiment_dashboard_experimentdashboard_.md#cageid)› |

**Returns:** *this*

▸ **update**<**R**>(`updater`: function): *R*

*Inherited from [RouteMap](_types_.routemap.md).[update](_types_.routemap.md#update)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:959

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

*Inherited from [RouteMap](_types_.routemap.md).[updateIn](_types_.routemap.md#updatein)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1217

Returns a new Map having applied the `updater` to the entry found at the
keyPath.

This is most commonly used to call methods on collections nested within a
structure of data. For example, in order to `.push()` onto a nested `List`,
`updateIn` and `push` can be used together:

<!-- runkit:activate -->
```js
const { Map, List } = require('immutable')
const map = Map({ inMap: Map({ inList: List([ 1, 2, 3 ]) }) })
const newMap = map.updateIn(['inMap', 'inList'], list => list.push(4))
// Map { "inMap": Map { "inList": List [ 1, 2, 3, 4 ] } }
```

If any keys in `keyPath` do not exist, new Immutable `Map`s will
be created at those keys. If the `keyPath` does not already contain a
value, the `updater` function will be called with `notSetValue`, if
provided, otherwise `undefined`.

<!-- runkit:activate
     { "preamble": "const { Map } = require('immutable')" }
-->
```js
const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
const newMap = map.updateIn(['a', 'b', 'c'], val => val * 2)
// Map { "a": Map { "b": Map { "c": 20 } } }
```

If the `updater` function returns the same value it was called with, then
no change will occur. This is still true if `notSetValue` is provided.

<!-- runkit:activate
     { "preamble": "const { Map } = require('immutable')" }
-->
```js
const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
const newMap = map.updateIn(['a', 'b', 'x'], 100, val => val)
// Map { "a": Map { "b": Map { "c": 10 } } }
assert.strictEqual(newMap, aMap)
```

For code using ES2015 or later, using `notSetValue` is discourged in
favor of function parameter default values. This helps to avoid any
potential confusion with identify functions as described above.

The previous example behaves differently when written with default values:

<!-- runkit:activate
     { "preamble": "const { Map } = require('immutable')" }
-->
```js
const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
const newMap = map.updateIn(['a', 'b', 'x'], (val = 100) => val)
// Map { "a": Map { "b": Map { "c": 10, "x": 100 } } }
```

Plain JavaScript Object or Arrays may be nested within an Immutable.js
Collection, and updateIn() can update those values as well, treating them
immutably by creating new copies of those values with the changes applied.

<!-- runkit:activate
     { "preamble": "const { Map } = require('immutable')" }
-->
```js
const map = Map({ a: { b: { c: 10 } } })
const newMap = map.updateIn(['a', 'b', 'c'], val => val * 2)
// Map { "a": { b: { c: 20 } } }
```

If any key in the path exists but cannot be updated (such as a primitive
like number or a custom Object like Date), an error will be thrown.

Note: `updateIn` can be used in `withMutations`.

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

*Inherited from [RouteMap](_types_.routemap.md).[updateIn](_types_.routemap.md#updatein)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1218

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

*Inherited from [RouteMap](_types_.routemap.md).[wasAltered](_types_.routemap.md#wasaltered)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1306

Returns true if this is a mutable copy (see `asMutable()`) and mutative
alterations have been applied.

**`see`** `Map#asMutable`

**Returns:** *boolean*

___

###  withMutations

▸ **withMutations**(`mutator`: function): *this*

*Inherited from [RouteMap](_types_.routemap.md).[withMutations](_types_.routemap.md#withmutations)*

Defined in node_modules/immutable/dist/immutable-nonambient.d.ts:1278

Every time you call one of the above functions, a new immutable Map is
created. If a pure function calls a number of these to produce a final
return value, then a penalty on performance and memory has been paid by
creating all of the intermediate immutable Maps.

If you need to apply a series of mutations to produce a new immutable
Map, `withMutations()` creates a temporary mutable copy of the Map which
can apply mutations in a highly performant manner. In fact, this is
exactly how complex mutations like `merge` are done.

As an example, this results in the creation of 2, not 4, new Maps:

<!-- runkit:activate -->
```js
const { Map } = require('immutable')
const map1 = Map()
const map2 = map1.withMutations(map => {
  map.set('a', 1).set('b', 2).set('c', 3)
})
assert.equal(map1.size, 0)
assert.equal(map2.size, 3)
```

Note: Not all methods can be used on a mutable collection or within
`withMutations`! Read the documentation for each method to see if it
is safe to use in `withMutations`.

**Parameters:**

▪ **mutator**: *function*

▸ (`mutable`: this): *any*

**Parameters:**

Name | Type |
------ | ------ |
`mutable` | this |

**Returns:** *this*
