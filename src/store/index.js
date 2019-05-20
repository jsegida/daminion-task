/**
 * @param result {{state, action}}
 * @param field {string}
 * @param reduce {function}
 * @returns {{action, state}}
 */
const _processState = (result, [ field, reduce ]) => {
    const { state: { [field]: fieldState, ...fields }, action } = result;
    const nextFieldState = reduce(fieldState, action);

    return fieldState === nextFieldState ? result : {
        state: {
            ...fields,
            [field]: nextFieldState
        },
        action
    };
};

const createStore = reducers => {
    let _state = {};
    let _listeners = [];

    const _notify = run => run(_state);

    const dispatch = action => {
        if (action instanceof Function) {
            return action(dispatch, getState);
        }

        _state = _reducers.reduce(_processState, {
            state: _state,
            action
        }).state;

        if (process.env.NODE_ENV !== "production") {
            window.console.log("Action:", action);
            window.console.log("State:", _state);
        }

        _listeners.forEach(_notify);

        return action;
    };

    const subscribe = run => {
        _listeners = [
            ..._listeners,
            run
        ];

        return () => _listeners = _listeners.filter(listener => listener !== run);
    };

    const getState = () => _state;

    const connect = ({ mapStateToProps, mapDispatchToProps }) => create => (props, ...args) => {
        const _merge = () => ({
            ...props,
            ...mapDispatchToProps && mapDispatchToProps(dispatch),
            ...mapStateToProps && mapStateToProps(_state)
        });

        const component = create(_merge(), ...args);

        if (!(component.update && mapStateToProps)) {
            return component;
        }

        const wrappedComponent = {
            ...component,
            destroy: () => {
                _unsubscribe();
                component.destroy && component.destroy();
            }
        };

        const _unsubscribe = subscribe(() => wrappedComponent.update(_merge()));

        return wrappedComponent;
    };

    const _reducers = Object.entries(reducers);
    dispatch({});

    return {
        dispatch,
        subscribe,
        getState,
        connect
    }
};

export default createStore;
