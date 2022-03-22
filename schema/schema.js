import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} from "graphql";

const movies = [
    { id: "1", title: "pogodi", genre: "happy", directorId: 1 },
    { id: "2", title: "blood", genre: "horror", directorId: 2 },
    { id: "3", title: "spider-man", genre: "fantasic", directorId: 3 },
    { id: "4", title: "yolo", genre: "hz", directorId: 1 },
    { id: "5", title: "batman", genre: "fantasic", directorId: 1 },
    { id: "6", title: "king lion", genre: "multfilm", directorId: 3 },
];
const directors = [
    { id: "1", name: "Jack", age: 21 },
    { id: "2", name: "Bruwse", age: 58 },
    { id: "3", name: "Mickle", age: 32 },
];

const MovieType = new GraphQLObjectType({
    name: "Movie",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return directors.find((dir) => dir.id == parent.directorId);
            },
        },
    }),
});
const DirectorType = new GraphQLObjectType({
    name: "Director",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies.filter((movie) => movie.directorId == parent.id);
            },
        },
    }),
});

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return movies.find((movie) => movie.id == args.id);
            },
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return directors.find((dir) => dir.id == args.id);
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies;
            },
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return directors;
            },
        },
    },
});

export default new GraphQLSchema({
    query: Query,
});
