import { TypeOfUserAction, TypeOfVideoAction } from "@/Types";
import * as VideosConstants from "../constants/VideosConstants";

// Get All Videos
export const getAllVideoReducer = (
  state = { videos: [] },
  action: TypeOfVideoAction
) => {
  switch (action.type) {
    case VideosConstants.USER_GET_ALL_VIDEO_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_GET_ALL_VIDEO_SUCCESS:
      return { isLoading: false, isSuccess: true, videos: action.payload };
    case VideosConstants.USER_GET_ALL_VIDEO_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_GET_ALL_VIDEO_RESET:
      return {};
    default:
      return state;
  }
};

// Get User Private Videos of the users
export const usePrivateVideosReducer = (
  state = { privateVideo: [] },
  action: TypeOfUserAction
) => {
  switch (action.type) {
    case VideosConstants.USER_GET_PRIVATE_VIDEOS_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_GET_PRIVATE_VIDEOS_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        privateVideo: action.payload,
      };
    case VideosConstants.USER_GET_PRIVATE_VIDEOS_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_GET_PRIVATE_VIDEOS_RESET:
      return {};
    default:
      return state;
  }
};

// Get Video By Id
export const getVideoByIdReducer = (
  state = { video: {} },
  action: TypeOfVideoAction
) => {
  switch (action.type) {
    case VideosConstants.USER_GET_VIDEO_BY_ID_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_GET_VIDEO_BY_ID_SUCCESS:
      return { isLoading: false, isSuccess: true, video: action.payload };
    case VideosConstants.USER_GET_VIDEO_BY_ID_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_GET_VIDEO_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

// Add New Video
export const addNewVideoReducer = (state = {}, action: TypeOfVideoAction) => {
  switch (action.type) {
    case VideosConstants.USER_ADD_NEW_VIDEO_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_ADD_NEW_VIDEO_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case VideosConstants.USER_ADD_NEW_VIDEO_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_ADD_NEW_VIDEO_RESET:
      return {};
    default:
      return state;
  }
};

// Update Video
export const updateVideoReducer = (state = {}, action: TypeOfVideoAction) => {
  switch (action.type) {
    case VideosConstants.USER_UPDATE_VIDEO_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_UPDATE_VIDEO_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case VideosConstants.USER_UPDATE_VIDEO_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_UPDATE_VIDEO_RESET:
      return {};
    default:
      return state;
  }
};

// Delete Video
export const deleteVideoReducer = (state = {}, action: TypeOfVideoAction) => {
  switch (action.type) {
    case VideosConstants.USER_DELETE_VIDEO_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_DELETE_VIDEO_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case VideosConstants.USER_DELETE_VIDEO_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_DELETE_VIDEO_RESET:
      return {};
    default:
      return state;
  }
};

//==================== Music Reducers ====================

export const getAllMusicReducer = (
  state = { musics: [] },
  action: TypeOfVideoAction
) => {
  switch (action.type) {
    case VideosConstants.USER_GET_ALL_MUSIC_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_GET_ALL_MUSIC_SUCCESS:
      return { isLoading: false, isSuccess: true, musics: action.payload };
    case VideosConstants.USER_GET_ALL_MUSIC_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_GET_ALL_MUSIC_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllPrivateMusicReducer = (
  state = { privateMusics: [] },
  action: TypeOfVideoAction
) => {
  switch (action.type) {
    case VideosConstants.USER_GET_ALL_PRIVATE_MUSIC_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_GET_ALL_PRIVATE_MUSIC_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        privateMusics: action.payload,
      };
    case VideosConstants.USER_GET_ALL_PRIVATE_MUSIC_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_GET_ALL_PRIVATE_MUSIC_RESET:
      return {};
    default:
      return state;
  }
};

export const deletePrivateMusicReducer = (
  state = {},
  action: TypeOfVideoAction
) => {
  switch (action.type) {
    case VideosConstants.USER_DELETE_PRIVATE_MUSIC_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_DELETE_PRIVATE_MUSIC_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case VideosConstants.USER_DELETE_PRIVATE_MUSIC_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_DELETE_PRIVATE_MUSIC_RESET:
      return {};
    default:
      return state;
  }
};

//==================== Photo Reducers ====================

export const getAllPrivatePhotoReducer = (
  state = { privatePhotos: [] },
  action: TypeOfVideoAction
) => {
  switch (action.type) {
    case VideosConstants.USER_GET_ALL_PRIVATE_PHOTO_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_GET_ALL_PRIVATE_PHOTO_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        privatePhotos: action.payload,
      };
    case VideosConstants.USER_GET_ALL_PRIVATE_PHOTO_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_GET_ALL_PRIVATE_PHOTO_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllPhotoReducer = (
  state = { photos: [] },
  action: TypeOfVideoAction
) => {
  switch (action.type) {
    case VideosConstants.USER_GET_ALL_PHOTO_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_GET_ALL_PHOTO_SUCCESS:
      return { isLoading: false, isSuccess: true, photos: action.payload };
    case VideosConstants.USER_GET_ALL_PHOTO_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_GET_ALL_PHOTO_RESET:
      return {};
    default:
      return state;
  }
};

export const deletePrivatePhotoReducer = (
  state = {},
  action: TypeOfVideoAction
) => {
  switch (action.type) {
    case VideosConstants.USER_DELETE_PRIVATE_PHOTO_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_DELETE_PRIVATE_PHOTO_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case VideosConstants.USER_DELETE_PRIVATE_PHOTO_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_DELETE_PRIVATE_PHOTO_RESET:
      return {};
    default:
      return state;
  }
};

// =================== Document Reducers ====================

export const getAllPrivateDocumentReducer = (
  state = { privateDocuments: [] },
  action: TypeOfVideoAction
) => {
  switch (action.type) {
    case VideosConstants.USER_GET_ALL_PRIVATE_DOCUMENT_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_GET_ALL_PRIVATE_DOCUMENT_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        privateDocuments: action.payload,
      };
    case VideosConstants.USER_GET_ALL_PRIVATE_DOCUMENT_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_GET_ALL_PRIVATE_DOCUMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllDocumentReducer = (
  state = { documents: [] },
  action: TypeOfVideoAction
) => {
  switch (action.type) {
    case VideosConstants.USER_GET_ALL_DOCUMENTS_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_GET_ALL_DOCUMENTS_SUCCESS:
      return { isLoading: false, isSuccess: true, documents: action.payload };
    case VideosConstants.USER_GET_ALL_DOCUMENTS_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_GET_ALL_DOCUMENTS_RESET:
      return {};
    default:
      return state;
  }
};

export const deletePrivateDocumentReducer = (
  state = {},
  action: TypeOfVideoAction
) => {
  switch (action.type) {
    case VideosConstants.USER_DELETE_PRIVATE_DOCUMENTS_REQUEST:
      return { isLoading: true };
    case VideosConstants.USER_DELETE_PRIVATE_DOCUMENTS_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case VideosConstants.USER_DELETE_PRIVATE_DOCUMENTS_FAIL:
      return { isLoading: false, isError: action.payload };
    case VideosConstants.USER_DELETE_PRIVATE_DOCUMENTS_RESET:
      return {};
    default:
      return state;
  }
};
