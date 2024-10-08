import { createAsyncThunk } from '@reduxjs/toolkit';

import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface SupportResponse {
  userId: string;
  topic: string;
  content: string;
  images: string[];
  _id: string;
  __v: number;
}

interface ApiResponse {
  message: string;
  content: SupportResponse;
}

export const setSupportSeller = createAsyncThunk<ApiResponse, object>(
  'support',
  async (newSupportData, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await $api.post<ApiResponse>(ApiRoutes.SUPPORT, newSupportData);

      if (response.status !== 201) {
        if (response.status === 400) {
          return rejectWithValue(`:: ${response.statusText} `);
        }

        return rejectWithValue(`:: ${response.statusText} `);
      }

      return response.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(`:: ${e.message}`);
      }

      return rejectWithValue('Unknown error occurred');
    }
  },
);
