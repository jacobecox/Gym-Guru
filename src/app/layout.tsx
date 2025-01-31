"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { CategoryProvider } from "./components/categoryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body className="bg-white dark:bg-black">
          <Provider store={store}>
            <CategoryProvider>{children}</CategoryProvider>
          </Provider>
        </body>
      </html>
    </>
  );
}
