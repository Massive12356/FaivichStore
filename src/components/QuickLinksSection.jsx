import { MdPersonAdd} from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const quickLinks = [
  {
    title: "New User",
    icon: <MdPersonAdd className="text-green-900 text-4xl mb-2" />,
    path: "/faivichRoom/signup",
    bg: "bg-green-100",
    textColor: "text-green-900",
  },
  // Future links can be added here
//   {
//     title: "Login",
//     icon: <MdLogin className="text-blue-900 text-4xl mb-2" />,
//     path: "/faivichRoom/login",
//     bg: "bg-blue-100",
//     textColor: "text-blue-900",
//   },
];

const QuickLinksSection = () => {
  return (
    <div className="w-full mt-6 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-[#283144] mb-4">
        Quick Links
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
        {quickLinks.map((link, idx) => (
          <Link to={link.path} key={idx}>
            <motion.div
              whileTap={{ scale: 0.95 }}
              className={`rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center justify-center p-4 ${link.bg}`}
            >
              {link.icon}
              <p className={`font-semibold ${link.textColor}`}>{link.title}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickLinksSection;
