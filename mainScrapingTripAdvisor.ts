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
var headless_mode = process.argv[2];

async function getAllResults() {
  console.log("hadi başlayalım");
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    slowMo: 0,
    args: [
      "--window-size=1400,900",
    "--remote-debugging-port=9222",
    "--remote-debugging-address=0.0.0.0", // You know what your doing?
     "--disable-gpu",
    "--disable-features=IsolateOrigins,site-per-process",
    "--blink-settings=imagesEnabled=true",
    ],
  });
  const page = await browser.newPage();

  //www.tripadvisor.com/Restaurants-g293974-Istanbul.html,
  await page.setUserAgent("Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36")
  await page.goto(
    "https://www.tripadvisor.com/Restaurants-g293974-oa12000-Istanbul.html",
    {
      waitUntil: "networkidle0",
      timeout: 60000,
    }
  );
  await setTimeout((Math.random() * 3000) + 1000)

  const allData = <any>[];
  let hasNext = true;

  try {
    const buttonClick = await page.waitForSelector(
      "button#onetrust-accept-btn-handler",
      { timeout: 3000 }
    );
    if (buttonClick) {
      await page.click("button#onetrust-accept-btn-handler");
      console.log("Cookie acceptance button clicked successfully.");
    }
  } catch (error) {
    if (error instanceof TimeoutError) {
      console.log("Cookie acceptance button not found or not needed.");
    } else {
      console.error("Error occurred:", error);
    }
  }

  // while (!foundedDesiredName) {
  //   await page.waitForSelector(".vIjFZ");
  //   const selectors = await page.$$(".vIjFZ");
  //   const filteredSelectors = [] as any;
  //   //filtering out the ads from the whole selection array
  //   for (const selector of selectors) {
  //     const hasDescendant = await selector.evaluate((el, className) => {
  //       return Boolean(el.querySelector(`.${className}`));
  //     }, "biGQs._P.osNWb");

  //     if (!hasDescendant) {
  //       filteredSelectors.push(selector);
  //     }
  //   }
  //   for (const selector of filteredSelectors) {
  //     try {
  //       const restaurantSearchTitle = await page.evaluate((selectorr) => {
  //         return (
  //           selectorr.querySelector(".BMQDV._F.Gv.wSSLS.SwZTJ.FGwzt.ukgoS")
  //             .textContent || "no title"
  //         );
  //       }, selector);
  //       console.log(restaurantSearchTitle);
  //       if (restaurantSearchTitle.includes("2730.")) {
  //         foundedDesiredName = true;
  //         break;
  //       }
  //     } catch (error) {
  //       console.log("bruuh");
  //     }
  //   }
  //   const nextPageButton = await page.$('a[aria-label="Next page"]');
  //   if (nextPageButton) {
  //     await Promise.all([nextPageButton.click(), await setTimeout(6000)]);
  //     console.log("clicked to the next button");
  //   } else {
  //     console.log("reached to the end");
  //   }
  // }
