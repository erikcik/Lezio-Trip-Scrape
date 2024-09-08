import bodyParser from "body-parser";
import { Request, Response } from "express";

import express from "express";
import prisma from "./prisma";
const app = express();
const port = 3001;
let count = 0;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/", async (req: Request, res: Response) => {
  const {
    detailedTitle,
            ratingOverall,
            ratingOverallNumber,
            restaurantWebsiteLink,
            locationAddress,
            restaurantLat,
            restaurantLng,
            generalFeatures,
            priceSelector,
            telephoneNumber,
            restaurantEmail,
            restaurantLink,
            restaurantExplanation,



            isTripAdvisorVerified,
            categoryList,
            restaurantMenuLink,

    reviews,
    images,
    openDates,
  } = req.body;
  // let foundLocationString: any;
  // let latRestaurant;
  // let lngRestaurant;
  // const fetchFilteredRestaurant = async (searchInput: string) => {
  //   if (searchInput) {
  //     const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchInput}&types=geocode&language=tr&region=tr&key=AIzaSyDouV7VN1dE1QP-iHEmN_UUCTJ2LCItVkQ`;

  //     try {
  //       const response = await fetch(apiUrl);
  //       const data = await response.json();
  //       console.log(JSON.stringify(data, null, "\t"));
  //       if (data.status === "OK") {
  //         const likelyIstanbul = data.predictions
  //           .filter((prediction: any) =>
  //             prediction.description
  //               .toLocaleLowerCase("tr-TR") // bu amına kodumun kodu yüzünden çalıştı tr nin amk
  //               .includes("istanbul")
  //           )
  //           .map((prediction: any) => ({
  //             name: prediction.description,
  //             placeId: prediction.place_id,
  //           }));

  //         foundLocationString = likelyIstanbul;
  //       } else {
  //         console.error("Error fetching street data:", data.error_message);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch street data:", error);
  //     }
  //   } else {
  //     // Optionally reset filteredData if searchInput is empty
  //     foundLocationString = null;
  //   }
  // };
  // const handleLocationSelection = async (placeId: string, name: string) => {
  //   if (placeId) {
  //     const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=AIzaSyDouV7VN1dE1QP-iHEmN_UUCTJ2LCItVkQ`;
  //     try {
  //       const response = await fetch(placeDetailsUrl);
  //       const data = await response.json();
  //       console.log(JSON.stringify(data, null, "\t"));
  //       if (data.status === "OK") {
  //         const { lat, lng } = data.result.geometry.location;
  //         (latRestaurant = lat), (lngRestaurant = lng);
  //       } else {
  //         console.error("Error fetching street data:", data.error_message);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch street data:", error);
  //     }
  //   } else {
  //     console.log("buraya mı girdin");
  //     latRestaurant = null;
  //     lngRestaurant = null;
  //   }
  // };
  // await fetchFilteredRestaurant(locationAddress);
  // console.log(
  //   "founded place id" + JSON.stringify(foundLocationString, null, 2)
  // );

  // if (
  //   foundLocationString === undefined ||
  //   foundLocationString === null ||
  //   !foundLocationString
  // ) {
  //   latRestaurant = null;
  //   lngRestaurant = null;
  // } else {
  //   console.log(
  //     "durum vahim mi" +
  //       foundLocationString.slice(0, 1).map((item: any) => {
  //         return item.placeId;
  //       })
  //   );
  //   const bruh = foundLocationString.slice(0, 1).map((item: any) => {
  //     return item.placeId;
  //   });
  //   await handleLocationSelection(bruh, foundLocationString.name);
  //   console.log("founded lat and lng" + latRestaurant, lngRestaurant);
  // }

  const data = {
    detailedTitle,
    ratingOverall,
    ratingOverallNumber,
    restaurantWebsiteLink,
    locationAddress,
    restaurantLat,
    restaurantLng,
    generalFeatures,
    priceSelector,
    telephoneNumber,
    restaurantEmail,
    restaurantLink,
    restaurantMenuLink,
    restaurantExplanation,

    isTripAdvisorVerified,

    ...(categoryList !== null
      ? { categoryList: { create: categoryList } }
      : {}),
    ...(reviews !== null ? { reviews: { create: reviews } } : {}),
    ...(images !== null ? { images: { create: images } } : {}),
    ...(openDates !== null
      ? { openDates: { create: openDates } }
      : {}),
  };
  try {
    const response = await prisma.restaurant.create({ data });
    count++;
    console.log("Saved the restaurant! Here is the count: " + count)
    res.status(200).json(response);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
