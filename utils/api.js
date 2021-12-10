import axios from "axios";

const ticketmasterApi = axios.create({
  baseURL: "https://app.ticketmaster.com/",
});

export const getGigsForHomepage = () => {
  return ticketmasterApi
    .get(
      "discovery/v2/events?apikey=AQ2psvkdE5dP1AD9SEmAPZ1Kb5AALDCG&locale=en-gb&size=10&segmentId=KZFzniwnSyZfZ7v7nJ"
    )
    .then((response) => {
      // setResults(response);
      // console.log(response.data._embedded.events);
      return response.data._embedded.events;
    })
    .catch((err) => {
      console.dir(err);
    });
};

export const filterGigs = (genreId, sort) => {
  return ticketmasterApi
    .get(
      `discovery/v2/events?apikey=AQ2psvkdE5dP1AD9SEmAPZ1Kb5AALDCG&locale=en-gb&size=50&segmentId=KZFzniwnSyZfZ7v7nJ&genreId=${genreId}&sort=${sort}&startDateTime=${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}T00:00:00Z`
    )
    .then((response) => {
      return response.data._embedded.events.filter((events, i) => {
        return (
          events.dates.status.code !== "cancelled" &&
          events.dates.status.code !== "offsale"
        );
      });
    })
    .catch(console.dir);
};
