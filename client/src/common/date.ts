export function setDate(
  month: number | null = null,
  year: number | null = null
) {
  if (!month || !year) {
    const time = new Date();
    const date = JSON.stringify({
      month: time.getMonth() + 1,
      year: time.getFullYear(),
    });
    localStorage.setItem("date", date);
    return JSON.parse(date);
  }
  const date = JSON.stringify({ month: month, year: year });
  localStorage.setItem("date", date);
  return JSON.parse(date);
}
