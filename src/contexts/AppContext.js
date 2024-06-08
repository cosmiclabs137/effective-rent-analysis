import { DealsContext, DealsDispatchContext } from "./DealsContexts";
import { MetricsContext, MetricsDispatchContext } from "./MetricsContext";

const AppContext = ({
    children,
    deals,
    dealsDispatch,
    metrics,
    metricsDispatch,
}) => {
    return (
        <DealsContext.Provider value={deals}>
            <DealsDispatchContext.Provider value={dealsDispatch}>
                <MetricsContext.Provider value={metrics}>
                    <MetricsDispatchContext.Provider value={metricsDispatch}>
                        {children}
                    </MetricsDispatchContext.Provider>
                </MetricsContext.Provider>
            </DealsDispatchContext.Provider>
        </DealsContext.Provider>
    );
};

export default AppContext;
