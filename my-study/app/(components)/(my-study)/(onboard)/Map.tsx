import React from "react";

const Map = ({
  onSelectRegion,
  selectedRegion,
}: {
  onSelectRegion: (region: string) => void;
  selectedRegion: string|null;
}) => {
  return (
    <div className="relative w-full h-full p-4 flex items-center justify-center bg-red-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full pointer-events-none"
        viewBox="0 0 979 645"
        fill="none"
      >
        <path
          d="M225.139 177.303L6.91056 149.444L1.33875 232.092L97.9165 272.023L230.711 408.532L302.216 311.954L225.139 177.303Z"
          className={`pointer-events-auto fill-lake cursor-pointer ${
            selectedRegion === "lake" ? "stroke-2 stroke-black" : ""
          }`}
          onClick={() => {
            onSelectRegion("lake"); 
          }}
        />
        <path
          d="M867.753 291.524L673.669 233.02L693.17 139.229L760.031 90.9397L977.331 161.516L867.753 291.524Z"
          className={`pointer-events-auto fill-taiga cursor-pointer ${
            selectedRegion === "taiga" ? "stroke-2 stroke-black" : ""
          }`}
          onClick={() => {
            onSelectRegion("taiga");
          }}
        />
        <path
          d="M696.808 424.395L630.488 370.422L568.049 336.91L669.645 255.421L713.741 279.056L696.808 424.395Z"
          className={`pointer-events-auto fill-desert cursor-pointer ${
            selectedRegion === "desert" ? "stroke-2 stroke-black" : ""
          }`}
          onClick={() => {
            onSelectRegion("desert");
          }}
        />
        <path
          d="M831.211 412.049L867.899 291.403L732.085 250.835L714.446 278.704L697.161 424.043L831.211 412.049Z"
          className={`pointer-events-auto fill-peachblossom cursor-pointer ${
            selectedRegion === "peachblossom" ? "stroke-2 stroke-black" : ""
          }`}
          onClick={() => {
            onSelectRegion("peachblossom");
          }}
        />
        <path
          d="M862.96 456.497L786.763 513.292L866.488 579.259L923.283 568.324L929.986 527.05L862.96 456.497Z"
          className={`pointer-events-auto fill-island cursor-pointer ${
            selectedRegion === "island" ? "stroke-2 stroke-black" : ""
          }`}
          onClick={() => {
            onSelectRegion("island");
          }}
        />
        <path
          d="M178.708 493.966L235.354 413.175L378.363 449.392L351.433 572.9L289.215 643.476L178.708 493.966Z"
          className={`pointer-events-auto fill-rainforest cursor-pointer ${
            selectedRegion === "rainforest" ? "stroke-2 stroke-black" : ""
          }`}
          onClick={() => {
            onSelectRegion("rainforest");
          }}
        />
        <path
          d="M164.778 73.2957L304.073 0.862381L421.081 15.7205L401.579 168.016L340.29 228.377L164.778 73.2957Z"
          className={`pointer-events-auto fill-tundra cursor-pointer ${
            selectedRegion === "tundra" ? "stroke-2 stroke-black" : ""
          }`}
          onClick={() => {
            onSelectRegion("tundra");
          }}
        />
        <path
          d="M399.722 418.747L455.44 335.17L536.231 320.312L631.88 371.387L566.876 537.612L526.016 547.827L399.722 418.747Z"
          className={`pointer-events-auto fill-savanna cursor-pointer ${
            selectedRegion === "savanna" ? "stroke-2 stroke-black" : ""
          }`}
          onClick={() => {
            onSelectRegion("savanna");
          }}
        />
        <path
          d="M669.025 256.236L692.241 139.229L622.594 175.445L562.233 129.014L456.369 207.019V337.027L539.017 320.312L567.804 337.027L669.025 256.236Z"
          className={`pointer-events-auto fill-grassland cursor-pointer ${
            selectedRegion === "grassland" ? "stroke-2 stroke-black" : ""
          }`}
          onClick={() => {
            onSelectRegion("grassland");
          }}
        />
      </svg>
    </div>
  );
};

export default Map;
