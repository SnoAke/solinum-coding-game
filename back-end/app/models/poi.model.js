module.exports = mongoose => {
  const Poi = mongoose.model(
    "poi",
    mongoose.Schema(
      {
        name: String,
        adress: {
          full_adress: String,
          longitude: String,
          latitude: String,
        },
        type: String,
        status: Boolean,
        state: String,
        poster: Number
      },
      { timestamps: true }
    )
  );

  return Poi;
};
