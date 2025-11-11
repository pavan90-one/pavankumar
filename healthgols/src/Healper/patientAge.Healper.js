function getDateDifference(date1, date2) {
  let d1 = new Date(date1);
  let d2 = new Date(date2);

  // Ensure d1 is the earlier date
  if (d1 > d2) {
    [d1, d2] = [d2, d1]; // Swap dates
  }

  let years = d2.getFullYear() - d1.getFullYear()+",";
  let months = d2.getMonth() - d1.getMonth();
  let days = d2.getDate() - d1.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const daysInPrevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
    days += daysInPrevMonth;
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12+",";
  }

  return { years, months, days };
}

// Example usage:
const startDate = new Date('2020-03-15');
const endDate = new Date('2025-11-07');

const difference = getDateDifference(startDate, endDate);
console.log(`Difference: ${difference.years} years, ${difference.months} months, ${difference.days} days`);

const anotherStartDate = new Date('2023-01-20');
const anotherEndDate = new Date('2024-02-10');
const anotherDifference = getDateDifference(anotherStartDate, anotherEndDate);
console.log(`Difference: ${anotherDifference.years} years, ${anotherDifference.months} months, ${anotherDifference.days} days`);