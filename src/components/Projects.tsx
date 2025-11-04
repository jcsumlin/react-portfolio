import type { Project } from "@/types";
import SectionTitle from "./SectionTitle";
import projectsData from "@/projects.json";

// This could be moved to a separate types file

const featuredProject: Project | undefined = projectsData.find(
  (project) => project.featured,
);
const projects: Project[] = projectsData.filter((project) => !project.featured);

export default function Projects() {
  return (
    <div
      className="mt-4 min-h-screen px-4 md:px-8 py-16 bg-[#222831]"
      id="projects"
    >
      <SectionTitle title="Projects" />
      <p className="text-lg text-gray-300 mb-12 max-w-3xl">
        Here are a few projects I've worked on recently. Want to see more?{" "}
        <a
          href="#contact"
          className="text-primary hover:text-primary/90 transition-colors"
        >
          Contact me
        </a>
        .
      </p>

      {/* Featured Project */}
      {featuredProject && (
        <div className="mb-16">
          <h3 className="text-sm uppercase tracking-wider text-cyan-300 mb-4">
            Featured Project
          </h3>
          <div className="bg-[#2D3440] rounded-lg shadow-xl overflow-hidden border border-gray-700 hover:shadow-2xl hover:border-cyan-700 transition-all duration-300 transform hover:-translate-y-1">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredProject.imageUrl}
                  alt={featuredProject.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  {featuredProject.title}
                </h2>
                <p className="text-gray-300 mb-6">
                  {featuredProject.description}
                </p>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold mb-2 text-gray-200">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-[#1B1F24] text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  {featuredProject.githubUrl && (
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 border border-gray-600 hover:border-white transition-colors"
                    >
                      View Code
                    </a>
                  )}
                  {featuredProject.liveUrl && (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-600 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Projects Grid */}
      <div>
        <h3 className="text-sm uppercase tracking-wider text-cyan-300 mb-6">
          Other Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#2D3440] rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:shadow-cyan-900/20 hover:border-cyan-800 transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-white">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {project.description}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="bg-[#1B1F24] text-cyan-300 text-xs px-2 py-1 rounded-full border border-cyan-900"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-cyan-400">
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
                      className="text-sm px-3 py-1 bg-gray-800 text-white rounded border border-gray-600 hover:bg-gray-700 hover:border-white transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm px-3 py-1 bg-cyan-700 text-white rounded hover:bg-cyan-600 transition-colors"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
