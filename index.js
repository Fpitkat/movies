const API_KEY = '91483366'
const url = `http://www.omdbapi.com/`
const PosterAPI = 'http://img.omdbapi.com/?apikey=[yourkey]&'

const input = document.querySelector('input')

const onInput = async (event) => {
  const movies = await fetchData(event.target.value)
  for (let movie of movies) {
    const div = document.createElement('div')

    div.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}" />
        <h1>${movie.Title}</h1>
      `

    const target = document.querySelector('#target')
    target.append(div)
  }
}

input.addEventListener('input', debounce(onInput, 500))

const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'd9835cc5',
      s: searchTerm,
    },
  })

  return response.data.Search
}
