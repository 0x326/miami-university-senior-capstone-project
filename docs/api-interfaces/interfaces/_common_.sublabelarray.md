[api-interfaces](../README.md) › [Globals](../globals.md) › ["common"](../modules/_common_.md) › [SubLabelArray](_common_.sublabelarray.md)

# Interface: SubLabelArray

## Hierarchy

* [Array](_common_.sublabelarray.md#array)‹[SubLabel](../modules/_common_.md#sublabel)›

  ↳ **SubLabelArray**

## Indexable

* \[ **n**: *number*\]: [SubLabel](../modules/_common_.md#sublabel)

## Index

### Properties

* [Array](_common_.sublabelarray.md#array)
* [length](_common_.sublabelarray.md#length)

### Methods

* [[Symbol.iterator]](_common_.sublabelarray.md#[symbol.iterator])
* [[Symbol.unscopables]](_common_.sublabelarray.md#[symbol.unscopables])
* [concat](_common_.sublabelarray.md#concat)
* [copyWithin](_common_.sublabelarray.md#copywithin)
* [entries](_common_.sublabelarray.md#entries)
* [every](_common_.sublabelarray.md#every)
* [fill](_common_.sublabelarray.md#fill)
* [filter](_common_.sublabelarray.md#filter)
* [find](_common_.sublabelarray.md#find)
* [findIndex](_common_.sublabelarray.md#findindex)
* [forEach](_common_.sublabelarray.md#foreach)
* [includes](_common_.sublabelarray.md#includes)
* [indexOf](_common_.sublabelarray.md#indexof)
* [join](_common_.sublabelarray.md#join)
* [keys](_common_.sublabelarray.md#keys)
* [lastIndexOf](_common_.sublabelarray.md#lastindexof)
* [map](_common_.sublabelarray.md#map)
* [pop](_common_.sublabelarray.md#pop)
* [push](_common_.sublabelarray.md#push)
* [reduce](_common_.sublabelarray.md#reduce)
* [reduceRight](_common_.sublabelarray.md#reduceright)
* [reverse](_common_.sublabelarray.md#reverse)
* [shift](_common_.sublabelarray.md#shift)
* [slice](_common_.sublabelarray.md#slice)
* [some](_common_.sublabelarray.md#some)
* [sort](_common_.sublabelarray.md#sort)
* [splice](_common_.sublabelarray.md#splice)
* [toLocaleString](_common_.sublabelarray.md#tolocalestring)
* [toString](_common_.sublabelarray.md#tostring)
* [unshift](_common_.sublabelarray.md#unshift)
* [values](_common_.sublabelarray.md#values)

## Properties

###  Array

• **Array**: *ArrayConstructor*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1385

___

###  length

• **length**: *number*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[length](_common_.sublabelarray.md#length)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1215

Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.

## Methods

###  [Symbol.iterator]

▸ **[Symbol.iterator]**(): *IterableIterator‹[SubLabel](../modules/_common_.md#sublabel)›*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[[Symbol.iterator]](_common_.sublabelarray.md#[symbol.iterator])*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.iterable.d.ts:60

Iterator

**Returns:** *IterableIterator‹[SubLabel](../modules/_common_.md#sublabel)›*

___

###  [Symbol.unscopables]

▸ **[Symbol.unscopables]**(): *object*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[[Symbol.unscopables]](_common_.sublabelarray.md#[symbol.unscopables])*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:94

Returns an object whose properties have the value 'true'
when they will be absent when used in a 'with' statement.

**Returns:** *object*

* **copyWithin**: *boolean*

* **entries**: *boolean*

* **fill**: *boolean*

* **find**: *boolean*

* **findIndex**: *boolean*

* **keys**: *boolean*

* **values**: *boolean*

___

###  concat

▸ **concat**(...`items`: ConcatArray‹[SubLabel](../modules/_common_.md#sublabel)›[]): *[SubLabel](../modules/_common_.md#sublabel)[]*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[concat](_common_.sublabelarray.md#concat)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1237

Combines two or more arrays.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | ConcatArray‹[SubLabel](../modules/_common_.md#sublabel)›[] | Additional items to add to the end of array1.  |

**Returns:** *[SubLabel](../modules/_common_.md#sublabel)[]*

▸ **concat**(...`items`: T | ConcatArray‹T›[]): *[SubLabel](../modules/_common_.md#sublabel)[]*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[concat](_common_.sublabelarray.md#concat)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1242

Combines two or more arrays.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | T &#124; ConcatArray‹T›[] | Additional items to add to the end of array1.  |

**Returns:** *[SubLabel](../modules/_common_.md#sublabel)[]*

___

###  copyWithin

▸ **copyWithin**(`target`: number, `start`: number, `end?`: undefined | number): *this*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[copyWithin](_common_.sublabelarray.md#copywithin)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.core.d.ts:64

Returns the this object after copying a section of the array identified by start and end
to the same array starting at position target

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`target` | number | If target is negative, it is treated as length+target where length is the length of the array. |
`start` | number | If start is negative, it is treated as length+start. If end is negative, it is treated as length+end. |
`end?` | undefined &#124; number | If not specified, length of the this object is used as its default value.  |

**Returns:** *this*

___

###  entries

▸ **entries**(): *IterableIterator‹[number, [SubLabel](../modules/_common_.md#sublabel)]›*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[entries](_common_.sublabelarray.md#entries)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.iterable.d.ts:65

Returns an iterable of key, value pairs for every entry in the array

**Returns:** *IterableIterator‹[number, [SubLabel](../modules/_common_.md#sublabel)]›*

___

###  every

▸ **every**(`callbackfn`: function, `thisArg?`: any): *boolean*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[every](_common_.sublabelarray.md#every)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1310

Determines whether all the members of an array satisfy the specified test.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The every method calls
the callbackfn function for each element in the array until the callbackfn returns a value
which is coercible to the Boolean value false, or until the end of the array.

▸ (`value`: [SubLabel](../modules/_common_.md#sublabel), `index`: number, `array`: [SubLabel](../modules/_common_.md#sublabel)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [SubLabel](../modules/_common_.md#sublabel) |
`index` | number |
`array` | [SubLabel](../modules/_common_.md#sublabel)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function.
If thisArg is omitted, undefined is used as the this value.

**Returns:** *boolean*

___

###  fill

▸ **fill**(`value`: [SubLabel](../modules/_common_.md#sublabel), `start?`: undefined | number, `end?`: undefined | number): *this*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[fill](_common_.sublabelarray.md#fill)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.core.d.ts:53

Returns the this object after filling the section identified by start and end with value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [SubLabel](../modules/_common_.md#sublabel) | value to fill array section with |
`start?` | undefined &#124; number | index to start filling the array at. If start is negative, it is treated as length+start where length is the length of the array. |
`end?` | undefined &#124; number | index to stop filling the array at. If end is negative, it is treated as length+end.  |

**Returns:** *this*

___

###  filter

▸ **filter**<**S**>(`callbackfn`: function, `thisArg?`: any): *S[]*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[filter](_common_.sublabelarray.md#filter)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1337

Returns the elements of an array that meet the condition specified in a callback function.

**Type parameters:**

▪ **S**: *[SubLabel](../modules/_common_.md#sublabel)*

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.

▸ (`value`: [SubLabel](../modules/_common_.md#sublabel), `index`: number, `array`: [SubLabel](../modules/_common_.md#sublabel)[]): *value is S*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [SubLabel](../modules/_common_.md#sublabel) |
`index` | number |
`array` | [SubLabel](../modules/_common_.md#sublabel)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *S[]*

▸ **filter**(`callbackfn`: function, `thisArg?`: any): *[SubLabel](../modules/_common_.md#sublabel)[]*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[filter](_common_.sublabelarray.md#filter)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1343

Returns the elements of an array that meet the condition specified in a callback function.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.

▸ (`value`: [SubLabel](../modules/_common_.md#sublabel), `index`: number, `array`: [SubLabel](../modules/_common_.md#sublabel)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [SubLabel](../modules/_common_.md#sublabel) |
`index` | number |
`array` | [SubLabel](../modules/_common_.md#sublabel)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *[SubLabel](../modules/_common_.md#sublabel)[]*

___

###  find

▸ **find**<**S**>(`predicate`: function, `thisArg?`: any): *S | undefined*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[find](_common_.sublabelarray.md#find)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.core.d.ts:31

Returns the value of the first element in the array where predicate is true, and undefined
otherwise.

**Type parameters:**

▪ **S**: *[SubLabel](../modules/_common_.md#sublabel)*

**Parameters:**

▪ **predicate**: *function*

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found, find
immediately returns that element value. Otherwise, find returns undefined.

▸ (`this`: void, `value`: [SubLabel](../modules/_common_.md#sublabel), `index`: number, `obj`: [SubLabel](../modules/_common_.md#sublabel)[]): *value is S*

**Parameters:**

Name | Type |
------ | ------ |
`this` | void |
`value` | [SubLabel](../modules/_common_.md#sublabel) |
`index` | number |
`obj` | [SubLabel](../modules/_common_.md#sublabel)[] |

▪`Optional`  **thisArg**: *any*

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

**Returns:** *S | undefined*

▸ **find**(`predicate`: function, `thisArg?`: any): *[SubLabel](../modules/_common_.md#sublabel) | undefined*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[find](_common_.sublabelarray.md#find)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.core.d.ts:32

**Parameters:**

▪ **predicate**: *function*

▸ (`value`: [SubLabel](../modules/_common_.md#sublabel), `index`: number, `obj`: [SubLabel](../modules/_common_.md#sublabel)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [SubLabel](../modules/_common_.md#sublabel) |
`index` | number |
`obj` | [SubLabel](../modules/_common_.md#sublabel)[] |

▪`Optional`  **thisArg**: *any*

**Returns:** *[SubLabel](../modules/_common_.md#sublabel) | undefined*

___

###  findIndex

▸ **findIndex**(`predicate`: function, `thisArg?`: any): *number*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[findIndex](_common_.sublabelarray.md#findindex)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.core.d.ts:43

Returns the index of the first element in the array where predicate is true, and -1
otherwise.

**Parameters:**

▪ **predicate**: *function*

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found,
findIndex immediately returns that element index. Otherwise, findIndex returns -1.

▸ (`value`: [SubLabel](../modules/_common_.md#sublabel), `index`: number, `obj`: [SubLabel](../modules/_common_.md#sublabel)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [SubLabel](../modules/_common_.md#sublabel) |
`index` | number |
`obj` | [SubLabel](../modules/_common_.md#sublabel)[] |

▪`Optional`  **thisArg**: *any*

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

**Returns:** *number*

___

###  forEach

▸ **forEach**(`callbackfn`: function, `thisArg?`: any): *void*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[forEach](_common_.sublabelarray.md#foreach)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1325

Performs the specified action for each element in an array.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.

▸ (`value`: [SubLabel](../modules/_common_.md#sublabel), `index`: number, `array`: [SubLabel](../modules/_common_.md#sublabel)[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [SubLabel](../modules/_common_.md#sublabel) |
`index` | number |
`array` | [SubLabel](../modules/_common_.md#sublabel)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *void*

___

###  includes

▸ **includes**(`searchElement`: [SubLabel](../modules/_common_.md#sublabel), `fromIndex?`: undefined | number): *boolean*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[includes](_common_.sublabelarray.md#includes)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2016.array.include.d.ts:27

Determines whether an array includes a certain element, returning true or false as appropriate.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`searchElement` | [SubLabel](../modules/_common_.md#sublabel) | The element to search for. |
`fromIndex?` | undefined &#124; number | The position in this array at which to begin searching for searchElement.  |

**Returns:** *boolean*

___

###  indexOf

▸ **indexOf**(`searchElement`: [SubLabel](../modules/_common_.md#sublabel), `fromIndex?`: undefined | number): *number*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[indexOf](_common_.sublabelarray.md#indexof)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1295

Returns the index of the first occurrence of a value in an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`searchElement` | [SubLabel](../modules/_common_.md#sublabel) | The value to locate in the array. |
`fromIndex?` | undefined &#124; number | The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.  |

**Returns:** *number*

___

###  join

▸ **join**(`separator?`: undefined | string): *string*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[join](_common_.sublabelarray.md#join)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1247

Adds all the elements of an array separated by the specified separator string.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`separator?` | undefined &#124; string | A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.  |

**Returns:** *string*

___

###  keys

▸ **keys**(): *IterableIterator‹number›*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[keys](_common_.sublabelarray.md#keys)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.iterable.d.ts:70

Returns an iterable of keys in the array

**Returns:** *IterableIterator‹number›*

___

###  lastIndexOf

▸ **lastIndexOf**(`searchElement`: [SubLabel](../modules/_common_.md#sublabel), `fromIndex?`: undefined | number): *number*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[lastIndexOf](_common_.sublabelarray.md#lastindexof)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1301

Returns the index of the last occurrence of a specified value in an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`searchElement` | [SubLabel](../modules/_common_.md#sublabel) | The value to locate in the array. |
`fromIndex?` | undefined &#124; number | The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.  |

**Returns:** *number*

___

###  map

▸ **map**<**U**>(`callbackfn`: function, `thisArg?`: any): *U[]*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[map](_common_.sublabelarray.md#map)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1331

Calls a defined callback function on each element of an array, and returns an array that contains the results.

**Type parameters:**

▪ **U**

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.

▸ (`value`: [SubLabel](../modules/_common_.md#sublabel), `index`: number, `array`: [SubLabel](../modules/_common_.md#sublabel)[]): *U*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [SubLabel](../modules/_common_.md#sublabel) |
`index` | number |
`array` | [SubLabel](../modules/_common_.md#sublabel)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *U[]*

___

###  pop

▸ **pop**(): *[SubLabel](../modules/_common_.md#sublabel) | undefined*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[pop](_common_.sublabelarray.md#pop)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1227

Removes the last element from an array and returns it.

**Returns:** *[SubLabel](../modules/_common_.md#sublabel) | undefined*

___

###  push

▸ **push**(...`items`: [SubLabel](../modules/_common_.md#sublabel)[]): *number*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[push](_common_.sublabelarray.md#push)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1232

Appends new elements to an array, and returns the new length of the array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | [SubLabel](../modules/_common_.md#sublabel)[] | New elements of the Array.  |

**Returns:** *number*

___

###  reduce

▸ **reduce**(`callbackfn`: function): *[SubLabel](../modules/_common_.md#sublabel)*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[reduce](_common_.sublabelarray.md#reduce)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1349

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: [SubLabel](../modules/_common_.md#sublabel), `currentValue`: [SubLabel](../modules/_common_.md#sublabel), `currentIndex`: number, `array`: [SubLabel](../modules/_common_.md#sublabel)[]): *[SubLabel](../modules/_common_.md#sublabel)*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | [SubLabel](../modules/_common_.md#sublabel) |
`currentValue` | [SubLabel](../modules/_common_.md#sublabel) |
`currentIndex` | number |
`array` | [SubLabel](../modules/_common_.md#sublabel)[] |

**Returns:** *[SubLabel](../modules/_common_.md#sublabel)*

▸ **reduce**(`callbackfn`: function, `initialValue`: [SubLabel](../modules/_common_.md#sublabel)): *[SubLabel](../modules/_common_.md#sublabel)*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[reduce](_common_.sublabelarray.md#reduce)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1350

**Parameters:**

▪ **callbackfn**: *function*

▸ (`previousValue`: [SubLabel](../modules/_common_.md#sublabel), `currentValue`: [SubLabel](../modules/_common_.md#sublabel), `currentIndex`: number, `array`: [SubLabel](../modules/_common_.md#sublabel)[]): *[SubLabel](../modules/_common_.md#sublabel)*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | [SubLabel](../modules/_common_.md#sublabel) |
`currentValue` | [SubLabel](../modules/_common_.md#sublabel) |
`currentIndex` | number |
`array` | [SubLabel](../modules/_common_.md#sublabel)[] |

▪ **initialValue**: *[SubLabel](../modules/_common_.md#sublabel)*

**Returns:** *[SubLabel](../modules/_common_.md#sublabel)*

▸ **reduce**<**U**>(`callbackfn`: function, `initialValue`: U): *U*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[reduce](_common_.sublabelarray.md#reduce)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1356

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Type parameters:**

▪ **U**

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: U, `currentValue`: [SubLabel](../modules/_common_.md#sublabel), `currentIndex`: number, `array`: [SubLabel](../modules/_common_.md#sublabel)[]): *U*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | U |
`currentValue` | [SubLabel](../modules/_common_.md#sublabel) |
`currentIndex` | number |
`array` | [SubLabel](../modules/_common_.md#sublabel)[] |

▪ **initialValue**: *U*

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.

**Returns:** *U*

___

###  reduceRight

▸ **reduceRight**(`callbackfn`: function): *[SubLabel](../modules/_common_.md#sublabel)*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[reduceRight](_common_.sublabelarray.md#reduceright)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1362

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: [SubLabel](../modules/_common_.md#sublabel), `currentValue`: [SubLabel](../modules/_common_.md#sublabel), `currentIndex`: number, `array`: [SubLabel](../modules/_common_.md#sublabel)[]): *[SubLabel](../modules/_common_.md#sublabel)*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | [SubLabel](../modules/_common_.md#sublabel) |
`currentValue` | [SubLabel](../modules/_common_.md#sublabel) |
`currentIndex` | number |
`array` | [SubLabel](../modules/_common_.md#sublabel)[] |

**Returns:** *[SubLabel](../modules/_common_.md#sublabel)*

▸ **reduceRight**(`callbackfn`: function, `initialValue`: [SubLabel](../modules/_common_.md#sublabel)): *[SubLabel](../modules/_common_.md#sublabel)*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[reduceRight](_common_.sublabelarray.md#reduceright)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1363

**Parameters:**

▪ **callbackfn**: *function*

▸ (`previousValue`: [SubLabel](../modules/_common_.md#sublabel), `currentValue`: [SubLabel](../modules/_common_.md#sublabel), `currentIndex`: number, `array`: [SubLabel](../modules/_common_.md#sublabel)[]): *[SubLabel](../modules/_common_.md#sublabel)*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | [SubLabel](../modules/_common_.md#sublabel) |
`currentValue` | [SubLabel](../modules/_common_.md#sublabel) |
`currentIndex` | number |
`array` | [SubLabel](../modules/_common_.md#sublabel)[] |

▪ **initialValue**: *[SubLabel](../modules/_common_.md#sublabel)*

**Returns:** *[SubLabel](../modules/_common_.md#sublabel)*

▸ **reduceRight**<**U**>(`callbackfn`: function, `initialValue`: U): *U*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[reduceRight](_common_.sublabelarray.md#reduceright)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1369

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Type parameters:**

▪ **U**

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: U, `currentValue`: [SubLabel](../modules/_common_.md#sublabel), `currentIndex`: number, `array`: [SubLabel](../modules/_common_.md#sublabel)[]): *U*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | U |
`currentValue` | [SubLabel](../modules/_common_.md#sublabel) |
`currentIndex` | number |
`array` | [SubLabel](../modules/_common_.md#sublabel)[] |

▪ **initialValue**: *U*

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.

**Returns:** *U*

___

###  reverse

▸ **reverse**(): *[SubLabel](../modules/_common_.md#sublabel)[]*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[reverse](_common_.sublabelarray.md#reverse)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1251

Reverses the elements in an Array.

**Returns:** *[SubLabel](../modules/_common_.md#sublabel)[]*

___

###  shift

▸ **shift**(): *[SubLabel](../modules/_common_.md#sublabel) | undefined*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[shift](_common_.sublabelarray.md#shift)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1255

Removes the first element from an array and returns it.

**Returns:** *[SubLabel](../modules/_common_.md#sublabel) | undefined*

___

###  slice

▸ **slice**(`start?`: undefined | number, `end?`: undefined | number): *[SubLabel](../modules/_common_.md#sublabel)[]*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[slice](_common_.sublabelarray.md#slice)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1261

Returns a section of an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start?` | undefined &#124; number | The beginning of the specified portion of the array. |
`end?` | undefined &#124; number | The end of the specified portion of the array. This is exclusive of the element at the index 'end'.  |

**Returns:** *[SubLabel](../modules/_common_.md#sublabel)[]*

___

###  some

▸ **some**(`callbackfn`: function, `thisArg?`: any): *boolean*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[some](_common_.sublabelarray.md#some)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1319

Determines whether the specified callback function returns true for any element of an array.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The some method calls
the callbackfn function for each element in the array until the callbackfn returns a value
which is coercible to the Boolean value true, or until the end of the array.

▸ (`value`: [SubLabel](../modules/_common_.md#sublabel), `index`: number, `array`: [SubLabel](../modules/_common_.md#sublabel)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [SubLabel](../modules/_common_.md#sublabel) |
`index` | number |
`array` | [SubLabel](../modules/_common_.md#sublabel)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function.
If thisArg is omitted, undefined is used as the this value.

**Returns:** *boolean*

___

###  sort

▸ **sort**(`compareFn?`: undefined | function): *this*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[sort](_common_.sublabelarray.md#sort)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1271

Sorts an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`compareFn?` | undefined &#124; function | Function used to determine the order of the elements. It is expected to return a negative value if first argument is less than second argument, zero if they're equal and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order. ```ts [11,2,22,1].sort((a, b) => a - b) ```  |

**Returns:** *this*

___

###  splice

▸ **splice**(`start`: number, `deleteCount?`: undefined | number): *[SubLabel](../modules/_common_.md#sublabel)[]*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[splice](_common_.sublabelarray.md#splice)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1277

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start` | number | The zero-based location in the array from which to start removing elements. |
`deleteCount?` | undefined &#124; number | The number of elements to remove.  |

**Returns:** *[SubLabel](../modules/_common_.md#sublabel)[]*

▸ **splice**(`start`: number, `deleteCount`: number, ...`items`: [SubLabel](../modules/_common_.md#sublabel)[]): *[SubLabel](../modules/_common_.md#sublabel)[]*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[splice](_common_.sublabelarray.md#splice)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1284

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start` | number | The zero-based location in the array from which to start removing elements. |
`deleteCount` | number | The number of elements to remove. |
`...items` | [SubLabel](../modules/_common_.md#sublabel)[] | Elements to insert into the array in place of the deleted elements.  |

**Returns:** *[SubLabel](../modules/_common_.md#sublabel)[]*

___

###  toLocaleString

▸ **toLocaleString**(): *string*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[toLocaleString](_common_.sublabelarray.md#tolocalestring)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1223

Returns a string representation of an array. The elements are converted to string using their toLocalString methods.

**Returns:** *string*

___

###  toString

▸ **toString**(): *string*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[toString](_common_.sublabelarray.md#tostring)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1219

Returns a string representation of an array.

**Returns:** *string*

___

###  unshift

▸ **unshift**(...`items`: [SubLabel](../modules/_common_.md#sublabel)[]): *number*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[unshift](_common_.sublabelarray.md#unshift)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1289

Inserts new elements at the start of an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | [SubLabel](../modules/_common_.md#sublabel)[] | Elements to insert at the start of the Array.  |

**Returns:** *number*

___

###  values

▸ **values**(): *IterableIterator‹[SubLabel](../modules/_common_.md#sublabel)›*

*Inherited from [SubLabelArray](_common_.sublabelarray.md).[values](_common_.sublabelarray.md#values)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.iterable.d.ts:75

Returns an iterable of values in the array

**Returns:** *IterableIterator‹[SubLabel](../modules/_common_.md#sublabel)›*
