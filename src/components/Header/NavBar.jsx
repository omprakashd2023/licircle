import { useState, useEffect } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { MobileNavLink, NavLink } from "./components/NavLink";

import { logo, logoAlt, navLinks } from "@/constants/constants";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (window.scrollY > 40) {
      setIsScrolled(true);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 40) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      setTimeout(() => {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
      }, 500);
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const navBarVariants = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  const scrollVariants = {
    initial: {
      y: "-100vh",
      opacity: 0,
      position: "static",
    },
    visible: {
      y: 0,
      opacity: 1,
      top: "-100vh",
      position: "static",
    },
    scroll: {
      y: 0,
      opacity: 1,
      position: "fixed",
    },
  };

  return (
    <motion.div
      variants={scrollVariants}
      initial="initial"
      animate={isScrolled ? "scroll" : "visible"}
      transition={{
        type: "spring",
        duration: 0.5,
      }}
      className={`z-10 h-14 md:h-10 ${
        isScrolled ? "backdrop-blur-sm" : ""
      } flex justify-between items-center px-4 xs:px-8 md:py-8 md:px-20 w-full`}
    >
      <img className="h-5 sm:h-6 md:h-7 my-2" src={logo} alt="LiCircle" />
      <div className="hidden my-2 md:flex gap-6 items-center justify-between">
        {navLinks.map((link, index) => {
          return <NavLink key={index} link={link} isScrolled={isScrolled} />;
        })}
      </div>
      <p className="md:hidden cursor-pointer text-md text-primary flex pt-1 items-center">
        <IoMdMenu onClick={toggleMenu} size={26} />
      </p>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={navBarVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="z-10 md:hidden fixed left-0 top-0 w-full h-screen origin-top bg-tertiary1 pt-4 px-4"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-between">
                <img className="h-5 sm:h-6" src={logoAlt} alt="LiCircle" />
                <p className="cursor-pointer text-md text-background flex place-items-center">
                  <IoMdClose onClick={toggleMenu} size={26} />
                </p>
              </div>
              <motion.div
                variants={staggerVariants}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-around items-center gap-4"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  {navLinks.map((link, index) => {
                    return (
                      <div className="overflow-hidden">
                        <MobileNavLink key={index} link={link} />
                      </div>
                    );
                  })}
                </div>
                <motion.div
                  variants={{
                    initial: {
                      opacity: 0,
                    },
                    open: {
                      opacity: 1,
                      transition: {
                        delay: 0.5,
                      },
                    },
                    exit: {
                      opacity: 0,
                    },
                  }}
                  initial="initial"
                  animate="open"
                  exit="exit"
                >
                  <p className="text-white font-medium text-base underline underline-offset-2 hover:scale-105 transition-transform cursor-pointer font-oxygen">
                    info@licircle.org.in
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NavBar;
