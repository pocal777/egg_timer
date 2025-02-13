import { AiFillApple, AiOutlineSearch, AiOutlineWifi } from 'react-icons/ai';

import EggTimer from '~/egg_timer';

function getPolandDateTime() {
  const currentDate = new Date();
  const weekday = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    timeZone: 'Europe/Warsaw',
  });
  const month = currentDate.toLocaleDateString('en-US', {
    month: 'short',
    timeZone: 'Europe/Warsaw',
  });
  const day = currentDate.toLocaleDateString('en-US', {
    day: 'numeric',
    timeZone: 'Europe/Warsaw',
  });
  const time = currentDate
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Europe/Warsaw',
    })
    .toUpperCase();

  return `${weekday} ${month} ${day} ${time}`;
}

export default function App() {
  const dateTime = getPolandDateTime();

  return (
    <div className="w-full h-screen flex flex-col antialiased text-sm text-black tracking-tight bg-[url('/bg.jpeg')] bg-cover bg-center">
      <header className="px-2 bg-white/30 backdrop-blur-sm z-50">
        <div className="h-6.5 flex items-center justify-between">
          <nav className="h-full flex items-center">
            <button className="h-full px-2.5 rounded-md hover:bg-black/5">
              <AiFillApple className="size-4.5" />
            </button>
            <button className="h-full px-2.5 rounded-md font-bold hover:bg-black/5 hidden lg:block">
              Finder
            </button>
            <button className="h-full px-2.5 rounded-md hover:bg-black/5 hidden lg:block">
              File
            </button>
            <button className="h-full px-2.5 rounded-md hover:bg-black/5 hidden lg:block">
              Edit
            </button>
            <button className="h-full px-2.5 rounded-md hover:bg-black/5 hidden lg:block">
              View
            </button>
            <button className="h-full px-2.5 rounded-md hover:bg-black/5 hidden lg:block">
              Go
            </button>
            <button className="h-full px-2.5 rounded-md hover:bg-black/5 hidden lg:block">
              Window
            </button>
            <button className="h-full px-2.5 rounded-md hover:bg-black/5 hidden lg:block">
              Help
            </button>
          </nav>
          <nav className="h-full flex items-center">
            {/* TODO: 스페셜키 - 호버 또는 클릭하면 사진 나오게 */}
            <button className="h-full px-2.5 rounded-md hover:bg-black/5 hidden lg:block">
              Misio Pysio ❤️
            </button>
            <button className="h-full px-2.5 rounded-md hover:bg-black/5 hidden lg:block">
              <AiOutlineWifi className="size-4.5" />
            </button>
            <button className="h-full px-2.5 rounded-md hover:bg-black/5 hidden lg:block">
              <AiOutlineSearch className="size-4.5" />
            </button>
            <button className="h-full px-2.5 rounded-md hover:bg-black/5">
              {dateTime}
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-2 px-6" />
      <footer className="w-full flex justify-center mb-2 z-50">
        <div className="px-3 h-14 flex items-center gap-x-2.5 bg-white/50 rounded-lg">
          <div className="size-10 bg-[url('/finder.png')] bg-cover bg-center transition-transform duration-100 ease-in-out hover:scale-110 hover:cursor-pointer rounded-md" />
          <div className="size-10 bg-[url('/app_store.png')] bg-cover bg-center transition-transform duration-100 ease-in-out hover:scale-110 hover:cursor-pointer rounded-md" />
          <EggTimer />
        </div>
      </footer>
    </div>
  );
}
