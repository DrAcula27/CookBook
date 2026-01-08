import mongoose from 'mongoose';

const COLLECTION = 'CookBookData';

// by default mongoose 'strictQuery' is true (strict) meaning we cant ask for information not in our schema
// see more here: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);

// function will activate once to let us know we are connected
mongoose.connection.once('open', () => {
  console.log(`connected to MongoDB Collection: ${COLLECTION}`);
});

export const connectDatabase = () => {
  // URL-encode credentials to handle special characters safely
  const encodedUsername = encodeURIComponent(
    process.env.MONGOUSERNAME
  );
  const encodedPassword = encodeURIComponent(
    process.env.MONGOPASSWORD
  );

  let connectionString = `mongodb+srv://${encodedUsername}:${encodedPassword}@mongosetupcluster.muoiuud.mongodb.net/${COLLECTION}?retryWrites=true&w=majority`;

  // connect to our MongoDB database (our Models specify which collections)
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
