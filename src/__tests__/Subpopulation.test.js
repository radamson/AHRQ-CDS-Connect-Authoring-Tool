import Subpopulation from '../components/builder/Subpopulation';
import { fullRenderComponent, createTemplateInstance } from '../helpers/test_helpers';
import { instanceTree, elementGroups } from '../helpers/test_fixtures';

let component;
let setSubpopulationName = jest.fn();
let deleteSubpopulation = jest.fn();
let addInstance = jest.fn();
let editInstance = jest.fn();
let updateInstanceModifiers = jest.fn();
let deleteInstance = jest.fn();
let saveInstance = jest.fn();
let getAllInstances = jest.fn();
const userSubpopUniqueId = 'foo123';
const treeName = 'testtree';

beforeEach(() => {
  component = fullRenderComponent(Subpopulation, {
    subpopulation: {
      id: 'And',
      name: '',
      conjunction: true,
      returnType: 'boolean',
      parameters: [ { id: 'element_name', type: 'string', name: 'Group Name' } ],
      uniqueId: userSubpopUniqueId,
      childInstances: [],
      path: '',
      subpopulationName: 'Subpopulation 1',
      expanded: true
    },
    subpopulationIndex: 0,
    setSubpopulationName,
    deleteSubpopulation,
    addInstance,
    editInstance,
    updateInstanceModifiers,
    deleteInstance,
    saveInstance,
    getAllInstances,
    createTemplateInstance,
    booleanParameters: [],
    treeName,
    showPresets: jest.fn(),
    categories: elementGroups
  });
});

test('has correct base class', () => {
  component.hasClass('subpopulation');
});

test('starts expanded if expanded property is set to true on subpop object', () => {
  expect(component.state().isExpanded).toBeTruthy();
});

test('can be expanded and collapsed via header', () => {
  const subpopHeader = component.find('.subpopulation__header');

  expect(component.state().isExpanded).toBeTruthy();
  subpopHeader.simulate('click');
  expect(component.state().isExpanded).toBeFalsy();
  subpopHeader.simulate('click');
  expect(component.state().isExpanded).toBeTruthy();
});

test('can be expanded and collapsed via button', () => {
  const subpopHeaderButton = component.find('.subpopulation__header button').at(0);

  expect(component.state().isExpanded).toBeTruthy();
  subpopHeaderButton.simulate('click');
  expect(component.state().isExpanded).toBeFalsy();
  subpopHeaderButton.simulate('click');
  expect(component.state().isExpanded).toBeTruthy();
});

test('expanded state not changed when focusing on name input', () => {
  const subpopNameInput = component.find('.subpopulation__header input').at(0);

  expect(component.state().isExpanded).toBeTruthy();
  subpopNameInput.simulate('click');
  expect(component.state().isExpanded).toBeTruthy();
});

test('hides content when collapsed', () => {
  expect(component.find('.subpopulation__logic')).toHaveLength(1);

  component.instance().collapse();

  expect(component.state().isExpanded).toBeFalsy();
  expect(component.find('.subpopulation__logic')).toHaveLength(0);
});

test('changing name calls prop func', () => {
  const subpopNameInput = component.find('.subpopulation__header input').at(0);

  subpopNameInput.node.value = 'New name';
  subpopNameInput.simulate('change');

  expect(setSubpopulationName).toHaveBeenCalled();
});

test('clicking delete calls prop func', () => {
  const subpopDeleteButton = component.find('.subpopulation__header button').at(1);

  subpopDeleteButton.simulate('click');

  expect(deleteSubpopulation).toHaveBeenCalled();
});

describe('instance functions call correct prop functions', () => {
  const genericTestObj = { foo: 'bar' };
  const testPath = 'foo';

  test('addInstance', () => {
    component.instance().addInstance(treeName, genericTestObj, testPath);
    expect(addInstance).toHaveBeenCalledWith(treeName, genericTestObj, testPath, userSubpopUniqueId);
  });

  test('editInstance', () => {
    const editingBool = false;
    component.instance().editInstance(treeName, genericTestObj, testPath, editingBool);
    expect(editInstance).toHaveBeenCalledWith(treeName, genericTestObj, testPath, editingBool, userSubpopUniqueId);
  });

  test('deleteInstance', () => {
    component.instance().deleteInstance(treeName, testPath, genericTestObj);
    expect(deleteInstance).toHaveBeenCalledWith(treeName, testPath, genericTestObj, userSubpopUniqueId);
  });

  test('saveInstance', () => {
    component.instance().saveInstance(treeName, testPath);
    expect(saveInstance).toHaveBeenCalledWith(treeName, testPath, userSubpopUniqueId);
  });

  test('getAllInstances', () => {
    component.instance().getAllInstances(treeName);
    expect(getAllInstances).toHaveBeenCalledWith(treeName, null, userSubpopUniqueId);
  });
});