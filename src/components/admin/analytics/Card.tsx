import Image from "next/image";
import more from "@/assets/more.png";

const UserCard = ({ type, count }: { type: string; count: number }) => {
  return (
    <div className="rounded-2xl odd:bg-green-300 even:bg-red-300 p-4 flex-1 min-w-[130px] ">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src={more} alt="more" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{count}</h1>
      <h2 className="capitalize text-lg font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
