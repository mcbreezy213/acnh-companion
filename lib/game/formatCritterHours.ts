export function formatCritterHours(hours: number[]): string {
  if (!hours.length) {
    return "Unavailable";
  }

  if (hours.length === 24) {
    return "All day";
  }

  const sortedHours = [...hours].sort((a, b) => a - b);

  const ranges: string[] = [];
  let start = sortedHours[0];
  let end = sortedHours[0];

  for (let i = 1; i < sortedHours.length; i += 1) {
    const current = sortedHours[i];

    if (current === end + 1) {
      end = current;
    } else {
      ranges.push(formatHourRange(start, end));
      start = current;
      end = current;
    }
  }

  ranges.push(formatHourRange(start, end));

  return ranges.join(", ");
}

function formatHourRange(start: number, end: number): string {
  if (start === end) {
    return formatHour(start);
  }

  return `${formatHour(start)} - ${formatHour(end + 1)}`;
}

function formatHour(hour: number): string {
  const normalizedHour = ((hour % 24) + 24) % 24;
  const suffix = normalizedHour >= 12 ? "PM" : "AM";
  const twelveHour = normalizedHour % 12 === 0 ? 12 : normalizedHour % 12;

  return `${twelveHour}${suffix}`;
}