export const mapToHHMM = (minutes) => {
  const hh = String(Math.floor(minutes / 60));
  const mm = String(minutes % 60);

  let formatedTime = "";
  if (mm == "0") formatedTime = hh.concat("hr ");
  else formatedTime = hh.concat("hr ", mm, " min");
   
  return formatedTime;
};
