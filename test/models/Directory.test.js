const Directory = require("../../src/models/Directory");

let root;

beforeEach(() => {
  root = new Directory(null, null);
});

test('Can CREATE directories at root', () => {
  root.create('fruits');
  root.create('vegetables');
  root.create('grains');
  expect(Object.keys(root.children).length).toBe(3);
});

test('Can CREATE directories within a directory', () => {
  root.create('fruits');
  root.create('fruits/apples');
  root.create('fruits/apples/fuji');
  expect(Object.keys(root.children['fruits'].children).length).toBe(1);
  expect(Object.keys(root.children['fruits'].children['apples'].children).length).toBe(1);
});

test('Can DELETE entire directories', () => {
  root.create('fruits');
  root.create('fruits/apples');
  root.delete('fruits');
  expect(Object.keys(root.children).length).toBe(0);
});

test('Can DELETE embedded directories', () => {
  root.create('fruits');
  root.create('fruits/apples');
  root.delete('fruits/apples');
  expect(Object.keys(root.children['fruits'].children).length).toBe(0);
});

test('Can\'t DELETE directories that do not exist', () => {
  const originalLog = console.log;
  console.log = jest.fn();
  root.delete('fruits/apples');
  expect(console.log).toHaveBeenCalledWith('Cannot delete fruits/apples - fruits does not exist');
  console.log = originalLog;
});

test('Can MOVE a directory into another directory', () => {
  root.create('grains');
  root.create('grains/bread');
  root.create('food');
  root.move('grains/bread', 'food');
  root.move('grains', 'food');
  root.move('food/bread', 'food/grains');
  expect(Object.keys(root.children['food'].children).length).toBe(1);
  expect(Object.keys(root.children['food'].children['grains'].children).length).toBe(1);
});

test('Can LIST out a directory\'s contents', () => {
  root.create('food');
  root.create('food/vegetables');
  root.create('food/fruits');
  root.create('food/fruits/apples');
  const list = root.list('');
  expect(list).toBe('food\n fruits\n  apples\n vegetables\n');
});
