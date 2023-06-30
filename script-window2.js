// // Declaração de variaveis
let quizz = [];
// declaração de funções
function getQuizz(idQuizz) {
  console.log(idQuizz);
  const urlOneQuizz = `${urlQuizzes}/${idQuizz}`;
  const promise = axios.get(urlOneQuizz);
  promise.then(showQuestions);
  promise.catch(handleError);
}
function showQuestions(response) {
  quizz = response.data;
  const questions = document.querySelector(".questions");
  questions.innerHTML = `
  <div class="header-quizzes">
  <img src=${quizz.image}/>
  <div class="opacity">
  </div>
   <p>${quizz.title}</p>
    </div>`;
  renderQuizz();
}

function renderQuizz() {
  for (let i = 0; i < quizz.questions.length; i++) {
    const question = document.querySelector(".questions");
    question.innerHTML += `
    <section class= " question">
        <div class="question-title">
            <p>${quizz.questions[i].title}</p>
        </div>
        <div class="img-options question${i}">
        </div>
    </section>
    `;
    for (let j = 0; j < quizz.questions[i].answers.length; j++) {
      console.log(quizz.questions[i].answers[j]);
      const option = document.querySelector(`.question${i}`);
      option.innerHTML += `
              <figure>
                  <img src=${quizz.questions[i].answers[j].image} />
                  <figcaption>${quizz.questions[i].answers[j].text}</figcaption>
              </figure>
              `;
    }
  }
}

// function renderQuizz(question) {
//   const questions = document.querySelector(".questions");
//   questions.innerHTML += `
//     <section class="question">
//         <div class="question-title">
//             <p>${question.title}</p>
//         </div>
//     </section>
//     `;
//   question.answers.forEach(renderOptions);
// }

// function renderOptions(option) {
//   const question = document.querySelector(`.question`);
//   question.innerHTML += `
//           <div class="img-options">
//               <figure>
//                   <img src=${option.image} />
//                   <figcaption>${option.text}</figcaption>
//               </figure>
//           </div>`;
// }

// utilização das funções
