export const pages: any = [
  {
    name: "home",
    route: "/",
  },

  {
    name: "Knowledge",
    route: "/knowledge",
    options: [
      { pageName: "Knowledge", route: "/knowledge" },
      { pageName: "Veda", route: "veda" },
      { pageName: "Darshan", route: "darshan" },
      { pageName: "Yoga", route: "yoga" },
      { pageName: "The Light of truth", route: "light-of-truth" },
    ],
  },
  { name: "Program Schedule", route: "/program-schedule" },
  {
    name: "Contact Us",
    route: "/contact-us",
  },
  {
    name: "About Us",
    route: "/about-us",
    options: [
      {
        pageName: "About Us",
        route: "about-us",
      },
      {
        pageName: "Aims & Ideals",
        route: "aims-ideals",
        content: `<div >
        <h4>About Us</h4>
        
        <p></p><p>Swāmi Satyapati ji Parivrājak founded theDarshan Yog MahāVidyālaya on 10 April 1986 (Chaitra Shukla Pratipada, Vikram Samvat 2043), as a unique educational institution solely dedicated for the welfare of the human race, i.e. the physical, moral and spiritual uplift of all. Situated 70 Km north of Ahmedābad, Gujarāt, India, the Vidyālaya is surrounded by a lush greenery (forest and nature).</p>
  
  <p>Swāmiji has dedicated his life to serve humanity. His words and deeds are in perfect harmony, no divergence. True to his name, he has an unbendable faith in truth. Meticulous in his teaching methodology, he adheres strictly to time schedules and goals.</p>
  
  <p>Under the leadership of Swāmi Satyapati ji the Darshan Yog MahāVidyālaya emerged as an illustrious training centre for Vaidik scholars, who in turn have dedicated themselves to train a new generation of scholars and disseminate the Sat Sanātan Vaidik Dharma (pristine Vaidik philosophy) in the far corners of India and abroad. The commendable work of Swāmi Satyapati ji wasduly acknowledged through a public felicitation ceremony held in 1999. Swami Ji &nbsp;donated the cheque of Rupees 51 Lakhs presented to him as award to establish the Vānprastha Sādhak Āshram.</p>
  
  <p>The preceptors (āchāryas) and students (brahmachāris) of the Vidyālaya as well as well-wishers and donors had put up every possible effort to realise the Vānprastha Sādhak Āshram project. With the blessings of the Almighty, their hard work paid off as a real project. Based on the family tree concept, the Vānprastha Sādhak Āshram is indeed the brain child or product of the Darshan Yog MahāVidyālaya.</p>
  
  <p>The Darshan Yog MahāVidyālaya has at all times maintained the spirit of dedication of its founder and inspiring figure,Swāmi Satyapati Ji Parivrājak. We are committed to empower scholars knowledgeable in Veda, Darshan philosophy and Vaidik Yog to fulfil the spiritual needs of the modern era, a knowledge-based society.</p>
  
  <p>We extend a cordial invitation to you to spend a few days with us, a real break from the daily rush / routine, relax, meditate and benefit from the silence as well as be one with the nature, take advantage of the pavitra aroma (fragrant / divine atmosphere) emanating from Yajna, listen to the tweeting of birds, taste pure cow milk, etc.</p>
  
  <p>The āchāryas and brahmachāris of the Vidyālaya would be pleased to answer your spiritual questions.</p>
  
  <p>Join us to make faster spiritual progress and help others do the same.</p>
  
  <p>Live life the way God meant.</p>
  <p></p>
        </div>`,
      },
      { pageName: "key information", route: "key-info" },
      { pageName: "Our Functionary", route: "our-functionary" },
      { pageName: "Passed Scholar", route: "passed-scholar" },
      { pageName: "Vision", route: "vision" },
    ],
  },
];
