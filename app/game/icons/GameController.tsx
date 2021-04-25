import React from 'react';

type Props = {
  size: string;
};

const GameController = ({ size }: Props) => {
  return (
    <svg
      id="Layer_1"
      enableBackground="new 0 0 512 512"
      height={size}
      viewBox="0 0 512 512"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="m309.511 56.544c-4.143 0-7.5 3.357-7.5 7.5v35.822c0 10.654-8.668 19.321-19.321 19.321-18.926 0-34.322 15.396-34.322 34.322v38.434c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-38.433c0-10.654 8.668-19.322 19.322-19.322 18.925 0 34.321-15.396 34.321-34.321v-35.823c0-4.142-3.358-7.5-7.5-7.5z"
          fill="#325a93"
        />
        <path
          d="m283.689 184.444h-55.389c-4.143 0-7.5 3.357-7.5 7.5v29.388c0 4.143 3.357 7.5 7.5 7.5h55.389c4.143 0 7.5-3.357 7.5-7.5v-29.388c0-4.143-3.357-7.5-7.5-7.5z"
          fill="#dcf3ff"
        />
        <path
          d="m512 334.646c0 66.61-54.2 120.81-120.82 120.81-5.04 0-10.04-.31-14.96-.93-36.84-4.58-69.75-25.92-88.94-58.2h-62.57c-21.75 36.59-61.15 59.13-103.9 59.13-66.62 0-120.81-54.2-120.81-120.81 0-66.62 54.19-120.81 120.81-120.81h270.37c66.62 0 120.82 54.19 120.82 120.81z"
          fill="#dcf3ff"
        />
        <path
          d="m512 334.646c0 66.61-54.2 120.81-120.82 120.81-5.04 0-10.04-.31-14.96-.93 59.55-7.43 105.78-58.36 105.78-119.88 0-66.62-54.2-120.81-120.82-120.81h30c66.62 0 120.82 54.19 120.82 120.81z"
          fill="#9bc9e0"
        />
        <path
          d="m350.85 213.836-29 57.18c-1.28 2.52-3.86 4.11-6.69 4.11h-118.59c-2.82 0-5.41-1.59-6.69-4.11l-28.99-57.18z"
          fill="#325a93"
        />
        <path
          d="m350.85 213.836-29 57.18c-1.28 2.52-3.86 4.11-6.69 4.11h-30c2.83 0 5.41-1.59 6.69-4.11l29-57.18z"
          fill="#132d77"
        />
        <g>
          <path
            d="m418.707 278.087c-14.682 0-26.626 11.944-26.626 26.625 0 14.682 11.944 26.626 26.626 26.626 14.681 0 26.625-11.944 26.625-26.626 0-14.681-11.944-26.625-26.625-26.625z"
            fill="#ff6187"
          />
          <path
            d="m368.456 337.949c-14.682 0-26.626 11.944-26.626 26.625 0 14.682 11.944 26.626 26.626 26.626 14.681 0 26.625-11.944 26.625-26.626 0-14.68-11.944-26.625-26.625-26.625z"
            fill="#5fe1ff"
          />
        </g>
        <path
          d="m172.363 314.855h-31.769v-31.768c0-1.381-1.119-2.5-2.5-2.5h-34.576c-1.381 0-2.5 1.119-2.5 2.5v31.768h-31.768c-1.381 0-2.5 1.119-2.5 2.5v34.576c0 1.381 1.119 2.5 2.5 2.5h31.769v31.77c0 1.381 1.119 2.5 2.5 2.5h34.576c1.381 0 2.5-1.119 2.5-2.5v-31.77h31.769c1.381 0 2.5-1.119 2.5-2.5v-34.576c-.001-1.381-1.12-2.5-2.501-2.5z"
          fill="#325a93"
        />
      </g>
    </svg>
  );
};

export default GameController;