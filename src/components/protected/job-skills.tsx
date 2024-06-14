import React from "react";

type JobSkillsProps = {
    jobSkills:string
}
const JobSkills = ({jobSkills}:JobSkillsProps) => {
  const skills = jobSkills
  .split(",")
  .filter((skill) => skill.trim().length > 0);
  return (
    <div className="my-4 flex flex-col gap-2">
      <span className="font-medium text-sm">Skills Required:</span>
      <div className="flex gap-2 flex-wrap">
        {skills.map(
          (skill, index) =>
            skill.length > 0 && (
              <span
                key={index}
                className="text-xs px-2 py-1 border-blue-300 border shadow-sm  rounded-sm bg-blue-50 text-blue-700 capitalize whitespace-nowrap"
              >
                {skill}
              </span>
            )
        )}
      </div>
    </div>
  );
};

export default JobSkills;
