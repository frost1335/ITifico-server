import moment from "moment";

export const formatter = (date, format) => {
  return moment(date).format(format ? format : "DD.MM.YYYY");
};