// await setTimeout(999999)
  while (hasNext) {
    await page.waitForSelector(".vIjFZ");
    const selectors = await page.$$(".vIjFZ");
    const filteredSelectors = [] as any;
    //filtering out the ads from the whole selection array
    for (const selector of selectors) {
      const hasDescendant = await selector.evaluate((el, className) => {
        return Boolean(el.querySelector(`.${className}`));
      }, "biGQs._P.osNWb");

      if (!hasDescendant) {
        filteredSelectors.push(selector);
      }
    }
    console.log(filteredSelectors.length);
    console.log(selectors.length);
    await setTimeout(1000 +(Math.random() * 6000))

    for (const selector of filteredSelectors) {
      let newTab: any = null;
      let trials = 0;
      let maxTrials = 5;

      const fetchStartTime = new Date(Date.now());
      console.log("fetch start time: " + fetchStartTime);
      //general one restaurant try catch blcok
      try {
        const restaurantInfoFromListing = await page.evaluate((selectorr) => {
          const restaurantTitle =
            selectorr.querySelector(".BMQDV._F.Gv.wSSLS.SwZTJ.FGwzt.ukgoS")
              .textContent || "no title";
          return {
            restaurantTitle,
          };
        }, selector);
        //clicking to .BMQDV._F.Gv.wSSLS.SwZTJ.FGwzt.ukgoS opens new page
        try {
          const clickabelRestaurant = await selector.waitForSelector(
            ".BMQDV._F.Gv.wSSLS.SwZTJ.FGwzt.ukgoS",
            {
              timeout: 6000,
            }
          );
          if (clickabelRestaurant) {
            //timeout is important
            await setTimeout(1000);
            let newTabPromise = new Promise((resolve) =>
              browser.once("targetcreated", (target) => resolve(target.page()))
            ); // listen for the new tab
            //no matter what it should click so leave this as be
            try {
              await clickabelRestaurant.click();
            } catch (error) {
              await clickabelRestaurant.click();
            }
            // trying for 5 time to get newTab
            while (!newTab && trials < maxTrials) {
              trials++;
              newTab = await newTabPromise;
              if (newTab) {
                console.log("found a newTab");
                //setting interception in here for faster image fetch
                await newTab.setRequestInterception(true);
                break;
              } else {
                console.log("found a non newTab");
                await setTimeout(2000);
                const pages = await browser.pages();
                console.log(
                  "here is the length of browser pages just now: " +
                    pages.length
                );
                newTab = pages[pages.length - 1];
                console.log(
                  "reinitilized the new tab by looking the number of tabs"
                );
                //setting interception in here for faster image fetch
                await newTab.setRequestInterception(true);
              }
            }
          }
        } catch (error) {
          if (error instanceof TimeoutError) {
            console.log(
              "Some kind of error happened while trying to click here is the error: " +
                error
            );
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
        //     console.log("Previously fetched image URL:", request.url());
        //     previousImageRequests = [...previousImageRequests, request.url()];
        //     newTab.evaluate(() => {
        //       const height = document.querySelector("html")?.scrollHeight
        //       if(height) {
        //         document.querySelector("html")?.scrollBy(0, height)
        //       }
        //     })
        //     console.log(
        //       "Previously fetched image Array:",
        //       JSON.stringify(previousImageRequests, null, 2)
        //     );
        //   }
        //   request.continue();
        // };
        // await newTab.on("request", handleRequest);
        // await setTimeout(10000);
        // await newTab.off("request", handleRequest);
        // console.log("interception closed");
        // newTab.setRequestInterception(false).catch((error: any) => {
        //   console.error("Error disabling request interception:", error);
        // });
        // console.log(
        //   "Collected image requests during interception period:",
        //   previousImageRequests
        // );

        await setTimeout(1000 +(Math.random() * 6000))

        const waitForSelectors = async (
          page: any,
          selectors: any,
          timeout: any
        ) => {
          const selectorPromises = selectors.map((selector: any) =>
            page
              .waitForSelector(selector, { timeout })
              .catch(() => console.log(`${selector} not found within timeout.`))
          );
          await Promise.race([Promise.all(selectorPromises)]);
        };

        try {
          await waitForSelectors(
            newTab,
            [
              'h1[data-test-target="top-info-header"]', // for header
              ".DsyBj.cNFrA.AsyOO > a", // for restaurant menu link
              'div[data-tab="TABS_OVERVIEW"] > div > :nth-child(3) > div > div > :nth-child(5) > div > :nth-child(1) > a', // for website link
              'div[data-tab="TABS_OVERVIEW"] > div > :nth-child(3) > div > div > :nth-child(5) > :nth-child(2) > span > a ', // for menu links
            ],
            //can decrease or increase this number for high or low networks
            4000
          );
        } catch (error) {
          console.log("error occurred while waiting for selectors." + error);
        }

        const restaurantInfoFromDetailedPage = await newTab.evaluate(() => {
          //make sure all of them can also get null
          const restaurantTitleDetailed =
            document.querySelector('h1[data-test-target="top-info-header"]')
              ?.textContent || null;

          const titleElement = document.querySelector(
            "svg[aria-labelledby] > title"
          );
          const ratingOverall = titleElement ? titleElement.textContent : null;

          const reviewText = document.querySelector(".AfQtZ")?.textContent;
          const match = reviewText ? reviewText.match(/\d+/) : null;
          const ratingOverallNumber = match ? match[0] : null;

          const isTripAdvisorVerified = document.querySelector(
            ".XAnbq._S > span"
          )
            ? true
            : false;

          const isValidPriceSelector = document
            .querySelector(".DsyBj.DxyfE")
            ?.querySelector(":nth-child(1) ")?.textContent;

          const priceSelector = isValidPriceSelector?.includes("$")
            ? isValidPriceSelector
            : null;

          const index = priceSelector === null ? 0 : 1;
          const array = document.querySelectorAll(".dlMOJ");
          const categoryList = Array.from(array)
            .slice(index)
            .map((element) => {
              if (element.textContent) {
                return { category: element.textContent.trim() };
              } else {
                return null;
              }
            });

          const locationAddress =
            document
              .querySelector(".DsyBj.cNFrA > span")
              ?.querySelector(":nth-child(2)")?.textContent || null;

          const telephoneNumber =
            document.querySelector("span.AYHFM")?.textContent || null;

          const validWebsiteLink = document.querySelector(
            'div[data-tab="TABS_OVERVIEW"] > div > :nth-child(3) > div > div > :nth-child(5) > div > :nth-child(1) > a'
          );

          const restaurantWebsiteLink = validWebsiteLink
            ?.querySelector(":nth-child(2)")
            ?.textContent?.includes("Web")
            ? validWebsiteLink.getAttribute("href")
            : null;

          const validEmailLink = document.querySelector(
            'div[data-tab="TABS_OVERVIEW"] > div > :nth-child(3) > div > div > :nth-child(5) > :nth-child(2) > span > a '
          );
          let restaurantEmail;
          if (validEmailLink && validEmailLink.getAttribute("href")) {
            const mailLink = validEmailLink.getAttribute("href");
            if (mailLink?.endsWith("subject=?")) {
              restaurantEmail = validEmailLink
                .getAttribute("href")
                ?.slice(7, mailLink.length - 10);
            } else {
              restaurantEmail = validEmailLink.getAttribute("href")?.slice(7);
            }
          } else {
            restaurantEmail = null;
          }

          //menu newly added
          const restaurantMenuLink =
            document
              .querySelector(".DsyBj.cNFrA.AsyOO > a")
              ?.getAttribute("href") || null;
          const dataWoow = {
            restaurantTitleDetailed,
            ratingOverall,
            ratingOverallNumber,
            isTripAdvisorVerified,
            priceSelector,
            categoryList,
            locationAddress,
            telephoneNumber,
            restaurantWebsiteLink,
            restaurantEmail,
            restaurantMenuLink,
          };
          console.log(JSON.stringify(dataWoow, null, 2));

          return {
            restaurantTitleDetailed,
            ratingOverall,
            ratingOverallNumber,
            isTripAdvisorVerified,
            priceSelector,
            categoryList,
            locationAddress,
            telephoneNumber,
            restaurantWebsiteLink,
            restaurantEmail,
            restaurantMenuLink,
          };
        });

        let restaurantContent;
        restaurantContent = await newTab.evaluate(() => {
          //for some high cost restaurants detect content from another section
          const veryHighRestaurantsInfo = document.querySelector(
            'div[data-tab="TABS_DETAILS"] > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2)'
          );
          return veryHighRestaurantsInfo
            ? veryHighRestaurantsInfo.textContent
            : null;
        });
        try {
          if (!restaurantContent) {
            const clickableElementSelector =
              'div[data-tab="TABS_OVERVIEW"] > div > div:nth-child(2) > div > div > div:nth-child(3) > a';
            const clickableElement = await newTab.$(clickableElementSelector);

            if (clickableElement) {
              await clickableElement.click();
              await newTab.waitForSelector(".jmnaM", {
                visible: true,
                timeout: 1000,
              });
              restaurantContent = await newTab.evaluate(() => {
                return document.querySelector(".jmnaM")?.textContent || null;
              });
              //not works as expected sometimes so included two click funcs
              await newTab.waitForSelector('div[aria-label="Close"]');
              await newTab.evaluate(() => {
                const element = document.querySelector(
                  'div[aria-label="Close"]'
                );
                if (element instanceof HTMLElement) {
                  element.click();
                }
              });
              const closeClickElement = await newTab.$(
                'div[aria-label="Close"]'
              );
              await closeClickElement.click();
            } else {
              console.log("no clickable element can be found so content is null")
              restaurantContent = null
            }
          }
        } catch (error) {
          console.log("error happened for finding content: " + error);
          restaurantContent = null;
        }
        console.log("Here is the restaurant content " + restaurantContent);

        let allImageUrlData = <any>[];
        console.log("starting image fetching");
        const startTime = Date.now();

        const handleImageFetchWhole = (request: any) => {
          if (request.isInterceptResolutionHandled()) {
            return;
          }
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime > 20000) {
            request.continue();
            return;
          }
          if (
            (request.url().endsWith(".png") ||
              request.url().endsWith(".jpg")) &&
            !request.url().includes("default-avatar")
            // !previousImageRequests.includes(request.url())
          ) {
            allImageUrlData = [
              ...allImageUrlData,
              { url: request.url() },
            ].slice(0, 20);
            //can be changed for more images
          }

          request.continue();
        };

        try {
          await newTab.waitForSelector(
            'div[data-tab="TABS_PHOTOS"] > span > :nth-child(2)',
            {
              timeout: 4000,
            }
          );
          await newTab.evaluate(() => {
            const element = document.querySelector(
              'div[data-tab="TABS_PHOTOS"] > span > :nth-child(2)'
            );
            if (element instanceof HTMLElement) {
              element.click();
            }
            // else {
            //   const element = document.querySelector(
            //     'div[data-prwidget-name="common_basic_image"] > div > img'
            //   );
            //   if (element instanceof HTMLElement) {
            //     element.click();
            //   }
            // }
          });
          try {
            await newTab.on("request", handleImageFetchWhole);
            await newTab.waitForSelector(
              "#taplc_responsive_photoviewer_hotels_0 img"
            );
          } catch (error) {
            console.log("wow error" + error);
          }

          // await newTab.evaluate(() => {
          //   document.querySelector(".photoGridWrapper")?.scrollBy(0, 500);
          // })
          await newTab.waitForSelector(
            "#BODY_BLOCK_JQUERY_REFLOW > span > div.ui_close_x"
          );
          const buttonClick = await newTab.$(
            "#BODY_BLOCK_JQUERY_REFLOW > span > div.ui_close_x"
          );

          await buttonClick?.click();
        } catch (error) {
          console.log(
            "This restaurant has lots of problem for images bruh here is the error: " +
              error
          );
        }

        let allReviewData = <any>[];
        try {
          await newTab.waitForSelector(".review-container", {
            visible: true,
            timeout: 3000,
          });
          const startTime = Date.now();
          await newTab.off("request", handleImageFetchWhole);
          console.log("start time reservation" + startTime);

          while (true) {
            await newTab.evaluate(() => {
              const element = document.querySelector(".taLnk.ulBlueLinks");
              if (element instanceof HTMLElement) {
                element.click();
              }
            });
            //clicking to viewing more button
            await setTimeout(2000);

            const reviewDataQuery = await newTab.evaluate(() => {
              const reviewElements =
                document.querySelectorAll(".review-container");
              if (
                reviewElements.length === 0 ||
                !reviewElements ||
                reviewElements === undefined
              ) {
                return null;
              }

              const reviewDataColumns = Array.from(reviewElements, (item) => {
                const ratingElement = item.querySelector(".ui_bubble_rating");
                let ratingValue = 0; // default rating value
                if (ratingElement) {
                  if (ratingElement.classList.contains("bubble_50")) {
                    ratingValue = 5;
                  } else if (ratingElement.classList.contains("bubble_40")) {
                    ratingValue = 4;
                  } else if (ratingElement.classList.contains("bubble_30")) {
                    ratingValue = 3;
                  } else if (ratingElement.classList.contains("bubble_20")) {
                    ratingValue = 2;
                  } else if (ratingElement.classList.contains("bubble_10")) {
                    ratingValue = 1;
                  } else if (ratingElement.classList.contains("bubble_00")) {
                    ratingValue = 0;
                  }
                }
                let ratingContent =
                  item.querySelector(".partial_entry")?.textContent || null;
                let ratingPerson =
                  item.querySelector(".info_text.pointer_cursor > div")
                    ?.textContent || null;

                let ratingPersonType =
                  item.querySelector(".reviewerBadge.badge > span")
                    ?.textContent ||
                  item
                    .querySelector(
                      ".memberBadgingNoText.is-shown-at-tablet > span:nth-child(2)"
                    )
                    ?.textContent?.concat(" ", "reviews") ||
                  null;

                if (ratingContent !== null) {
                  ratingContent = ratingContent?.replace(/\n+/g, " ").trim();
                }
                return {
                  ratingValue,
                  ratingContent,
                  ratingPerson,
                  ratingPersonType,
                };
              });

              return reviewDataColumns;
            });

            if (!reviewDataQuery || reviewDataQuery.length === 0) {
              console.log("No more reviews found or unable to fetch reviews.");
              break;
            }

            allReviewData = [
              ...allReviewData,
              ...reviewDataQuery.map((item: any) => ({
                ratingValue: item.ratingValue,
                ratingContent: item.ratingContent,
                ratingPerson: item.ratingPerson,
                ratingPersonType: item.ratingPersonType,
              })),
            ].slice(0, 20);

            if (allReviewData.length >= 20 || Date.now() - startTime > 10000) {
              console.log("Review collection criteria met, breaking loop.");
              break;
            }

            await newTab.waitForSelector(".nav.next.ui_button.primary", {
              timeout: 2000,
            });

            await newTab.evaluate(() => {
              const nextButtonClick = document.querySelector(
                ".nav.next.ui_button.primary"
              );
              if (nextButtonClick instanceof HTMLElement) {
                nextButtonClick.click();
              }
            });
          }
        } catch (error) {
          if (error instanceof TimeoutError) {
            console.log("No reviews found for this restaurant.");
            allReviewData = null; // Set to indicate no images were found
          } else {
            // Log other errors
            console.error("Error fetching review:", error);
          }
        }

        await newTab.close();
        await setTimeout(500);

        const allOfTheData = {
          ...restaurantInfoFromDetailedPage,
          ...restaurantInfoFromListing,
          restaurantContent,
          images: allImageUrlData || null,
          reviews: allReviewData || null,
        };

        console.dir(allOfTheData, { depth: null });
        // fs.writeFileSync("trip.json", JSON.stringify(allData, null, 2));

        await axios
          .post("http://localhost:3001", allOfTheData)
          .then((response) => {
            if (response.status === 200) {
              console.log("savign to data was successful");
            }
          })
          .catch((error) => {
            if (error.response.status === 404) {
              console.log("error happened for savşng to db");
            }
          });
        // console.dir(allData, { depth: null });
        // console.log(
        //   "This restaurant has finished in " +
        //     (Date.now() - fetchStartTime) +
        //     "seconds"
        // );
      } catch (error) {
        console.log(
          "There has been a error occured for this selector: " +
            selector +
            " here is the error " +
            error
        );
        await setTimeout(4000);
        const pages = await browser.pages();
        await setTimeout(4000);
        console.log(pages.length);
        await setTimeout(4000);
        const newTab = pages[pages.length - 1];
        await setTimeout(4000);
        await newTab.close();
      }
    }
    //chencged form 2000 to 500
    await setTimeout(500);

    const nextPageButton = await page.$('a[aria-label="Next page"]');
    if (nextPageButton) {
      await Promise.all([nextPageButton.click(), await setTimeout(5000)]);
      console.log("clicked to the next button");
    } else {
      console.log("reached to the end");
      hasNext = false;
    }
  }
}

getAllResults();
