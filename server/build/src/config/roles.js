"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roles = exports.roleRights = void 0;
var allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers']
};
var roles = Object.keys(allRoles);
exports.roles = roles;
var roleRights = new Map(Object.entries(allRoles));
exports.roleRights = roleRights;