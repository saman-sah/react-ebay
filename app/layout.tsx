import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";

import "./globals.css";
import UserProvider from './context/user'
import CartProvider from './context/cart'

import { ReactNodeProps, MetaDataType } from './types'

export const metadata: MetaDataType = {
  title: "Ebay App",
  description: "Ebay clone",
};

export default function RootLayout({ children }: ReactNodeProps) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <UserProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
