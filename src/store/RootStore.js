import React, {createContext} from "react";
import useMasterdataContext from "../contexts/MasterdataContext"
import userDashboardContext from "../contexts/DashboardContext"

export const RootStoreContext = createContext(null);


const RootStore = ({children}) => {
    const masterdataContext = useMasterdataContext();
    const dashboardContext = userDashboardContext();

    return (
        <RootStoreContext.Provider
            value={{masterdataStore: masterdataContext, dashboardStore: dashboardContext}}
        >
            {children}
        </RootStoreContext.Provider>
    )

};

export default RootStore