/**
 * Triggers a download of a file
 * @param url from where to get the file to download
 * @param fileName that should be used for the download, if not given, the filename from url is used
 */
declare const downloadFile: (url: string, fileName?: string) => void
export { downloadFile }
