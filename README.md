# visualforce-remote-actions

## Synopsis

Easily invoke methods in your apex controllers annotated with @RemoteAction from scripts in Visualforce pages or lightning components.

## Code Example

The `RemoteAction` class has the following constructor:

```javascript
constructor(method, ...args) {}
```

`method` is either a function or string representation of a @RemoteAction annotated method from your apex controller.
`args` is an array of all subsequent arguments to be used in the invocation of the remote action.

ex: You have a controller named `AccountDetailsController.cls` with a remote action named `save`, which accepts two arguments.
```javascript
//function
new RemoteAction(AccountDetailsController.save, arg1, arg2)
```
**OR**
```javascript
//string
new RemoteAction('AccountDetailsController.save', arg1, arg2)
```

RemoteAction has a single function called `invoke` with an optional argument called `options`. `invoke` returns a `Promise`:

```javascript
//options is an object literal
invoke(options = {}) {}
```

The options supported in visualforce remoting can be found detailed here: https://developer.salesforce.com/docs/atlas.en-us.pages.meta/pages/pages_js_remoting_configuring_request.htm

ex: You want to invoke the remote action from the above example.
```javascript
new RemoteAction(AccountDetailsController.save, arg1, arg2)
	.invoke({escape: false})
```

To handle the result, add a `then`, `catch`, and `finally` chain as you would normally handle a Promise:

```javascript
new RemoteAction(AccountDetailsController.save, arg1, arg2)
	.invoke({escape: false})
	.then(result => {
		//do something with the result!
	})
	.catch(err => {
		//do something with this error!
	})
	.finally(() => {
		//do something after everything is all said and done.
	});
```

## Motivation

I created visualforce-remote-actions to make it easier to work with client-server interactions in the context of visualforce development. Its intention is to provide a simpler API with built-in handling via bluebird's promises, with the goal of making the code both easier to read and write.

## Installation

`npm install visualforce-remote-actions`

## Tests

Coming soon...

## Contributors

If you find an issue, please let me know on this repository.

## License

ISC