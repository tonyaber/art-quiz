const createStartPage = () => {
  return `<header class="container start_page_header">
    <h1>ArtQuiz</h1>
    <img src="./assets/img/logo.png" alt="logo">
  </header>
  <main class="container start_page_main">
    <div class="start_page">
      <div class="start_page_type">
        <button class="artists">
          <span><b>Artists</b> quiz</span>
        </button>
        <button class="pictures">
          <span><b>Pictires</b> quiz</span>
        </button>
      </div>
      <button class="start_page_setting">Settings</button>
    </div>
  </main>
  <footer>
    <a href="https://rs.school/"><img src="./assets/svg/rs_school_js.svg"></a>
    <a href="https://github.com/tonyaber">Berchuk Antonina</a>
  </footer>`
}

class StartPage{

}