import React, {createContext} from "react";
import useMasterdataContext from "../contexts/MasterdataContext"

export const RootStoreContext = createContext(null);


const RootStore = ({children}) => {
    const masterdataContext = useMasterdataContext();

    return (
        <RootStoreContext.Provider
            value={{masterdataStore: masterdataContext}}
        >
            {children}
        </RootStoreContext.Provider>
    )

};

export default RootStore