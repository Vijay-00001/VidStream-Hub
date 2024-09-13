import * as VideosServices from "../apis/VideosServices";
import { Dispatch } from "redux"; // Import Dispatch type from Redux if needed
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";
import { TypeOfAddContent, TypeOfDispatch, TypeOfErrors } from "@/Types";

// ======================Common Actions=========================

export const addNewContentAction =
  (data: TypeOfAddContent) =>
  async (dispatch: TypeOfDispatch, getState: object) => {
    const { title, description, isPublic, url, currentPage } = data;

    try {
      dispatch({ type: "USER_ADD_NEW_VIDEO_REQUEST" });
      let response;
      if (currentPage === "Add Video") {
        response = await VideosServices.UploadVideo(
          {
            title,
            description: description ? description : "",
            url,
            isPublic,
          },
          tokenProtection(getState)
        );
      }
      if (currentPage === "Add Music") {
        response = await VideosServices.UploadMusic(
          {
            title,
            description: description ? description : "",
            url,
            isPublic,
          },
          tokenProtection(getState)
        );
      }
      if (currentPage === "Add Photo") {
        response = await VideosServices.UploadPhoto(
          {
            title,
            description: description ? description : "",
            url,
            isPublic,
          },
          tokenProtection(getState)
        );
      }
      if (currentPage === "Add Documents") {
        response = await VideosServices.UploadDocument(
          {
            title,
            description: description ? description : "",
            url,
            isPublic,
          },
          tokenProtection(getState)
        );
      }
      dispatch({
        type: "USER_ADD_NEW_VIDEO_SUCCESS",
        payload: response,
      });
      if (response) {
        toast.success(`${currentPage} Successfully`);
        dispatch(getAllVideoAction());
        dispatch(getAllMusicAction());
        dispatch(getAllPhotoAction());
        dispatch(getAllDocumentsAction());
      }
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, "USER_ADD_NEW_VIDEO_FAIL");
    }
  };

//======================Video Actions ===========================

export const getAllVideoAction = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "USER_GET_ALL_VIDEO_REQUEST" });
    const response = await VideosServices.getAllVideos();
    dispatch({
      type: "USER_GET_ALL_VIDEO_SUCCESS",
      payload: response,
    });
  } catch (error: TypeOfErrors) {
    ErrorsAction(error, dispatch, "USER_GET_ALL_VIDEO_FAIL");
  }
};

export const GetAllPrivateVideosAction =
  () => async (dispatch: Dispatch, getState: object) => {
    try {
      dispatch({ type: "USER_GET_PRIVATE_VIDEOS_REQUEST" });
      const response = await VideosServices.GetAllPrivateVideos(
        tokenProtection(getState)
      );
      dispatch({
        type: "USER_GET_PRIVATE_VIDEOS_SUCCESS",
        payload: response,
      });
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, "USER_GET_PRIVATE_VIDEOS_FAIL");
    }
  };

export const getVideoByIdAction =
  (id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "USER_GET_VIDEO_BY_ID_REQUEST" });
      const response = await VideosServices.getVideoById(id);
      dispatch({
        type: "USER_GET_VIDEO_BY_ID_SUCCESS",
        payload: response,
      });
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, "USER_GET_VIDEO_BY_ID_FAIL");
    }
  };

export const updateVideoAction =
  (video_id: string, data: any) =>
  async (dispatch: TypeOfDispatch, getState: object) => {
    try {
      dispatch({ type: "USER_UPDATE_VIDEO_REQUEST" });
      const response = await VideosServices.UpdateVideo(
        video_id,
        data,
        tokenProtection(getState)
      );
      dispatch({
        type: "USER_UPDATE_VIDEO_SUCCESS",
        payload: response,
      });
      toast.success("Video Updated Successfully");
      dispatch(getVideoByIdAction(video_id));
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, "USER_UPDATE_VIDEO_FAIL");
    }
  };

export const deleteVideoByIdAction =
  (video_id: string) => async (dispatch: TypeOfDispatch, getState: object) => {
    try {
      dispatch({ type: "USER_DELETE_VIDEO_REQUEST" });
      const response = await VideosServices.deleteVideoById(
        video_id,
        tokenProtection(getState)
      );
      dispatch({
        type: "USER_DELETE_VIDEO_SUCCESS",
        payload: response,
      });
      toast.success("Video Deleted Successfully");
      dispatch(GetAllPrivateVideosAction());
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, "USER_DELETE_VIDEO_FAIL");
    }
  };

// ==================== Music Actions ====================================

