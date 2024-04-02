export default function Select({
  options,
  defaultValue,
  style,
  handleChange,
}: {
  options: string[];
  defaultValue: string;
  style?: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <select
      name="category"
      id="category"
      className={`p-2 bg-gray-200 rounded-sm text-gray-700 outline-none capitalize ${style}`}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        handleChange(e.currentTarget.value)
      }
    >
      <option value={""}>{defaultValue}</option>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
