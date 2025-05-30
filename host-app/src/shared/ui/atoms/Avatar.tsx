import React from "react";

const Avatar = () => (
  <svg
    width="2rem"
    height="2rem"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="avatar"
  >
    <title id="avatarTitle">User Avatar</title>
    <g clipPath="url(#a)">
      <rect width={32} height={32} rx={10} fill="#F2F4F7" />
      <path
        d="M6.4 27.2a6.4 6.4 0 0 1 6.4-6.4h6.4a6.4 6.4 0 0 1 6.4 6.4v6.4a6.4 6.4 0 0 1-6.4 6.4h-6.4a6.4 6.4 0 0 1-6.4-6.4v-6.4Z"
        fill="#8B78B0"
      />
      <circle cx={16.29} cy={12.8} fill="#8B78B0" r={6.4} />
    </g>
    <defs>
      <clipPath id="a">
        <rect width={32} height={32} rx={10} fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);

export default Avatar;
