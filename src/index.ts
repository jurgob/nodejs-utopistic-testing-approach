import { createApp } from "./server";
import env from "./env";

const port = env.PORT

console.log(`[server]: Starting server at port ${port}`);
createApp()
    .then(app => {
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        })
    });
