import React from 'react';
import SectionTitle from './SectionTitle';
import ReactIcon from '@/assets/react.svg?react';
import TailwindIcon from '@/assets/tailwindcss-mark.d52e9897.svg?react';
import Typescript from '@/assets/typescript-icon-svgrepo-com.svg?react';
import DjangoIcon from '@/assets/django-svgrepo-com.svg?react';
import PHPIcon from '@/assets/php3-svgrepo-com.svg?react';
import Python from '@/assets/python-svgrepo-com.svg?react';
import AWS from '@/assets/aws-svgrepo-com.svg?react';
import Docker from '@/assets/docker-svgrepo-com.svg?react';
import Git from '@/assets/git-svgrepo-com.svg?react';
import Jenkins from '@/assets/jenkins-svgrepo-com.svg?react';
import Laravel from '@/assets/laravel-svgrepo-com.svg?react';
import MySql from '@/assets/mysql-svgrepo-com.svg?react';
import Postgresql from '@/assets/postgresql-logo-svgrepo-com.svg?react';
import Redis from '@/assets/redis-svgrepo-com.svg?react';
import Terraform from '@/assets/terraform-svgrepo-com.svg?react';

const skillsList: {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  { name: 'Git', icon: Git },
  { name: 'AWS', icon: AWS },
  { name: 'Docker', icon: Docker },
  { name: 'React', icon: ReactIcon },
  { name: 'TypeScript', icon: Typescript },
  { name: 'Tailwind CSS', icon: TailwindIcon },
  { name: 'Django', icon: DjangoIcon },
  { name: 'Python', icon: Python },
  { name: 'PHP', icon: PHPIcon },
  { name: 'Laravel', icon: Laravel },
  { name: 'PostgreSQL', icon: Postgresql },
  { name: 'MySQL', icon: MySql },
  { name: 'Redis', icon: Redis },
  { name: 'Terraform', icon: Terraform },
  { name: 'Jenkins', icon: Jenkins },
];

const Skills: React.FC = () => {
  return (
    <section>
      <SectionTitle title="Skills & Tech Stack" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Group skillsList into groups of 5 and render them as columns */}
        {skillsList.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.name}
              className="group relative flex items-center gap-4 rounded-xl p-4 dark:bg-zinc-900/80 border dark:border-zinc-700/60 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_4px_16px_-4px_rgba(0,0,0,0.6)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_28px_-6px_rgba(0,0,0,0.7)] transition-all duration-300 overflow-hidden"
            >
              <div className="relative w-14 h-14 flex items-center justify-center rounded-lg dark:bg-zinc-700/70 ring-1 ring-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Icon className="w-9 h-9 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] transition-all" />
              </div>
              <div className="relative flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold tracking-wide text-sm md:text-base">
                    {skill.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
