"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var axios_1 = require("axios");
var puppeteer_1 = require("puppeteer");
var puppeteer_extra_1 = require("puppeteer-extra");
var puppeteer_extra_plugin_stealth_1 = require("puppeteer-extra-plugin-stealth");
var promises_1 = require("timers/promises");
var puppeteer_extra_2 = require("puppeteer-extra");
var puppeteer_extra_plugin_stealth_2 = require("puppeteer-extra-plugin-stealth");
puppeteer_extra_2["default"].use((0, puppeteer_extra_plugin_stealth_2["default"])());
var puppeteer_extra_plugin_adblocker_1 = require("puppeteer-extra-plugin-adblocker");
puppeteer_extra_2["default"].use((0, puppeteer_extra_plugin_adblocker_1["default"])({ blockTrackers: true }));
puppeteer_extra_1["default"].use((0, puppeteer_extra_plugin_stealth_1["default"])());
var body_parser_1 = require("body-parser");
var express_1 = require("express");
var prisma_1 = require("./prisma");
var app = (0, express_1["default"])();
var port = 3001;
var count = 0;
app.use(body_parser_1["default"].json());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, detailedTitle, ratingOverall, ratingOverallNumber, restaurantWebsiteLink, locationAddress, restaurantLat, restaurantLng, generalFeatures, priceSelector, telephoneNumber, restaurantEmail, restaurantLink, restaurantExplanation, isTripAdvisorVerified, categoryList, restaurantMenuLink, reviews, images, openDates, data, response, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, detailedTitle = _a.detailedTitle, ratingOverall = _a.ratingOverall, ratingOverallNumber = _a.ratingOverallNumber, restaurantWebsiteLink = _a.restaurantWebsiteLink, locationAddress = _a.locationAddress, restaurantLat = _a.restaurantLat, restaurantLng = _a.restaurantLng, generalFeatures = _a.generalFeatures, priceSelector = _a.priceSelector, telephoneNumber = _a.telephoneNumber, restaurantEmail = _a.restaurantEmail, restaurantLink = _a.restaurantLink, restaurantExplanation = _a.restaurantExplanation, isTripAdvisorVerified = _a.isTripAdvisorVerified, categoryList = _a.categoryList, restaurantMenuLink = _a.restaurantMenuLink, reviews = _a.reviews, images = _a.images, openDates = _a.openDates;
                data = __assign(__assign(__assign(__assign({ detailedTitle: detailedTitle, ratingOverall: ratingOverall, ratingOverallNumber: ratingOverallNumber, restaurantWebsiteLink: restaurantWebsiteLink, locationAddress: locationAddress, restaurantLat: restaurantLat, restaurantLng: restaurantLng, generalFeatures: generalFeatures, priceSelector: priceSelector, telephoneNumber: telephoneNumber, restaurantEmail: restaurantEmail, restaurantLink: restaurantLink, restaurantMenuLink: restaurantMenuLink, restaurantExplanation: restaurantExplanation, isTripAdvisorVerified: isTripAdvisorVerified }, (categoryList !== null
                    ? { categoryList: { create: categoryList } }
                    : {})), (reviews !== null ? { reviews: { create: reviews } } : {})), (images !== null ? { images: { create: images } } : {})), (openDates !== null ? { openDates: { create: openDates } } : {}));
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1["default"].restaurant.create({ data: data })];
            case 2:
                response = _b.sent();
                count++;
                console.log("Saved the restaurant! Here is the count: " + count);
                res.status(200).json(response);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error("Error creating restaurant:", error_1);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
