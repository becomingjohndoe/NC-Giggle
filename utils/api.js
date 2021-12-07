import axios from "axios";

const ticketmasterApi = axios.create({
  baseURL:
    "https://app.ticketmaster.com/",
});

export const getGigsForHomepage = () => {
  return ticketmasterApi
    .get("discovery/v2/events?apikey=AQ2psvkdE5dP1AD9SEmAPZ1Kb5AALDCG&locale=en-gb&size=50&segmentId=KZFzniwnSyZfZ7v7nJ")
    .then((response) => {
      // setResults(response);
      console.log(response.data._embedded.events);
      return response.data._embedded.events;
    })
    .catch((err) => {
      console.dir(err);
    });
};

