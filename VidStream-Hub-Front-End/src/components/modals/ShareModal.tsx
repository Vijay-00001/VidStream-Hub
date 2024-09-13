import { TypeOfShareModal } from "@/Types";
import MainModals from "./MainModals";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const ShareModal = ({
  modalOpen,
  setModalOpen,
  movie_id,
  movie_title,
}: TypeOfShareModal) => {
  const shareData = [
    {
      icon: FaFacebook,
      shareButton: FacebookShareButton,
    },
    {
      icon: FaTwitter,
      shareButton: TwitterShareButton,
    },
    {
      icon: FaTelegram,
      shareButton: TelegramShareButton,
    },
    {
      icon: FaWhatsapp,
      shareButton: WhatsappShareButton,
    },
    {
      icon: FaInstagram,
      shareButton: InstapaperShareButton,
    },
    {
      icon: MdEmail,
      shareButton: EmailShareButton,
    },
  ];
  const url: string | undefined =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}/movies/single-movie-info/${movie_id}`
      : undefined;
  return (
    <MainModals modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main  rounded-2xl text-white z-50">
        <h2 className="text-2xl">
          Share <span className="text-xl font-bold">{movie_title}</span>
        </h2>
        <form className="flex-rows flex-wrap gap-6 mt-6">
          {shareData.map((item, index) => (
            <item.shareButton
              key={index}
              url={url || "http://localhost:3000"}
            >
              <div className="w-12 transitions hover:bg-subMain flex-colo text-lg h-12 bg-white rounded bg-opacity-30">
                <item.icon />
              </div>
            </item.shareButton>
          ))}
        </form>
      </div>
    </MainModals>
  );
};

export default ShareModal;
