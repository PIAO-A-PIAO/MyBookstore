export default async function Room() {


  return (
    <main className="bg-gray-50 flex flex-col w-screen h-screen items-center justify-between p-24">
      <a href="/write" className="bg-blue-600 p-4 text-white rounded-lg">
        Write letters - this is a table
      </a>
      <a className="bg-blue-600 p-4 text-white rounded-lg">
        New letters - this is an envlope on windowsill
      </a>
      <a className="bg-blue-600 p-4 text-white rounded-lg">
        Letter history/friend list - this is a shelf
      </a>
      <a className="bg-blue-600 p-4 text-white rounded-lg">
        notification - this is a wind chime
      </a>
      <a className="bg-blue-600 p-4 text-white rounded-lg">
        Supplies - this is a drawer
      </a>
      <a className="bg-blue-600 p-4 text-white rounded-lg">
        Profile/settings - this is a map
      </a>
    </main>
  );
}
