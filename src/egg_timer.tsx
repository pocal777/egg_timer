import { useRef, useState } from 'react';

const OPTIONS = [
  {
    label: 'Soft Boiled',
    picture: '/soft_boiled.png',
    time: 360,
  },
  {
    label: 'Medium Boiled',
    picture: '/medium_boiled.png',
    time: 480,
  },
  {
    label: 'Hard Boiled',
    picture: '/hard_boiled.png',
    time: 600,
  },
];

function formatTime(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

export default function EggTimer() {
  const [show, setShow] = useState(false);
  const [option, setOption] = useState(OPTIONS[0]);
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(OPTIONS[0].time);
  const timeRef = useRef<number | null>(null);
  const alarmRef = useRef<HTMLAudioElement>(null);

  function playAlarm() {
    alarmRef.current?.play();
  }

  function stopAlarm() {
    alarmRef.current?.pause();
  }

  return (
    <>
      <button
        type="button"
        className="size-10 bg-[url('/egg_timer.png')] bg-cover bg-center bg-white transition-transform duration-100 ease-in-out hover:scale-110 hover:cursor-pointer rounded-md"
        onClick={() => setShow(true)}
      />
      {show && (
        <div className="fixed w-full h-full flex items-center justify-center top-0 left-0 -z-10">
          <div className="w-96 border border-yellow-600 bg-yellow-300 rounded-md select-none animate-open">
            <div className="py-2 px-3 flex items-center border-b border-yellow-600 gap-x-1">
              <button
                type="button"
                className="size-3 rounded-full bg-red-500 hover:cursor-pointer"
                onClick={() => setShow(false)}
              />
              <button
                type="button"
                className="size-3 rounded-full bg-amber-500 hover:cursor-pointer"
              />
              <button
                type="button"
                className="size-3 rounded-full bg-green-500 hover:cursor-pointer"
              />
              <h2 className="ml-2 font-bold">Egg Timer</h2>
            </div>
            <div className="h-96 flex items-center justify-center">
              <div className="size-86 flex flex-col gap-y-2 bg-yellow-200 border-2 border-dotted border-yellow-600 rounded-md p-2">
                <div className="mt-2 h-10 w-full text-center">
                  <h2 className="text-lg font-semibold">
                    What are you making today?
                  </h2>
                </div>
                <div className="w-full flex items-center justify-center gap-x-4">
                  {OPTIONS.map(({ picture, label, time }) => {
                    const isSelected = option.label === label;
                    return (
                      <button
                        key={label}
                        className={`flex flex-col items-center gap-y-2 hover:opacity-100  ${
                          isSelected
                            ? ''
                            : 'opacity-70 hover:cursor-pointer group'
                        }`}
                        onClick={() => {
                          stopAlarm();
                          if (timeRef.current) {
                            clearInterval(timeRef.current);
                          }
                          setOption({ picture, label, time });
                          setTime(time);
                          setStart(false);
                        }}
                      >
                        <img
                          src={picture}
                          alt={label}
                          className="h-24 w-20 group-hover:animate-bounce"
                        />
                        <div
                          className={`font-semibold bg-yellow-50 text-center rounded-md py-1 px-2 text-xs border border-yellow-300 group-hover:bg-yellow-300 transition-colors ease-in-out duration-100 ${
                            isSelected && 'bg-yellow-300'
                          }`}
                        >
                          {label}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex-1 flex items-center gap-x-4">
                  <time className="flex-1 text-5xl text-center font-medium">
                    {formatTime(time)}
                  </time>
                  <div className="flex flex-col gap-y-2 w-28">
                    {start ? (
                      <button
                        className="bg-rose-300 rounded-md font-medium hover:cursor-pointer hover:opacity-90 py-2 border border-rose-400"
                        onClick={() => {
                          if (start) {
                            stopAlarm();
                            clearInterval(timeRef.current!);
                            setStart(false);
                          }
                        }}
                      >
                        Stop
                      </button>
                    ) : (
                      <button
                        className="bg-yellow-300 rounded-md font-medium hover:cursor-pointer hover:opacity-90 py-2 border border-yellow-400"
                        onClick={() => {
                          if (!start) {
                            if (time <= 0) {
                              setTime(option.time);
                            }

                            setStart(true);
                            if (timeRef) {
                              timeRef.current = setInterval(() => {
                                setTime((prevTime) => {
                                  if (prevTime <= 1) {
                                    clearInterval(timeRef.current!);
                                    playAlarm();
                                    return 0;
                                  }
                                  return prevTime - 1;
                                });
                              }, 1000);
                            }
                          }
                        }}
                      >
                        Start
                      </button>
                    )}
                    <button
                      className="bg-yellow-50 rounded-md font-medium hover:cursor-pointer hover:opacity-90 py-2 border border-yellow-200"
                      onClick={() => {
                        stopAlarm();
                        clearInterval(timeRef.current!);
                        setStart(false);
                        setTime(option.time);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <audio ref={alarmRef} src="/alarm.mp3" loop />
        </div>
      )}
    </>
  );
}
