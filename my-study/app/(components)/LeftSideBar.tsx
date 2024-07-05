import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
const LeftSideBar = async () => {
  const session = await getServerSession(options);
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen">
      <div className="h-full px-3 py-4 bg-gray-100">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href=""
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group"
            >
              <span className="ms-3">Home</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default LeftSideBar;
