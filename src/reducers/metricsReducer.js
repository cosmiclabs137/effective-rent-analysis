export const metricsReducer = (metrics, action) => {
    switch (action.type) {
        case "add": {
            // return metrics.map((metric) =>
            //     metric.id !== action.value.id ? metric : action.value
            // );
            return [...metrics, action.value];
        }
        case "update": {
            return metrics.map((metric) =>
                metric.id === action.value.id ? action.value : metric
            );
        }

        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
};
