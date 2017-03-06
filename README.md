[![CircleCI](https://circleci.com/gh/feliperohdee/map-set.svg?style=svg)](https://circleci.com/gh/feliperohdee/map-set)

## Wht fuck is this

This is a MapSet data structure, is something like:

		const mapSet = new Map('key', new Set());

but better. It takes care to create SETS automatically on set, and remove keys where the SET is empty, it inherits MAP, so all MAP method are available, obviously.

## Usage

		const MapSet = require('map-set');

		const mapSet = new MapSet('key', 'value-1', 'value-2', 'value-3'); 
		console.log(mapSet.entries());
		// { [ 'key', Set { 'value-1', 'value-2', 'value-3' } ] }

		mapSet.set('key', 'value-3', 'value-4', 'value-5');
		console.log(mapSet.entries());
		// [ 'key', Set { 'value-1', 'value-2', 'value-3', 'value-4', 'value-5' } ] }

		mapSet.set('key-1', 'value-1', 'value-2', 'value-3'); 
		console.log(mapSet.entries());
		// ['key', Set { 'value-1', 'value-2', 'value-3', 'value-4', 'value-5' } ], [ 'key-1', Set { 'value-1', 'value-2', 'value-3' } ] }
		
		console.log(mapSet.size()); // 2
		console.log(mapSet.size('key')); // 5

		mapSet.clear('key-1');
		console.log(mapSet.entries());
		// ['key', Set { 'value-1', 'value-2', 'value-3', 'value-4', 'value-5' } ] }

		mapSet.clear();
		console.log(mapSet.entries());
		// {}

		console.log(mapSet.has('key')); // true
		console.log(mapSet.has('no-key')); // false
		console.log(mapSet.has('key', 'value-1')); // true
		console.log(mapSet.has('key', 'value-5')); // false

		mapSet.delete('key');
		console.log(mapSet.entries());
		// {}

		mapSet.delete('key', 'value-2');
		console.log(mapSet.entries());
		// { [ 'key', Set { 'value-1', 'value-3' } ] }

		mapSet.delete('key', 'value-2', 'value-3');
		console.log(mapSet.entries());
		// { [ 'key', Set { 'value-1' } ] }

		mapSet.delete('key', 'value-1', 'value-2', 'value-3');
		console.log(mapSet.entries());
		// { }

		mapSet.forEach(console.log);
		// Set { 'value-1', 'value-2', 'value-3' }

		mapSet.forEach('key', console.log);
		// 'value-1'
		// 'value-2' 
		// 'value-3'

Cool, no!!?
