import Star from "../ui/StarIcon";

export default function Rating({
  rating,
  style,
}: {
  rating: number;
  style?: string;
}) {
  return (
    <div
      className={`flex w-12 bg-gray-600 rounded-xl py-[2px] px-1 bg-opacity-85 justify-center items-center gap-1 text-sm text-white ${style}`}
    >
      <Star color="#FFC53D" />
      <p>{rating}</p>
    </div>
  );
}
