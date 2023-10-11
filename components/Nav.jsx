"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;
  const [Provider, setProviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
      </Link>
      <div className="flex">
        <Link href="/create-prompt" className="black_btn">
          Create Prompt
        </Link>
        <button type="button" onClick={signOut} className="outline_btn ml-5">
          Sign Out
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex sm:hidden reletive">
        {isUserLoggedIn ? (
          <div>
            <Image
              src="/assets/images/logo.svg"
              width={30}
              height={30}
              className="rounded-full"
              alt="profile"
              onClick={() => settoggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropDown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    settoggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                ></button>
              </div>
            )}
          </div>
        ) : (
          <>
            {provider &&
              Object.values().map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;