import {
  TBrandItem,
  TAboutImage,
  TClient,
  THomeVideo,
  TNavItem,
  TServiceItem,
  TTeamMember,
  TVideoItem,
  TWebsiteTab,
  TActivationsTab,
  TCaseItem,
} from "@/types";

export const navItems: TNavItem[] = [
  {
    name: "About Us",
    link: "#about",
  },
  {
    name: "Our Work",
    link: "#portfolio",
  },
  {
    name: "Team",
    link: "#team",
  },
];
export const aboutDescriptionHtml = `
<strong>We're Not a Digital Agency.</strong>
<p>We're a boutique 360° creative and digital service provider that specializes in content, strategy, and web development. But what does that really mean?</p>
<p>It means we don't just "do digital marketing." We get into the trenches with you, dig deep into your business goals, and figure out the smartest, most creative ways to get you where you need to be. We're the problem-solvers who see a challenge and get genuinely excited about finding a clever solution.</p>
<p>Tired of working with agencies that feel like black boxes? We get it. We pride ourselves on being completely transparent and making sure you're in the loop every step of the way. We're a team that truly gets behind your vision because your win is our win.</p>
<p>We’ve seen what works and what’s just a waste of time and money, and we’re here to help you skip the latter. We build impactful strategies, craft compelling visuals, and develop websites that don't just look pretty but actually perform.</p>

<strong>What Makes Us Different? (Besides Our Sense of Humor)</strong>
<p><em>A Brain Trust, Not a Bureaucracy:</em> We’re a lean, mean, results-driven machine. You don't get handed off to a junior team. You work directly with the experts who have the skills and experience to get the job done right.</p>
<p><em>APAC Expertise, Global Standards:</em> We're registered in the US, based right here in Bangladesh, but our work has helped clients across the entire APAC region. We combine our deep regional market knowledge with world-class digital standards to deliver work that drives real growth and makes an impact.</p>
<p><em>No-Nonsense Pricing:</em> We believe top-tier creative and digital services shouldn't break the bank. We offer industry-standard quality at rates that are reasonable and competitive, so you can focus on your business, not your budget.</p>

<strong>Ready to Tell a Better Story?</strong>
<p>Your business deserves more than just a marketing plan; it deserves a partner. If you're looking for a team that's as passionate about your success as you are, let's chat.</p>
`;

export const homeVideos: THomeVideo[] = [
  {
    src: "/videos/Video1.mp4",
    poster: "/images/Video1.jpg",
    label: "Showroom",
  },
  {
    src: "/videos/Video2.mp4",
    poster: "/images/Video2.jpg",
    label: "Products",
  },
  {
    src: "/videos/Video3.mp4",
    poster: "/images/Video3.jpg",
    label: "Installations",
  },
];

export const heroText: string = "Digital Disruption Delivered";

export const aboutImages: TAboutImage[] = [
  {
    alt: "About Image 1",
    src: "/images/about-1.jpg",
  },
  {
    alt: "About Image 4",
    src: "/images/about-4.jpg",
  },
];

export const aboutTitle: string = "Digital for ";

export const aboutShuffleWords: string[] = [
  "Impact",
  "Tourism",
  "Hospitality",
  "Food & Beverage",
  " Social Enterprise",
  "Activations",
  "Events",
  "Technology",
  "Consumer Goods",
  "Financial Services",
  "Retail Services",
  "Education",
];

export const aboutButtonText: string = "Schedule a call with us today!";

