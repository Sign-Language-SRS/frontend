interface ProgressRingProps {
  radius: number;
  strokeWidth: number;
  progress: number;
}

export default function ProgressRing({
  radius,
  strokeWidth,
  progress,
}: ProgressRingProps) {
  const [width, height] = Array(2).fill(2 * (radius + strokeWidth));
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - progress * circumference;

  return (
    <svg id={"progress-ring"} width={width} height={height}>
      <circle
        className={"text-white opacity-25"}
        stroke={"currentColor"}
        strokeWidth={strokeWidth}
        fill={"transparent"}
        r={radius}
        cx={width / 2}
        cy={height / 2}
      />
      <circle
        className={"text-white"}
        stroke={"currentColor"}
        strokeWidth={strokeWidth * 1.1}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        stroke-linecap="round"
        fill={"transparent"}
        r={radius}
        cx={width / 2}
        cy={height / 2}
      />
    </svg>
  );
}
