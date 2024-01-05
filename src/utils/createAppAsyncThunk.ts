
import { createAsyncThunk } from '@reduxjs/toolkit'
import {AppDispatch, AppRootState} from "app/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch
  rejectValue: null
  state: AppRootState
}>()
