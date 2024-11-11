import { faker } from "@faker-js/faker";
import { useState } from "react";
import { useUserData } from "./useQueryFetch/useQueryData";
import ChartComponent from "../Custom/Chart/ChartComponent";

// Generate random classes with students and performance data
export const generateMockClasses = (numClasses = 10) => {
  return Array.from({ length: numClasses }, (_, classIndex) => ({
    id: faker.string.uuid(),
    className: `Class ${classIndex + 1}`,
    subject: faker.helpers.arrayElement([
      "Math",
      "Science",
      "English",
      "History",
    ]),
    students: generateMockStudents(faker.number.int({ min: 10, max: 30 })),
  }));
};

// Generate random students for a class
export const generateMockStudents = (numStudents) => {
  return Array.from({ length: numStudents }, () => ({
    id: faker.string.uuid(),
    name: {
      first: faker.person.firstName(),
      last: faker.person.lastName(),
    },
    attendance: faker.number.int({ min: 75, max: 100 }), // random attendance between 75-100%
    grades: generateMockGrades(),
  }));
};

// Generate random grades for each student
export const generateMockGrades = () => {
  return Array.from({ length: 5 }, () => ({
    subject: faker.helpers.arrayElement([
      "Math",
      "Science",
      "English",
      "History",
    ]),
    score: faker.number.int({ min: 50, max: 100 }), // random score between 50-100
    date: faker.date.past(),
  }));
};

// use student data
export const useStudentsData = (view) => {
  const [students] = useState(generateMockStudents(10));

  const { userData, isUserDataLoading } = useUserData();

  const { role } = userData || {};

  // output students attendance and behavior
  const studentsList = students?.map((student) => {
    const grade =
      student.grades?.reduce((acc, current) => acc + current.score, 0) /
      student.grades?.length;

    const behavior = (grade + student.attendance) / 2;

    const gradeDistributionData = {
      labels: student.grades.map((subject) => subject.subject), // Grade labels
      datasets: [
        {
          label: "Subjects",
          data: student.grades.map((subject) => subject.score), // Example data - replace with dynamic data
          backgroundColor: [
            "#4CAF50",
            "#FFC107",
            "#2196F3",
            "#FF5722",
            "#9E9E9E",
          ],
        },
      ],
    };

    const gradeDistributionOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Grade Distribution",
        },
      },
    };

    return (
      <li key={student.id}>
        <h4>
          Name: {student.name.first} {student.name.last}
        </h4>
        <p>
          Performance <progress value={grade} max="100"></progress>
        </p>
        <p>
          Attendance <progress value={student.attendance} max="100"></progress>
        </p>
        <p>
          Behavior <progress value={behavior} max="100"></progress>
        </p>

        <ChartComponent
          key={view}
          type="bar"
          data={gradeDistributionData}
          options={gradeDistributionOptions}
        />

        {!isUserDataLoading && role === "teacher" && (
          <div>
            <button>Grade</button>
            <button>Mark Attendance</button>
          </div>
        )}
      </li>
    );
  });

  return { studentsList };
};
