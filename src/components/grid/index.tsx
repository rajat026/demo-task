import React, { useMemo, useState } from "react";
import "../../App.css";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, TextField } from "@mui/material";
import { useGetPokemonQuery } from "../../app/services/pokemonAPI/pokemon";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "url", headerName: "URL", width: 300 },
];

interface Pokemon {
  name: string;
  url: string;
}

export const DataGridUi = () => {
  const [filterText, setFilterText] = useState<string>("");
  const { data, isFetching } = useGetPokemonQuery(50);

  const filteredRows = useMemo(() => {
    if (!data || !data.results) return [];
    return data.results.filter((row) =>
      row.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [data, filterText]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setFilterText(searchText);
  };

  return !isFetching ? (
    <>
      <div style={{ textAlign: "end", marginBottom: 4 }}>
        <TextField
          className="input-field"
          label="Filter"
          value={filterText}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
      </div>
      <div style={{ width: "100%", height: 631 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          getRowId={(row: Pokemon) => row.name + row.url}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
        />
      </div>
    </>
  ) : (
    <CircularProgress />
  );
};
