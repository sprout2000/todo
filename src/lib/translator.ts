export const translator = (arg: Filter) => {
  switch (arg) {
    case "all":
      return "すべてのタスク";
    case "unchecked":
      return "現在のタスク";
    case "checked":
      return "完了したタスク";
    case "removed":
      return "ごみ箱";
    default:
      return "TODO";
  }
};
