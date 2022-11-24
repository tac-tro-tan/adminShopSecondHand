// store/loginSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
    token: "",
    user: {
        role: 0,
        history: [],
        _id: "",
        cmnd: "",
        salt: "",
        hashed_password: "",
        ThongTinCaNhan: "",
        name: "",
        createdAt: "",
        updatedAt: "",
        __v: 0
    }
};

// Cấu hình slice
export const loginSlice = createSlice({
  name: "login",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  reducers: {
    // Hàm có 2 tham số là state hiện tại và action truyền vào
    updateLogin: (state, action) => {
      // Cập nhật state loginname với giá trị truyền vào qua action (action.payload)
      // Chạy thử console.log(action) để xem chi tiết giá trị action truyền vào
      state.user.role = action.payload.user.role;
      state.user.cmnd = action.payload.user.cmnd;
      state.user.name = action.payload.user.name;
      state.user.history = action.payload.user.history;
      state.user._id = action.payload.user._id;
      state.user.salt = action.payload.user.salt;
      state.user.hashed_password = action.payload.user.hashed_password;
      state.user.ThongTinCaNhan= action.payload.user.ThongTinCaNhan;
      state.user.__v = action.payload.user.__v;
      state.user.createdAt = action.payload.user.createdAt; 
      state.user.updatedAt = action.payload.user.updatedAt;
     
    }
  }
});

// Export action ra để sử dụng cho tiện.
export const { updateLogin } = loginSlice.actions;

// Action là 1 hàm trả về object dạng {type, payload}, chạy thử console.log(updateloginname()) để xem chi tiết

// Hàm giúp lấy ra state mong muốn.
// Hàm này có 1 tham số là root state là toàn bộ state trong store, chạy thử console.log(state) trong nội dung hàm để xem chi tiết
export const selectLogin = state => state.login;

// Export reducer để nhúng vào Store
export default loginSlice.reducer;

