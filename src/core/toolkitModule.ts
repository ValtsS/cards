import * as toolkitRaw from '@reduxjs/toolkit';

type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };

export const { createSlice, createAsyncThunk, configureStore, combineReducers } = ((
  toolkitRaw as TypeToolkitRaw
).default ?? toolkitRaw) as typeof toolkitRaw;
