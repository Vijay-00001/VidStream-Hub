import { ContactItem } from "@/Types";
import Head from "@/components/Head";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";

const contactData: ContactItem[] = [
  {
    id: 1,
    title: "Email Us",
    info: "Interactively grow backend ideas for cross-platform models.",
    icon: FiMail,
    contact: "vertualspace@owner.com",
  },
  {
    id: 2,
    title: "Call Us",
    info: "Distinctively exploit optimal alignments for intuitive bandwidth.",
    icon: FiPhoneCall,
    contact: "+91 93657 12345",
  },
  {
    id: 3,
    title: "Location",
    info: "408, 4th Floor, Luxurious tower, Airport Road, Surat, Gujarat",
    icon: FiMapPin,
    contact: "",
  },
];

const ContectUs: React.FC = () => {
  return (
    <div className="min-height-screen container mx-auto px-2 my-6">
      <Head title="Contact Us" />
      <div className="grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
        {contactData.map((data) => {
          return (
            <div
              key={data.id}
              className="border border-border flex-colo p-10 bg-dry rounded-lg text-center"
            >
              <span className="flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl">
                <data.icon />
              </span>
              <h5 className="text-xl font-semibold mb-2">{data.title}</h5>
              <p className="mb-0 text-sm text-text leading-7">
                <a href={`mailto:${data.contact}`} className="text-blue-600">
                  {data.contact}
                </a>{" "}
                {data.info}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContectUs;
