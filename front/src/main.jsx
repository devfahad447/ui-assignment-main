import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import CreateDrink from "./pages/drink";
import Drinks from "./pages/drinks";
import DrinkDetail from "./pages/drink-detail/[id]";
import EditDrink from "./pages/drink/[id]";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Drinks />,
        loader: async ({ request }) => {
          const myHeaders = new Headers();
          myHeaders.append("accept", "application/json");

          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };

          const response = await fetch(
            "http://localhost:4000/api/drinks?offset=0&length=10",
            requestOptions
          );

          return response.json();
        },
        action: async ({ request }) => {
          if (request.method === "POST") {
            const data = await request.json();

            const myHeaders = new Headers();
            myHeaders.append("accept", "application/json");

            const requestOptions = {
              method: "GET",
              headers: myHeaders,
              redirect: "follow",
            };

            const response = await fetch(
              `http://localhost:4000/api/drinks?${data.filter}`,
              requestOptions
            );

            return await response.json();
          } else {
            const data = await request.json();

            const myHeaders = new Headers();
            myHeaders.append("accept", "*/*");

            const requestOptions = {
              method: "DELETE",
              headers: myHeaders,
              redirect: "follow",
            };

            return await fetch(
              `http://localhost:4000/api/drinks/${data.id}`,
              requestOptions
            );
          }

          // return null
        },
      },
      {
        path: "/drink",
        children: [
          {
            path: "/drink/:id",
            element: <EditDrink />,
            loader: async ({ request }) => {
              const myHeaders = new Headers();
              myHeaders.append("accept", "application/json");

              const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
              };

              return await fetch(
                `http://localhost:4000/api/drinks/${
                  request.url.split("/drink/")[1]
                }`,
                requestOptions
              );
            },
          },
          {
            path: "/drink",
            element: <CreateDrink />,
            action: async ({ request }) => {
              const myHeaders = new Headers();
              myHeaders.append("accept", "application/json");
              myHeaders.append("Content-Type", "application/json");

              const raw = JSON.stringify(await request.json());

              const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              return await fetch(
                "http://localhost:4000/api/drinks",
                requestOptions
              ).then((res) => res.json());
            },
          },
        ],
        action: async ({ request }) => {
          const data = await request.json();
          const myHeaders = new Headers();
          myHeaders.append("accept", "application/json");
          myHeaders.append("Content-Type", "application/json");

          const raw = JSON.stringify(data);

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch("http://localhost:4000/api/drinks", requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
        },
      },
      {
        path: "/drink-detail/:id",
        element: <DrinkDetail />,
        loader: async ({ request }) => {
          const myHeaders = new Headers();
          myHeaders.append("accept", "application/json");

          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };

          return await fetch(
            `http://localhost:4000/api/drinks/${
              request.url.split("/drink-detail/")[1]
            }`,
            requestOptions
          );
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
