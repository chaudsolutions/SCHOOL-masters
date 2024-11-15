import heroImage from "../../../assets/images/heroImage.jpg";
import teacherImage from "../../../assets/images/teacher.jpg";
import { LinkOne } from "../../Custom/Buttons/LinkBtn";
import "./home.css";
import { PiSpiralFill } from "react-icons/pi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const secOne = [
    {
      name: "Everyday Learning and Developing",
      content:
        "We create a conducive environment for students and teachers alike",
    },
    {
      name: "Online group discussion",
      content:
        "Group work as well as discussion are most important for learning...",
    },
    {
      name: "Track & Grade Progress",
      content: "Track students progress and grade them accordingly",
    },
  ];
  const secOneOutput = secOne.map((item, i) => (
    <li key={i}>
      <FaRegCircleCheck size={25} />
      <div>
        <h4>{item.name}</h4>
        <p>{item.content}</p>
      </div>
    </li>
  ));

  return (
    <main className="home">
      <header className="header">
        <img src={heroImage} alt="hero image" />
        <div>
          <h1>Education is key to better future</h1>
          <p>Learning and developing just got easier...</p>
          <p>More than 1,000 users...</p>
          <LinkOne linkDetails={[{ name: "Get Started", url: "/register" }]} />
        </div>
      </header>

      <section className="section-one">
        <div>
          <h2>Interactive Teachings and Learning</h2>
          <img src={teacherImage} alt="teacher teaching" />
        </div>
        <div>
          <PiSpiralFill size={100} />

          <ul>{secOneOutput}</ul>
        </div>
      </section>
    </main>
  );
};

export default Home;
