type Props = {
  onSort: (filter: Filter) => void;
};

export const SideBar = (props: Props) => {
  return (
    <select
      defaultValue="all"
      onChange={(e) => props.onSort(e.target.value as Filter)}
    >
      <option value="all">すべてのタスク</option>
      <option value="checked">完了したタスク</option>
      <option value="unchecked">現在のタスク</option>
      <option value="removed">ごみ箱</option>
    </select>
  );
};
