import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  booksLoading: false,
  booksError: null,
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (url, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch books");
    }
  }
);

export const fetchBooksWithFilters = createAsyncThunk(
  "books/fetchBooksWithFilters", 
  async (urlWithFilters, {rejectWithValue}) => {
    try {
      console.log(urlWithFilters)
      const response = await axios.get(urlWithFilters);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch books");
    }
  }
)

const bookListSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearBooks: (state) => {
      state.books = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.booksLoading = true;
      state.booksError = null;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.booksLoading = false; 
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.booksError = action.payload; 
      state.booksLoading = false;
    });
    builder.addCase(fetchBooksWithFilters.pending, (state) => {
      state.booksLoading = true;
      state.booksError = null;
    });
    builder.addCase(fetchBooksWithFilters.fulfilled, (state, action) => {
      state.booksLoading = false; 
      state.books = action.payload;
    });
    builder.addCase(fetchBooksWithFilters.rejected, (state, action) => {
      state.booksError = action.payload; 
      state.booksLoading = false;
    });
  },
});

export const { clearBooks } = bookListSlice.actions; // add reducer functions

export default bookListSlice.reducer;
