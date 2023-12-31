if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
import app from "./config/app";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});
