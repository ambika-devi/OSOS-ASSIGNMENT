const Restaurant = require("..restuarant/models/res");


exports.getRestaurantsNearLocation = async (req, res, next) => {
  const { latitude, longitude, radius } = req.query;

  try {
    const { lat, lng, radius } = req.query;
    const restaurants = await Restaurant.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseFloat(radius),
        },
      },
    }).exec();

    const result = restaurants.map((restaurant) => {
      const avgRating =
        restaurant.ratings.reduce((total, rating) => total + rating, 0) /
        restaurant.ratings.length;
      return {
        name: restaurant.name,
        description: restaurant.description,
        location: restaurant.location,
        avgRating,
        numRatings: restaurant.ratings.length,
      };
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};