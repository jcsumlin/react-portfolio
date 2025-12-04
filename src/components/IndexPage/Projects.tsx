import SectionTitle from '../SectionTitle';
import projectsData from '@/projects.json';
import { Link } from '@tanstack/react-router';
import { Button } from '../ui';

export default function Projects() {
  return (
    <section className="my-4 py-16" id="projects">
      <SectionTitle title="Projects" />
      <p className="text-lg mb-12 max-w-3xl">
        Here are a few projects I've worked on recently. Want to learn more?{' '}
        <Link
          to="/contact"
          className="text-primary underline hover:text-primary/90 transition-colors"
        >
          Contact me
        </Link>
        .
      </p>

      {/* Other Projects Grid */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="bg-background rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:shadow-cyan-900/20 hover:border-cyan-800 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                <p className="text-sm mb-4">{project.description}</p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="dark:bg-[#1B1F24] text-primary text-xs px-2 py-1 rounded-full border border-cyan-900"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-primary my-auto">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-3 mt-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="text-sm px-3 py-1 bg-gray-800 text-white rounded border border-gray-600 hover:bg-gray-700 hover:border-white transition-colors">
                        GitHub
                      </Button>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="text-sm px-3 py-1 bg-cyan-700 text-white rounded hover:bg-cyan-600 transition-colors">
                        Demo
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