function getAllResults() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, hasNext, selectors, filteredSelectors, _i, selectors_1, selector, hasDescendant, element, error_2, _loop_1, _a, filteredSelectors_1, selector, closingEnglishLanguageModal, nextPageButton;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("hadi başlayalım");
                    return [4 /*yield*/, puppeteer_extra_2["default"].launch({
                            headless: true,
                            defaultViewport: null,
                            args: [
                                "--no-sandbox",
                                "--start-maximized",
                                "--disable-features=site-per-process",
                            ]
                        })];
                case 1:
                    browser = _b.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _b.sent();
                    //www.tripadvisor.com/Restaurants-g293974-Istanbul.html,
                    return [4 /*yield*/, page.setUserAgent("Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36")];
                case 3:
                    //www.tripadvisor.com/Restaurants-g293974-Istanbul.html,
                    _b.sent();
                    return [4 /*yield*/, page.goto("https://www.tripadvisor.com.tr/Restaurants-g293974-Istanbul.html", {
                            waitUntil: "networkidle2",
                            timeout: 240000
                        })];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, (0, promises_1.setTimeout)(Math.random() * 1000 + 400)];
                case 5:
                    _b.sent();
                    hasNext = true;
                    _b.label = 6;
                case 6:
                    if (!hasNext) return [3 /*break*/, 35];
                    return [4 /*yield*/, (0, promises_1.setTimeout)(Math.random() * 1000 + 400)];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, page.waitForSelector('div[data-automation="searchResults"] > span')];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, page.$$('div[data-automation="searchResults"] > span')];
                case 9:
                    selectors = _b.sent();
                    filteredSelectors = [];
                    _i = 0, selectors_1 = selectors;
                    _b.label = 10;
                case 10:
                    if (!(_i < selectors_1.length)) return [3 /*break*/, 13];
                    selector = selectors_1[_i];
                    return [4 /*yield*/, selector.evaluate(function (el) {
                            var _a;
                            return Boolean((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes("sponsorlu"));
                        })];
                case 11:
                    hasDescendant = _b.sent();
                    if (!hasDescendant) {
                        filteredSelectors.push(selector);
                    }
                    _b.label = 12;
                case 12:
                    _i++;
                    return [3 /*break*/, 10];
                case 13:
                    console.log("Here is the normal restaurants with ad: " + selectors.length);
                    console.log("Here is the restaurants withoud ad: " + filteredSelectors.length);
                    //to avoid robot detection
                    return [4 /*yield*/, (0, promises_1.setTimeout)(1000 + Math.random() * 6000)];
                case 14:
                    //to avoid robot detection
                    _b.sent();
                    _b.label = 15;
                case 15:
                    _b.trys.push([15, 20, , 21]);
                    return [4 /*yield*/, page.$('button[id="onetrust-accept-btn-handler"]')];
                case 16:
                    element = _b.sent();
                    if (!element) return [3 /*break*/, 18];
                    return [4 /*yield*/, page.click('button[id="onetrust-accept-btn-handler"]')];
                case 17:
                    _b.sent();
                    return [3 /*break*/, 19];
                case 18:
                    console.log("Button click not found for cookie");
                    _b.label = 19;
                case 19: return [3 /*break*/, 21];
                case 20:
                    error_2 = _b.sent();
                    console.log("error happened for clicking cookie");
                    return [3 /*break*/, 21];
                case 21:
                    _loop_1 = function (selector) {
                        var newTab, fetchStartTime, clickableRestaurant, link, pages, error_3, waitForSelectors, error_4, openDatesData, dateClick, openDatesDataQuery, error_5, restaurantInfoFromDetailedPage, _c, _d, _e, result, allImageUrlData_1, startTime_1, imageCount_1, handleImageFetchWhole, error_6, error_7, allReviewData, startTime_2, reviewDataQuery, error_8, error_9, restaurantLink, allOfTheData, error_10, pages, newTab_1;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    newTab = null;
                                    fetchStartTime = Date.now();
                                    console.log("Start time for one restaurant: " + (fetchStartTime / 1000).toFixed(2));
                                    _f.label = 1;
                                case 1:
                                    _f.trys.push([1, 71, , 78]);
                                    _f.label = 2;
                                case 2:
                                    _f.trys.push([2, 12, , 13]);
                                    return [4 /*yield*/, selector.waitForSelector("a", {
                                            timeout: 6000
                                        })];
                                case 3:
                                    clickableRestaurant = _f.sent();
                                    return [4 /*yield*/, clickableRestaurant.evaluate(function (el) {
                                            return el.getAttribute("href");
                                        })];
                                case 4:
                                    link = _f.sent();
                                    console.log("Here is the link: " + link);
                                    return [4 /*yield*/, browser.newPage()];
                                case 5:
                                    _f.sent();
                                    return [4 /*yield*/, (0, promises_1.setTimeout)(1000)];
                                case 6:
                                    _f.sent();
                                    return [4 /*yield*/, browser.pages()];
                                case 7:
                                    pages = _f.sent();
                                    return [4 /*yield*/, (0, promises_1.setTimeout)(1000)];
                                case 8:
                                    _f.sent();
                                    newTab = pages[pages.length - 1];
                                    return [4 /*yield*/, newTab.setUserAgent("Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36")];
                                case 9:
                                    _f.sent();
                                    return [4 /*yield*/, newTab.goto("https://www.tripadvisor.com.tr".concat(link), {
                                            waitUntil: "domcontentloaded",
                                            timeout: 240000
                                        })];
                                case 10:
                                    _f.sent();
                                    return [4 /*yield*/, newTab.bringToFront()];
                                case 11:
                                    _f.sent();
                                    console.log("clicked for new tab");
                                    return [3 /*break*/, 13];
                                case 12:
                                    error_3 = _f.sent();
                                    if (error_3 instanceof puppeteer_1.TimeoutError) {
                                        console.log("Some kind of error happened while trying to click here is the error: " +
                                            error_3);
                                    }
                                    else {
                                        console.log("Error happened while initiliazing new tab: " + error_3);
                                    }
                                    return [3 /*break*/, 13];
                                case 13: 
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
                                return [4 /*yield*/, (0, promises_1.setTimeout)(1000 + Math.random() * 6000)];
                                case 14:
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
                                    _f.sent();
                                    waitForSelectors = function (page, selectors, timeout) { return __awaiter(_this, void 0, void 0, function () {
                                        var selectorPromises;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    selectorPromises = selectors.map(function (selector) {
                                                        return page
                                                            .waitForSelector(selector, { timeout: timeout })["catch"](function () { return console.log("".concat(selector, " not found within timeout.")); });
                                                    });
                                                    return [4 /*yield*/, Promise.race([Promise.all(selectorPromises)])];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); };
                                    _f.label = 15;
                                case 15:
                                    _f.trys.push([15, 17, , 18]);
                                    return [4 /*yield*/, waitForSelectors(newTab, [
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
                                        10000)];
                                case 16:
                                    _f.sent();
                                    return [3 /*break*/, 18];
                                case 17:
                                    error_4 = _f.sent();
                                    console.log("error occurred while waiting for selectors error: " + error_4);
                                    return [3 /*break*/, 18];
                                case 18: return [4 /*yield*/, newTab.screenshot({
                                        path: "screenshotnewtab.png",
                                        fullPage: true
                                    })];
                                case 19:
                                    _f.sent();
                                    openDatesData = [];
                                    return [4 /*yield*/, newTab.$('span[data-automation="top-info-hours"] button')];
                                case 20:
                                    dateClick = _f.sent();
                                    if (!dateClick) return [3 /*break*/, 28];
                                    return [4 /*yield*/, newTab.evaluate(function () {
                                            var element = document.querySelector('span[data-automation="top-info-hours"] button');
                                            if (element) {
                                                element.focus();
                                            }
                                        })];
                                case 21:
                                    _f.sent();
                                    return [4 /*yield*/, newTab.keyboard.press("Enter")];
                                case 22:
                                    _f.sent();
                                    _f.label = 23;
                                case 23:
                                    _f.trys.push([23, 26, , 27]);
                                    return [4 /*yield*/, newTab.waitForSelector('div[style*="top:"]', {
                                            timeout: 10000
                                        })];
                                case 24:
                                    _f.sent(); // Increased timeout
                                    return [4 /*yield*/, newTab.evaluate(function () {
                                            var rowsOfDates = Array.from(document.querySelectorAll('div[style*="top:"] > div > div > div > div'));
                                            var dayArray = [
                                                { name: "Paz", modified: "Pazar" },
                                                { name: "Pzts", modified: "Pazartesi" },
                                                { name: "Sal", modified: "Salı" },
                                                { name: "Çar", modified: "Çarşamba" },
                                                { name: "Per", modified: "Perşembe" },
                                                { name: "Cum", modified: "Cuma" },
                                                { name: "Cts", modified: "Cumartesi" },
                                            ];
                                            return rowsOfDates.slice(1).map(function (row) {
                                                var _a, _b, _c, _d, _e, _f;
                                                var modifiedName = (_b = (_a = row.children[0]) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
                                                for (var i = 0; i < dayArray.length; i++) {
                                                    if (dayArray[i].name === ((_d = (_c = row.children[0]) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim())) {
                                                        modifiedName = dayArray[i].modified;
                                                        break;
                                                    }
                                                }
                                                return {
                                                    day: modifiedName,
                                                    hours: (_f = (_e = row.children[1]) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.trim()
                                                };
                                            });
                                        })];
                                case 25:
                                    openDatesDataQuery = _f.sent();
                                    openDatesData.push.apply(openDatesData, openDatesDataQuery);
                                    return [3 /*break*/, 27];
                                case 26:
                                    error_5 = _f.sent();
                                    console.log("Error while fetching open dates data: ".concat(error_5.message));
                                    openDatesData = null;
                                    return [3 /*break*/, 27];
                                case 27: return [3 /*break*/, 29];
                                case 28:
                                    console.log("No date button found");
                                    openDatesData = null;
                                    _f.label = 29;
                                case 29: return [4 /*yield*/, newTab.evaluate(function () {
                                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
                                        //make sure all of them can also get null
                                        var detailedTitle = ((_a = document.querySelector('div[data-test-target="restaurant-detail-info"] h1')) === null || _a === void 0 ? void 0 : _a.textContent) || null;
                                        var ratingOverall = ((_c = (_b = document
                                            .querySelector('a[href="#REVIEWS"] title')) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.charAt(0)) || null;
                                        var ratingOverallNumber = parseFloat((_d = document.querySelector('a[href="#REVIEWS"] span')) === null || _d === void 0 ? void 0 : _d.textContent).toString() || null;
                                        var isTripAdvisorVerified;
                                        if (((_e = document.querySelector('div[data-test-target="restaurant-detail-info"] span')) === null || _e === void 0 ? void 0 : _e.textContent) === "Doğrulandı") {
                                            isTripAdvisorVerified = true;
                                        }
                                        else {
                                            isTripAdvisorVerified = false;
                                        }
                                        var priceSelector = ((_g = (_f = document
                                            .querySelector('div[data-test-target="restaurant-detail-info"] > div:nth-child(2) > span:nth-child(3) > span ')) === null || _f === void 0 ? void 0 : _f.textContent) === null || _g === void 0 ? void 0 : _g.includes("$"))
                                            ? (_h = document.querySelector('div[data-test-target="restaurant-detail-info"] > div:nth-child(2) > span:nth-child(3) > span ')) === null || _h === void 0 ? void 0 : _h.textContent
                                            : null;
                                        var index = priceSelector === null ? 0 : 1;
                                        var categoryList = [];
                                        Array.from(document.querySelectorAll('div[data-test-target="restaurant-detail-info"] > div:nth-child(2) > span:nth-child(3) > span '))
                                            .slice(index)
                                            .forEach(function (items, index, arr) {
                                            var _a, _b;
                                            if (!((_a = arr[index].textContent) === null || _a === void 0 ? void 0 : _a.includes(","))) {
                                                categoryList.push({ category: (_b = arr[index].textContent) === null || _b === void 0 ? void 0 : _b.trim() });
                                            }
                                            else {
                                                return null;
                                            }
                                        });
                                        var locationAddress = document.querySelectorAll('a[target="_blank"][href^="https://maps.google.com/maps"]')[document.querySelectorAll('a[target="_blank"][href^="https://maps.google.com/maps"]').length - 1].textContent || null;
                                        var telephoneNumber = ((_k = (_j = document
                                            .querySelector('div[data-test-target="restaurant-detail-info"] a[href^="tel"]')) === null || _j === void 0 ? void 0 : _j.getAttribute("href")) === null || _k === void 0 ? void 0 : _k.substring(4)) || null;
                                        var restaurantWebsiteLink = ((_l = document
                                            .querySelector('a[target="_blank"][aria-label="Web sitesi"]')) === null || _l === void 0 ? void 0 : _l.getAttribute("href")) || null;
                                        var restaurantEmail = ((_o = (_m = document
                                            .querySelector('a[target="_blank"][aria-label="E-posta"]')) === null || _m === void 0 ? void 0 : _m.getAttribute("href")) === null || _o === void 0 ? void 0 : _o.startsWith("mailto"))
                                            ? (_q = (_p = document
                                                .querySelector('a[target="_blank"][aria-label="E-posta"]')) === null || _p === void 0 ? void 0 : _p.getAttribute("href")) === null || _q === void 0 ? void 0 : _q.substring(7)
                                            : null;
                                        //menu newly added
                                        var restaurantMenuLink = ((_r = document
                                            .querySelector('span[data-automation="restaurantsMenuButton"] > a')) === null || _r === void 0 ? void 0 : _r.getAttribute("href")) || null;
                                        //these lat and lng wont probably get null
                                        var restaurantLat;
                                        (_t = (_s = document
                                            .querySelector('span[data-test-target="staticMapSnapshot"] > img')) === null || _s === void 0 ? void 0 : _s.getAttribute("src")) === null || _t === void 0 ? void 0 : _t.split("&").forEach(function (item, index, arr) {
                                            if (arr[index].includes("center")) {
                                                restaurantLat = parseFloat(arr[index].split("=")[1].split(",")[0]);
                                            }
                                        });
                                        var restaurantLng;
                                        (_v = (_u = document
                                            .querySelector('span[data-test-target="staticMapSnapshot"] > img')) === null || _u === void 0 ? void 0 : _u.getAttribute("src")) === null || _v === void 0 ? void 0 : _v.split("&").forEach(function (item, index, arr) {
                                            if (arr[index].includes("center")) {
                                                restaurantLng = parseFloat(arr[index].split("=")[1].split(",")[1]);
                                            }
                                        });
                                        //potential error if children is not 5
                                        var generalFeatures = null;
                                        document
                                            .querySelectorAll('div[data-automation="OVERVIEW_TAB_ELEMENT"]')[1]
                                            .querySelectorAll("div")
                                            .forEach(function (item) {
                                            var _a;
                                            if ((_a = item.textContent) === null || _a === void 0 ? void 0 : _a.includes("ÖZELLİKLER")) {
                                                var parentNode = item.parentNode;
                                                var nextElement = parentNode
                                                    .nextElementSibling;
                                                if (nextElement) {
                                                    generalFeatures = nextElement.textContent;
                                                }
                                                else {
                                                    generalFeatures = null;
                                                }
                                            }
                                        });
                                        var restaurantExplanation = null;
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
                                        // console.log(JSON.stringify(dataWoow, null, 2));
                                        return {
                                            detailedTitle: detailedTitle,
                                            ratingOverall: ratingOverall,
                                            ratingOverallNumber: ratingOverallNumber,
                                            restaurantWebsiteLink: restaurantWebsiteLink,
                                            locationAddress: locationAddress,
                                            restaurantLat: restaurantLat,
                                            restaurantLng: restaurantLng,
                                            generalFeatures: generalFeatures,
                                            priceSelector: priceSelector,
                                            telephoneNumber: telephoneNumber,
                                            restaurantEmail: restaurantEmail,
                                            restaurantMenuLink: restaurantMenuLink,
                                            restaurantExplanation: restaurantExplanation,
                                            isTripAdvisorVerified: isTripAdvisorVerified,
                                            categoryList: categoryList
                                        };
                                    })];
                                case 30:
                                    restaurantInfoFromDetailedPage = _f.sent();
                                    if (!(restaurantInfoFromDetailedPage.generalFeatures === null ||
                                        restaurantInfoFromDetailedPage.restaurantExplanation === null)) return [3 /*break*/, 36];
                                    return [4 /*yield*/, newTab.evaluate(function () {
                                            var arr = document
                                                .querySelectorAll('div[data-automation="OVERVIEW_TAB_ELEMENT"]')[1]
                                                .querySelectorAll("button");
                                            arr[arr.length - 1].click();
                                        })];
                                case 31:
                                    _f.sent();
                                    _d = (_c = Promise).all;
                                    return [4 /*yield*/, newTab.waitForSelector('div[role="dialog"]')];
                                case 32:
                                    _e = [
                                        _f.sent()
                                    ];
                                    return [4 /*yield*/, newTab.waitForSelector('div[role="dialog"] button[data-automation="closeModal"]')];
                                case 33: return [4 /*yield*/, _d.apply(_c, [_e.concat([
                                            _f.sent()
                                        ])])];
                                case 34:
                                    _f.sent();
                                    return [4 /*yield*/, newTab.evaluate(function () {
                                            var match = null;
                                            var matchExp = null;
                                            document
                                                .querySelectorAll('div[role="dialog"] div')
                                                .forEach(function (item) {
                                                var _a, _b, _c, _d;
                                                if ((_a = item.textContent) === null || _a === void 0 ? void 0 : _a.includes("ÖZELLİKLER")) {
                                                    var next = (_b = item.parentNode) === null || _b === void 0 ? void 0 : _b.nextSibling;
                                                    if (next) {
                                                        match = next.textContent;
                                                    }
                                                    else {
                                                        match = null;
                                                    }
                                                }
                                                if ((_c = item.textContent) === null || _c === void 0 ? void 0 : _c.includes("Hakkında")) {
                                                    var next = (_d = item.parentNode) === null || _d === void 0 ? void 0 : _d.nextSibling;
                                                    if (next) {
                                                        matchExp = next.textContent;
                                                    }
                                                    else {
                                                        matchExp = null;
                                                    }
                                                }
                                            });
                                            document.querySelector('div[role="dialog"] button[data-automation="closeModal"]').click();
                                            return { match: match, matchExp: matchExp };
                                        })];
                                case 35:
                                    result = _f.sent();
                                    restaurantInfoFromDetailedPage.generalFeatures = result.match;
                                    restaurantInfoFromDetailedPage.restaurantExplanation =
                                        result.matchExp;
                                    _f.label = 36;
                                case 36:
                                    allImageUrlData_1 = [];
                                    console.log("starting image fetching");
                                    startTime_1 = Date.now();
                                    imageCount_1 = 0;
                                    handleImageFetchWhole = function (request) { return __awaiter(_this, void 0, void 0, function () {
                                        var elapsedTime;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (request.isInterceptResolutionHandled()) {
                                                        return [2 /*return*/];
                                                    }
                                                    elapsedTime = Date.now() - startTime_1;
                                                    if (elapsedTime > 10000) {
                                                        request["continue"]();
                                                        imageCount_1 = -1;
                                                        return [2 /*return*/];
                                                    }
                                                    if (!((request.url().endsWith(".png") ||
                                                        request.url().endsWith(".jpg")) &&
                                                        !request.url().includes("default-avatar"))) return [3 /*break*/, 3];
                                                    allImageUrlData_1 = __spreadArray(__spreadArray([], allImageUrlData_1, true), [
                                                        { url: request.url() },
                                                    ], false).slice(0, 50);
                                                    //can be changed for more images
                                                    imageCount_1++;
                                                    if (!(imageCount_1 !== 0 && imageCount_1 % 8 === 0)) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, newTab.evaluate(function () {
                                                            var _a, _b;
                                                            var element = document.querySelector('div[aria-label="Fotoğrafı görüntüleyin"]');
                                                            if (element) {
                                                                ((_b = (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode).scrollBy(0, 800);
                                                            }
                                                        })];
                                                case 1:
                                                    _a.sent();
                                                    _a.label = 2;
                                                case 2:
                                                    if (imageCount_1 >= 50) {
                                                        request["continue"]();
                                                        return [2 /*return*/];
                                                    }
                                                    _a.label = 3;
                                                case 3:
                                                    request["continue"]();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); };
                                    return [4 /*yield*/, (0, promises_1.setTimeout)(200 + Math.random() * 3000)];
                                case 37:
                                    _f.sent();
                                    _f.label = 38;
                                case 38:
                                    _f.trys.push([38, 52, , 53]);
                                    return [4 /*yield*/, newTab.waitForSelector('button[aria-label="Tüm fotoğraflara bakın"]', {
                                            timeout: 4000
                                        })];
                                case 39:
                                    _f.sent();
                                    //potential error if see all photos doesnt exist on no img restaurants
                                    return [4 /*yield*/, newTab.evaluate(function () {
                                            var _a, _b;
                                            (_b = (_a = document
                                                .querySelector('button[aria-label="Tüm fotoğraflara bakın"]')) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.querySelectorAll('button[type="button"]').forEach(function (i, index, arr) {
                                                var _a;
                                                if ((_a = arr[index].textContent) === null || _a === void 0 ? void 0 : _a.includes("Tümüne")) {
                                                    arr[index].click();
                                                }
                                            });
                                        })];
                                case 40:
                                    //potential error if see all photos doesnt exist on no img restaurants
                                    _f.sent();
                                    _f.label = 41;
                                case 41:
                                    _f.trys.push([41, 50, , 51]);
                                    return [4 /*yield*/, newTab.on("request", handleImageFetchWhole)];
                                case 42:
                                    _f.sent();
                                    _f.label = 43;
                                case 43:
                                    if (!true) return [3 /*break*/, 45];
                                    if (imageCount_1 >= 50 ||
                                        imageCount_1 === -1 ||
                                        Date.now() - startTime_1 > 10000) {
                                        return [3 /*break*/, 45];
                                    }
                                    //to not block event loop
                                    return [4 /*yield*/, (0, promises_1.setTimeout)(100)];
                                case 44:
                                    //to not block event loop
                                    _f.sent();
                                    return [3 /*break*/, 43];
                                case 45: 
                                // await newTab.waitForSelector('div[style^="background-image"]');
                                return [4 /*yield*/, (0, promises_1.setTimeout)(1000)];
                                case 46:
                                    // await newTab.waitForSelector('div[style^="background-image"]');
                                    _f.sent();
                                    return [4 /*yield*/, newTab.waitForSelector('button[aria-label="kapat"][type="button"]')];
                                case 47:
                                    _f.sent();
                                    return [4 /*yield*/, newTab.evaluate(function () {
                                            document.querySelector('button[aria-label="kapat"][type="button"]').click();
                                        })];
                                case 48:
                                    _f.sent();
                                    return [4 /*yield*/, newTab.off("request", handleImageFetchWhole)];
                                case 49:
                                    _f.sent();
                                    return [3 /*break*/, 51];
                                case 50:
                                    error_6 = _f.sent();
                                    console.log("Error happened while img fetch on network: " + error_6);
                                    return [3 /*break*/, 51];
                                case 51: return [3 /*break*/, 53];
                                case 52:
                                    error_7 = _f.sent();
                                    console.log("This restaurant has lots of problem for images bruh here is the error: " +
                                        error_7);
                                    return [3 /*break*/, 53];
                                case 53:
                                    allReviewData = [];
                                    _f.label = 54;
                                case 54:
                                    _f.trys.push([54, 65, , 66]);
                                    return [4 /*yield*/, (0, promises_1.setTimeout)(200 + Math.random() * 1000)];
                                case 55:
                                    _f.sent();
                                    return [4 /*yield*/, newTab.waitForSelector("#REVIEWS", {
                                            visible: true,
                                            timeout: 3000
                                        })];
                                case 56:
                                    _f.sent();
                                    startTime_2 = Date.now();
                                    console.log("Start time of review process: " + (startTime_2 / 1000).toFixed(2));
                                    _f.label = 57;
                                case 57:
                                    if (!true) return [3 /*break*/, 64];
                                    return [4 /*yield*/, newTab.evaluate(function () {
                                            var reviewElements = document.querySelectorAll('div[data-automation="reviewCard"]');
                                            if (reviewElements.length === 0)
                                                return null;
                                            var reviewDataColumns = Array.from(reviewElements, function (item) {
                                                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                                                var ratingValue = parseInt((_a = item === null || item === void 0 ? void 0 : item.children[1].textContent) === null || _a === void 0 ? void 0 : _a.charAt(21)) ||
                                                    null;
                                                //clicking on daha fazlasını göster button
                                                try {
                                                    (_c = (_b = item
                                                        .querySelector('div[data-test-target="review-body"] > span > div')) === null || _b === void 0 ? void 0 : _b.children[1].querySelector("button")) === null || _c === void 0 ? void 0 : _c.click();
                                                }
                                                catch (error) { }
                                                //potential error if divs are not present
                                                var ratingContent = ((_e = (_d = item
                                                    .querySelector('div[data-test-target="review-body"] > span > div > div > div > span')) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.trim()) || null;
                                                var ratingPerson = item.querySelectorAll('a[target="_self"]')[1].textContent ||
                                                    null;
                                                var ratingPersonType = item.querySelectorAll('a[target="_self"]')[1].closest("div").children[1].textContent || null;
                                                var ratingDate = ((_g = (_f = item.lastElementChild) === null || _f === void 0 ? void 0 : _f.children[0].textContent) === null || _g === void 0 ? void 0 : _g.substring(17).trim()) || null;
                                                var ratingWithWho = ((_h = item.children[3].textContent) === null || _h === void 0 ? void 0 : _h.split("•")[1].trim()) || null;
                                                var ratingTitle = ((_j = item.querySelector('a[rel="noopener"]')) === null || _j === void 0 ? void 0 : _j.textContent) || null;
                                                var imgArray = [];
                                                var ratingPics = null;
                                                var imgElements = item.querySelectorAll('picture[style="width: 100px; height: 100px;"] > img');
                                                if (imgElements) {
                                                    imgElements.forEach(function (item, index, array) {
                                                        imgArray.push(item.getAttribute("src"));
                                                    });
                                                    ratingPics = imgArray.join("£");
                                                }
                                                else {
                                                    ratingPics = null;
                                                }
                                                return {
                                                    ratingValue: ratingValue,
                                                    ratingContent: ratingContent,
                                                    ratingPerson: ratingPerson,
                                                    ratingPersonType: ratingPersonType,
                                                    ratingDate: ratingDate,
                                                    ratingWithWho: ratingWithWho,
                                                    ratingTitle: ratingTitle,
                                                    ratingPics: ratingPics
                                                };
                                            });
                                            return reviewDataColumns;
                                        })];
                                case 58:
                                    reviewDataQuery = _f.sent();
                                    if (!reviewDataQuery || reviewDataQuery.length === 0) {
                                        console.log("No more reviews found or unable to fetch reviews.");
                                        return [3 /*break*/, 64];
                                    }
                                    allReviewData = __spreadArray(__spreadArray([], allReviewData, true), reviewDataQuery.map(function (item) { return ({
                                        ratingValue: item.ratingValue,
                                        ratingContent: item.ratingContent,
                                        ratingPerson: item.ratingPerson,
                                        ratingPersonType: item.ratingPersonType,
                                        ratingDate: item.ratingDate,
                                        ratingWithWho: item.ratingWithWho,
                                        ratingTitle: item.ratingTitle,
                                        ratingPics: item.ratingPics
                                    }); }), true).slice(0, 50);
                                    //can be changed for higher numbers
                                    if (allReviewData.length >= 50 || Date.now() - startTime_2 > 10000) {
                                        console.log("Review collection criteria met(10 seconds passed or 50 reviews collected), breaking loop.");
                                        return [3 /*break*/, 64];
                                    }
                                    _f.label = 59;
                                case 59:
                                    _f.trys.push([59, 62, , 63]);
                                    return [4 /*yield*/, newTab.waitForSelector('a[aria-label="Next page"]', {
                                            timeout: 2000
                                        })];
                                case 60:
                                    _f.sent();
                                    return [4 /*yield*/, newTab.evaluate(function () {
                                            document.querySelector('a[aria-label="Next page"]').click();
                                        })];
                                case 61:
                                    _f.sent();
                                    return [3 /*break*/, 63];
                                case 62:
                                    error_8 = _f.sent();
                                    console.log("No next review found. Breaking from review loop...: " + error_8);
                                    return [3 /*break*/, 64];
                                case 63: return [3 /*break*/, 57];
                                case 64: return [3 /*break*/, 66];
                                case 65:
                                    error_9 = _f.sent();
                                    if (error_9 instanceof puppeteer_1.TimeoutError) {
                                        console.log("No reviews found for this restaurant. Error: " + error_9);
                                        allReviewData = null; // Set to indicate no reviews were found
                                    }
                                    else {
                                        console.error("Error fetching review: ", error_9);
                                    }
                                    return [3 /*break*/, 66];
                                case 66: return [4 /*yield*/, newTab.url()];
                                case 67:
                                    restaurantLink = _f.sent();
                                    return [4 /*yield*/, newTab.close()];
                                case 68:
                                    _f.sent();
                                    return [4 /*yield*/, (0, promises_1.setTimeout)(200 + Math.random() * 1000)];
                                case 69:
                                    _f.sent();
                                    allOfTheData = __assign(__assign({}, restaurantInfoFromDetailedPage), { restaurantLink: restaurantLink, images: allImageUrlData_1 || null, reviews: allReviewData || null, openDates: openDatesData || null });
                                    console.dir(allOfTheData, { depth: null });
                                    return [4 /*yield*/, axios_1["default"]
                                            .post("http://localhost:3001", allOfTheData)
                                            .then(function (response) {
                                            if (response.status === 200) {
                                                console.log("savign to data was successful");
                                            }
                                        })["catch"](function (error) {
                                            if (error.response.status === 404) {
                                                console.log("error happened for savşng to db");
                                            }
                                        })];
                                case 70:
                                    _f.sent();
                                    console.log("This restaurant has finished in " +
                                        ((Date.now() - fetchStartTime) / 1000).toFixed(2) +
                                        " seconds");
                                    return [3 /*break*/, 78];
                                case 71:
                                    error_10 = _f.sent();
                                    //error happened while clicking on of the selectors so this tmeouts are fine
                                    console.log("There has been a error occured for this selector: " +
                                        selector +
                                        " here is the error " +
                                        error_10);
                                    return [4 /*yield*/, (0, promises_1.setTimeout)(4000)];
                                case 72:
                                    _f.sent();
                                    return [4 /*yield*/, browser.pages()];
                                case 73:
                                    pages = _f.sent();
                                    return [4 /*yield*/, (0, promises_1.setTimeout)(4000)];
                                case 74:
                                    _f.sent();
                                    console.log(pages.length);
                                    return [4 /*yield*/, (0, promises_1.setTimeout)(4000)];
                                case 75:
                                    _f.sent();
                                    newTab_1 = pages[pages.length - 1];
                                    return [4 /*yield*/, (0, promises_1.setTimeout)(4000)];
                                case 76:
                                    _f.sent();
                                    return [4 /*yield*/, newTab_1.close()];
                                case 77:
                                    _f.sent();
                                    return [3 /*break*/, 78];
                                case 78: return [2 /*return*/];
                            }
                        });
                    };
                    _a = 0, filteredSelectors_1 = filteredSelectors;
                    _b.label = 22;
                case 22:
                    if (!(_a < filteredSelectors_1.length)) return [3 /*break*/, 25];
                    selector = filteredSelectors_1[_a];
                    return [5 /*yield**/, _loop_1(selector)];
                case 23:
                    _b.sent();
                    _b.label = 24;
                case 24:
                    _a++;
                    return [3 /*break*/, 22];
                case 25: 
                //chencged form 2000 to 500
                return [4 /*yield*/, (0, promises_1.setTimeout)(1000)];
                case 26:
                    //chencged form 2000 to 500
                    _b.sent();
                    return [4 /*yield*/, page.$('button[data-automation="closeModal"]')];
                case 27:
                    closingEnglishLanguageModal = _b.sent();
                    if (!closingEnglishLanguageModal) return [3 /*break*/, 29];
                    return [4 /*yield*/, closingEnglishLanguageModal.click()];
                case 28:
                    _b.sent();
                    _b.label = 29;
                case 29: return [4 /*yield*/, page.waitForSelector('a[aria-label="Next page"]')];
                case 30:
                    _b.sent();
                    return [4 /*yield*/, page.$('a[aria-label="Next page"]')];
                case 31:
                    nextPageButton = _b.sent();
                    if (!nextPageButton) return [3 /*break*/, 33];
                    return [4 /*yield*/, Promise.all([
                            page.evaluate(function () {
                                document.querySelector('a[aria-label="Next page"]').click();
                            }),
                            (0, promises_1.setTimeout)(5000)
                        ])];
                case 32:
                    _b.sent();
                    console.log("clicked to the next button");
                    return [3 /*break*/, 34];
                case 33:
                    console.log("reached to the end");
                    hasNext = false;
                    _b.label = 34;
                case 34: return [3 /*break*/, 6];
                case 35: return [2 /*return*/];
            }
        });
    });
}
getAllResults();
