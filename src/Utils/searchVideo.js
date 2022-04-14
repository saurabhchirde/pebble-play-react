export const searchVideo = (filteredArray, bySearch) => {
  let withouFiltered = [...filteredArray];
  if (bySearch === "") {
    return withouFiltered;
  } else {
    return withouFiltered.filter((video) =>
      video.snippet?.title
        ?.toLowerCase()
        .includes(bySearch?.trim().toLowerCase())
    );
  }
};
