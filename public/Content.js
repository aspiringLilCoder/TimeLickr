const fullURL = window.location.hostname;
const shortURL = fullURL.split(".").slice(-2).join(".");
let taskArray;

chrome.storage.local.get(["key"]).then((result) => {
  taskArray = result.key;

  taskArray.forEach((task) => {
    console.log(task);
    if (
      new Date().getTime() >= new Date(task.startTime).getTime() &&
      new Date().getTime() <= new Date(task.endTime).getTime()
    ) {
      const allowOrBlock = task.allowOrBlock;
      const html =
        '<div style="color:#333; display: flex; flex-direction: column; align-items: center; justify-content: center; position:absolute; width:100%; height:100%; z-index:100; background-color:#BAF0FA; top:0; left:0;">' +
        `<p style="font-weight: bold; margin-top: 10px; font-size: 30px">Time is lickin\' by! Get back to work until ${new Date(
          task.endTime
        ).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })} ;)</p>` +
        "</div>";

      task.websiteList.forEach((website) => {
        if (allowOrBlock == "allow") {
          if (website === fullURL || website === shortURL) {
            console.log("in whitelist");
            return;
          } else {
            console.log("not in whitelist");
            document.body.innerHTML = html;
            return;
          }
        } else {
          if (website === fullURL || website === shortURL) {
            console.log("in block list");
            document.body.innerHTML = html;
            return;
          }
        }
      });
    }
  });
});
