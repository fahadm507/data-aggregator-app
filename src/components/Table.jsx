import React from "react";
import "./table.css";

const Table = ({ data = [] }) => {
  // Get all the grade and remove duplicates
  const grades = [...new Set(data.map((item) => item.grade))];

  // Remove falsy values from the array of grades
  const filteredGrades = grades.filter(Boolean).sort();

  // We want to aggregate the balances for each grade.
  // So, we'll start by mapping over each grade to calculate the total balance for that grade.
  const aggregatedBalances = grades
    .map((grade) => {
      // For each grade, we filter the data to only include items that match the current grade.
      const itemsOfCurrentGrade = data.filter((item) => item.grade === grade);

      // Now, we'll aggregate (sum up) the balances for the current grade.
      // We use the reduce function to accumulate the total balance.
      const totalBalanceForCurrentGrade = itemsOfCurrentGrade.reduce(
        (acc, curr) => {
          // Convert the current balance string to a number.
          const balanceValue = parseFloat(curr.currentBalance);

          // If the conversion results in not a number, we simply return the accumulated value so far.
          // Otherwise, we add the current balance to the accumulated value.
          return isNaN(balanceValue) ? acc : acc + balanceValue;
        },
        0
      );

      // Convert the total balance to a string with 2 decimal places.
      const formattedBalance = totalBalanceForCurrentGrade.toFixed(2);

      // If the formatted balance is "0.00", we return null (indicating we don't want this value).
      // Otherwise, we return the formatted balance.
      return formattedBalance !== "0.00" ? formattedBalance : null;
    })
    // After mapping over each grade, we might have some null values (for grades with a balance of "0.00").
    // We filter out these null values to get our final result.
    .filter((balance) => balance !== null);
  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            {filteredGrades.map((grade) => (
              <th key={grade}>{grade}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {aggregatedBalances.map((balance, index) => (
              <td key={index}>{balance}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
