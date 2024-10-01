import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import {
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
  useRevalidator,
  useSubmit,
} from "react-router-dom";

function Drinks() {
  const submit = useSubmit();
  const drinks = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();
  const location = useLocation();
  const revalidate = useRevalidator();

  const [drinkList, setDrinkList] = useState([]);

  const [filterOption, setFilterOption] = useState({
    offset: 0,
    name: null,
    description: null,
    minRating: null,
    maxRating: null,
    sorting: null,
    order: null,
    length: 10,
  });

  const applyFilter = async () => {
    let filter = `offset=${filterOption.offset}&length=${filterOption.length}`;

    if (filterOption.name && filterOption.name.length > 0)
      filter += `&name=${filterOption.name}`;
    if (filterOption.description && filterOption.description.length > 0)
      filter += `&description=${filterOption.description}`;
    if (filterOption.minRating && filterOption.minRating.length > 0)
      filter += `&minRating=${filterOption.minRating}`;
    if (filterOption.maxRating && filterOption.maxRating.length > 0)
      filter += `&maxRating=${filterOption.maxRating}`;
    if (filterOption.sorting && filterOption.sorting.length > 0)
      filter += `&sort=${filterOption.sorting}`;
    if (filterOption.order && filterOption.order.length > 0)
      filter += `&desc=${filterOption.order}`;

    console.log(filter);

    await submit(
      { filter },
      {
        method: "POST",
        action: "/",
        encType: "application/json",
      }
    );
  };

  useEffect(() => {
    setDrinkList(actionData?.items);
  }, [actionData]);

  useEffect(() => {
    setDrinkList(drinks?.items);
  }, [drinks]);

  useEffect(() => {
    revalidate.revalidate();
  }, [location.pathname]);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-2  border-b border-gray-500">
        <input
          onChange={(e) =>
            setFilterOption({ ...filterOption, name: e.target.value })
          }
          className="rounded-md bg-transparent text-white"
          placeholder="name"
        />
        <input
          className="rounded-md bg-transparent text-white"
          placeholder="description"
          onChange={(e) =>
            setFilterOption({ ...filterOption, description: e.target.value })
          }
        />
        <input
          type="number"
          className="rounded-md bg-transparent text-white"
          placeholder="min rate"
          onChange={(e) =>
            setFilterOption({ ...filterOption, minRating: e.target.value })
          }
        />
        <input
          type="number"
          className="rounded-md bg-transparent text-white"
          placeholder="max rate"
          onChange={(e) =>
            setFilterOption({ ...filterOption, maxRating: e.target.value })
          }
        />
        <select
          className="rounded-md text-white bg-transparent"
          placeholder="sort"
          onChange={(e) => {
            setFilterOption({ ...filterOption, sort: e.target.value });
          }}
        >
          <option
            className="bg-[#001F3F] focus:bg-slate-400 text-white"
            value="select"
            hidden
          >
            select
          </option>
          <option
            className="bg-[#001F3F] focus:bg-slate-400 text-white"
            value="name"
          >
            Name
          </option>
          <option
            className="bg-[#001F3F] focus:bg-slate-400 text-white"
            value="description"
          >
            Description
          </option>
        </select>
        <select
          className="rounded-md text-white bg-transparent"
          placeholder="order"
          onChange={(e) => {
            setFilterOption({ ...filterOption, order: e.target.value });
          }}
        >
          <option
            className="bg-[#001F3F] focus:bg-slate-400 text-white"
            value="select"
            hidden
          >
            select
          </option>
          <option
            className="bg-[#001F3F] focus:bg-slate-400 text-white"
            value={true}
          >
            Assending
          </option>
          <option
            className="bg-[#001F3F] focus:bg-slate-400 text-white"
            value={false}
          >
            Desending
          </option>
        </select>
        <div className="flex col-span-full justify-end w-full px-2 py-3">
          <button
            onClick={applyFilter}
            className="bg-transparent rounded-md border px-2 py-2 text-white text-[12px] border-indigo-600 hover:bg-blue-500"
          >
            Apply Filter
          </button>
        </div>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-2 mt-6 w-full">
        {drinkList?.map((drink, index) => {
          return (
            <div
              key={drink.id}
              className="border border-gray-500 p-4 rounded-md"
            >
              <div className="flex justify-center relative">
                <div className="absolute z-[1] flex justify-end w-full p-2 gap-2">
                  <TrashIcon
                    onClick={() => {
                      submit(drink, {
                        action: "/",
                        method: "DELETE",
                        encType: "application/json",
                      });
                    }}
                    color="red"
                    className="w-5 h-5 cursor-pointer"
                  />
                  <PencilSquareIcon
                    onClick={() => {
                      navigate(`/drink/${drink.id}`);
                    }}
                    className="w-5 h-5 text-indigo-700 cursor-pointer"
                  />
                </div>
                <img
                  className="w-full h-[250px] z-0 rounded-md bg-slate-500 object-contain"
                  src={
                    drink.pictures?.[0].path
                      ? drink.pictures?.[0].path
                      : "/beer.jfif"
                  }
                  alt=""
                />
              </div>
              <p className="font-bold text-[20px] mt-2 text-white">
                {drink.name}
              </p>
              <p className="font-normal text-[12px] mt-1 text-gray-400">
                {drink.description}
              </p>
              <div className="flex col-span-full justify-start w-full py-3">
                <button
                  onClick={() => {
                    navigate(`drink-detail/${drink.id}`);
                  }}
                  className="bg-transparent rounded-md border px-5 py-2 text-white font-semibold text-[14px] border-indigo-600 hover:bg-blue-500"
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>
  
    </div>
  );
}

export default Drinks;
