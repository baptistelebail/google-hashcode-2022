const fs = require('fs');
const path = require('path');

function readFile(file) {
  return fs.readFileSync(path.join(__dirname, `../${file}`), 'utf8');
}

class Skill {
  name;
  level;

  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
}

class Contributor {
    name;
    skills;
    remainingDays;

    constructor(name, skills) {
        this.name = name;
        this.skills = skills;
        this.remainingDays = 0;
    }

    setRemainingDays(duration) {
      this.remainingDays = duration;
    }

    decrementRemainingDays() {
      this.remainingDays = this.remainingDays - 1;
    }
}

class Project {
    name;
    skills;
    score;
    duration;
    bestBefore;

    constructor(name, skills, score, duration, bestBefore) {
        this.name = name;
        this.skills = skills;
        this.score = score;
        this.duration = duration;
        this.bestBefore = bestBefore;
    }
}

function read(file) {
  const data = readFile(file);

  const contributors = [];
  const projects = [];

  const lines = data.split('\n');
  const [contributorsNumber, projectsNumber] = lines.shift().split(' ');

  for (let i = 0; i < contributorsNumber; i = i + 1) {
    let [name, skillsNumber] = lines.shift().split(' ');
    skillsNumber = parseInt(skillsNumber);

    const skills = [];

    for (let j = 0; j < skillsNumber; j++) {
      const [skillName, skillLevel] = lines.shift().split(' ');
      skills.push(new Skill(skillName, skillLevel));
    }

    contributors.push(new Contributor(name, skills));
  }

  for (let i = 0; i < projectsNumber; i = i + 1) {
    const [name, duration, score, bestBefore, skillsNumber] = lines.shift().split(' ');

    const skills = [];

    for (let j = 0; j < skillsNumber; j = j + 1) {
      const [skillName, level] = lines.shift().split(' ');
      skills.push(new Skill(skillName, level));
    }

    projects.push(new Project(name, skills, score, duration, bestBefore));
  }

  return [contributors, projects];
}

function output(projectsDone, fileName) {
  
  let outputString = `${projectsDone.length}\n`;

  projectsDone.forEach((projectDone) => {
    outputString = `${outputString}${projectDone.project.name}\n`;

    let contributors = projectDone.contributors.join(' ');

    outputString = `${outputString}${contributors}\n`;
  });

  fs.writeFileSync(path.join(__dirname, fileName), outputString);
}

module.exports = {
  read,
  Contributor,
  Skill,
  Project,
  output,
};
