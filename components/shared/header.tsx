import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderLogo from "/public/images/logo.svg";
import Image from "next/image";
import { headerTabs, routes } from "@helpers/routes";
import Cart from "../cart/Cart";

import { useAppDispatch, useAppSelector } from "@helpers/redux.hooks";
import { auth } from "@utils/firebase";
import { signOut } from "firebase/auth";
import { deleteCookie } from "cookies-next";
import { cookiesKey } from "@helpers/methods";
import { logout } from "@utils/Redux/user/user.slice";
import CartIcon from "../cart/CartIcon";
import { toggleCartView } from "@utils/Redux/cart/cart.slice";
import RefreshHook from "@helpers/hooks/refresh-hook";
import {
  toggleAccountBar,
  toggleSidebar,
} from "@utils/Redux/modals/modal.slice";
import MenuIcon from "/public/images/menu-icon.svg";
import Sidebar from "../sidebar";
import CloseIcon from "/public/images/icon-close.svg";
import UserIcon from "/public/images/user.svg";
import { toast } from "react-toastify";
import { clearAddress } from "@utils/Redux/address/address.slice";

const Header = () => {
  const dispatch = useAppDispatch();

  const {
    user: { user },
    cart: { hidden },
    modal: { accountBar, sidebarView },
  } = useAppSelector((state) => state);

  const { ref: sidebarRef } = RefreshHook({
    view: sidebarView,
    toggleView: toggleSidebar,
  });
  const { ref: accountBarRef } = RefreshHook({
    view: accountBar,
    toggleView: toggleAccountBar,
  });
  const { ref: cartRef } = RefreshHook({
    view: hidden,
    toggleView: toggleCartView,
  });
  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      deleteCookie(cookiesKey.user);
      dispatch(logout());
      dispatch(clearAddress());
      toast.success("Logout successful");
    });
  };
  useEffect(() => {
    // disable scroll when sidebar is open
    if (!sidebarView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [sidebarView]);
  return (
    <header className=" h-12 xs:h-20 justify-between py-4 container border-b-2  flex items-center mx-auto font-kumbh">
      <div className="flex xs:gap-20 overflow-hidden gap-4  items-center">
        <div
          className="flex lg:hidden flex-col relative w-6 h-6"
          onClick={() => dispatch(toggleSidebar())}
        >
          {sidebarView ? (
            <MenuIcon className="cursor-pointer h-6 w-6" />
          ) : (
            <CloseIcon className="cursor-pointer" />
          )}
          {/* sidebar */}

          <div
            className={`flex flex-col fixed bg-gray-100 top-[3rem] xs:top-[4rem] md:top-[5rem] h-[100vh] ${
              !sidebarView
                ? "animate-left"
                : "-translate-x-full duration-300 ease-in "
            } left-0 z-50 w-full  `}
            ref={sidebarRef}
          >
            <Sidebar />
          </div>
        </div>
        <div className="nav-item">
          <Link href="/">
            <HeaderLogo />
          </Link>
        </div>
        <div className="hidden nav-item lg:flex justify-between gap-8 font-kumbh font-medium">
          {headerTabs.map((tab) => {
            return (
              <Link
                key={tab.name}
                href={`${tab.route}`}
                className=" hover:text-Orange"
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>
      {/* mobile view */}

      {/* desktop view */}
      <div className=" nav-item flex md:w-56 justify-end flex-row-reverse items-center md:flex-row gap-4 sm:gap-6">
        <div ref={cartRef}>
          <CartIcon />
          {!hidden && (
            <div
              className={`xs:top-20 top-16 right-0 xs:right-32 absolute dropdown z-20`}
            >
              <Cart />
            </div>
          )}
        </div>
        <div ref={accountBarRef} className="acc-ref">
          {user && user !== undefined ? (
            <div
              onClick={() => dispatch(toggleAccountBar())}
              className="cursor-pointer  rounded-full border-White hidden md:block"
            >
              {user?.picture ? (
                <Image
                  src={user.picture || ""}
                  alt="Picture of the user"
                  width={60}
                  height={60}
                  className="rounded-full border-2 hover:border-Orange"
                  priority
                />
              ) : (
                // <h6 className='flex items-center hover:text-Orange '>
                //     Hi ,{user.displayName || 'My Account'}</h6>
                <div
                  className={`xs:flex  xs:w-fit xs:hover:bg-gray-200 xs:h-12 rounded-md items-center px-1 ${
                    !accountBar ? "xs:bg-gray-200 bg-none" : ""
                  }  ${user ? "text-Orange" : ""} `}
                >
                  <UserIcon
                    className={`w-7 h-6 flex items-center cursor-pointer`}
                  />
                  <h2 className="hidden md:flex xs:w-36 hover:text-Orange">
                    Hi, {user.displayName}
                  </h2>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={routes.SignIn}
              className={`text-GB  font-medium flex items-center`}
            >
              <UserIcon className="text-black cursor-pointer w-7 h-6" />
            </Link>
          )}
          {/* account modal */}
          {user && user !== undefined && !accountBar && (
            <div className="hidden absolute xs:top-32 top-16 xs:right-44 right-0 bg-white w-48 h-48 rounded-lg shadow-lg z-50 xs:block">
              <div className="">
                <div className="flex flex-col gap-2 font-medium text-Black items-start ">
                  <Link
                    href={`${routes.MYACCOUNT}/my-account`}
                    className={`${hoverStyles}`}
                    onClick={() => dispatch(toggleAccountBar())}
                  >
                    My Account
                  </Link>
                  <Link
                    href={routes.ORDERS}
                    className={`${hoverStyles}`}
                    onClick={() => dispatch(toggleAccountBar())}
                  >
                    My Orders
                  </Link>
                  <Link
                    href={routes.WISHLIST}
                    className={`${hoverStyles}`}
                    onClick={() => dispatch(toggleAccountBar())}
                  >
                    My Wishlist
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut(), dispatch(toggleAccountBar());
                    }}
                    className={`${hoverStyles} cursor-pointer border-t`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

const hoverStyles =
  "hover:text-Orange hover:bg-gray-200 w-full px-4 h-10 border-gray-200 flex items-center";
