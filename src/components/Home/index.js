import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProjectCard from '../ProjectCard'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const status = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    projectList: [],
    apiStatus: status.initial,
    filter: categoriesList[0].id,
  }

  componentDidMount = () => {
    this.getProjectsData()
  }

  getProjectsData = async () => {
    this.setState({apiStatus: status.loading})
    const {filter} = this.state
    console.log(filter)
    const url = `https://apis.ccbp.in/ps/projects?category=${filter}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      this.setState({projectList: data.projects, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  onSelectFilter = event => {
    this.setState({filter: event.target.value}, this.getProjectsData)
  }

  renderSuccessView = () => {
    const {projectList} = this.state
    console.log(projectList)

    return (
      <ul className="projects-grid">
        {projectList.map(each => (
          <ProjectCard eachProject={each} key={each.id} />
        ))}
      </ul>
    )
  }

  onClickRetry = () => this.getProjectsData()

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader />
    </div>
  )

  renderAllComponents = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.loading:
        return this.renderLoadingView()
      case status.success:
        return this.renderSuccessView()
      case status.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="home-container">
          <div className="header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
              alt="website logo"
              className="header-logo"
            />
          </div>

          <select className="filter-select" onChange={this.onSelectFilter}>
            {categoriesList.map(each => (
              <option key={each.id} value={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>

          {this.renderAllComponents()}
        </div>
      </>
    )
  }
}

export default Home
