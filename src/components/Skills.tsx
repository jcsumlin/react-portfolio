import React from 'react';
import SectionTitle from './SectionTitle';
import SkillCard from './SkillCard';
import { cn } from '@/lib/utils';

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
import Vite from '@/assets/vite-js-logo_svgstack_com_31531762485262.svg?react';
import Knip from '@/assets/knip.svg?react';
import Zod from '@/assets/zod.webp';
import Tanstack from '@/assets/tanstack.png';
import Sentry from '@/assets/sentry.svg?react';
import Cloudflare from '@/assets/cloudflare-icon-logo.svg?react';
import Expo from '@/assets/expo.svg?react';
import { kebabCase } from 'lodash';

const iconClasses =
  'w-9 h-9 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] transition-all';
const thisSiteTechStack: {
  name: string;
  icon: React.ReactNode;
}[] = [
  { name: 'React', icon: <ReactIcon className={iconClasses} /> },
  { name: 'TypeScript', icon: <Typescript className={iconClasses} /> },
  { name: 'Tailwind CSS', icon: <TailwindIcon className={iconClasses} /> },
  {
    name: 'Tanstack Router',
    icon: <img src={Tanstack} className={iconClasses} />,
  },
  { name: 'Vite', icon: <Vite className={cn(iconClasses)} /> },
  { name: 'knip', icon: <Knip className={iconClasses} /> },
  { name: 'Cloudflare', icon: <Cloudflare className={iconClasses} /> },
  { name: 'Zod', icon: <img src={Zod} className={iconClasses} /> },
  { name: 'Sentry', icon: <Sentry className={iconClasses} /> },
];

const skillsList: {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  { name: 'React Native', icon: Expo },
  { name: 'Git', icon: Git },
  { name: 'AWS', icon: AWS },
  { name: 'Docker', icon: Docker },
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
      <div className="mb-6 space-y-4 text-lg">
        <p>
          This portfolio was created with the intent of showcasing my mastery in
          software technologies that are the industry standard for performant
          and scalable web applications.
        </p>
        <p>
          While this is a showcase of those particular skills, I've been
          delivering scalable web applications for years using a variety of
          technologies and frameworks. Interested in seeing how the sausage is
          made?{' '}
          <a
            href="https://github.com/jcsumlin/react-portfolio"
            className="text-primary underline hover:text-primary/90 transition-colors"
          >
            Check out my GitHub!
          </a>
        </p>
      </div>
      <h3 className="mt-2 text-3xl">My portfolio was built with:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {thisSiteTechStack.map((tech) => {
          return (
            <SkillCard key={kebabCase(tech.name)} name={tech.name}>
              {tech.icon}
            </SkillCard>
          );
        })}
      </div>
      <h3 className="my-4 text-3xl">Other Skills I Have</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillsList.map((skill) => {
          const Icon = skill.icon;
          return (
            <SkillCard key={skill.name} name={skill.name}>
              <Icon className="w-9 h-9 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] transition-all" />
            </SkillCard>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
