import './index.css'

const ProjectCard = props => {
  const {eachProject} = props
  // console.log(eachProject)

  return (
    <li className="project-card">
      <img src={eachProject.image_url} alt={eachProject.name} />
      <p>{eachProject.name}</p>
    </li>
  )
}

export default ProjectCard
