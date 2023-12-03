import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import Root from "./page/Root";
import HomePage from "./page/HomePage";
import InfoPage from "./page/InfoPage";
import WritePage from "./page/WritePage";
import BookPage from "./page/BookPage";
import BoardPage from "./page/BoardPage";
import { queryClient } from "./util/http";
import BookDetailPage from "./page/BookDetailPage";
import BoardDetailPage from "./page/BoardDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "introduce", element: <InfoPage /> },
      { path: "write", element: <WritePage /> },
      { path: "book", element: <BookPage /> },
      { path: "board", element: <BoardPage /> },
      { path: "book/:id", element: <BookDetailPage /> },
      { path: "board/:id", element: <BoardDetailPage /> },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
