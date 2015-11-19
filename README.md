# [Object.values](https://github.com/es-shims/Object.values) / [Object.entries](https://github.com/es-shims/Object.entries)
ES7 Proposal, specs, and reference implementation for `Object.values`/`Object.entries`

Spec drafted by [@ljharb](https://github.com/ljharb).

This proposal is currently at [stage 3](https://github.com/tc39/ecma262) of the [process](https://tc39.github.io/process-document/).

Designated TC39 reviewers: @wycats @littledan @rwaldron

Engine Implementations:
 - [Firefox Nightly](https://bugzilla.mozilla.org/show_bug.cgi?id=1208464) (not yet landed, nightly only)
 - [WebKit Nightly](https://bugs.webkit.org/show_bug.cgi?id=150131) (not yet landed)

## Previous discussions
 - [TC39 meeting notes](https://github.com/rwaldron/tc39-notes/blob/c61f48cea5f2339a1ec65ca89827c8cff170779b/es6/2014-04/apr-9.md#51-objectentries-objectvalues)
 - esdiscuss:
  - https://esdiscuss.org/topic/object-entries-object-values
  - https://esdiscuss.org/topic/es6-iteration-over-object-values
  - https://esdiscuss.org/topic/object-values-and-or-object-foreach -> https://esdiscuss.org/topic/iteration-was-re-object-values-and-or-object-foreach
  - https://esdiscuss.org/topic/object-entries-in-2015
  - https://esdiscuss.org/topic/providing-object-iterators-beyond-just-object-keys

## Rationale
It is a very common use case to need the own values of an object - for example, when using an object as a hash filter. Many libraries have a “values” function: lodash/underscore, jQuery, Backbone, etc.

It is also useful to obtain an array of key/value pairs (what the spec calls “entries”) from an object, for the purposes of iteration or serialization. With the advent of the `Map` constructor accepting an iterable of `entries`, and its associated `entries` iterator (`WeakMap` also accepts iterable `entries` in its constructor), it becomes very compelling to want to quickly convert a plain object to a `Map`, via passing an array of `entries` into `new Map`.

We already have the precedent of `Object.keys` returning an array of own keys, and matched triplets of `keys`/`values`/`entries` iterators on `Map`/`Set`/`Array`. As such, per discussions on es-discuss and in at least one previous TC39 meeting, this proposal seeks to add `Object.values` and `Object.entries` to ECMAScript. Like `Object.keys`, they would return arrays. Their ordering would match `Object.keys` ordering precisely, such that the indices of all three resulting arrays would reflect the same key, value, or entry on the object.

## Spec
You can view the spec in [markdown format](spec.md) or rendered as [HTML](http://tc39.github.io/proposal-object-values-entries/).
Note: there's been a small bit of spec refactoring to ensure that `Object.{keys,values,entries}` share the same key ordering.

## Iterators or Arrays?
Consistency with `Object.keys` is paramount in this proposal‘s opinion. A follow-on proposal for an iterator, however, could likely be `Reflect.ownValues` and `Reflect.ownEntries`, which would complete the triplet with `Reflect.ownKeys`, providing an array of both string-valued and symbol-valued properties. However, this proposal is focused on `Object.values`/`Object.entries`, and the existence of either the `Object` or `Reflect` forms should not preclude the existence of the other. In addition, the current precedent for returning iterators from `keys`/`values`/`entries` currently only applies to methods on prototypes - and in addition, “`Object` is special” seems to be something many accept. Also, arrays are themselves iterable already.
