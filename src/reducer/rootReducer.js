import { combineReducers } from "@reduxjs/toolkit";

import authSlices from "../Sciles/auth";

const rootReducer = combineReducers({
    auths:authSlices
})

export default rootReducer