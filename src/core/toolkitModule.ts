import * as toolkitRaw from '@reduxjs/toolkit';

interface ToolkitModule {
  createSlice: typeof toolkitRaw.createSlice;
  createAsyncThunk: typeof toolkitRaw.createAsyncThunk;
  configureStore: typeof toolkitRaw.configureStore;
  combineReducers: typeof toolkitRaw.combineReducers;
}

export const { createSlice, createAsyncThunk, configureStore, combineReducers }: ToolkitModule =
  toolkitRaw;
