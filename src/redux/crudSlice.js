import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// هنا نعمل الـ async thunk للحصول على البيانات من الـ API
//  Fetch Data
export const fetchData = createAsyncThunk('crud/fetchData', async () => {
  const response = await fetch('127.0.0.1:3001/doctors/'); // استبدل بالـ API الخاص بك
  const data = await response.json();
  return data;
});


export const createData = createAsyncThunk('crud/createData', async (newData) => {
  const response = await fetch('127.0.0.1:3001/doctors/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:  JSON.stringify(newData),
    // body: JSON.stringify({
    //     data: newData, // لاحظ أن JSON.stringify هو خارج الحقل data
    //   }),
  });
  const data = await response.json();
  return data;
});

export const updateData = createAsyncThunk('crud/updateData', async (updatedData) => {
  const response = await fetch(`127.0.0.1:3001/doctors/${updatedData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
    // body: JSON.stringify({
    //     data: updatedData, // لاحظ أن JSON.stringify هو خارج الحقل data
    //   }),

});
  const data = await response.json();
  return data;
});

export const deleteData = createAsyncThunk('crud/deleteData', async (id) => {
  await fetch(`127.0.0.1:3001/doctors/${id}`, {
    method: 'DELETE',
  });
  return id;
});

const crudSlice = createSlice({
  name: 'crud',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },

  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createData.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateData.fulfilled, (state, action) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export default crudSlice.reducer;

