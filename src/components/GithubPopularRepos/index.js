import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeFilterItemId: languageFiltersData[0].id,
    isLoading: true,
    repositoryItemsList: [],
    isSuccess: '',
  }

  componentDidMount() {
    this.getTheRepositoryItems()
  }

  fetchingFailed = () => {
    this.setState({isLoading: false, isSuccess: false})
  }

  onSuccessFetch = data => {
    const updatedData = {
      popularRepos: data.popular_repos,
    }
    const {popularRepos} = updatedData
    const updatedItemData = popularRepos.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      issuesCount: eachItem.issues_count,
      forksCount: eachItem.forks_count,
      starsCount: eachItem.stars_count,
      avatarUrl: eachItem.avatar_url,
    }))
    this.setState({
      repositoryItemsList: updatedItemData,
      isLoading: false,
      isSuccess: true,
    })
  }

  getTheRepositoryItems = async () => {
    const {activeFilterItemId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeFilterItemId}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      this.onSuccessFetch(data)
    } else {
      this.fetchingFailed()
    }
  }

  changeTheActiveFilterItem = id => {
    const filterItemDetails = languageFiltersData.filter(
      eachItem => eachItem.id === id,
    )
    this.setState({
      activeFilterItemId: filterItemDetails[0].id,
      isLoading: true,
    })
    this.getTheRepositoryItems()
  }

  renderTheFilterRepositories = () => {
    const {repositoryItemsList, isSuccess} = this.state
    return (
      <div className="container">
        {isSuccess ? (
          <ul className="repository-items-container">
            {repositoryItemsList.map(eachItem => (
              <RepositoryItem details={eachItem} key={eachItem.id} />
            ))}
          </ul>
        ) : (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
              alt="failure view"
            />
          </div>
        )}
      </div>
    )
  }

  render() {
    const {isLoading, repositoryItemsList, activeFilterItemId} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="tabs-items-container">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              filterItemDetails={eachData}
              key={eachData.id}
              isActive={eachData.id === activeFilterItemId}
              changeTheActiveFilterItem={this.changeTheActiveFilterItem}
            />
          ))}
        </ul>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        ) : (
          this.renderTheFilterRepositories()
        )}
      </div>
    )
  }
}

export default GithubPopularRepos
