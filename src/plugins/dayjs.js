import Vue from "vue";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
var localeData = require("dayjs/plugin/localeData");

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);

Object.defineProperties(Vue.prototype, {
  $date: {
    get() {
      return dayjs;
    }
  }
});
