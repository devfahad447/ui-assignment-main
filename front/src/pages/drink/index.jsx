import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate, useRevalidator, useSubmit } from "react-router-dom";

export default function CreateDrink() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const submit = useSubmit();
  const navigate = useNavigate();
  const revalidator = useRevalidator(); // Import the revalidator

  return (
    <form>
      <div className="space-y-12">
        <div className=" pb-2">
          <h2 className="text-base font-semibold leading-7 text-white">
            Create Drink
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="Your Name"
                className="block text-sm font-medium leading-6 text-white"
              >
                Drink
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xl">
                  <input
                    id="Drink"
                    name="Drink"
                    type="text"
                    placeholder="Drink"
                    autoComplete="Drink"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-white"
              >
                Description
              </label>
              <div className="mt-2 sm:max-w-xl">
                <textarea
                  id="about"
                  name="about"
                  placeholder="Enter Description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 bg-transparent text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                Write a few sentences about drink.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();

            const data = { name, description };

            try {
              await submit(data, {
                method: "post",
                action: "/drink",
                encType: "application/json",
              });
              revalidator.revalidate(); // Trigger loader to re-fetch data
            } catch (error) {
            } finally {
              navigate("/")
              // window.location.reload();
            }
          }}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
