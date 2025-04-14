/**
* Triggers a download of a file
* @param url from where to get the file to download
* @param fileName that should be used for the download, if not given, the filename from url is used
*/
const downloadFile = (url, fileName) => {
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.download = fileName || url.split("/").pop();
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
        link.parentNode.removeChild(link);
    }, 0);
};
export { downloadFile };
