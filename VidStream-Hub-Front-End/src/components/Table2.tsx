import { RowsType } from "@/Types";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { dateFormate, shortUpperCaseId } from "./notifications/Empty";
import Image from "next/image";

const text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

//Table Rows
const Rows = ({ data, users, onEditFunction, onDeleteFunction }: RowsType) => {
  return (
    <tr key={data._id}>
      {users ? (
        //   Users
        <>
          <td className={`${text}`}>
            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
              <Image
                src={
                  data?.image
                    ? data.image
                    : "https://images.pexels.com/photos/1595655/pexels-photo-1595655.jpeg?cs=srgb&dl=pexels-vlad-che%C8%9Ban-1595655.jpg&fm=jpg"
                }
                alt={data?.fullName}
                height={500}
                width={500}
                className="h-full w-full object-cover"
              />
            </div>
          </td>
          <td className={`${text}`}>
            {data?._id ? shortUpperCaseId(data._id) : "23RJ79"}
          </td>
          <td className={`${text}`}>
            {data?.createdAt ? dateFormate(data.createdAt) : "20-07-2022"}
          </td>
          <td className={`${text}`}>
            {data?.fullName ? data.fullName : "John Doe"}
          </td>
          <td className={`${text}`}>
            {data?.email ? data.email : "jDw5P@example.com"}
          </td>
          <td className={`${text}`}>
            {data?.isDelete ? "DiActive" : "Active"}
          </td>
          <td className={`${text} float-right flex-rows m-3`}>
            {!data?.isAdmin && (
              <button
                onClick={() => onDeleteFunction(data?._id)}
                className="bg-subMain text-white rounded flex-colo w-6 h-6"
              >
                <MdDelete />
              </button>
            )}
          </td>
        </>
      ) : (
        //   categorys
        <>
          <td className={`${text} font-bold`}>
            {data?._id ? shortUpperCaseId(data._id) : "23RJ79"}
          </td>
          <td className={`${text}`}>
            {data?.createdAt ? dateFormate(data.createdAt) : "20-07-2022"}
          </td>
          <td className={`${text}`}>{data?.title ? data.title : "John Doe"}</td>
          <td className={`${text} float-right flex-rows gap-2`}>
            <button
              onClick={() => onEditFunction(data)}
              className="border border-border bg-dry flex-rows gap-2 text-border rounded px-2 py-1"
            >
              Edit <FaEdit className="text-green-500" />
            </button>
            <button
              onClick={() => onDeleteFunction(data?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <MdDelete />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

const Table2 = ({
  data,
  users,
  onEditFunction,
  onDeleteFunction,
}: RowsType) => {
  return (
    <div className="overflow-x-scroll relative w-full" key={data?._id}>
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            {users ? (
              <>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
                >
                  Id
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
                >
                  Full Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
                >
                  Account
                </th>
              </>
            ) : (
              <>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
                >
                  Id
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
                >
                  Name
                </th>
              </>
            )}
            <th
              scope="col"
              className="px-6 py-2 text-xs text-main font-semibold uppercase text-end"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data?.map((category: any) => (
            <Rows
              key={category._id}
              data={category}
              users={users}
              onEditFunction={onEditFunction}
              onDeleteFunction={onDeleteFunction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table2;
