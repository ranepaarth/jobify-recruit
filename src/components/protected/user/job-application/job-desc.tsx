import React from "react";

type DescriptionInfoProps = {
  title: string;
  desc: string;
};

const DescriptionInfo = ({ title, desc }: DescriptionInfoProps) => {
  return <div className="flex flex-col">
  <span className="font-semibold mb-1">{title}</span>
  <p className="text-xs font-light">{desc}</p>
</div>;
};

export default DescriptionInfo;
