import Promise from 'bluebird';
/**
*
* Usage...
* ```javascript
* 		import {RemoteAction} from 'remoting-helpers';
* 			new RemoteAction(method, arg1, arg2, ...)
*			.invoke({options})
*			.then(result => {
*	
*			})
*			.catch(error => {
*	
*			});
**/
export class RemoteAction {
	constructor(method, ...args) {
		this.method = method;
		this.args = args;

		this.invoke = this.invoke.bind(this);
	}
	invoke(options = {}) {
		return new Promise((resolve, reject) => {
			switch (typeof this.method) {
				case 'function':
					this.method(...this.args, (result, event) => {
						if (event.status) {
							resolve(result);
						}
						else {
							reject(event.message);
						}
					}, options);
					break;
				case 'string':
					Visualforce.remoting.Manager.invokeAction(this.method, ...this.args, (result, event) => {
						if (event.status) {
							resolve(result);
						}
						else {
							reject(event.message);
						}
					}, options);
					break;
				default:
					reject('Method must be a function or a string representation of the function name.');
					break;
			}
		}); 
	}
}