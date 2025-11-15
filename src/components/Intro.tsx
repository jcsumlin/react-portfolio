import {
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui';
import Mastodon from '@/assets/mastodon.svg?react';
import Github from '@/assets/github.svg?react';
import LinkedIn from '@/assets/linkedin.svg?react';
import { File } from 'lucide-react';

export default function Intro() {
  return (
    <div>
      <span className="h-auto w-full flex flex-col md:flex-row items-center md:items-start md:space-x-12 text-center md:text-left">
        <img
          src="https://media.licdn.com/dms/image/v2/C4E03AQGvAOGTOQHuyg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1634785757978?e=1762992000&v=beta&t=kY-_sUvHid69Q78yaru8rG0LksTAiPRxNd_cElcI_xQ"
          alt="Portrait picture of Chat Sumlin"
          className="w-48 h-48 md:w-72 md:h-72 rounded-full mx-auto mb-8 mt-16 shadow-lg animate-[pulse_2s_ease-in-out_infinite] transition-transform duration-500 hover:scale-105"
          style={{
            animation: 'borderGlow 2s infinite alternate',
          }}
        />
        <div className="md:w-1/2 my-auto">
          <span className="flex w-full flex-wrap items-baseline">
            <div className="text-4xl flex w-full items-end gap-2">
              <h1 className="font-bold inline m-0 p-0 text-center md:text-left">
                Chat Sumlin
              </h1>
              <p className="italic font-bold text-base">(he/him)</p>
            </div>
            <span className="inline text-4xl">
              <span className="text-secondary-foreground">is building </span>
              <span className="text-primary">awesome things.</span>
              <span
                className="ml-1 inline-block align-bottom text-primary"
                style={{
                  animation: 'blink 0.75s steps(1, end) infinite',
                }}
              >
                |
              </span>
            </span>
          </span>
          <h2 className="text-2xl">Full-stack software engineer</h2>
          <p className="text-lg my-4">
            Based in Atlanta, GA specializing in building (and occasionally
            designing) exceptional websites, applications, and everything in
            between.
          </p>
          <a
            href="https://github.com/jcsumlin/react-portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="hover:bg-primary">
                  <Github className="dark:fill-white fill-black" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <strong>View the source code on GitHub!</strong>
              </TooltipContent>
            </Tooltip>
          </a>
          <a
            href="https://mecha.garden/@chatgpt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="hover:bg-primary">
                  <Mastodon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <strong>I'm also on Mastodon!</strong>
              </TooltipContent>
            </Tooltip>
          </a>

          <a
            href="https://www.linkedin.com/in/chatsumlin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="fill-[#0A66C2] hover:fill-white hover:bg-primary"
                >
                  <LinkedIn className="fill-inherit" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <strong>Connect with me on LinkedIn!</strong>
              </TooltipContent>
            </Tooltip>
          </a>
          <a
            href="https://github.com/jcsumlin/react-portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="hover:fill-white hover:bg-primary"
                >
                  <File className="fill-inherit" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <strong>View the source code on GitHub!</strong>
              </TooltipContent>
            </Tooltip>
          </a>
        </div>
      </span>
    </div>
  );
}
