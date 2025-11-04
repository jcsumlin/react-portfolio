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
import useTheme from '@/hooks/useTheme';

export default function Intro() {
  const { theme } = useTheme();
  return (
    <div>
      <span className="h-auto w-full flex flex-col md:flex-row items-center md:items-start md:space-x-12 text-center md:text-left">
        <img
          src="https://media.licdn.com/dms/image/v2/C4E03AQGvAOGTOQHuyg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1634785757978?e=1762992000&v=beta&t=kY-_sUvHid69Q78yaru8rG0LksTAiPRxNd_cElcI_xQ"
          alt="Chat Sumlin"
          className="w-48 h-48 md:w-72 md:h-72 rounded-full mx-auto mb-8 mt-16 shadow-lg animate-[pulse_2s_ease-in-out_infinite] transition-transform duration-500 hover:scale-105"
          style={{
            // boxShadow: '0 0 0 8px #22d3ee, 0 0 24px 0 #22d3ee80',
            animation: 'borderGlow 2s infinite alternate',
          }}
        />
        <div className="w-1/2 my-auto">
          <span className="flex w-full text-4xl flex-wrap items-baseline">
            <h1 className="font-bold inline m-0 p-0 text-center md:text-left w-full">
              Chat Sumlin
            </h1>
            <span className="inline">
              <span className="text-secondary-foreground">is building </span>
              <span className="text-cyan-400">awesome things.</span>
              <span
                className="ml-1 inline-block align-bottom text-cyan-400"
                style={{
                  animation: 'blink 0.75s steps(1, end) infinite',
                }}
              >
                |
              </span>
            </span>
          </span>
          <h4 className="italic">he/him</h4>
          <h2>Full-stack software engineer</h2>
          <p>
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
                <Button variant="ghost">
                  <Github fill={theme === 'dark' ? '#FFFFFF' : '#000000'} />
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
                <Button variant="ghost">
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
                <Button variant="ghost">
                  <LinkedIn />
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
                <Button variant="ghost">
                  <File />
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
