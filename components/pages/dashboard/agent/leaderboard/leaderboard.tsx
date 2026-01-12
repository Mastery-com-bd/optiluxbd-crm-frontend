import { Clock, Gem } from "lucide-react";
import Image from "next/image";
import RankingsTable from "./RankingsTable";

const leaders = [
  {
    position: 1,
    name: "Aisha Khan",
    team: "Team Falcon",
    points: 125000,
    earnPoints: 2500,
    avatar: "/leaderboard-profile.png",
  },
  {
    position: 2,
    name: "Carlos Rivera",
    team: "Team Phoenix",
    points: 118000,
    earnPoints: 2200,
    avatar: "/leaderboard-profile.png",
  },
  {
    position: 3,
    name: "Mira Patel",
    team: "Team Viper",
    points: 95000,
    earnPoints: 1800,
    avatar: "/leaderboard-profile.png",
  },
];
const LeaderBoard = () => {
  return (
    <div className="">
      <div className="h-[calc(100vh-110px)] flex flex-col  items-end justify-center">
        <div className="w-full gap-10 flex items-center justify-center">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={` ${index !== 1 ? "" : "pb-72"}`}>
              <div className="flex flex-col items-center">
                <div className="mb-2 ">
                  <Image
                    width={90}
                    height={90}
                    src={`/icons/${index === 0 ? "Silver" : index === 1 ? "Gold" : "Bronze"
                      }-crown.svg`}
                    alt=""
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    width={48}
                    height={48}
                    src={
                      index === 0
                        ? leaders[1].avatar || "/placeholder.svg"
                        : index === 1
                          ? leaders[2].avatar || "/placeholder.svg"
                          : leaders[2].avatar || "/placeholder.svg"
                    }
                    alt={`${index === 0 ? "2nd" : index === 1 ? "1st" : "3rd"
                      } place ${leaders[index].name}`}
                    className="w-12 h-12 rounded-[7px] border-2 border-white/20"
                  />
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">
                      Earn {leaders[index].earnPoints} points
                    </p>
                    <div className="flex items-center gap-1">
                      <Gem />
                      <span className="text-white font-bold">
                        {leaders[index].points}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-white text-sm font-medium">
                  {leaders[index].name}
                </p>
                <p className="text-gray-400 text-xs mb-3">
                  {leaders[index].team}
                </p>
              </div>
              <div className="relative  ">
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                  <span className="text-[80px] font-bold text-purple-400/30">
                    {index === 0 ? "2nd" : index === 1 ? "1st" : "3rd"}
                  </span>
                </div>
                <svg
                  width="236"
                  height="281"
                  viewBox="0 0 236 281"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <g opacity="0.94">
                    <path
                      opacity="0.36"
                      d="M49.083 0L0 15.663H230.504L194.916 0H49.083Z"
                      fill="url(#paint0_linear_600_30896)"
                    />
                    <rect
                      y="15.486"
                      width="235.504"
                      height="258.855"
                      fill="url(#paint1_linear_600_30896)"
                    />
                    <path
                      d="M13.0088 53.3721H222.828"
                      stroke="white"
                      stroke-opacity="0.00"
                      stroke-width="0.667151"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_600_30896"
                      x1="117.752"
                      y1="0"
                      x2="117.752"
                      y2="17.7341"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#610093" />
                      <stop offset="1" stop-color="#610093" />
                      <stop offset="1" stop-color="#180903" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_600_30896"
                      x1="117.752"
                      y1="21.3486"
                      x2="117.811"
                      y2="221.933"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#610093" />
                      <stop offset="0.576923" stop-color="#2A0049" />
                      <stop offset="1" stop-color="#180720" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-[#E5B061] flex flex-col justify-center items-center">
          <Clock />
          <span className="text-center">
            Ends in
          </span>
          <span className="text-center">
            06d 23h 59m 29s
          </span>
        </div>
        <RankingsTable/>
      </div>
    </div>
  );
};

export default LeaderBoard;
