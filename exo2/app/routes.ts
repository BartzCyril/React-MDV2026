import {type RouteConfig, route} from "@react-router/dev/routes";

export default [route("/", "routes/index/app.tsx"), route("books/:id","routes/books/app.tsx")] satisfies RouteConfig;
