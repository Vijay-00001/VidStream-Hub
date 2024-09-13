import toast from "react-hot-toast";
import Axios from "./Axios";

// This function is used to upload image
export const uploadImageService = async (
  file: object,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  token: string
) => {
  try {
    setLoading(true);
    const { data } = await Axios.post("/user/upload", file, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoading(false);
    toast.success("File uploaded successfully");
    return data;
  } catch (error) {
    setLoading(false);
    toast.error("Something went wrong");
  }
};

// This function is used to upload video
export const uploadVideoService = async (
  file: object,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  token: string
) => {
  try {
    setLoading(true);
    const { data } = await Axios.post("/video/upload", file, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoading(false);
    toast.success("Video uploaded successfully");
    return data;
  } catch (error) {
    setLoading(false);
    toast.error("Something went wrong");
  }
};

// This function is used to create checkout session
export const startSessionCreatForPayment = async (
  price: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  token: string
): Promise<string | undefined> => {
  try {
    setLoading(true);
    const { data } = await Axios.post(
      "/user/create-subscription-checkout-session",
      { price },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoading(false);
    return data.toString();
  } catch (error) {
    setLoading(false);
    toast.error("Something went wrong");
  }
};
