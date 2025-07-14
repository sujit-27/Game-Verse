import { useSelector } from "react-redux";
import copyrightSign from "../../assets/icons/copyright-sign.svg";
import {footerLinks, socialMedia } from "../../assets/icons/index.js";
import  footerLogo  from "../../assets/Logo2.png";

const Footer = () => {
  const theme = useSelector((state) => state.theme.mode);

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#0e0e3d]" : "bg-[#2f2fac4c]";
  const textColor = isDark ? "text-white" : "text-black";
  const mutedText = isDark ? "text-white/70" : "text-black/70";

  return (
    <footer className={`border-t border-white/20 py-12 px-4 sm:px-6 md:px-10 ${bgColor} ${textColor}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-start gap-20 flex-wrap lg:flex-nowrap">
        {/* Logo & Description */}
        <div className="flex flex-col items-start">
          <a href="/" className="flex items-center gap-3">
            <img src={footerLogo} width={50} height={50} alt="Logo" />
            <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              Game Verse
            </span>
          </a>

          <p className={`mt-6 text-base leading-7 sm:max-w-sm ${mutedText}`}>
            Discover the latest games, track releases, and stay ahead in the world of gaming — all in one place. Power up your play today.
          </p>
          <div className="flex items-center gap-4 mt-6">
            {socialMedia.map((icon) => (
              <div key={icon.alt} className={`flex justify-center items-center w-10 h-10 rounded-full ${isDark ? "bg-[#2f2fac4c]" : "bg-white"} cursor-pointer`}>
                <img
                  src={icon.src}
                  alt={icon.alt}
                  width={20}
                  height={20}
                  className={`${isDark ? "invert" : ""}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex-1 flex flex-wrap gap-10 justify-between mt-10 lg:mt-0">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className={`text-xl font-semibold mb-4 ${textColor}`}>{section.title}</h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    key={link.name}
                    className={`mb-2 cursor-pointer hover:underline ${mutedText}`}
                  >
                    <a href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="mt-12 pt-6 border-t border-white/20 flex justify-between items-center text-sm flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <img
            src={copyrightSign}
            alt="copyright"
            width={20}
            height={20}
            className="rounded-full"
          />
          <p className={`${mutedText}`}> 2025. All rights reserved.</p>
        </div>
        <p className={`${mutedText} cursor-pointer hover:underline`}>
          Terms & Conditions
        </p>
      </div>
    </footer>
  );
};

export default Footer;
