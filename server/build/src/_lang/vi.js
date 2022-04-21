"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transValidations = exports.transErrors = exports.transEmail = exports.tranSuccess = void 0;
var transValidations = {
  string_empty: "Vui l\xF2ng nh\u1EADp tr\u01B0\u1EDDng n\xE0y.",
  email_incorrect: "Email ph\u1EA3i c\xF3 d\u1EA1ng example@gmail.com.",
  gender_incorrect: "Tr\u01B0\u1EDDng gi\u1EDBi t\xEDnh kh\xF4ng ch\xEDnh x\xE1c.",
  password_incorrect: "M\u1EADt kh\u1EA9u ph\u1EA3i ch\u1EE9a \xEDt nh\u1EA5t 6 k\xFD t\u1EF1.",
  password_confirm_incorrect: "M\u1EADt kh\u1EA9u nh\u1EADp l\u1EA1i kh\xF4ng ch\xEDnh x\xE1c.",
  update_username: 'Username giới hạn trong khoảng 3-17 ký tự và không được phép chứa ký tự đặc biệt.',
  update_gender: 'Giới liệu dữ tích có vấn đề, bạn là Hacker phải chăng? ',
  update_address: 'Địa chỉ giới hạn 3-30 ký tự',
  update_phone: 'Số điện thoại Việt Nam bắt đầu số 0, giới hạn trong khoảng 10-11 ký tự. ',
  keyword_find_users: 'Lõi từ khóa tìm kiếm, chỉ cho phép ký tự chữ cái và số, cho phép khoảng trống.',
  message_text_emoji_incorrect: 'Tin nhắn không hợp lệ. Đảm bảo tối thiểu 1 ký tự, tối đa 400 ký tự',
  add_new_group_users_incorrect: 'Vui vòng chọn bạn bè để thêm vào nhóm, tối thiểu 2 người',
  add_new_group_name_incorrect: 'Vui vòng nhập tên cuộc trò, giới hạn 5 - 20 ký tự'
};
exports.transValidations = transValidations;
var transErrors = {
  account_in_use: "Email \u0111\xE3 \u0111\u01B0\u1EE3c s\u1EED d\u1EE5ng!",
  account_undefined: "T\xE0i kho\u1EA3n kh\xF4ng t\u1ED3n t\u1EA1i!",
  account_removed: "T\xE0i kho\u1EA3n c\u1EE7a n\xE0y \u0111\xE3 b\u1ECB g\u1EE1 kh\u1ECFi h\u1EC7 th\u1ED1ng, n\u1EBFu tin r\u1EB1ng \u0111i\u1EC1u n\xE0y l\xE0 hi\u1EC3u nh\u1EA7m, vui l\xF2ng li\xEAn h\u1EC7 v\u1EDBi b\u1ED9 ph\u1EADn h\u1ED7 tr\u1EE3 c\u1EE7a ch\xFAng t\xF4i.",
  account_not_active: "Email \u0111\xE3 \u0111\u0103ng k\xFD nh\u01B0ng ch\u01B0a active t\xE0i kho\u1EA3n, vui l\xF2ng ki\u1EC3m tra email c\u1EE7a b\u1EA1n ho\u1EB7c li\xEAn h\u1EC7 v\u1EDBi b\u1ED9 ph\u1EADn h\u1ED7 tr\u1EE3 c\u1EE7a ch\xFAng t\xF4i.",
  token_undefined: "B\u1EA1n \u0111\xE3 x\xE1c minh t\xE0i kho\u1EA3n tr\u01B0\u1EDBc \u0111\xF3.",
  login_failed: "T\xEAn \u0111\u0103ng nh\u1EADp ho\u1EB7c m\u1EADt kh\u1EA9u kh\xF4ng ch\xEDnh x\xE1c.",
  server_error: "C\xF3 l\u1ED7i \u1EDF ph\xEDa server, vui l\xF2ng li\xEAn h\u1EC7 v\u1EDBi b\u1ED9 ph\u1EADn c\u1EE7a ch\xFAng t\xF4i \u0111\u1EC3 b\xE1o c\xE1o l\u1ED7i n\xE0y. Xin c\u1EA3m \u01A1n!",
  avatar_type: "Ki\u1EC3u file kh\xF4ng h\u01A1p l\u1EC7, ch\u1EC9 ch\u1EA5p nh\u1EADn \u1EA3nh png, jpg v\xE0 jpeg",
  avatar_size: "\u1EA2nh upload t\u1ED1i \u0111a cho ph\xE9p l\xE0 1MB",
  user_current_password_failed: 'Nhập mật khẩu cũ không chính xác',
  conversation_not_found: 'Cuộc trò chuyện không tồn tại',
  image_message_type: "Ki\u1EC3u file kh\xF4ng h\u01A1p l\u1EC7, ch\u1EC9 ch\u1EA5p nh\u1EADn \u1EA3nh png, jpg v\xE0 jpeg",
  image_message_size: "\u1EA2nh upload t\u1ED1i \u0111a cho ph\xE9p l\xE0 1MB",
  attachment_message_size: "\u1EA2nh upload t\u1ED1i \u0111a cho ph\xE9p l\xE0 1MB"
};
exports.transErrors = transErrors;
var tranSuccess = {
  userCreated: function userCreated(userEmail) {
    return "T\xE0i kho\u1EA3n ".concat(userEmail, " \u0111\xE3 \u0111\u01B0\u1EE3c t\u1EA1o, vui l\xF2ng ki\u1EC3m tra email c\u1EE7a b\u1EA1n \u0111\u1EC3 active t\xE0i kho\u1EA3n tr\u01B0\u1EDBc khi \u0111\u0103ng nh\u1EADp.");
  },
  account_actived: "K\xEDch ho\u1EA1t t\xE0i kho\u1EA3n th\xE0nh c\xF4ng, b\u1EA1n \u0111\xE3 c\xF3 th\u1EC3 \u0111\u0103ng nh\u1EADp v\xE0o \u1EE9ng d\u1EE5ng.",
  login_success: function login_success(username) {
    return "Xin ch\xE0o ".concat(username, ". Ch\xFAc b\u1EA1n m\u1ED9t ng\xE0y t\u1ED1t l\xE0nh.");
  },
  logout_success: "\u0110\u0103ng xu\u1EA5t t\xE0i kho\u1EA3n th\xE0nh c\xF4ng. H\u1EB9n g\u1EB7p l\u1EA1i b\u1EA1n!",
  avatar_update: "C\u1EADp nh\u1EADp \u1EA3nh \u0111\u1EA1i di\u1EC7n th\xE0nh c\xF4ng",
  user_info_update: "C\u1EADp nh\u1EADp th\xF4ng tin c\xE1 nh\xE2n th\xE0nh c\xF4ng",
  user_password_update: 'Cập nhập mật khẩu thành công'
};
exports.tranSuccess = tranSuccess;
var transEmail = {
  subject: "Awesome Chat: X\xE1c nh\u1EADn k\xEDch ho\u1EA1t t\xE0i kho\u1EA3n.",
  template: function template(linkVerify) {
    return "\n      <h2>B\u1EA1n nh\u1EADp \u0111\u01B0\u1EE3c email n\xE0y v\xEC \u0111\xE3 \u0111\u0103ng k\xFD t\xE0i kho\u1EA3n tr\xEAn \u1EE9ng d\u1EE5ng awesome chat.</h2>\n      <h3>Vui l\xF2ng click v\xE0o li\xEAn k\u1EBFt b\xEAn d\u01B0\u1EDBi \u0111\u1EC3 x\xE1c nh\u1EADn k\xEDch ho\u1EA1t t\xE0i kho\u1EA3n.</h3>\n      <h3><a href=\"".concat(linkVerify, "\" target=\"_blank\">").concat(linkVerify, "</a></h3>\n      <h4>N\u1EBFu tin r\u1EB1ng email n\xE0y l\xE0 nh\u1EA7m l\u1EABn, h\xE3y b\u1ECF qua n\xF3. Tr\xE2n tr\u1ECDng</h4>\n    ");
  },
  send_failed: "C\xF3 l\u1ED7i trong qu\xE1 tr\xECnh g\u1EEDi email, vui l\xF2ng li\xEAn h\u1EC7 v\u1EDBi b\u1ED9 ph\u1EADn c\u1EE7a ch\xFAng t\xF4i."
};
exports.transEmail = transEmail;