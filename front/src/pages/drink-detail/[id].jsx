import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import ReactStars from "react-stars";

export default function DrinkDetails() {
  const {
    id,
    name,
    description,
    createdAt,
    reviewCount,
    reviewAverageRating,
    Pictures,
  } = useLoaderData();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const validate = useRevalidator();

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

      fetch(
        `http://localhost:4000/api/drinks/${id}/reviews`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

      validate.revalidate();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="max-w-4xl p-6 text-white rounded-lg shadow-lg">
      {/* Drink Info Section */}
      <div className="border-b border-gray-700 pb-6">
        <h2 className="text-4xl font-bold mb-3">{name}</h2>
        <p className="text-sm text-gray-400">
          Added on {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="mt-4 text-lg text-gray-200 leading-relaxed">
          {description}
        </p>

        {/* Review Information */}
        <div className="mt-6 flex items-center">
          <div className="flex items-center">
            {reviewAverageRating ? (
              <>
                <StarIcon className="w-6 h-6 text-yellow-500" />
                <span className="ml-2 text-2xl font-bold">
                  {reviewAverageRating.toFixed(1)}
                </span>
              </>
            ) : (
              <span className="text-lg text-gray-400">No ratings yet</span>
            )}
          </div>
          <span className="ml-4 text-sm text-gray-400">
            {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>

      {/* Drink Pictures Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Pictures</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Pictures.map((picture) => (
            <div
              key={picture.id}
              className="relative border border-gray-600 rounded-lg overflow-hidden"
            >
              <img
                src={`http://localhost:4000/${picture.path}`}
                alt={picture.name}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 flex flex-col items-center md:flex-row md:justify-between">
        <button
          onClick={() => {
            setIsReviewModalOpen(!isReviewModalOpen);
          }}
          className="w-full md:w-auto bg-indigo-600 px-6 py-2 rounded-md text-lg font-semibold text-white hover:bg-indigo-500 transition duration-200"
        >
          Add Your Review
        </button>
        {/* <button className="mt-4 md:mt-0 w-full md:w-auto bg-red-600 px-6 py-2 rounded-md text-lg font-semibold text-white hover:bg-red-500 transition duration-200">
          Delete Drink
        </button> */}
      </div>

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
    </div>
  );
}
