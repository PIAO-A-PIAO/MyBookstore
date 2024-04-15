### Sample data:
Please feel free to download sample book data and book cover image to play around the project: [sample books](https://github.com/PIAO-A-PIAO/my-bookstore/tree/main/sample_books)

### Run the project:

**To Run Project online:**
The project is deployed to [My Bookstore](https://my-bookstore-six.vercel.app/).
Please note that because the server is deployed to a free web service, the first time access might take extra time.

**To Run Project locally:**

**Backend:**
- Enter `server` folder.
- Run `npm install` to install all dependencies.
- Run `npm run server` to start the server.
- The server should run on localhost:4000.

**Frontend:**
- Enter `frontend` folder
- This project does not have an `.env` file, so please go to `src/app/util.ts` and manually set `baseUrl` to `localhost:4000`.
- Run `npm install` to install all dependencies.
- Run `npm run dev` to start the client.
- The client should run on localhost:3000.
