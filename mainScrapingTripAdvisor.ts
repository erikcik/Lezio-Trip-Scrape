import axios from "axios";
import { TimeoutError } from "puppeteer";
import puppeteerExtra from "puppeteer-extra";
import fs from "fs";
import pluginStealth from "puppeteer-extra-plugin-stealth";
import { setTimeout } from "timers/promises";
import readline from "readline";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

puppeteerExtra.use(pluginStealth());

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
    ...(openDates !== null ? { openDates: { create: openDates } } : {}),
  };
  try {
    const response = await prisma.restaurant.create({ data });
    count++;
    console.log("Saved the restaurant! Here is the count: " + count);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const logAndAppendToFile = (data: any) => {
  fs.appendFileSync("log.txt", `${data}\n`, 'utf8');
  console.log(data);
};

async function getAllResults() {
  logAndAppendToFile("hadi başlayalım");
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [
      "--no-sandbox",
      "--start-maximized",
      "--disable-features=site-per-process",
    ],
  });
  const page = await browser.newPage();

  //www.tripadvisor.com/Restaurants-g293974-Istanbul.html,
  await page.setUserAgent(
    "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36"
  );
  await page.goto(
    "https://www.tripadvisor.com.tr/Restaurants-g293974-Istanbul.html",
    {
      waitUntil: "networkidle2",
      timeout: 240000,
    }
  );

  await setTimeout(Math.random() * 1000 + 400);

  

  let hasNext = true;

  while (hasNext) {
    await setTimeout(Math.random() * 1000 + 400);
    await page.waitForSelector('div[data-automation="searchResults"] > span');
    const selectors = await page.$$(
      'div[data-automation="searchResults"] > span'
    );
    const filteredSelectors = [] as any;
    //filtering out the ads from the whole selection array
    for (const selector of selectors) {
      const hasDescendant = await selector.evaluate((el) => {
        return Boolean(el.textContent?.toLowerCase().includes("sponsorlu"));
      });

      if (!hasDescendant) {
        filteredSelectors.push(selector);
      }
    }
    logAndAppendToFile("Here is the normal restaurants with ad: " + selectors.length);
    logAndAppendToFile(
      "Here is the restaurants withoud ad: " + filteredSelectors.length
    );
    //to avoid robot detection
    await setTimeout(1000 + Math.random() * 6000);
    try {
      const element = await page.$('button[id="onetrust-accept-btn-handler"]');
      if (element) {
        await page.click('button[id="onetrust-accept-btn-handler"]');
      } else {
        logAndAppendToFile("Button click not found for cookie");
      }
    } catch (error) {
      logAndAppendToFile("error happened for clicking cookie");
    }

    for (const selector of filteredSelectors) {
      let newTab: any = null;

      const fetchStartTime = Date.now();
      logAndAppendToFile(
        "Start time for one restaurant: " + (fetchStartTime / 1000).toFixed(2)
      );

      //general one restaurant try catch blcok
      try {
        //clicking to first "a" element opens new page
        try {
          const clickableRestaurant = await selector.waitForSelector("a", {
            timeout: 6000,
          });
          const link = await clickableRestaurant.evaluate((el: any) =>
            el.getAttribute("href")
          );
          logAndAppendToFile("Here is the link: " + link);

          await browser.newPage();
          await setTimeout(1000);
          const pages = await browser.pages();
          await setTimeout(1000);
          newTab = pages[pages.length - 1];
          await newTab.setUserAgent(
            "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36"
          );
          await newTab.goto(`https://www.tripadvisor.com.tr${link}`, {
            waitUntil: "domcontentloaded",
            timeout: 240000,
          });
          await newTab.bringToFront();

          logAndAppendToFile("clicked for new tab");
        } catch (error) {
          if (error instanceof TimeoutError) {
            logAndAppendToFile(
              "Some kind of error happened while trying to click here is the error: " +
                error
            );
          } else {
            logAndAppendToFile("Error happened while initiliazing new tab: " + error);
          }
        }
        //scraped while loop but this can also work
        // let previousImageRequests = <any>[];
        // const handleRequest = (request: any) => {
        //   if (request.isInterceptResolutionHandled()) return;
        //   if (
        //     request.url().endsWith(".png") ||
        //     request.url().endsWith(".jpg")
        //   ) {
        //     logAndAppendToFile("Previously fetched image URL:", request.url());
        //     previousImageRequests = [...previousImageRequests, request.url()];
        //     newTab.evaluate(() => {
        //       const height = document.querySelector("html")?.scrollHeight
        //       if(height) {
        //         document.querySelector("html")?.scrollBy(0, height)
        //       }
        //     })
        //     logAndAppendToFile(
        //       "Previously fetched image Array:",
        //       JSON.stringify(previousImageRequests, null, 2)
        //     );
        //   }
        //   request.continue();
        // };
        // await newTab.on("request", handleRequest);
        // await setTimeout(10000);
        // await newTab.off("request", handleRequest);
        // logAndAppendToFile("interception closed");
        // newTab.setRequestInterception(false).catch((error: any) => {
        //   logAndAppendToFileor("Error disabling request interception:", error);
        // });
        // logAndAppendToFile(
        //   "Collected image requests during interception period:",
        //   previousImageRequests
        // );

        await setTimeout(1000 + Math.random() * 6000);

        const waitForSelectors = async (
          page: any,
          selectors: any,
          timeout: any
        ) => {
          const selectorPromises = selectors.map((selector: any) =>
            page
              .waitForSelector(selector, { timeout })
              .catch(() => logAndAppendToFile(`${selector} not found within timeout.`))
          );
          await Promise.race([Promise.all(selectorPromises)]);
        };

        try {
          await waitForSelectors(
            newTab,
            [
              'div[data-test-target="restaurant-detail-info"] h1',
              'a[href="#REVIEWS"] title',
              'div[data-test-target="restaurant-detail-info"] span',
              'div[data-test-target="restaurant-detail-info"] > div:nth-child(2) > span:nth-child(3) > span ',
              'img[alt="Restoranın konumunu gösteren harita"]',
              'a[target="_blank"][href^="https://maps.google.com/maps"]',
              'div[data-automation="reviewsOverviewSections"]',
              'a[target="_blank"][aria-label="Ara"]',
              'span[data-automation="top-info-hours"] button',
            ],
            //can decrease or increase this number for high or low networks
            10000
          );
        } catch (error) {
          logAndAppendToFile(
            "error occurred while waiting for selectors error: " + error
          );
        }
        await newTab.screenshot({
          path: "screenshotnewtab.png",
          fullPage: true,
        });

        let openDatesData = <any>[];
        const dateClick = await newTab.$(
          'span[data-automation="top-info-hours"] button'
        );
        if (dateClick) {
          await newTab.evaluate(() => {
            const element = document.querySelector(
              'span[data-automation="top-info-hours"] button'
            );
            if (element) {
              (element as HTMLElement).focus();
            }
          });
          await newTab.keyboard.press("Enter");
          try {
            await newTab.waitForSelector('div[style*="top:"]', {
              timeout: 10000,
            }); // Increased timeout
            let openDatesDataQuery = await newTab.evaluate(() => {
              const rowsOfDates = Array.from(
                document.querySelectorAll(
                  'div[style*="top:"] > div > div > div > div'
                )
              );
              const dayArray = [
                { name: "Paz", modified: "Pazar" },
                { name: "Pzts", modified: "Pazartesi" },
                { name: "Sal", modified: "Salı" },
                { name: "Çar", modified: "Çarşamba" },
                { name: "Per", modified: "Perşembe" },
                { name: "Cum", modified: "Cuma" },
                { name: "Cts", modified: "Cumartesi" },
              ];
              return rowsOfDates.slice(1).map((row) => {
                let modifiedName = row.children[0]?.textContent?.trim();
                for (let i = 0; i < dayArray.length; i++) {
                  if (
                    dayArray[i].name === row.children[0]?.textContent?.trim()
                  ) {
                    modifiedName = dayArray[i].modified;
                    break;
                  }
                }
                return {
                  day: modifiedName,
                  hours: row.children[1]?.textContent?.trim(),
                };
              });
            });
            openDatesData.push(...openDatesDataQuery);
          } catch (error: any) {
            logAndAppendToFile(
              `Error while fetching open dates data: ${error.message}`
            );
            openDatesData = null;
          }
        } else {
          logAndAppendToFile("No date button found");
          openDatesData = null;
        }

        const restaurantInfoFromDetailedPage = await newTab.evaluate(() => {
          //make sure all of them can also get null
          const detailedTitle =
            document.querySelector(
              'div[data-test-target="restaurant-detail-info"] h1'
            )?.textContent || null;

          const ratingOverall = document.querySelector('a[href="#REVIEWS"] title')?.textContent?.substring(21) || null;
          const ratingOverallNumber =
            parseFloat(
              document.querySelector('a[href="#REVIEWS"] span')
                ?.textContent as string
            ).toString() || null;
          let isTripAdvisorVerified;
          if (
            document.querySelector(
              'div[data-test-target="restaurant-detail-info"] span'
            )?.textContent === "Doğrulandı"
          ) {
            isTripAdvisorVerified = true;
          } else {
            isTripAdvisorVerified = false;
          }
          const priceSelector = document
            .querySelector(
              'div[data-test-target="restaurant-detail-info"] > div:nth-child(2) > span:nth-child(3) > span '
            )
            ?.textContent?.includes("$")
            ? document.querySelector(
                'div[data-test-target="restaurant-detail-info"] > div:nth-child(2) > span:nth-child(3) > span '
              )?.textContent
            : null;

          const index = priceSelector === null ? 0 : 1;
          let categoryList = [] as any;
          Array.from(
            document.querySelectorAll(
              'div[data-test-target="restaurant-detail-info"] > div:nth-child(2) > span:nth-child(3) > span '
            )
          )
            .slice(index)
            .forEach((items, index, arr) => {
              if (!arr[index].textContent?.includes(",")) {
                categoryList.push({ category: arr[index].textContent?.trim() });
              } else {
                return null;
              }
            });

          const locationAddress =
            document.querySelectorAll(
              'a[target="_blank"][href^="https://maps.google.com/maps"]'
            )[
              document.querySelectorAll(
                'a[target="_blank"][href^="https://maps.google.com/maps"]'
              ).length - 1
            ].textContent || null;

          const telephoneNumber =
            document
              .querySelector(
                'div[data-test-target="restaurant-detail-info"] a[href^="tel"]'
              )
              ?.getAttribute("href")
              ?.substring(4) || null;

          const restaurantWebsiteLink =
            document
              .querySelector('a[target="_blank"][aria-label="Web sitesi"]')
              ?.getAttribute("href") || null;

          const restaurantEmail = document
            .querySelector('a[target="_blank"][aria-label="E-posta"]')
            ?.getAttribute("href")
            ?.startsWith("mailto")
            ? document
                .querySelector('a[target="_blank"][aria-label="E-posta"]')
                ?.getAttribute("href")
                ?.substring(7)
            : null;

          //menu newly added
          const restaurantMenuLink =
            document
              .querySelector(
                'span[data-automation="restaurantsMenuButton"] > a'
              )
              ?.getAttribute("href") || null;
          //these lat and lng wont probably get null
          let restaurantLat;
          document
            .querySelector('span[data-test-target="staticMapSnapshot"] > img')
            ?.getAttribute("src")
            ?.split("&")
            .forEach((item, index, arr) => {
              if (arr[index].includes("center")) {
                restaurantLat = parseFloat(
                  arr[index].split("=")[1].split(",")[0]
                );
              }
            });
          let restaurantLng;
          document
            .querySelector('span[data-test-target="staticMapSnapshot"] > img')
            ?.getAttribute("src")
            ?.split("&")
            .forEach((item, index, arr) => {
              if (arr[index].includes("center")) {
                restaurantLng = parseFloat(
                  arr[index].split("=")[1].split(",")[1]
                );
              }
            });

          //potential error if children is not 5
          let generalFeatures = null;
          document
            .querySelectorAll('div[data-automation="OVERVIEW_TAB_ELEMENT"]')[1]
            .querySelectorAll("div")
            .forEach((item) => {
              if (item.textContent?.includes("ÖZELLİKLER")) {
                let parentNode = item.parentNode;
                let nextElement = (parentNode as HTMLElement)
                  .nextElementSibling;
                if (nextElement) {
                  generalFeatures = nextElement.textContent;
                } else {
                  generalFeatures = null;
                }
              }
            });
          let restaurantExplanation = null;

          // const dataWoow = {
          //   detailedTitle,
          //   ratingOverall,
          //   ratingOverallNumber,
          //   restaurantWebsiteLink,
          //   locationAddress,
          //   restaurantLat,
          //   restaurantLng,
          //   generalFeatures,
          //   priceSelector,
          //   telephoneNumber,
          //   restaurantEmail,

          //   isTripAdvisorVerified,
          //   categoryList,
          //   restaurantMenuLink,
          // };
          // logAndAppendToFile(JSON.stringify(dataWoow, null, 2));

          return {
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
            restaurantMenuLink,
            restaurantExplanation,

            isTripAdvisorVerified,
            categoryList,
          };
        });
        //Clicking on tab element
        if (
          restaurantInfoFromDetailedPage.generalFeatures === null ||
          restaurantInfoFromDetailedPage.restaurantExplanation === null
        ) {
          await newTab.evaluate(() => {
            let arr = document
              .querySelectorAll(
                'div[data-automation="OVERVIEW_TAB_ELEMENT"]'
              )[1]
              .querySelectorAll("button");
            arr[arr.length - 1].click();
          });
          await Promise.all([
            await newTab.waitForSelector('div[role="dialog"]'),
            await newTab.waitForSelector(
              'div[role="dialog"] button[data-automation="closeModal"]'
            ),
          ]);
          const result = await newTab.evaluate(() => {
            let match = null;
            let matchExp = null;
            document
              .querySelectorAll('div[role="dialog"] div')
              .forEach((item) => {
                if (item.textContent?.includes("ÖZELLİKLER")) {
                  let next = item.parentNode?.nextSibling;
                  if (next) {
                    match = next.textContent;
                  } else {
                    match = null;
                  }
                }
                if (item.textContent?.includes("Hakkında")) {
                  let next = item.parentNode?.nextSibling;
                  if (next) {
                    matchExp = next.textContent;
                  } else {
                    matchExp = null;
                  }
                }
              });
            (
              document.querySelector(
                'div[role="dialog"] button[data-automation="closeModal"]'
              ) as HTMLElement
            ).click();
            return { match, matchExp };
          });
          restaurantInfoFromDetailedPage.generalFeatures = result.match;
          restaurantInfoFromDetailedPage.restaurantExplanation =
            result.matchExp;
        }
        let allImageUrlData = <any>[];
        logAndAppendToFile("starting image fetching");
        const startTime = Date.now();
        let imageCount: number = 0;

        const handleImageFetchWhole = async (request: any) => {
          if (request.isInterceptResolutionHandled()) {
            return;
          }
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime > 10000) {
            request.continue();
            imageCount = -1;
            return;
          }
          if (
                (request.url().endsWith(".png") ||
                  request.url().endsWith(".jpg") || request.url().endsWith(".jpeg")) &&
                !request.url().includes("default-avatar")
              ) {
            allImageUrlData = [
              ...allImageUrlData,
              { url: request.url() },
            ].slice(0, 50);
            //can be changed for more images
            imageCount++;
            if (imageCount !== 0 && imageCount % 8 === 0) {
              await newTab.evaluate(() => {
                const element = document.querySelector(
                  'div[aria-label="Fotoğrafı görüntüleyin"]'
                );
                if (element) {
                  (
                    element.parentNode?.parentNode?.parentNode as HTMLElement
                  ).scrollBy(0, 800);
                }
              });
            }
            if (imageCount >= 50) {
              request.continue();
              return;
            }
          }

          request.continue();
        };
        await setTimeout(200 + Math.random() * 3000);
        try {
          await newTab.waitForSelector(
            'button[aria-label="Tüm fotoğraflara bakın"]',
            {
              timeout: 4000,
            }
          );
          //potential error if see all photos doesnt exist on no img restaurants
          await newTab.evaluate(() => {
            document
              .querySelector('button[aria-label="Tüm fotoğraflara bakın"]')
              ?.parentNode?.querySelectorAll('button[type="button"]')
              .forEach((i, index, arr) => {
                if (arr[index].textContent?.includes("Tümüne")) {
                  (arr[index] as HTMLElement).click();
                }
              });
          });
          //try ctach is important for potential errors while img fetch
          try {
            await newTab.on("request", handleImageFetchWhole);

            while (true) {
              if (
                imageCount >= 50 ||
                imageCount === -1 ||
                Date.now() - startTime > 10000
              ) {
                break;
              }
              //to not block event loop
              await setTimeout(100);
            }

            // await newTab.waitForSelector('div[style^="background-image"]');
            await setTimeout(1000);
            await newTab.waitForSelector(
              'button[aria-label="kapat"][type="button"]'
            );

            await newTab.evaluate(() => {
              (
                document.querySelector(
                  'button[aria-label="kapat"][type="button"]'
                ) as HTMLElement
              ).click();
            });
            await newTab.off("request", handleImageFetchWhole);
          } catch (error) {
            logAndAppendToFile("Error happened while img fetch on network: " + error);
          }
        } catch (error) {
          logAndAppendToFile(
            "This restaurant has lots of problem for images bruh here is the error: " +
              error
          );
        }

        let allReviewData = <any>[];
        try {
          await setTimeout(200 + Math.random() * 1000);

          await newTab.waitForSelector("#REVIEWS", {
            visible: true,
            timeout: 3000,
          });
          const startTime = Date.now();
          logAndAppendToFile(
            "Start time of review process: " + (startTime / 1000).toFixed(2)
          );

          while (true) {
            const reviewDataQuery = await newTab.evaluate(() => {
              const reviewElements = document.querySelectorAll(
                'div[data-automation="reviewCard"]'
              );
              if (reviewElements.length === 0) return null;

              const reviewDataColumns = Array.from(reviewElements, (item) => {
                const ratingValue =
                  parseInt(item?.children[1].textContent?.charAt(21) as any) ||
                  null;
                //clicking on daha fazlasını göster button
                try {
                  item
                    .querySelector(
                      'div[data-test-target="review-body"] > span > div'
                    )
                    ?.children[1].querySelector("button")
                    ?.click();
                } catch (error) {}
                //potential error if divs are not present
                let ratingContent = null;
                if(item.querySelector(
                  'div[data-test-target="review-body"] > span > div > div > div > span'
                )) {
                  ratingContent =
                    item
                      .querySelector(
                        'div[data-test-target="review-body"] > span > div > div > div > span'
                      )
                      ?.textContent?.trim() || null;
                }

                const ratingPerson =
                  item.querySelectorAll('a[target="_self"]')[1].textContent ||
                  null;

                const ratingPersonType =
                  (
                    item.querySelectorAll('a[target="_self"]')[1] as any
                  ).closest("div").children[1].textContent || null;
                let ratingDate = null;
                  if(item.lastElementChild?.children[0]) {
                    ratingDate =
                      item.lastElementChild?.children[0].textContent
                        ?.substring(17)
                        .trim() || null;
                  }
                  let ratingWithWho = null;
                if(item.children[3]) {
                  ratingWithWho =
                    item.children[3].textContent?.split("•")[1].trim() || null;
                }

                const ratingTitle =
                  item.querySelector('a[rel="noopener"]')?.textContent || null;

                const imgArray = [] as any;
                let ratingPics = null;
                const imgElements = item.querySelectorAll(
                  'picture[style="width: 100px; height: 100px;"] > img'
                );

                if (imgElements) {
                  imgElements.forEach((item, index, array) => {
                    imgArray.push(item.getAttribute("src"));
                  });
                  ratingPics = imgArray.join("£");
                } else {
                  ratingPics = null;
                }

                return {
                  ratingValue,
                  ratingContent,
                  ratingPerson,
                  ratingPersonType,
                  ratingDate,
                  ratingWithWho,
                  ratingTitle,
                  ratingPics,
                };
              });

              return reviewDataColumns;
            });

            if (!reviewDataQuery || reviewDataQuery.length === 0) {
              logAndAppendToFile("No more reviews found or unable to fetch reviews.");
              break;
            }

            allReviewData = [
              ...allReviewData,
              ...reviewDataQuery.map((item: any) => ({
                ratingValue: item.ratingValue,
                ratingContent: item.ratingContent,
                ratingPerson: item.ratingPerson,
                ratingPersonType: item.ratingPersonType,
                ratingDate: item.ratingDate,
                ratingWithWho: item.ratingWithWho,
                ratingTitle: item.ratingTitle,
                ratingPics: item.ratingPics,
              })),
            ].slice(0, 50);
            //can be changed for higher numbers

            if (allReviewData.length >= 50 || Date.now() - startTime > 10000) {
              logAndAppendToFile(
                "Review collection criteria met(10 seconds passed or 50 reviews collected), breaking loop."
              );
              break;
            }
            //try catch is important since nextpage button not appears on less reviews and should be breaked
            try {
              await newTab.waitForSelector('a[aria-label="Next page"]', {
                timeout: 3000,
              });
              await newTab.evaluate(() => {
                (
                  document.querySelector(
                    'a[aria-label="Next page"]'
                  ) as HTMLElement
                ).click();
              });
            } catch (error) {
              logAndAppendToFile(
                "No next review found. Breaking from review loop...: " + error
              );
              break;
            }
          }
        } catch (error) {
          if (error instanceof TimeoutError) {
            logAndAppendToFile(
              "No reviews found for this restaurant. Error: " + error
            );
            allReviewData = null; // Set to indicate no reviews were found
          } else {
            logAndAppendToFile("Error fetching review: " + error);
          }
        }
        const restaurantLink = await newTab.url();
        await newTab.close();
        await setTimeout(200 + Math.random() * 1000);

        const allOfTheData = {
          ...restaurantInfoFromDetailedPage,
          restaurantLink,
          images: allImageUrlData || null,
          reviews: allReviewData || null,
          openDates: openDatesData || null,
        };

        logAndAppendToFile(JSON.stringify(allOfTheData, null, 2 ));

        await axios
          .post("http://localhost:3001", allOfTheData)
          .then((response) => {
            if (response.status === 200) {
              logAndAppendToFile("savign to data was successful");
            }
          })
          .catch((error) => {
            if (error.response.status === 404) {
              logAndAppendToFile("error happened for savşng to db");
            }
          });
        logAndAppendToFile(
          "This restaurant has finished in " +
            ((Date.now() - fetchStartTime) / 1000).toFixed(2) +
            " seconds"
        );
      } catch (error) {
        //error happened while clicking on of the selectors so this tmeouts are fine
        logAndAppendToFile(
          "There has been a error occured for this selector: " +
            selector +
            " here is the error " +
            error
        );
        await setTimeout(4000);
        const pages = await browser.pages();
        await setTimeout(4000);
        logAndAppendToFile(pages.length);
        await setTimeout(4000);
        const newTab = pages[pages.length - 1];
        await setTimeout(4000);
        await newTab.close();
      }
    }
    //chencged form 2000 to 500
    await setTimeout(1000);
    const closingEnglishLanguageModal = await page.$('button[data-automation="closeModal"]')
    if(closingEnglishLanguageModal) {
      await closingEnglishLanguageModal.click()
    }
    await page.waitForSelector('a[aria-label="Next page"]', {timeout: 120000})
    const nextPageButton = await page.$('a[aria-label="Next page"]');
    await nextPageButton?.scrollIntoView()
    if (nextPageButton) {
      await Promise.all([ 
        page.evaluate(() => {
          
          (document.querySelector('a[aria-label="Next page"]') as HTMLElement).click()
        })
        ,setTimeout(5000)]);
      logAndAppendToFile("clicked to the next button");
    } else {
      logAndAppendToFile("reached to the end");
      hasNext = false;
    }
  }
}

getAllResults();
