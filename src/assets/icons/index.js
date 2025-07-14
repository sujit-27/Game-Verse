import arrowRight from './arrow-right.svg'
import chevronLeft from './chevron-left.svg'
import cheveronRight from './chevron-right.svg'
import copyrightSign from './copyright-sign.svg'
import facebook from './facebook.svg'
import hamburger from './hamburger.svg'
import instagram from './instagram.svg'
import support from './support.svg'
import shieldTick from './shield-tick.svg'
import star from './star.svg'
import truckFast from './truck-fast.svg'
import twitter from './twitter.svg'

export default {
    arrowRight,
    cheveronRight,
    chevronLeft,
    copyrightSign,
    facebook,
    hamburger,
    instagram,
    support,
    shieldTick,
    star,
    truckFast,
    twitter
}

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];

export const footerLinks = [
    {
    title: "Games",
    links: [
        { name: "Home", link: "/" },
        { name: "Trending Now", link: "/trending-games" },
        { name: "New Releases", link: "/new-games" },
    ],
    },
    {
      title: "Support",
      links: [
        { name: "About Game Verse", link: "/" },
        { name: "FAQs", link: "/faq" },
        { name: "How It Works", link: "/how-it-works" },
        { name: "Privacy Policy", link: "/privacy-policy" },
        { name: "Refund & Cancellation", link: "/refund-policy" },
      ],
    }
,
    {
        title: "Get in touch",
        links: [
            { name: "gamer@gameverse.com", link: "mailto:sujitshaw029@gmail.com" },
            { name: "+92554862354", link: "tel:+918697251694" },
        ],
    },
];
