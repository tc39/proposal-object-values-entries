# [Object.values](https://github.com/es-shims/Object.values) / [Object.entries](https://github.com/es-shims/Object.entries)
ES7 Proposal, specs, and reference implementation for `Object.values`/`Object.entries`

Spec drafted by [@ljharb](https://github.com/ljharb).

## Rationale
It is a very common use case to need the own values of an object - for example, when using an object as a hash filter. Many libraries have a “values” function: lodash/underscore, jQuery, Backbone, etc.

It is also useful to obtain an array of key/value pairs (what the spec calls “entries”) from an object, for the purposes of iteration or serialization. With the advent of the `Map` constructor accepting an iterable of `entries`, and its associated `entries` iterator (`WeakMap` also accepts iterable `entries` in its constructor), it becomes very compelling to want to quickly convert a plain object to a `Map`, via passing an array of `entries` into `new Map`.

We already have the precent of `Object.keys` returning an array of own keys, and matched triplets of `keys`/`values`/`entries` iterators on `Map`/`Set`/`Array`.  As such, per discussions on es-discuss and in at least one previous TC39 meeting, this proposal seeks to add `Object.values` and `Object.entries` to ECMAScript. Like `Object.keys`, they would return arrays. Their ordering would match `Object.keys` ordering precisely, such that the indices of all three resulting arrays would reflect the same key, value, or entry on the object.

## Spec
You can view the spec in [markdown format](spec.md) or rendered as [HTML](http://ljharb.github.io/proposal-object-values-entries/).
Note: there's been a small bit of spec refactoring to ensure that `Object.{keys,values,entries}` share the same key ordering.

## Iterables or Arrays?
Consistency with `Object.keys` is paramount in this proposal‘s opinion. A follow-on proposal for an iterable, however, could likely be `Reflect.ownValues` and `Reflect.ownEntries`, which would complete the triplet with `Reflect.ownKeys`, providing an iterator over both string-valued and symbol-valued properties. However, this proposal is focused on `Object.values`/`Object.entries`, and the existence of either the `Object` or `Reflect` forms should not preclude the existence of the other.
