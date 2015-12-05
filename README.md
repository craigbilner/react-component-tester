# react component tester

because testing components with shallow rendering is fantastic...but can be a bit of a pain and other testing libraries focus on finding components rather than providing an opinionated way of testing them, including their state.

# requirements

* test a component quickly (~5ms per test)
* test the style of components easily
* test the props of child components easily
* test various "flavours" of props succinctly in a consistent uniform manner
* find child components easily in a non-brittle manner
* test prop wire-up on smart components
* test changes of state of smart components
* abstract away from the react components themselves and their API

# usage

a component system that builds a basic responsive postcard can be found in the tests directory with example usage (which also self tests the library)

## flavours

often you want to test how components are rendered with different prop values. this tester allows the addition of "flavours" to make the test code more terse

to create a tester, run create and pass in the component under test to "be used"

    const tester = ReactTester.create().use(Address);

then add a flavour which takes a name and a props object

    const NO_ADDRESS = tester.addFlavour('NO_ADDRESS', {
      addressee: 'Mr Robert Smith',
    });

then the flavour can be tested on, here the NONE flavour's type is checked

    const actual = NONE.type;
    const expected = 'div';
    assert.deepEqual(actual, expected);

## methods

### .countComponents(Component{ReactComponent}) => count{int}

takes a react component and returns the number of times it appears in the rendered tree for the component under test

here the THREE_LINES flavour is tested for the number of AddressLine components it would render if given three lines of address

    it('render four address lines if there are three lines in the given address', () => {
        const actual = THREE_LINES.countComponents(AddressLine);
        const expected = 4;

        assert.deepEqual(actual, expected);
    });

### .findChild(path{string}) => child{ReactComponent}

takes a zero based decimal delimited string path and returns the resulting rendered component. this will make your tests more brittle to DOM changes but can come in handy

here the first child is found. if we wanted the second child of the third child of the fourth child we would pass "3.2.1"

    const value = NOTHING.findChild('0');
    const actual = typeof value;
    const expected = 'undefined';

    assert.deepEqual(actual, expected);

### .findComponents(Component{ReactComponent}) => [Component{ReactComponent}]

takes a react component and returns an array of all child rendered components of that type

here we find all AddressLine components for the NO_ADDRESS flavour, take the first one and check that it is the addressee

    const addressee = NO_ADDRESS.findComponents(AddressLine)[0];
    const actual = addressee.props.text;
    const expected = 'Mr Robert Smith';

    assert.deepEqual(actual, expected);

### .getState() => state{object}

returns the current state of the given component flavour. resetState should be run after each test to ensure tests do not collide

here we fire the click function given to the dumb component and confirm that the smart component's state is updated correctly

    NONE.component.props.onClick();

    const actual = NONE.getState().type;
    const expected = stampTypes.FIRST_CLASS;

    assert.deepEqual(actual, expected);

### .propFunc(propName{string}), .mapsTo(methodName{string}) => isMapped{boolean}

propFunc takes a string which is the prop of a dumb component to which you are passing a function

mapTo takes a string which maps to the method on the smart component class

the returned value will be a boolean indicating if the given prop function maps to the expected class method

here we test that the stamp dumb component was correctly given the smart component's handleOnClick method

    const isMapped =
          NONE
            .component
            .propFunc('onClick')
            .mapsTo('handleOnClick');

    assert(isMapped);

### .resetState()

returns the state of the flavour of the component under test to the initial state

### .teardown() => {ReactComponentTester}

If for any reason you need to restore spies placed on a component as part of set up you can use the teardown method. Returns the tester.

    const tester = ReactTester.create().use(Address);
    // Do stuff...
    tester.teardown();

## properties

### component{renderedReactComponent}

the rendered component that is under test

### props{object}

the props of the rendered component will be returned for each component found

### style{object}

for ease of use, the style prop is placed on each component too

### type{componentType}

each returned component will have a type

### value{string}

if a component doesn't have any children, it's content will be added as the value property
