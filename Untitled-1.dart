//opening all details page
        // console.log( typeof restaurantInfoFromDetailedPage.generalFeatures)
        // console.log( restaurantInfoFromDetailedPage.generalFeatures)
        // if(restaurantInfoFromDetailedPage.generalFeatures === null ) {
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
      await newTab.waitForSelector('div[role="dialog"] button[data-automation="closeModal"]'),
    ])
    const result = await newTab.evaluate(() => {
      let match;
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
          });
          (document.querySelector('div[role="dialog"] button[data-automation="closeModal"]') as HTMLElement).click() 
          return match;
      })
      restaurantInfoFromDetailedPage.generalFeatures = result;
    }