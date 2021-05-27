import React, {createContext} from "react";
import useVppContext from "../contexts/VppContext"

export const RootStoreContext = createContext(null);

/**
 * Bildet den Provider des Zustandes der Benutzeroberfläche ab
 * @param children
 * @returns {*}
 * @constructor
 */
const RootStore = ({children}) => {
    const vppContext = useVppContext();

    return (
        <RootStoreContext.Provider
            value={{vppStore: vppContext}}
        >
            {children}
        </RootStoreContext.Provider>
    )

};

export default RootStore