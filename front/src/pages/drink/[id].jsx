import {
  PhotoIcon,
  PlusCircleIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import ReactStars from "react-stars";
import { Dialog } from "@headlessui/react"; // For modal

export default function EditDrink() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const loader = useLoaderData();

  const [name, setName] = useState(loader.name);
  const [description, setDescription] = useState(loader.description);
  const [image, setImage] = useState(null);

  // State for review modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = async (e) => {
    const reviewData = {
      user_name: reviewName,
      description: comment,
      rating,
    };

    try {
      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(reviewData);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:4000/api/drinks/3/reviews", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  console.log(loader);

  return (
    <>
      <form>
        <div className="space-y-12">
          <div className=" pb-2">
            <h2 className="text-base font-semibold leading-7 text-white">
              Edit Drink
            </h2>

            <div className="sm:col-span-4 mt-10">
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
                    value={name}
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

            <div className="col-span-full mt-10">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-white"
              >
                Description
              </label>
              <div className="mt-2 ">
                <textarea
                  id="about"
                  name="about"
                  placeholder="Enter Description"
                  rows={3}
                  value={description}
                  className="block w-full rounded-md border-0 py-1.5 bg-transparent text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xl focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                Write a few sentences about drink.
              </p>
            </div>
            <div className="flex justify-start gap-5 sm:max-w-xl mt-10">
              <div className="mt-1 border border-white w-[80px] h-[80px] flex items-center justify-center rounded-md">
                <label className="flex items-center cursor-pointer">
                  <PlusCircleIcon color="white" className="w-4 h-4" />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={async (e) => {
                      const myHeaders = new Headers();
                      myHeaders.append("accept", "application/json");

                      const formdata = new FormData();
                      formdata.append(
                        "file",
                        e.target.files[0],
                        e.target.files[0].name
                      );

                      const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: formdata,
                        redirect: "follow",
                      };

                      const response = await fetch(
                        `http://localhost:4000/api/drinks/${loader.id}/pictures`,
                        requestOptions
                      );
                      const img = await response.json();
                      navigate(`/drink/${loader.id}`, { replace: true });
                    }}
                  />
                </label>
              </div>
              {loader.Pictures.map((data) => {
                return (
                  <div
                    key={data.id}
                    className="mt-1 border border-white w-[80px] h-[80px] rounded-md relative"
                  >
                    <div
                      onClick={async () => {
                        const myHeaders = new Headers();
                        myHeaders.append("accept", "*/*");

                        const requestOptions = {
                          method: "DELETE",
                          headers: myHeaders,
                        };

                        await fetch(
                          `http://localhost:4000/api/drinks/${loader.id}/pictures/${data.id}`,
                          requestOptions
                        );

                        navigate(`/drink/${loader.id}`, { replace: true });
                      }}
                      className="cursor-pointer w-full z-10 flex justify-end"
                    >
                      <TrashIcon color="red" className="w-3 h-3 absolute m-1" />
                    </div>
                    <img
                      className="h-[80px] bg- rounded-md"
                      width={"100%"}
                      src={`http://localhost:4000/${data.path}`}
                      alt="drink"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 sm:max-w-xl">
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

                navigate("/");
              } catch (error) {}
            }}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>

          {/* Button to open the review modal */}
          <button
            type="button"
            onClick={() => setIsReviewModalOpen(true)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Write a Review
          </button>
        </div>
      </form>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <Dialog
          open={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Panel className="max-w-lg w-full bg-gray-800 p-6 rounded-md shadow-lg">
              <Dialog.Title className="text-lg font-bold text-white">
                Write a Review
              </Dialog.Title>

              <form onSubmit={handleReviewSubmit}>
                <div className="mt-4">
                  <label className="block text-sm font-medium leading-6 text-white">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-transparent text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium leading-6 text-white">
                    Comment
                  </label>
                  <textarea
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-transparent text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment..."
                  ></textarea>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium leading-6 text-white">
                    Rating
                  </label>
                  <ReactStars
                    count={5}
                    size={24}
                    color2={"#ffd700"}
                    value={rating}
                    onChange={(newRating) => setRating(newRating)}
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="mr-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                    onClick={() => setIsReviewModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReviewSubmit}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
}
