import { toast } from "react-toastify";

export const removeItemToWatchlist = (e, id) => {
  let watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const newList = watchlist.filter((coin) => coin != id);
  localStorage.setItem("watchlist", JSON.stringify(newList));
  toast.success(`${id} - has been removed!`);
  e.preventDefault();
};
