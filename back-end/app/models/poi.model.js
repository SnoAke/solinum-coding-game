module.exports = mongoose => {
  const Poi = mongoose.model(
    "poi",
    mongoose.Schema(
      {
        name: String,
        address: {
          full_address: String,
          longitude: String,
          latitude: String,
        },
        type: String,
        published: Boolean,
        state: String,
        poster: String
      },
      { timestamps: true }
    )
  );

  return Poi;
};
