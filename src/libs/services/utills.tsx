import FirebaseFileHandling from "./firebase/fileHandling";

export const GetTimestemp = () => {
  var today = new Date();
  return today.toISOString();
};

export const setFileinFirebase = async (
  file: File,
  folder_name: string,
  file_name: string
) => {
  const FileResponse = await FirebaseFileHandling.addFile(
    file,
    folder_name,
    file_name
  );
  if (FileResponse.status) {
    return FileResponse.downloadUrl;
  }
};
