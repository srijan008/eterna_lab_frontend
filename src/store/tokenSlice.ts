import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SortDirection, SortKey, TokenTableState, TokenCategory } from "@/lib/types";

const initialState: TokenTableState = {
  activeCategory: "NEW_PAIRS",
  search: "",
  sortKey: "volume24h",
  sortDirection: "desc",
  selectedTokenId: null,
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<TokenCategory>) {
      state.activeCategory = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSort(
      state,
      action: PayloadAction<{ key: SortKey }>
    ) {
      const { key } = action.payload;
      if (state.sortKey === key) {
        state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = key;
        state.sortDirection = "desc";
      }
    },
    setSelectedTokenId(state, action: PayloadAction<string | null>) {
      state.selectedTokenId = action.payload;
    },
  },
});

export const { setCategory, setSearch, setSort, setSelectedTokenId } =
  tokenSlice.actions;

export default tokenSlice.reducer;
