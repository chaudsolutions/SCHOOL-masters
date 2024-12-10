import { useEffect } from "react";
import HeaderPage from "../../Custom/HeaderPage/HeaderPage";

const About = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  return (
    <div className="home">
      <HeaderPage page="About EduNest" />

      <section className="section-one">
        <p>
          EduNest is your one-stop platform for fostering a connected and
          thriving learning community. Designed with innovation and
          collaboration in mind, we aim to empower educators, students, and
          parents by streamlining academic management and promoting excellence
          in education.
        </p>

        <ul className="about-ul">
          <li>
            <h3>Our Mission</h3>
            <p>
              To revolutionize education by providing a platform that enhances
              learning experiences, simplifies administration, and fosters
              meaningful connections among educators, students, and parents.
            </p>
          </li>
          <li>
            <h3>Our Vision</h3>
            <p>
              A world where technology bridges the gap between potential and
              achievement, making quality education accessible, interactive, and
              impactful for everyone.
            </p>
          </li>
          <li>
            <h3>Our Values</h3>
            <p>
              Integrity, collaboration, creativity, and empathy are our core
              values at EduNest. By prioritizing these values, we strive to
              create a learning environment that is supportive, inclusive, and
              empowering.
            </p>
          </li>
          <li>
            <h3>Our Journey</h3>
            <p>
              Founded in 2024, EduNest was created to address the growing
              challenges of educational management. From simplifying attendance
              tracking to integrating real-time communication, we have helped
              100+ schools/teachers/students achieve their goals.
            </p>
          </li>
          <li>
            <h3>What we offer</h3>
            <ul>
              <li>Student performance tracking with dynamic analytics.</li>
              <li>Real-time attendance and behavior monitoring.</li>
              <li>Seamless communication between teachers and parents.</li>
              <li>Resources and tools for interactive learning.</li>
              <li>And much more!</li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
