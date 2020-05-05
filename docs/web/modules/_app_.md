[web](../README.md) › [Globals](../globals.md) › ["App"](_app_.md)

# External module: "App"

## Index

### Type aliases

* [ExperimentId](_app_.md#experimentid)

### Variables

* [viewOptions](_app_.md#const-viewoptions)

### Functions

* [App](_app_.md#const-app)

## Type aliases

###  ExperimentId

Ƭ **ExperimentId**: *[RouteId](_types_.md#routeid)*

Defined in packages/web/src/App.tsx:59

## Variables

### `Const` viewOptions

• **viewOptions**: *[RouteMap](../interfaces/_types_.routemap.md)* = Map<ExperimentId, DisplayName>().withMutations((map) => map
  .set('experiment-dashboard', 'Experiment Dashboard')
  .set('experiments', 'Experiments')
  .set('scale-api-tester', 'Scale API tester'))

Defined in packages/web/src/App.tsx:61

## Functions

### `Const` App

▸ **App**(): *Element‹›*

Defined in packages/web/src/App.tsx:66

**Returns:** *Element‹›*
