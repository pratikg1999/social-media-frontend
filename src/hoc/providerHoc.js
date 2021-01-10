import { Provider } from "react-redux";

function providerHOC(WrappedComponent, store) {
    return function (props) {
        return (
            <Provider store={store}>
                <WrappedComponent {...props} />
            </Provider>
        )
    }
}

export default providerHOC;