import {type RouteConfig, route, index, prefix} from "@react-router/dev/routes";

export default [
    index("routes/index/app.tsx"),
    ...prefix("books", [
        route(":id","routes/books/app.tsx"),
        route("new", "routes/new/app.tsx")
    ])
] satisfies RouteConfig;
