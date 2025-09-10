export default function HealthAndManaBar({
  className,
  max,
  value,
}: {
  className: string;
  max: number;
  value: number;
}) {
  return <progress className={className} max={max} value={value} />;
}
