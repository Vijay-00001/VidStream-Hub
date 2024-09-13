import { TypeOfContent, TypeOfDocs, TypeOfMusic, TypeOfPhoto } from "@/Types";
import Axios from "./Axios";

// ================ USER VIDEOS API CALLS ===================

// Get All Videos API call
export const getAllVideos = async () => {
  const { data } = await Axios.get("/video-info-user");
  return data;
};

// Get All Private Videos API call
export const GetAllPrivateVideos = async (token: string) => {
  const { data } = await Axios.get("/video-info-user/user/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// Get Video By Id API call
export const getVideoById = async (id: string) => {
  const { data } = await Axios.get(`/video-info-user/${id}`);
  return data;
};

// Upload Video API call
export const UploadVideo = async (video: TypeOfContent, token: string) => {
  const { data } = await Axios.post("/video-info-user", video, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// Update Video API call
export const UpdateVideo = async (
  video_id: string,
  data: TypeOfContent,
  token: string
) => {
  const { data: response } = await Axios.put(
    `/video-info-user/${video_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

// Delete Video API call
export const deleteVideoById = async (music_id: string, token: string) => {
  const { data } = await Axios.delete(`/video-info-user/${music_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// ================ MUSIC VIDEOS API CALLS ===================

export const getAllPrivateMusic = async (token: string) => {
  const { data } = await Axios.get("/music-info-user/user/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getAllMusic = async () => {
  const { data } = await Axios.get("/music-info-user");
  return data;
};

export const getMusicById = async (id: string) => {
  const { data } = await Axios.get(`/music-info-user/${id}`);
  return data;
};

export const UploadMusic = async (
  musicInfo: TypeOfMusic | any,
  token: string
) => {
  const { data } = await Axios.post("/music-info-user", musicInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const UpdateMusic = async (
  music_id: string,
  data: TypeOfMusic,
  token: string
) => {
  const { data: response } = await Axios.put(
    `/music-info-user/${music_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteMusicById = async (music_id: string, token: string) => {
  const { data } = await Axios.delete(`/music-info-user/${music_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// ================ PHOTO VIDEOS API CALLS ===================

export const getAllPrivatePhoto = async (token: string) => {
  const { data } = await Axios.get("/photo-info-user/user/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getAllPhotos = async () => {
  const { data } = await Axios.get("/photo-info-user");
  return data;
};

export const getPhotoById = async (id: string) => {
  const { data } = await Axios.get(`/photo-info-user/${id}`);
  return data;
};

export const UploadPhoto = async (
  photoInfo: TypeOfPhoto | any,
  token: string
) => {
  const { data } = await Axios.post("/photo-info-user", photoInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const UpdatePhoto = async (
  photo_id: string,
  data: TypeOfPhoto,
  token: string
) => {
  const { data: response } = await Axios.put(
    `/photo-info-user/${photo_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deletePhotoById = async (photo_id: string, token: string) => {
  const { data } = await Axios.delete(`/photo-info-user/${photo_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// ================ DOCUMENTS VIDEOS API CALLS ===================

export const getAllPrivateDocuments = async (token: string) => {
  const { data } = await Axios.get("/docs-info-user/user/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getAllDocuments = async () => {
  const { data } = await Axios.get("/docs-info-user");
  return data;
};

export const getDocumentById = async (id: string) => {
  const { data } = await Axios.get(`/docs-info-user/${id}`);
  return data;
};

export const UploadDocument = async (
  document: TypeOfContent,
  token: string
) => {
  const { data } = await Axios.post("/docs-info-user", document, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const UpdateDocument = async (
  doc_id: string,
  data: TypeOfDocs,
  token: string
) => {
  const { data: response } = await Axios.put(
    `/docs-info-user/${doc_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteDocumentById = async (doc_id: string, token: string) => {
  const { data } = await Axios.delete(`/docs-info-user/${doc_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