export const GetAllPrivateMusicsAction =
  () => async (dispatch: Dispatch, getState: object) => {
    try {
      dispatch({ type: "USER_GET_ALL_PRIVATE_MUSIC_REQUEST" });
      const response = await VideosServices.getAllPrivateMusic(
        tokenProtection(getState)
      );
      dispatch({
        type: "USER_GET_ALL_PRIVATE_MUSIC_SUCCESS",
        payload: response,
      });
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, "USER_GET_ALL_PRIVATE_MUSIC_FAIL");
    }
  };

export const getAllMusicAction = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "USER_GET_ALL_MUSIC_REQUEST" });
    const response = await VideosServices.getAllMusic();
    dispatch({
      type: "USER_GET_ALL_MUSIC_SUCCESS",
      payload: response,
    });
  } catch (error: TypeOfErrors) {
    ErrorsAction(error, dispatch, "USER_GET_ALL_MUSIC_FAIL");
  }
};

export const deleteMusicByIdAction =
  (video_id: string) => async (dispatch: TypeOfDispatch, getState: object) => {
    try {
      dispatch({ type: "USER_DELETE_PRIVATE_MUSIC_REQUEST" });
      const response = await VideosServices.deleteMusicById(
        video_id,
        tokenProtection(getState)
      );
      dispatch({
        type: "USER_DELETE_PRIVATE_MUSIC_SUCCESS",
        payload: response,
      });
      toast.success("Music Deleted Successfully");
      dispatch(GetAllPrivateMusicsAction());
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, "USER_DELETE_PRIVATE_MUSIC_FAIL");
    }
  };

// ====================Photo Actions ====================================

export const GetAllPrivatePhotosAction =
  () => async (dispatch: Dispatch, getState: object) => {
    try {
      dispatch({ type: "USER_GET_ALL_PRIVATE_PHOTO_REQUEST" });
      const response = await VideosServices.getAllPrivatePhoto(
        tokenProtection(getState)
      );
      dispatch({
        type: "USER_GET_ALL_PRIVATE_PHOTO_SUCCESS",
        payload: response,
      });
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, "USER_GET_ALL_PRIVATE_PHOTO_FAIL");
    }
  };

export const getAllPhotoAction = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "USER_GET_ALL_PHOTO_REQUEST" });
    const response = await VideosServices.getAllPhotos();
    dispatch({
      type: "USER_GET_ALL_PHOTO_SUCCESS",
      payload: response,
    });
  } catch (error: TypeOfErrors) {
    ErrorsAction(error, dispatch, "USER_GET_ALL_PHOTO_FAIL");
  }
};

export const deletePhotoByIdAction =
  (photo_id: string) => async (dispatch: TypeOfDispatch, getState: object) => {
    try {
      dispatch({ type: "USER_DELETE_PRIVATE_PHOTO_REQUEST" });
      const response = await VideosServices.deletePhotoById(
        photo_id,
        tokenProtection(getState)
      );
      dispatch({
        type: "USER_DELETE_PRIVATE_PHOTO_SUCCESS",
        payload: response,
      });
      toast.success("Photo Deleted Successfully");
      dispatch(GetAllPrivateVideosAction());
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, "USER_DELETE_PRIVATE_PHOTO_FAIL");
    }
  };

// ==================== Documents Actions ====================================

export const getAllPrivateDocumentAction =
  () => async (dispatch: Dispatch, getState: object) => {
    try {
      dispatch({ type: "USER_GET_ALL_PRIVATE_DOCUMENT_REQUEST" });
      const response = await VideosServices.getAllPrivateDocuments(
        tokenProtection(getState)
      );
      dispatch({
        type: "USER_GET_ALL_PRIVATE_DOCUMENT_SUCCESS",
        payload: response,
      });
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, "USER_GET_ALL_PRIVATE_DOCUMENT_FAIL");
    }
  };

export const getAllDocumentsAction = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "USER_GET_ALL_DOCUMENTS_REQUEST" });
    const response = await VideosServices.getAllVideos();
    dispatch({
      type: "USER_GET_ALL_DOCUMENTS_SUCCESS",
      payload: response,
    });
  } catch (error: TypeOfErrors) {
    ErrorsAction(error, dispatch, "USER_GET_ALL_DOCUMENTS_FAIL");
  }
};

export const deleteDocumentsByIdAction =
  (video_id: string) => async (dispatch: TypeOfDispatch, getState: object) => {
    try {
      dispatch({ type: "USER_DELETE_PRIVATE_DOCUMENTS_REQUEST" });
      const response = await VideosServices.deleteDocumentById(
        video_id,
        tokenProtection(getState)
      );
      dispatch({
        type: "USER_DELETE_PRIVATE_DOCUMENTS_SUCCESS",
        payload: response,
      });
      toast.success("Document Deleted Successfully");
      dispatch(getAllPrivateDocumentAction());
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, "USER_DELETE_PRIVATE_DOCUMENTS_FAIL");
    }
  };