export const clientCompanies: TClient[] = [
  {
    src: "/images/client-01.png",
    alt: "Company 1",
    href: "https://company1.com",
  },
  {
    src: "/images/client-02.png",
    alt: "Company 2",
    href: "https://company2.com",
  },
  {
    src: "/images/client-03.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-04.png",
    alt: "Company 4",
    href: "https://company4.com",
  },
  {
    src: "/images/client-05.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-06.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-07.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-08.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-09.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-10.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-11.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-12.jpg",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-13.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "/images/client-14.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
];

export const services: TServiceItem[] = [
  {
    id: "digital-marketing",
    title: "Digital Marketing & Content Creation",
    description:
      "From SEO and paid campaigns to engaging social media and blog content—we craft strategies that connect with your audience and deliver measurable growth.",
    image: "/images/digital-marketing.webp",
    gradient: "bg-gradient-to-r from-green-800 to-green-600",
    gridSpan: "col-span-1 lg:col-span-2",
    minHeight: "min-h-[500px] lg:min-h-[300px]",
    imageClass:
      "absolute -right-4 lg:-right-[20%] -bottom-2 object-contain rounded-2xl",
  },
  {
    id: "branding",
    title: "Branding & Creatives",
    description:
      "Build a powerful identity. We design logos, brand guidelines, and visuals that make your brand unforgettable across every channel.",
    // image: "/images/branding.jpg",
    gradient: "bg-gradient-to-r from-purple-700 to-pink-500",
    gridSpan: "col-span-1",
    minHeight: "min-h-[300px]",
  },
  {
    id: "production",
    title: "Production & Photography",
    description:
      "Capture your story with professional photography and video production. High-quality visuals that inspire, engage, and convert.",
    // image: "/images/production.jpg",
    gradient: "bg-gradient-to-r from-amber-600 to-yellow-500",
    gridSpan: "col-span-1",
    minHeight: "min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]",
  },
  {
    id: "web-design",
    title: "Web Design & Development",
    description:
      "Modern, responsive, and user-friendly websites tailored to your business needs. From eCommerce to corporate sites—we design for performance and impact.",
    image: "/images/web-design.jpg",
    gradient: "bg-gradient-to-r from-cyan-600 to-emerald-500",
    gridSpan: "col-span-1 lg:col-span-2",
    minHeight: "min-h-[400px] lg:min-h-[300px]",
    imageClass:
      "absolute -right-4 md:-right-[20%] -bottom-8 object-contain rounded-2xl",
  },
];

export const teamMembers: TTeamMember[] = [
  {
    name: "Murtaza Shujauddin",
    role: "Managing Director",
    img: "/images/team1.png",
  },
  {
    name: "Kazi Tahmid Imam",
    role: "Partner, APAC",
    img: "/images/team2.png",
  },
  {
    name: "Syed Ahsan Rahat",
    role: "Director",
    img: "/images/team3.png",
  },
  {
    name: "Ziaus Shams",
    role: "Partner, Production",
    img: "/images/team4.png",
  },
];

export const teamTitle: string = "Meet our board members";
export const teamDescription: string =
  "A diverse group of passionate professionals, each bringing unique skills and experiences to drive innovation and excellence in every project we undertake.";

export const brandImages: TBrandItem[] = [
  {
    id: "bi-01",
    src: "/images/bi-01.png",
    href: "https://www.gameof11.com/",
    title: "Game of 11",
  },
  {
    id: "bi-02",
    src: "/images/bi-02.png",
    href: "https://www.facebook.com/MooliciousBD/",
    title: "Moolicious",
  },
  {
    id: "bi-03",
    src: "/images/bi-03.png",
    href: "https://www.facebook.com/CThreeSixty/",
    title: "CThreeSixty",
  },
  {
    id: "bi-04",
    src: "/images/bi-04.png",
    href: "https://www.facebook.com/gofood.live/",
    title: "GoFood",
  },
  {
    id: "bi-05",
    src: "/images/bi-05.png",
    href: "https://nsusn.framer.ai/",
    title: "NSU Startup Next",
  },
  {
    id: "bi-06",
    src: "/images/bi-06.png",
    href: "https://firsttrip.com/",
    title: "FirstTrip",
  },
  {
    id: "bi-07",
    src: "/images/bi-07.png",
    href: "https://example.com/brand-7",
    title: "Lotus",
  },
  {
    id: "bi-08",
    src: "/images/bi-08.png",
    href: "https://marveloftomorrow.xyz/",
    title: "Marvel of Tomorrow",
  },
  {
    id: "bi-09",
    src: "/images/bi-09.png",
    href: "https://fbcci.org/",
    title: "FBCCI",
  },
  {
    id: "bi-10",
    src: "/images/bi-10.png",
    href: "https://www.programming-hero.com/",
    title: "Programming Hero",
  },
];

export const staticContents = [
  {
    id: "1",
    img: "/images/dsc-1.png",
    url: "https://example.com/one",
    height: 400,
  },

  {
    id: "2",
    img: "/images/dsc-2.png",
    url: "https://example.com/two",
    height: 250,
  },

  {
    id: "3",
    img: "/images/dsc-3.jpg",
    url: "https://example.com/three",
    height: 500,
  },

  {
    id: "4",
    img: "/images/dsc-4.jpg",
    url: "https://example.com/four",
    height: 650,
  },

  {
    id: "5",
    img: "/images/dsc-5.jpg",
    url: "https://example.com/five",
    height: 500,
  },

  {
    id: "6",
    img: "/images/dsc-6.jpg",
    url: "https://example.com/six",
    height: 540,
  },

  {
    id: "7",
    img: "/images/dsc-7.jpg",
    url: "https://example.com/seven",
    height: 300,
  },
];

export const dynamicVideos: TVideoItem[] = [
  {
    id: "v1",
    src: "/videos/dac-1.mp4",
  },
  {
    id: "v2",
    src: "/videos/dac-2.mp4",
  },
  {
    id: "v3",
    src: "/videos/dac-3.mp4",
  },
  {
    id: "v4",
    src: "/videos/dac-4.mp4",
  },
  {
    id: "v5",
    src: "/videos/dac-5.mp4",
  },
  {
    id: "v6",
    src: "/videos/dac-6.mp4",
  },
  {
    id: "v7",
    src: "/videos/dac-7.mp4",
  },
  {
    id: "v8",
    src: "/videos/dac-8.mp4",
  },
  {
    id: "v9",
    src: "/videos/dac-9.mp4",
  },
  {
    id: "v10",
    src: "/videos/dac-10.mp4",
  },
  {
    id: "v11",
    src: "/videos/dac-11.mp4",
  },
];

export const websitesData: TWebsiteTab[] = [
  {
    id: "s1",
    title: "Chill Inn Thailand",
    poster: "/images/wd-01.jpg",
    longShot: "/images/wd-01.jpg",
    url: "https://www.chillinnthailand.com/",
  },
  {
    id: "s2",
    title: "Anahata Samui",
    poster: "/images/wd-02.jpg",
    longShot: "/images/wd-02.jpg",
    url: "https://anahatasamui.com/",
  },
  {
    id: "s3",
    title: "Samui Fishing Club",
    poster: "/images/wd-03.jpg",
    longShot: "/images/wd-03.jpg",
    url: "https://samuifishingclubandresort.com/",
  },

  {
    id: "s4",
    title: "The Hive Samui ",
    poster: "/images/wd-04.jpg",
    longShot: "/images/wd-04.jpg",
    url: "https://www.hivehotelsamui.com/",
  },
  {
    id: "s5",
    title: "Uhub - University Hostel",
    poster: "/images/wd-05.jpg",
    longShot: "/images/wd-05.jpg",
    url: "https://uhubchaweng.com/",
  },
  {
    id: "s6",
    title: "Pixel Thailand",
    poster: "/images/wd-06.jpg",
    longShot: "/images/wd-06.jpg",
    url: "https://www.pixelthailand.com/",
  },
  {
    id: "s7",
    title: "Paka Dhaka",
    poster: "/images/wd-07.jpg",
    longShot: "/images/wd-07.jpg",
    url: "https://www.pakadhaka.shop/",
  },
];

export const activationsData: TActivationsTab[] = [
  {
    id: "1",
    img: "/images/ae-01.jpg",
    url: "https://example.com/one",
  },

  {
    id: "2",
    img: "/images/ae-02.jpg",
    url: "https://example.com/two",
  },

  {
    id: "3",
    img: "/images/ae-03.jpg",
    url: "https://example.com/three",
  },

  {
    id: "4",
    img: "/images/ae-04.jpg",
    url: "https://example.com/four",
  },
];

export const caseStudiesData: TCaseItem[] = [
  {
    title: "Thik Fast & Think Digital First",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: ` <h2>Campaign: Bruno Moretti Underwear Campaign</h2>
    <h4>Challenges & opportunities:</h4>
    <p>
      There was no established underwear brand for men in Bangladesh. The market
      is used to imported products and local products. It is still considered to
      be a taboo but a taboo that is an opportunity for a new brand like Bruno
      Moretti to break.
    </p>
    <ul>
      <li>
        The initial launch video of Bruno Moretti received mixed feedback for
        its strong imagery
      </li>
    </ul>
    <p>
      There- it was the brand’s next move to stand out from the mixed reactions
      and establish a taboo brand
    </p>

    <h4>The Campaign:</h4>
    <p>
      The campaign was born right around the time when our launch video was
      getting mixed reaction. We’ve decided to partner up with Rafayet Rakib, a
      popular commentary content creator and asked him to roast our video in
      stead. And thus began the saga of Brand vs Influencer
    </p>

    <table>
      <tbody>
        <tr>
          <td>
            <figure>
              <img
                src="/images/cs1.png"
                alt="Influencer making fun of our brand video"
              />
              <figcaption>
                The campaign started with the influencer making fun of our brand
                video
              </figcaption>
            </figure>
          </td>
          <td>
            <figure>
              <img
                src="/images/cs2.png"
                alt="Community members created memes about the brand"
              />
              <figcaption>
                Then his Facebook community group members created memes out of
                the brand
              </figcaption>
            </figure>
          </td>
          <td>
            <figure>
              <img
                src="/images/cs3.png"
                alt="Brand challenges influencers to design underwear"
              />
              <figcaption>
                Then we as a brand challenged the influencers and their
                community to create their best design of underwear
              </figcaption>
            </figure>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>Campaign Overview:</h3>
    <p>
      The campaign engaged influencers, the comment box, Facebook community and
      initiated user generated contents. We’ve ended up receiving over 700
      designs of men’s underwear from audience and overall increased attention
      and awareness of a new brand. We’ve also won digital marketing awards for
      the campaign
    </p>`,
  },
  {
    title: "Enhance your productivity.",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: ` <h2>Campaign: Bruno Moretti Underwear Campaign</h2>
      <h4>Challenges & opportunities:</h4>
      <p>
        There was no established underwear brand for men in Bangladesh. The market
        is used to imported products and local products. It is still considered to
        be a taboo but a taboo that is an opportunity for a new brand like Bruno
        Moretti to break.
      </p>
      <ul>
        <li>
          The initial launch video of Bruno Moretti received mixed feedback for
          its strong imagery
        </li>
      </ul>
      <p>
        There- it was the brand’s next move to stand out from the mixed reactions
        and establish a taboo brand
      </p>
  
      <h4>The Campaign:</h4>
      <p>
        The campaign was born right around the time when our launch video was
        getting mixed reaction. We’ve decided to partner up with Rafayet Rakib, a
        popular commentary content creator and asked him to roast our video in
        stead. And thus began the saga of Brand vs Influencer
      </p>
  
      <table>
        <tbody>
          <tr>
            <td>
              <figure>
                <img
                  src="/images/cs1.png"
                  alt="Influencer making fun of our brand video"
                />
                <figcaption>
                  The campaign started with the influencer making fun of our brand
                  video
                </figcaption>
              </figure>
            </td>
            <td>
              <figure>
                <img
                  src="/images/cs2.png"
                  alt="Community members created memes about the brand"
                />
                <figcaption>
                  Then his Facebook community group members created memes out of
                  the brand
                </figcaption>
              </figure>
            </td>
            <td>
              <figure>
                <img
                  src="/images/cs3.png"
                  alt="Brand challenges influencers to design underwear"
                />
                <figcaption>
                  Then we as a brand challenged the influencers and their
                  community to create their best design of underwear
                </figcaption>
              </figure>
            </td>
          </tr>
        </tbody>
      </table>
      <h3>Campaign Overview:</h3>
      <p>
        The campaign engaged influencers, the comment box, Facebook community and
        initiated user generated contents. We’ve ended up receiving over 700
        designs of men’s underwear from audience and overall increased attention
        and awareness of a new brand. We’ve also won digital marketing awards for
        the campaign
      </p>`,
  },
];
