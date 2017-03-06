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

	describe('size', () => {
		beforeEach(() => {
			mapSet.set('key', 'value-1', 'value-2', 'value-3');

			mapSet.size();
			mapSet.size('a');
		});

		it('shoud get set size', () => {
			expect(mapSet.size('key')).to.equal(3);
		});

		it('shoud get map size', () => {
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
	});

	describe('forEach', () => {
		beforeEach(() => {
			mapSet.set('key', 'value-1', 'value-2', 'value-3');
		});

		it('shoud iterate set', () => {
			const result = [];

			mapSet.forEach('key', result.push.bind(result));

			expect(result).to.deep.equal([
				'value-1',
				'value-2',
				'value-3'
			]);
		});

		it('shoud do nothing if no key found', () => {
			const result = [];

			mapSet.forEach('unknownKey', result.push.bind(result));

			expect(result).to.deep.equal([]);
		});

		it('shoud iterate map', () => {
			const result = [];

			mapSet.forEach(result.push.bind(result));

			expect(result.length).to.equal(1);
			expect(result[0]).to.be.a('Set');
		});
	});
});
