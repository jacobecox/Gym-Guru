"use client";
import Head from "next/head";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Gym Guru</title>
      </Head>
      <html lang="en">
        <body>
          <Provider store={store}>{children}</Provider>
        </body>
      </html>
    </>
  );
}
