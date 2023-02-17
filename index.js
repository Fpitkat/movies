const API_KEY = '91483366'
const url = `http://www.omdbapi.com/`
// const PosterAPI = 'http://img.omdbapi.com/?apikey=[yourkey]&'

const root = document.querySelector('.autocomplete')
root.innerHTML = `
  <label><strong>Search for Movie</strong></label>
  <input class='input' />
  <div class='dropdown'>
    <div class='dropdown-menu'>
      <div class='dropdown-content results'></div>
    </div>
  </div>
`

const input = document.querySelector('input')
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')

document.addEventListener('click', (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active')
  }
})

const onInput = async (event) => {
  const movies = await fetchData(event.target.value)
  if (!movies.length) {
    dropdown.classList.remove('is-active')
    return
  }

  resultsWrapper.innerHTML = ''
  dropdown.classList.add('is-active')

  for (let movie of movies) {
    const option = document.createElement('a')
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster

    option.classList.add('dropdown-item')
    option.innerHTML = `
        <img src="${imgSrc}" alt="image of ${movie.Title}" />
        ${movie.Title}
      `
    option.addEventListener('click', () => {
      input.value = movie.Title
      dropdown.classList.remove('is-active')
      onMovieSelect(movie)
    })
    resultsWrapper.append(option)
  }
}

input.addEventListener('input', debounce(onInput, 500))

const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: API_KEY,
      s: searchTerm,
    },
  })
  if (response.data.Error) {
    return []
  }
  return response.data.Search
}

const onMovieSelect = async (movie) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: API_KEY,
      i: movie.imdbID,
    },
  })
  console.log(response.data)
  const summary = document.querySelector('#summary')
  console.log(summary)
  summary.innerHTML = movieTemplate(response.data)
}

const movieTemplate = (movieDetail) => {
  return `
    <article class='media'>
      <figure class='media-left'>
        <p class='image'>
          <img src='${movieDetail.Poster}' />
        </p>
      </figure>
      <div class='media-content'>
        <div class='content'>
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
  `
}
