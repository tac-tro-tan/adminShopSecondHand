import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {
    // chưa login thì đéo vô được trang con được protected bọc lại nhé
    if (!isLoggedIn) {
        return <Navigate to="/dangnhap" replace />;
    }
    return children;
};
export default Protected;