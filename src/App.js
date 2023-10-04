import React, { useState, useEffect } from "react";
import Dropdown from "./components/Dropdown";
import DataTable from "./components/Table";
import BarChartComponent from "./components/BarChart";
import { getData } from "./request/api";
import { DROPDOWN_LABELS } from "./config";
import "./App.css";

const App = () => {
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);

  // Filters initial state
  const [homeOwnershipFilter, setHomeOwnershipFilter] = useState("");
  const [quarterFilter, setQuarterFilter] = useState("");
  const [termFilter, setTermFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  //Get initial data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setInitialData(data);
    };

    fetchData();
  }, []);

  // update data when the filters change
  useEffect(() => {
    let filteredData = [...initialData];

    if (homeOwnershipFilter) {
      filteredData = filteredData.filter(
        (item) => item.homeOwnership === homeOwnershipFilter
      );
    }
    if (quarterFilter) {
      filteredData = filteredData.filter(
        (item) => item.quarter === quarterFilter
      );
    }
    if (termFilter) {
      filteredData = filteredData.filter((item) => item.term === termFilter);
    }
    if (yearFilter) {
      filteredData = filteredData.filter((item) => item.year === yearFilter);
    }

    setData(filteredData);
  }, [homeOwnershipFilter, quarterFilter, termFilter, yearFilter, initialData]);

  // reset filters when the reset button is clicked
  const resetFilters = () => {
    setHomeOwnershipFilter("");
    setQuarterFilter("");
    setTermFilter("");
    setYearFilter("");
  };

  const uniqueHomeOwnerships = [
    ...new Set(initialData.map((item) => item.homeOwnership)),
  ].filter(Boolean);
  const uniqueQuarters = [
    ...new Set(initialData.map((item) => item.quarter)),
  ].filter(Boolean);
  const uniqueTerms = [...new Set(initialData.map((item) => item.term))].filter(
    Boolean
  );
  const uniqueYears = [...new Set(initialData.map((item) => item.year))].filter(
    Boolean
  );

  // Get labels for the drodown
  const { homeOwnerShip, quarter, term, year } = DROPDOWN_LABELS;

  return (
    <div class="app-container">
      <div className="filters-container">
        <div className="dropdown-container">
          <Dropdown
            onChange={(e) => setHomeOwnershipFilter(e.target.value)}
            name="homeOwnership"
            options={uniqueHomeOwnerships}
            label={homeOwnerShip}
            value={homeOwnershipFilter}
          />
        </div>
        <div className="dropdown-container">
          <Dropdown
            name="quarter"
            options={uniqueQuarters}
            onChange={(e) => setQuarterFilter(e.target.value)}
            label={quarter}
            value={quarterFilter}
          />
        </div>
        <div className="dropdown-container">
          <Dropdown
            name="term"
            options={uniqueTerms}
            onChange={(e) => setTermFilter(e.target.value)}
            label={term}
            value={termFilter}
          />
        </div>
        <div className="dropdown-container">
          <Dropdown
            name="year"
            options={uniqueYears}
            onChange={(e) => setYearFilter(e.target.value)}
            label={year}
            value={yearFilter}
          />
        </div>

        {/* Reset Button */}
        <button className="reset-button" onClick={resetFilters}>
          Reset
        </button>
      </div>
      <DataTable data={data} />
      <BarChartComponent data={data} />
    </div>
  );
};

export default App;
