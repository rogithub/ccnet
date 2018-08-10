import { KoBinder } from "../valiko";
import Model = require("./model");

$(function () {
    KoBinder.bind($("#model"), new Model("Rodrigo", "Jimenez"));
})