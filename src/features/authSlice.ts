import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  username: string | null;
  accessToken: string | null;
  userId: string | null;
  userPicture: string | null;
  userEmail: string | null;
}

const initialState: AuthState = {
  username: null,
  accessToken: null,
  userId: null,
  userPicture: null,
  userEmail: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<AuthState>) {
      return { ...state, ...action.payload };
    },
    updateProfile(state, action: PayloadAction<{ username?: string; userPicture?: string }>) {
      if (action.payload.username) {
        state.username = action.payload.username;
      }
      if (action.payload.userPicture) {
        state.userPicture = action.payload.userPicture;
      }
    },
    clearAuthState() {
      return initialState
    }

  }
});

export const { setAuthState, updateProfile, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
