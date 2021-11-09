const createQuestionPaintingPage =() => {
  return `<header class="container question_header">
    <h1>ArtQuiz</h1>
    <div class="question_header_container">
      <img src="./assets/img/logo.png" alt="logo">
      <h2>Who is the author of this picture ?</h2>
      <div class="time">
        <span>03:59</span>
      </div>
    </div>
  </header>
  <main class="container question_main">
    <div class="question_painting_image">
      <img src="./assets/img/paintings_full/2.jpg">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="question_painting_answers">
      <ul>
        <li>Van Gogh</li>
        <li>Van Gogh</li>
        <li>Van Gogh</li>
        <li>Van Gogh</li>
      </ul>
    </div>
  </main>`
}