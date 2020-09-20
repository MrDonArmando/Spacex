const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const LaunchType = new GraphQLObjectType({
  name: "Lanuch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    details: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    //launch_failure_details:
  }),
});

const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    id: { type: GraphQLInt },
    cost_per_launch: { type: GraphQLInt },
    success_rate_pct: { type: GraphQLInt },
    first_flight: { type: GraphQLString },
    country: { type: GraphQLString },
    description: { type: GraphQLString },
    rocket_id: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve() {
        return axios
          .get("https://api.spacexdata.com/v3/launches")
          .then((res) => res.data);
      },
    },

    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt },
      },
      resolve(_, { flight_number }) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${flight_number}`)
          .then((res) => res.data);
      },
    },

    rockets: {
      type: new GraphQLList(RocketType),
      resolve() {
        return axios
          .get("https://api.spacexdata.com/v3/rockets")
          .then((res) => res.data);
      },
    },

    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(_, { id }) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${id}`)
          .then((res) => red.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
