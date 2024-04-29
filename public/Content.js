const fullURL = window.location.hostname;
const shortURL = fullURL.split(".").slice(-2).join(".");
let taskArray;

chrome.storage.local.get(["key"]).then((result) => {
  taskArray = result.key;

  taskArray.forEach((task) => {
    if (
      new Date().getTime() >= new Date(task.startTime).getTime() &&
      new Date().getTime() <= new Date(task.endTime).getTime()
    ) {
      const allowOrBlock = task.allowOrBlock;

      task.websiteList.forEach((website) => {
        if (allowOrBlock == "allow") {
          if (website === fullURL || website === shortURL) {
          } else {
            document.body.innerHTML =
              '<div style="color:white; display: flex; align-items: center; justify-content: center; position:absolute;width:100%;height:100%;z-index:100;background-color:black;top:0;left:0;">Get back to work :)</div>';
          }
        } else {
          if (website === fullURL || website === shortURL) {
            console.log("in block list");
            document.body.innerHTML =
              '<div style="color:white; display: flex; align-items: center; justify-content: center; position:absolute;width:100%;height:100%;z-index:100;background-color:black;top:0;left:0;">Get back to work :)</div>';
          }
        }
      });
    }
  });
});
