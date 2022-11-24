// store/pageSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
    "currentPage": 1,
    "numberOfPage": 6
};

// Cấu hình slice
export const pageSlice = createSlice({
  name: "page",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  reducers: {
    // Hàm có 2 tham số là state hiện tại và action truyền vào
    updatePage: (state, action) => {
      // Cập nhật state Pagename với giá trị truyền vào qua action (action.payload)
      // Chạy thử console.log(action) để xem chi tiết giá trị action truyền vào
      state.currentPage = action.payload.currentPage;
      state.numberOfPage = action.payload.numberOfPage;
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const { updatePage } = pageSlice.actions;

// Action là 1 hàm trả về object dạng {type, payload}, chạy thử console.log(updatePagename()) để xem chi tiết

// Hàm giúp lấy ra state mong muốn.
// Hàm này có 1 tham số là root state là toàn bộ state trong store, chạy thử console.log(state) trong nội dung hàm để xem chi tiết
export const selectPage = state => state.page;

// Export reducer để nhúng vào Store
export default pageSlice.reducer;

