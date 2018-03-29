const chai = require('chai');
const MapSet = require('../');

const expect = chai.expect;

describe('index.js', () => {
	let mapSet;

	beforeEach(() => {
		mapSet = new MapSet();
	});

	describe('constructor', () => {
		it('should set if key and values provided', () => {
			mapSet = new MapSet('key', 'value-1', 'value-2', 'value-3');

			expect(mapSet.get('key').has('value-1')).to.be.true;
			expect(mapSet.get('key').has('value-2')).to.be.true;
			expect(mapSet.get('key').has('value-3')).to.be.true;
		});
	});

	describe('onRemoveKey', () => {
		it('should feed onRemoveKey', () => {
			const callback = () => null;

			mapSet.onRemoveKey(callback);

			expect(mapSet._onRemoveKey).to.equal(callback);
		});

		it('should not set onRemoveKey if not function', () => {
			mapSet.onRemoveKey(null);

			expect(mapSet._onRemoveKey).to.be.undefined;
		});
	});

	describe('size', () => {
		beforeEach(() => {
			mapSet.set('key', 'value-1', 'value-2', 'value-3');
		});

		it('should get set size', () => {
			expect(mapSet.size('key')).to.equal(3);
		});

		it('should get map size', () => {
			expect(mapSet.size()).to.equal(1);
		});
	});

	describe('clear', () => {
		beforeEach(() => {
			mapSet.set('key', 'value-1', 'value-2', 'value-3');
			mapSet.set('key-1', 'value-1', 'value-2', 'value-3');
		});

		it('should return self', () => {
			expect(mapSet.clear('key-1')).to.equal(mapSet);
		});

		it('should remove key', () => {
			mapSet.clear('key');

			expect(mapSet.size()).to.equal(1);
			expect(mapSet.get('key')).to.be.undefined;
		});

		it('should do nothing if key not found', () => {
			mapSet.clear('_key');

			expect(mapSet.size()).to.equal(2);
			expect(mapSet.get('key')).to.be.a('Set');
			expect(mapSet.get('key-1')).to.be.a('Set');
		});

		it('should clear map', () => {
			mapSet.clear();

			expect(mapSet.size()).to.equal(0);
			expect(mapSet.get('key')).to.be.undefined;
		});
	});

	describe('has', () => {
		beforeEach(() => {
			mapSet.set('key', 'value-1', 'value-2', 'value-3');
		});

		it('should test set', () => {
			expect(mapSet.has('key', 'value-1')).to.be.true;
			expect(mapSet.has('_key', 'value-1')).to.be.false;
			expect(mapSet.has('key', 'value-4')).to.be.false;
		});

		it('should test map', () => {
			expect(mapSet.has('key')).to.be.true;
			expect(mapSet.has('_key')).to.be.false;
		});
	});

	describe('set', () => {
		it('should return self', () => {
			expect(mapSet.set('key', 'value-1')).to.equal(mapSet);
		});

		it('should return self if no vals', () => {
			expect(mapSet.set('key')).to.equal(mapSet);
		});

		it('should return self if no key', () => {
			expect(mapSet.set()).to.equal(mapSet);
		});

		it('should create a set if not exists', () => {
			mapSet.set('key', 'value-1');

			expect(mapSet.get('key')).to.be.a('Set');
			expect(mapSet.get('key').has('value-1')).to.be.true;
		});

		it('should add multiple values', () => {
			mapSet.set('key', 'value-1', 'value-2', 'value-3');
			mapSet.set('key', 'value-3', 'value-4', 'value-5');

			expect(mapSet.get('key').has('value-1')).to.be.true;
			expect(mapSet.get('key').has('value-2')).to.be.true;
			expect(mapSet.get('key').has('value-3')).to.be.true;
			expect(mapSet.get('key').has('value-4')).to.be.true;
			expect(mapSet.get('key').has('value-5')).to.be.true;
		});

		it('should no repeat values', () => {
			mapSet.set('key', 'value-1', 'value-2', 'value-3', 'value-3');

			expect(mapSet.get('key').size).to.equal(3);
		});
	});

	describe('delete', () => {
		beforeEach(() => {
			mapSet.set('key', 'value-1', 'value-2', 'value-3');
		});

		it('should return self', () => {
			expect(mapSet.delete('key')).to.equal(mapSet);
		});

		it('should return self and remove any element if no key', () => {
			expect(mapSet.delete()).to.equal(mapSet);

			expect(mapSet.get('key').has('value-1')).to.be.true;
			expect(mapSet.get('key').has('value-2')).to.be.true;
			expect(mapSet.get('key').has('value-3')).to.be.true;
		});

		it('should remove one element', () => {
			mapSet.delete('key', 'value-2');

			expect(mapSet.get('key').has('value-1')).to.be.true;
			expect(mapSet.get('key').has('value-2')).to.be.false;
			expect(mapSet.get('key').has('value-3')).to.be.true;
		});

		it('should remove all elements and key', () => {
			mapSet.delete('key', 'value-1', 'value-2', 'value-3');

			expect(mapSet.get('key')).to.be.undefined;
		});

		it('should remove key', () => {
			mapSet.delete('key');

			expect(mapSet.get('key')).to.be.undefined;
		});

		it('should call onRemoveKey', () => {
			const result = [];

			mapSet.onRemoveKey(key => result.push(key));
			mapSet.delete('key', 'value-1', 'value-2', 'value-3');

			expect(result).to.deep.equal(['key']);
		});
	});

	describe('forEach', () => {
		beforeEach(() => {
			mapSet.set('key', 'value-1', 'value-2', 'value-3');
		});

		it('should iterate set', () => {
			const result = [];

			mapSet.forEach('key', v => result.push(v));

			expect(result).to.deep.equal([
				'value-1',
				'value-2',
				'value-3'
			]);
		});

		it('should do nothing if no key found', () => {
			const result = [];

			mapSet.forEach('unknownKey', v => result.push(v));

			expect(result).to.deep.equal([]);
		});

		it('should iterate map', () => {
			const result = [];

			mapSet.forEach(v => result.push(v));

			expect(result.length).to.equal(1);
			expect(result[0]).to.be.a('Set');
		});
	});
});
