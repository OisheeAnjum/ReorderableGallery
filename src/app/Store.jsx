import { configureStore } from '@reduxjs/toolkit';
import DeviceagentSlice from '../features/DeviceagentSlice';

const Store = configureStore({
    reducer: {
        device: DeviceagentSlice,
    },
});
export default Store;
