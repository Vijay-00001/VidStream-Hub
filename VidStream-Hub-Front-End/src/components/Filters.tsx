"use client";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import {
  LanguagesData,
  RateData,
  TimeData,
  YearData,
} from "@/data/Filters/FiltersData";

const Filters = (props: any) => {
  const {
    categories,
    category,
    setCategory,
    year,
    setYear,
    time,
    setTime,
    language,
    setLanguage,
    rate,
    setRate,
  } = props?.data;

  const Filter = [
    {
      value: category,
      onChange: setCategory,
      items:
        categories?.length > 0
          ? [{ title: "All Categories" }, ...categories]
          : [{ title: "No Categories found" }],
    },
    {
      value: language,
      onChange: setLanguage,
      items: LanguagesData,
    },
    {
      value: year,
      onChange: setYear,
      items: YearData,
    },
    {
      value: time,
      onChange: setTime,
      items: TimeData,
    },
    {
      value: rate,
      onChange: setRate,
      items: RateData,
    },
  ];

  return (
    <>
      <div className="grid my-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-5  bg-dry border text-dryGray border-gray-800  lg:gap-12 gap-2 rounded p-6 justify-around ">
        {Filter.map((data, index) => (
          <Listbox key={index} value={data.value} onChange={data.onChange}>
            <div className="relative">
              <Listbox.Button className="ralative w-full my-1 border border-gray-800 text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
                <span className="block truncate">{data.value.title}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ">
                  <FaAngleDown className="w-5 h-5" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-auto">
                  {data.items.map((item, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-subMain text-white" : "text-main"
                        }`
                      }
                      value={item}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-semibold" : "font-normal"
                            }`}
                          >
                            {item.title}
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FaCheck
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        ))}
      </div>
    </>
  );
};

export default Filters;
