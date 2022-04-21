"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transValidations = exports.transErrors = exports.transEmail = exports.tranSuccess = void 0;
var transValidations = {
  password_incorrect: 'Password must contain at least 1 letter and 1 number, and at least 6 or more characters',
  email_incorrect: 'Please fill a valid email address',
  objectId_type_incorrect: 'Please fill a valid mongoose object id'
};
exports.transValidations = transValidations;
var transErrors = {
  account_in_use: "Email already in use!",
  account_undefined: "Account does not exist!",
  account_removed: "This account has been removed from the system, if you believe this is a misunderstanding, please contact our support.",
  account_not_active: "Registered email but not active account, please check your email or contact our support.",
  email_undefined: 'This email is not registered in our system.',
  login_failed: "Incorrect email or password'",
  token_undefined: "You have verified the account before.",
  user_current_password_failed: 'Incorrect old password.',
  upload_issue: 'Issue with uploading this image.',
  upload_not_supported: 'This file is not supported.',
  upload_limit_size: 'This file is too large (Max: 1MB ).',
  server_error: "There is an error on the server side, please contact our department to report this error. Thank you!"
};
exports.transErrors = transErrors;
var tranSuccess = {
  user_registered: 'Welcome! Please check your email.',
  account_actived: 'Your account has been activated, you can now sign in.',
  login_success: 'Signning success.',
  logout_success: 'Signout success.',
  reset_password_success: 'Password was updated successfully.',
  avatar_update: "Uploaded avatar successfully",
  user_info_update: "Successfully updated personal information",
  user_password_update: 'Password successfully entered',
  sendmail_reset_password_success: 'Re-send the password, please check your email.',
  upload_success: 'Upload successfully.',
  deleted_success: function deleted_success() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return "Deleted ".concat(name, " successfully.");
  },
  updated_success: function updated_success() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return "Updated ".concat(name, " successfully.");
  },
  created_success: function created_success() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return "Created ".concat(name, " successfully.");
  }
};
exports.tranSuccess = tranSuccess;
var transEmail = {
  template: function template(title, description, url, text) {
    return "\n  <html lang=\"en\">\n    <head>\n      <meta charset=\"UTF-8\" />\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n      <link\n        href=\"https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap\"\n        rel=\"stylesheet\"\n      />\n      <title>Account Activation</title>\n      <style>\n        body {\n          background-color: #333333;\n          height: 100vh;\n          font-family: \"Roboto\", sans-serif;\n          color: #fff;\n          position: relative;\n          text-align: center;\n        }\n        .container {\n          max-width: 700px;\n          width: 100%;\n          height: 100%;\n          margin: 0 auto;\n        }\n        .wrapper {\n          padding: 0 15px;\n        }\n        .card {\n          position: absolute;\n          top: 50%;\n          left: 50%;\n          transform: translate(-50%, -50%);\n          width: 100%;\n        }\n        span {\n          color: #ffc107;\n        }\n        button {\n          padding: 1em 6em;\n          border-radius: 5px;\n          border: 0;\n          background-color: hsl(45, 100%, 51%);\n          transition: all 0.3s ease-in;\n          cursor: pointer;\n        }\n        button:hover {\n          background-color: hsl(45, 70%, 51%);\n          transition: all 0.3s ease-in;\n        }\n        .spacing {\n          margin-top: 2rem;\n        }\n      </style>\n    </head>\n    <body>\n      <div class=\"container\">\n        <div class=\"wrapper\">\n          <div class=\"card\">\n            <h1>".concat(title, "</h1>\n            <p>").concat(description, "</p>\n            <a href=").concat(url, "><button>").concat(text, "</button></a>\n            <p class=\"spacing\">\n              If the button above does not work, please navigate to the link\n              provided below \uD83D\uDC47\uD83C\uDFFB\n            </p>\n            <div>").concat(url, "</div>\n          </div>\n          <div class=\"spacing\">If you believe this email is mistaken, ignore it. Best regards!</div>\n        </div>\n      </div>\n    </body>\n  </html>");
  },
  send_failed: "Sorry, there was an error in sending mail"
};
exports.transEmail = transEmail;