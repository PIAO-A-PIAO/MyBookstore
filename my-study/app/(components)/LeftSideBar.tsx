import React from 'react';

const LeftSideBar: React.FC = () => {
  return (
    <aside className="flex min-w-fit h-screen">
      <div className="h-full bg-gray-100 px-4 divide-y">
        <a href="/" className="flex p-4 pr-8 items-center gap-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold">
            My Study
          </span>
        </a>
        <ul className="space-y-2 py-2 font-medium">
          <SidebarButton icon="/assets/home.svg" name="Home" uri="/" />
          <SidebarButton icon="/assets/react.svg" name="My Tree Hole" uri="/treehole" />
          <SidebarButton icon="/assets/react.svg" name="Game" uri="/" />
          <SidebarButton icon="/assets/react.svg" name="Game" uri="/" />
          <SidebarButton icon="/assets/react.svg" name="Game" uri="/" />
        </ul>
      </div>
    </aside>
  );
};

const SidebarButton = ({
  icon,
  name,
  uri,
}: {
  icon: string;
  name: string;
  uri: string;
}) => {
  return (
    <li>
      <a
        href={uri}
        className="flex min-w-fit items-center p-4 text-gray-900 rounded-lg hover:bg-gray-200 group"
      >
        <img src={icon} alt={name} className="h-6 w-6" />
        <span className="ml-3">{name}</span>
      </a>
    </li>
  );
};

export default LeftSideBar;
