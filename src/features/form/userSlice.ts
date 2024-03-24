import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSlice {
    userId: string | null;
    userToken: string | null;
}

const initialState: UserSlice = {
    userId: null,
    userToken: null,
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserId(state, action: PayloadAction<null | string>) {
            state.userId = action.payload;
        },
        setUserToken(state, action: PayloadAction<null | string>) {
            state.userToken = action.payload;
        }
    }
});

export const { setUserId, setUserToken } = userSlice.actions;
