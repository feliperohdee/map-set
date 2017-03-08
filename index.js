module.exports = class MapSet extends Map {
	constructor(key, ...values) {
		super();

		this.set(key, ...values);
	}

	onRemoveKey(callback){
		if(typeof callback === 'function'){
			this._onRemoveKey = callback;
		}
	}

	size(key) {
		if (key) {
			const currentSet = this.get(key);

			if (currentSet) {
				return currentSet.size;
			}
		}

		return super.size;
	}

	clear(key) {
		if (key) {
			const currentSet = this.get(key);

			if (currentSet) {
				super.delete(key);
			}
		} else {
			super.clear();
		}

		return this;
	}

	has(key, value = null) {
		if (key && value) {
			const currentSet = this.get(key);

			if (currentSet) {
				return currentSet.has(value);
			}
		}

		return super.has(key);
	}

	set(key, ...values) {
		if (!key || !values.length) {
			return this;
		}

		const currentSet = this.get(key);

		if (currentSet) {
			values.forEach(currentSet.add.bind(currentSet));
		} else {
			super.set(key, new Set(values));
		}

		return this;
	}

	delete(key, ...values) {
		if (!key) {
			return this;
		}

		const currentSet = this.get(key);

		if (currentSet && values.length) {
			values.forEach(currentSet.delete.bind(currentSet));

			if (!currentSet.size) {
				super.delete(key);

				if (this._onRemoveKey) {
					this._onRemoveKey(key);
				}
			}
		} else {
			super.delete(key);
		}

		return this;
	}

	forEach(key, callback) {
		if (typeof key === 'function') {
			[callback, key] = [key, null];
		}

		if (key) {
			const currentSet = this.get(key);

			if (currentSet) {
				currentSet.forEach(callback.bind(callback));
			}
		} else {
			super.forEach(callback.bind(callback));
		}
	}
}
