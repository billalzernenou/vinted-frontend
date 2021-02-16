import { Range, getTrackBackground } from "react-range";

const Search = ({
  state,
  setState,
  rangeFilter,
  setRangeFilter,
  displayOrder,
  setDisplayOrder,
  searchInput,
  setSearchInput,
}) => {
  // display sort offers
  const handleDisplaySort = () => {
    if (displayOrder === "desc") {
      setDisplayOrder("asc");
    } else {
      setDisplayOrder("desc");
    }
  };
  // search input
  const handleChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };
  return (
    <div className="search-container">
      <div className="input-search">
        <input
          type="text"
          className="search-input"
          value={searchInput}
          onChange={(event) => {
            handleChangeSearchInput(event);
          }}
          placeholder="Recherche des articles"
        ></input>
      </div>
      <div>Pris entre:</div>
      <div className="range-filter">
        <output
          style={{
            display: "flex",
            justifyContent: "space-around",
            fontSize: "15px",
            width: "100%",
          }}
          id="output"
        >
          <div className="min-max-range"> {state.values[0].toFixed(0)} €</div>
        </output>
        <div></div>
        <Range
          step={5}
          min={0}
          max={500}
          onChange={(values) => setState({ values })}
          onFinalChange={(values) => setRangeFilter({ values })}
          values={state.values}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "5px",
                width: "100%",
                backgroundColor: "#CCCCCC",
                borderRadius: "5px",
                background: getTrackBackground({
                  values: state.values,
                  backgroundColor: "#2CB1BA",
                  colors: ["#CCCCCC", "#2CB1BA", "#CCCCCC"],
                  min: 0,
                  max: 500,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "15px",
                width: "15px",
                backgroundColor: "#2CB1BA",
                borderRadius: "50%",
                outline: "none",
              }}
            />
          )}
        />
        <output
          style={{
            display: "flex",
            justifyContent: "space-around",
            fontSize: "15px",
            width: "100%",
          }}
        >
          <div className="min-max-range"> {state.values[1].toFixed(0)}€</div>
        </output>
      </div>

      <div className="display-order">
        <span>Trier par prix </span>
        <label className="switch">
          <input type="checkbox" onChange={handleDisplaySort} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default Search;
