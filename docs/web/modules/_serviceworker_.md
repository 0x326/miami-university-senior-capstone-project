[web](../README.md) › [Globals](../globals.md) › ["serviceWorker"](_serviceworker_.md)

# External module: "serviceWorker"

## Index

### Type aliases

* [Config](_serviceworker_.md#config)

### Variables

* [isLocalhost](_serviceworker_.md#const-islocalhost)

### Functions

* [checkValidServiceWorker](_serviceworker_.md#checkvalidserviceworker)
* [register](_serviceworker_.md#register)
* [registerValidSW](_serviceworker_.md#registervalidsw)
* [unregister](_serviceworker_.md#unregister)

## Type aliases

###  Config

Ƭ **Config**: *object*

Defined in packages/web/src/serviceWorker.ts:23

#### Type declaration:

* **onSuccess**? : *undefined | function*

* **onUpdate**? : *undefined | function*

## Variables

### `Const` isLocalhost

• **isLocalhost**: *boolean* = Boolean(
  window.location.hostname === 'localhost'
    // [::1] is the IPv6 localhost address.
    || window.location.hostname === '[::1]'
    // 127.0.0.1/8 is considered localhost for IPv4.
    || /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/.exec(window.location.hostname),
)

Defined in packages/web/src/serviceWorker.ts:15

## Functions

###  checkValidServiceWorker

▸ **checkValidServiceWorker**(`swUrl`: string, `config?`: [Config](_serviceworker_.md#config)): *void*

Defined in packages/web/src/serviceWorker.ts:110

**Parameters:**

Name | Type |
------ | ------ |
`swUrl` | string |
`config?` | [Config](_serviceworker_.md#config) |

**Returns:** *void*

___

###  register

▸ **register**(`config?`: [Config](_serviceworker_.md#config)): *void*

Defined in packages/web/src/serviceWorker.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`config?` | [Config](_serviceworker_.md#config) |

**Returns:** *void*

___

###  registerValidSW

▸ **registerValidSW**(`swUrl`: string, `config?`: [Config](_serviceworker_.md#config)): *void*

Defined in packages/web/src/serviceWorker.ts:65

**Parameters:**

Name | Type |
------ | ------ |
`swUrl` | string |
`config?` | [Config](_serviceworker_.md#config) |

**Returns:** *void*

___

###  unregister

▸ **unregister**(): *void*

Defined in packages/web/src/serviceWorker.ts:138

**Returns:** *void*
