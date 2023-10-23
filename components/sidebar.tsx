import React from "react";
import { useAppDispatch, useAppSelector } from "@helpers/redux.hooks";
import { HeaderTabs, headerTabs, routes } from "@helpers/routes";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@utils/firebase";
import { deleteCookie } from "cookies-next";
import { cookiesKey } from "@helpers/methods";
import { logout } from "@utils/Redux/user/user.slice";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      deleteCookie(cookiesKey.user);
      dispatch(logout);
      window.location.reload();
    });
  };
  const router = useRouter();
  const currentPath = router.asPath
    .split("/")
    .map((route) => {
      if (route.includes("%20")) {
        return route.replace("%20", " ");
      }
      return route;
    })
    .join("/");
  const NavPath =
    router.asPath.length > 1
      ? currentPath.split("/").filter(Boolean)[1]
      : router.asPath;
  return (
    <div className="flex flex-col gap-2">
      {/* category */}
      <div className="flex flex-col  gap-3 ">
        <div className="flex flex-col gap-1 justify-end">
          <Link
            href={routes.HOME}
            className={`hover:text-white hover:bg-orange-300 h-10 flex items-center px-4 ${
              NavPath === routes.HOME && "bg-orange-300 text-white"
            }`}
          >
            Home
          </Link>
          <Link
            href={user ? `${routes.MYACCOUNT}/my-account` : routes.SignIn}
            className={`hover:text-white hover:bg-orange-300 h-10 flex items-center px-4 ${
              NavPath === 'my-account' && "bg-orange-300 text-white"
            }`}
          >
            Account Overview
          </Link>
          <Link
            href={routes.ORDERS}
            className={`hover:text-white hover:bg-orange-300 h-10 flex items-center px-4 ${
              currentPath === routes.ORDERS && "bg-orange-300 text-white"
            }`}
          >
            Order
          </Link>
          <Link
            href={routes.ADDRESS}
            className={`hover:text-white hover:bg-orange-300 h-10 flex items-center px-4 ${
              currentPath === routes.ADDRESS && "bg-orange-300 text-white"
            }`}
          >
            Address
          </Link>
          <Link
            href={routes.WISHLIST}
            className={`hover:text-white hover:bg-orange-300 h-10 flex items-center px-4 ${
              currentPath === routes.WISHLIST && "bg-orange-300 text-white"
            }`}
          >
            WishList
          </Link>
          <Link
            href={`${routes.MYACCOUNT}profile`}
            className="hover:text-white hover:bg-orange-300 h-10 flex items-center px-4"
          >
            Account Setting
          </Link>
        </div>
        <div className="category flex flex-col  gap-3 mt-3 border-t border-gray-200">
          <div className="flex flex-col gap-1 ">
            {headerTabs.map((tab: HeaderTabs) => (
              <Link
                href={tab.route}
                key={tab.id}
                className={`hover:text-white hover:bg-orange-300 h-10 flex items-center px-4 w-full ${
                  currentPath === tab.route && "bg-orange-300 text-white"
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>

          {user ? (
            <div
              className="cursor-pointer hover:text-white hover:bg-orange-300 h-10 flex items-center px-4 border-t border-gray-200"
              onClick={() => handleSignOut()}
            >
              Sign out
            </div>
          ) : (
            <Link
              href={routes.SignIn}
              className={`hover:text-white hover:bg-orange-300 h-10 flex items-center px-4 ${
                currentPath === routes.SignIn && "bg-orange-300 text-white"
              }`}
            >
              Sign In
            </Link>
          )}
        </div>

        {/* user */}
      </div>
    </div>
  );
};

export default Sidebar;
