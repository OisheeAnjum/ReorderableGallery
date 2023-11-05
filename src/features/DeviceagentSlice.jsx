/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DeviceagentSlice = createSlice({
    name: 'device',
    initialState: {
        small: false,
    },
    reducers: {
        setDevice: (state, action) => {
            const { payload } = action;
            if (payload < 768) {
                state.small = true;
            } else {
                state.small = false;
            }
        },
    },
});
export const { setDevice } = DeviceagentSlice.actions;
export default DeviceagentSlice.reducer;
