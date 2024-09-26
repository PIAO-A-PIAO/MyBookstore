import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/api/store/store";
import { resetUser, selectUser } from "@/app/api/store/userSlice.js";
import { resetInbox } from "@/app/api/store/inboxSlice.js";
import { resetDrafts } from "@/app/api/store/draftsSlice";
import { resetToken } from "@/app/api/store/tokenSlice.js";
import { useLazyLogoutQuery } from "@/app/api/apiSlice.js";

const ProfileButton = () => {
  const user = useAppSelector(selectUser).user;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<any>();
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout, logoutRes] = useLazyLogoutQuery();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  const handleLogOut = async () => {
    logout(undefined);
  };

  useEffect(() => {
    if (logoutRes.isSuccess) {
      dispatch(resetToken());
      dispatch(resetUser());
      dispatch(resetInbox());
      dispatch(resetDrafts());
      router.push("/");
      router.refresh();
    }
  }, [logoutRes]);

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);
  return (
    <div className="relative w-8 h-8" ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        <img
          src={user.profile !== "" ? user.profile : "/assets/profile.jpg"}
          className="border-2 border-gray-200 rounded-full"
        />
      </button>
      {dropdownVisible && (
        <div className="absolute right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg">
          {user && (
            <>
              <div className="w-full block px-4 py-2 text-gray-800">
                {user.userName}
              </div>
              <div className="border-t border-gray-300 my-2"></div>
              <button className="w-full block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Profile Settings
              </button>
            </>
          )}
          <button
            onClick={handleLogOut}
            className="w-full block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
