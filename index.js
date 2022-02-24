const { result } = require("lodash");
const { read, Contributor, Skill, Project, output } = require("./utils/utils");

function findEligibleProjects(t, contributors, projects) {
  const eligibleProjects = [];

  for (let i = 0; i < projects.length; i++) {
    if (t <= projects[i].bestBefore - projects[i].duration) {
      const collaboratersMatched = [];

      projects[i].skills.forEach((skillNeeded) => {
        contributors.forEach((c) => {
          if (c.remainingDays === 0) {
            c.skills.forEach((cSkill) => {
              if (cSkill.name === skillNeeded.name && cSkill.level >= skillNeeded.level) {
                collaboratersMatched.push(c.name);

                const contributorIndex = contributors.findIndex((contributor) => contributor.name === c.name);
                contributors.splice(contributorIndex, 1);
              }
            });
          }
        });
      });

      if (collaboratersMatched.length === projects[i].skills.length) {
        eligibleProjects.push({
          project: projects[i],
          contributors: collaboratersMatched
        });
      }
    }
  }

  eligibleProjects.sort((eligibleProject1, eligibleProject2) =>
    eligibleProject1.project.score - eligibleProject2.project.score
  );

  return eligibleProjects;
}

function findProjectContributors(project, contributors) {
  const availableContributors = contributors;
}

const files = [
  {
    input: '/score/a_an_example.in.txt',
    output: '../outputs/a_an_example.in.txt'
  },
  {
    input: '/score/b_better_start_small.in.txt',
    output: '../outputs/b_better_start_small.in.txt'
  },
  {
    input: '/score/c_collaboration.in.txt',
    output: '../outputs/c_collaboration.in.txt'
  },
  {
    input: '/score/d_dense_schedule.in.txt',
    output: '../outputs/d_dense_schedule.in.txt'
  },
  {
    input: '/score/e_exceptional_skills.in.txt',
    output: '../outputs/e_exceptional_skills.in.txt'
  },
  {
    input: '/score/f_find_great_mentors.in.txt',
    output: '../outputs/f_find_great_mentors.in.txt'
  },
];

files.forEach(({ input, output: outputName }) => {
  let [contributors, projects] = read(input);

  const projectsDone = [];

  let day = 0;

  let projectRemainingDays = 0;

  while (true) {
    if (projectRemainingDays === 0) {
      const contributorsCopy = [...contributors];
      const eligiblesProject = findEligibleProjects(day, contributorsCopy, projects);

      if (eligiblesProject.length === 0) {
        break;
      }

      const projectOfTheDay = eligiblesProject.shift();

      projectRemainingDays = projectOfTheDay.project.duration;

      projectsDone.push(projectOfTheDay);
      
      // projectOfTheDay.project.skills.forEach((skill) => {

      // });

      // projectOfTheDay.contributors.forEach((projectContributor) => {
      //   contributors.forEach((contributor) => {
      //     if (contributor.name === projectContributor.name) {
      //       if ()
      //     }
      //   })
      // });

      const projectIndex = projects.findIndex((project) => project.name === projectOfTheDay.project.name);
      projects.splice(projectIndex, 1);
    } else {
      projectRemainingDays = projectRemainingDays - 1;
    }

    day = day + 1;
  }

  output(projectsDone, outputName);
})
